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
				id: "121212",
				subjectName: "ENG",
				classId: "9A",
				color: 0,
				showColorDropdown: false,
			},
			{
				id: "061689",
				subjectName: "MATHS",
				classId: "9A",
				color: 1,
				showColorDropdown: false,
			},
		],
	},
];

const CONSTRAINDATA = [
	{
		id: "121212",
		subjectName: "ENG",
		classId: "9A",
		slots: { days: [1, 2, 3, 4, 5], sessions: [1, 2, 3, 4, 5, 6, 7, 8] },
		frequencyPer: { week: 5, space: "EVENLY" },
		_meta: { showDetails: false, showAdvancedQuery: false },
		labSession: { enabled: false, count: 3 },
		firstPeriod: { enabled: false },
	},
	{
		id: "061689",
		subjectName: "MATHS",
		classId: "9A",
		slots: { days: [1, 2, 3, 4, 5], sessions: [1, 2, 3, 4, 5, 6, 7, 8] },
		frequencyPer: { week: 5, space: "EVENLY" },
		_meta: { showDetails: false, showAdvancedQuery: false },
		labSession: { enabled: false, count: 3 },
		firstPeriod: { enabled: false },
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

const COLORS = [
	{ bg: ["#FF512F", "#DD2476"], text: "#FFFFFF" },
	{ bg: ["#E55D87", "#5FC3E4"], text: "#282A35" },
	{ bg: ["#EDE574", "#E1F5C4"], text: "#282A35" },
	{ bg: ["#cc2b5e", "#753a88"], text: "#FFFFFF" },
	{ bg: ["#314755", "#26a0da"], text: "#FFFFFF" },
	{ bg: ["#BBD2C5", "#536976"], text: "#282A35" },
	{ bg: ["#3CA55C", "#B5AC49"], text: "#282A35" },
];

export {
	TEACHERSDATA,
	CONSTRAINDATA,
	TEACHERSTABLE,
	CLASSTABLE,
	GENERALINFO,
	COLORS,
};
