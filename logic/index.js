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
	const response = {};

	/////////////////////// Creating empty table //////////////////////
	allTeachersData.map((teacher) => {
		teacherTable[teacher.name] = emptyTable(totalSessions, totalDays);

		teacher.classSub.map((classSub) => {
			if (classTable[classSub.classId] === undefined)
				classTable[classSub.classId] = emptyTable(totalSessions, totalDays);
		});
	});

	/////////////////////// Sorting constrain data //////////////////////
	allConstrainData = allConstrainData.map((constrain) => {
		constrain.availableSlots = getAvailableSlots(constrain.slots);
		constrain.slotCount = constrain.availableSlots.length;
		return constrain;
	});

	allConstrainData.sort((a, b) => {
		if (a.slotCount < b.slotCount) return -1;
		else if (a.slotCount > b.slotCout) return 1;
		return 0;
	});

	////////////// start filling from most constrained data //////////////
	allConstrainData.map((constrain) => {
		let teacherName;
		allTeachersData.map((teacher) => {
			teacher.classSub.map((classSub) => {
				if (classSub.id === constrain.id) teacherName = teacher.name;
			});
		});
		const subjectName = constrain.subjectName;
		const classId = constrain.classId;

		let slotsToBefilled = constrain.frequencyPer.week;
		let availableSlots = constrain.availableSlots;

		let slotRefilRemaining =
			Math.ceil(constrain.frequencyPer.week / totalDays) - 1;

		while (slotsToBefilled > 0) {
			if (availableSlots.length === 0 && slotRefilRemaining === 0) {
				console.log("Ran out of slots!");
				response.message = "out of slots";
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

			if (
				classTable[classId][randomSlot[0]][randomSlot[1]] === "FREE" &&
				teacherTable[teacherName][randomSlot[0]][randomSlot[1]] === "FREE"
			) {
				classTable[classId][randomSlot[0]][randomSlot[1]] = [
					subjectName,
					teacherName,
				];
				teacherTable[teacherName][randomSlot[0]][randomSlot[1]] = [
					classId,
					subjectName,
				];

				// Removing all the slots for the day
				const newAvailableSlots = availableSlots.filter(
					(slot) => slot[0] !== randomSlot[0]
				);
				availableSlots = newAvailableSlots;

				slotsToBefilled -= 1;
			}
			// Removing the randomSlot
			const newAvailableSlots = availableSlots.filter(
				(slot) => !isSlotEqual(slot, randomSlot)
			);
			availableSlots = newAvailableSlots;
		}
	});

	/////// Iterating through all the teacher's all the sessions //////////
	// allTeachersData.map((teacher) => {
	// 	const teacherName = teacher.name;

	// 	teacher.classSub.map((session) => {
	// 		const classSubId = session.id;
	// 		const subjectName = session.subjectName;
	// 		const classId = session.classId;

	// 		const constrainData = allConstrainData.filter(
	// 			(constrain) => constrain.id === classSubId
	// 		)[0];

	// 		let slotsToBefilled = constrainData.frequencyPer.week;
	// 		let availableSlots = getAvailableSlots(constrainData.slots);

	// 		while (slotsToBefilled > 0) {
	// 			if (availableSlots.length === 0) {
	// 				console.log("Ran out of slots!");
	// 				return;
	// 			}

	// 			const randomSlot =
	// 				availableSlots[Math.floor(Math.random() * availableSlots.length)];

	// 			if (
	// 				classTable[classId][randomSlot[0]][randomSlot[1]] === "FREE" &&
	// 				teacherTable[teacherName][randomSlot[0]][randomSlot[1]] === "FREE"
	// 			) {
	// 				classTable[classId][randomSlot[0]][randomSlot[1]] = [
	// 					subjectName,
	// 					teacherName,
	// 				];
	// 				teacherTable[teacherName][randomSlot[0]][randomSlot[1]] = [
	// 					classId,
	// 					subjectName,
	// 				];

	// 				slotsToBefilled -= 1;
	// 				// Removing all the slots for the day
	// 				if (constrainData.frequencyPer.day === 1) {
	// 					const newAvailableSlots = availableSlots.filter(
	// 						(slot) => slot[0] !== randomSlot[0]
	// 					);
	// 					availableSlots = newAvailableSlots;
	// 				}
	// 			}
	// 			// Removing the randomSlot
	// 			const newAvailableSlots = availableSlots.filter(
	// 				(slot) => !isSlotEqual(slot, randomSlot)
	// 			);
	// 			availableSlots = newAvailableSlots;
	// 		}
	// 	});
	// });

	console.log(teacherTable);
	console.log(classTable);

	return { teacherTable, classTable };
};
