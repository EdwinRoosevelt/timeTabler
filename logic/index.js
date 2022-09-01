const emptyTable = (totalSessions, totalDays) => {
	return Array.from({ length: totalDays }, () =>
		Array(totalSessions).fill("FREE")
	);
};

const isSlotEqual = (slot1, slot2) => {
	return slot1[0] === slot2[0] && slot1[1] === slot2[1];
};

const getAvailableSlots = (slots) => {
	let availableSlots = [];

	slots.days.map((day) => {
		slots.sessions.map((session) => {
			availableSlots.push([day - 1, session - 1]);
		});
	});

	return availableSlots;
};

export const generateTimeTable = (
	totalDays,
	totalSessions,
	allTeachersData,
	allConstrainData
) => {
	const teacherTable = {};
	const classTable = {};
	const colorMap = {};
	const resultStats = {};

	/////////////////////// Creating empty table //////////////////////
	allTeachersData.map((teacher) => {
		teacherTable[teacher.name] = emptyTable(totalSessions, totalDays);

		teacher.classSub.map((classSub) => {
			if (classTable[classSub.classId] === undefined)
				classTable[classSub.classId] = emptyTable(totalSessions, totalDays);
		});
	});

	/////////////////////// Sorting constrain data //////////////////////
	const newAllConstrainData = [];

	allConstrainData.map((oldConstrain) => {
		const constrain = JSON.parse(JSON.stringify(oldConstrain));

		constrain.availableSlots = getAvailableSlots(constrain.slots);
		constrain.priorityRank = constrain.availableSlots.length;

		if (constrain.availableSlots.length === 0) return;

		if (constrain.labSession.enabled) constrain.priorityRank *= 0.5;

		// For atleast 1 first period, splitting the data into two
		if (constrain.firstPeriod.enabled) {
			const constrain1 = JSON.parse(JSON.stringify(constrain));

			constrain1.priorityRank = 0;
			constrain1.slots.sessions = [1];
			constrain1.frequencyPer.week = 1;
			constrain1.availableSlots = getAvailableSlots(constrain1.slots);
			newAllConstrainData.push(constrain1);

			constrain.frequencyPer.week -= 1;
		}

		newAllConstrainData.push(constrain);
	});

	newAllConstrainData.sort((a, b) => {
		if (a.priorityRank < b.priorityRank) return -1;
		else if (a.priorityRank > b.priorityRank) return 1;
		return 0;
	});

	////////////// start filling from most constrained data //////////////
	newAllConstrainData.map((constrain) => {
		let teacherName;
		let color;
		allTeachersData.map((teacher) => {
			teacher.classSub.map((classSub) => {
				if (classSub.id === constrain.id) {
					teacherName = teacher.name;
					color = classSub.color;
				}
			});
		});
		const subjectName = constrain.subjectName;
		const classId = constrain.classId;

		let slotsToBefilled = constrain.frequencyPer.week;
		let availableSlots = constrain.availableSlots;

		// initializing colorMatrix
		if (colorMap[classId] === undefined) {
			colorMap[classId] = {};
			for (let row = 0; row < totalDays; row++) {
				colorMap[classId][row] = {};
				for (let col = 0; col < totalSessions; col++) {
					colorMap[classId][row][col] = 0;
				}
			}
		}
		if (colorMap[teacherName] === undefined) {
			colorMap[teacherName] = {};
			for (let row = 0; row < totalDays; row++) {
				colorMap[teacherName][row] = {};
				for (let col = 0; col < totalSessions; col++) {
					colorMap[teacherName][row][col] = {};
				}
			}
		}

		let slotRefilRemaining =
			Math.ceil(constrain.frequencyPer.week / totalDays) - 1;

		while (slotsToBefilled > 0) {
			if (availableSlots.length === 0 && slotRefilRemaining === 0) {
				resultStats[classId].allFilled = false;
				console.log("Ran out of slots!");
				return;
			}
			if (
				constrain.frequencyPer.space === "EVENLY" &&
				availableSlots.length === 0
			) {
				availableSlots = getAvailableSlots(constrain.slots);
				console.log(availableSlots);
				slotRefilRemaining -= 1;
			}

			const randomSlot =
				availableSlots[Math.floor(Math.random() * availableSlots.length)];

			//  Filling Lab sessions
			if (constrain.labSession.enabled && constrain.labSession.count > 0) {
				const extraSlot = JSON.parse(JSON.stringify(randomSlot));
				extraSlot[1] += 1;

				if (
					constrain.slots.sessions.includes(extraSlot[1]) &&
					classTable[classId][randomSlot[0]][randomSlot[1]] === "FREE" &&
					teacherTable[teacherName][randomSlot[0]][randomSlot[1]] === "FREE" &&
					classTable[classId][extraSlot[0]][extraSlot[1]] === "FREE" &&
					teacherTable[teacherName][extraSlot[0]][extraSlot[1]] === "FREE"
				) {
					classTable[classId][randomSlot[0]][randomSlot[1]] = [
						subjectName,
						teacherName,
					];
					colorMap[classId][randomSlot[0]][randomSlot[1]] = color;
					teacherTable[teacherName][randomSlot[0]][randomSlot[1]] = [
						classId,
						subjectName,
					];
					colorMap[teacherName][randomSlot[0]][randomSlot[1]] = color;

					classTable[classId][extraSlot[0]][extraSlot[1]] = [
						subjectName,
						teacherName,
					];
					colorMap[classId][extraSlot[0]][extraSlot[1]] = color;
					teacherTable[teacherName][extraSlot[0]][extraSlot[1]] = [
						classId,
						subjectName,
					];
					colorMap[teacherName][extraSlot[0]][extraSlot[1]] = color;

					// Removing all the slots for the day
					const newAvailableSlots = availableSlots.filter(
						(slot) => slot[0] !== randomSlot[0]
					);
					availableSlots = newAvailableSlots;

					slotsToBefilled -= 2;
					constrain.labSession.count -= 1;
				}

				// Filling Normal sessions
			} else {
				if (
					classTable[classId][randomSlot[0]][randomSlot[1]] === "FREE" &&
					teacherTable[teacherName][randomSlot[0]][randomSlot[1]] === "FREE"
				) {
					classTable[classId][randomSlot[0]][randomSlot[1]] = [
						subjectName,
						teacherName,
					];
					colorMap[classId][randomSlot[0]][randomSlot[1]] = color;
					teacherTable[teacherName][randomSlot[0]][randomSlot[1]] = [
						classId,
						subjectName,
					];
					colorMap[teacherName][randomSlot[0]][randomSlot[1]] = color;

					// Removing all the slots for the day
					const newAvailableSlots = availableSlots.filter(
						(slot) => slot[0] !== randomSlot[0]
					);
					availableSlots = newAvailableSlots;

					slotsToBefilled -= 1;
				}
			}
			// Removing the randomSlot
			const newAvailableSlots = availableSlots.filter(
				(slot) => !isSlotEqual(slot, randomSlot)
			);
			availableSlots = newAvailableSlots;
		}
	});

	return { teacherTable, classTable, colorMap, resultStats };
};
