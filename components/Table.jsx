import React from "react";
import { COLORS } from "../logic/data";

const WEEEKDAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

const getCellStyle = (bgColor, textColor) => {
	const style = {
		backgroundColor: bgColor,
		color: textColor,
	};
	if (bgColor.length == 2)
		style.backgroundImage = `linear-gradient(to right, ${bgColor[0]} , ${bgColor[1]})`;
	return style;
};

function Table({ heading, table, generalData, colorMap }) {
	return (
		<>
			<h1 className="fs-2  p-3">{heading}</h1>
			<div
				className="p-2"
				style={{
					overflowY: "scroll",
					overflowX: "scroll",
					height: "1000%",
					width: "100%",
				}}
			>
				{Object.entries(table).map((content) => (
					<table
						key={content[0]}
						className="table table-bordered table-dark"
						style={{
							objectFit: "contain",
						}}
					>
						<thead>
							<tr>
								<th className="fs-5 p-2" scope="col" style={{ whiteSpace: "nowrap" }}>
									{content[0]}
								</th>
								{[...Array(parseInt(generalData.totalPeriods)).keys()].map((day) => (
									<th key={day} className="text-center" scope="col">
										{day + 1}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{content[1].map((day, row) => (
								<tr key={row}>
									<th scope="row">{WEEEKDAYS[row]}</th>
									{day.map((period, col) => {
										if (period === "FREE")
											return (
												<td
													className="p-2"
													key={col}
													style={getCellStyle(COLORS.at(-1).bg, COLORS.at(-1).text)}
												>
													<div className="fs-4 mx-3">{period}</div>
												</td>
											);
										else
											return (
												<td
													className="p-2"
													key={col}
													style={getCellStyle(
														COLORS[colorMap[content[0]][row][col]].bg,
														COLORS[colorMap[content[0]][row][col]].text
													)}
												>
													<div>
														<div className="fs-4 me-4">{period[0]}</div>
														<div className="text-end ms-4" style={{ whiteSpace: "nowrap" }}>
															{period[1]}
														</div>
													</div>
												</td>
											);
									})}
								</tr>
							))}
						</tbody>
					</table>
				))}
			</div>
		</>
	);
}

export default Table;
