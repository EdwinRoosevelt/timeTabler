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

	slots.days.split(",").map((day) => {
		slots.sessions.split(",").map((session) => {
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

	// Creating empty table
	allTeachersData.map((teacher) => {
		teacherTable[teacher.name] = emptyTable(totalSessions, totalDays);

		teacher.classSub.map((classSub) => {
			if (classTable[classSub.classId] === undefined)
				classTable[classSub.classId] = emptyTable(totalSessions, totalDays);
		});
	});

	// Iterating through all the teacher's all the sessions
	allTeachersData.map((teacher) => {
		const teacherName = teacher.name;

		teacher.classSub.map((session) => {
			const classSubId = session.id;
			const subjectName = session.subjectName;
			const classId = session.classId;

			const constrainData = allConstrainData.filter(
				(constrain) => constrain.id === classSubId
			)[0];

			let slotsToBefilled = constrainData.frequencyPer.week;
			let availableSlots = getAvailableSlots(constrainData.slots);

			while (slotsToBefilled > 0) {
				if (availableSlots.length === 0) {
					console.log("Ran out of slots!");
					return;
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

					slotsToBefilled -= 1;
					// Removing all the slots for the day
					if (constrainData.frequencyPer.day === 1) {
						const newAvailableSlots = availableSlots.filter(
							(slot) => slot[0] !== randomSlot[0]
						);
						availableSlots = newAvailableSlots;
					}
				}
				// Removing the randomSlot
				const newAvailableSlots = availableSlots.filter(
					(slot) => !isSlotEqual(slot, randomSlot)
				);
				availableSlots = newAvailableSlots;

				console.log(availableSlots);
				console.log(teacherTable);
				console.log(randomSlot);
			}
		});
	});

	return { teacherTable, classTable };
};
