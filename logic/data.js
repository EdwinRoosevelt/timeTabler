const GENERALINFO = {
	totalDays: 5,
	totalPeriods: 8,
};

const TEACHERSDATA = [
	{
		id: "9f0bd4b",
		name: "Professor X",
		classSub: [
			{
				id: "06168",
				subjectName: "ENG",
				classId: "9A",
			},
			{
				id: "061689",
				subjectName: "MATHS",
				classId: "9A",
			},
		],
	},
];

const CONSTRAINDATA = [
	{
		id: "06168",
		subjectName: "ENG",
		classId: "9A",
		slots: { days: "1,2,3,4,5", sessions: "1,2,3,4,5,6,7,8" },
		frequencyPer: { week: 5, space: "EVENLY" },
		_meta: { showDetails: false },
	},
	{
		id: "061689",
		subjectName: "MATHS",
		classId: "9A",
		slots: { days: "1,2,3,4,5", sessions: "1,2,3,4,5,6,7,8" },
		frequencyPer: { week: 5, space: "EVENLY" },
		_meta: { showDetails: false },
	},
];

const TEACHERSTABLE = {
	Edwin: [
		[null, null, null, null, null, null, null, null], // Monday
		[null, null, null, null, null, null, null, null], // Tuesday
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
	],
	Banu: [
		[null, null, null, null, null, null, null, null], // Monday
		[null, null, null, null, null, null, null, null], // Tuesday
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
	],
};

const CLASSTABLE = {
	"9A": [
		[null, null, null, null, null, null, null, null], // Monday
		[null, null, null, null, null, null, null, null], // Tuesday
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
	],
	"9B": [
		[null, null, null, null, null, null, null, null], // Monday
		[null, null, null, null, null, null, null, null], // Tuesday
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
	],
};

export { TEACHERSDATA, CONSTRAINDATA, TEACHERSTABLE, CLASSTABLE, GENERALINFO };
