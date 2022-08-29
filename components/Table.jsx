import React from "react";

const WEEEKDAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

function Table({ heading, table, generalData }) {
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
						id={`table-${content[0]}`}
						key={content[0]}
						className="table table-bordered bg-light"
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
							{content[1].map((day, index) => (
								<tr key={index}>
									<th scope="row">{WEEEKDAYS[index]}</th>
									{day.map((period, index) => (
										<td className="p-2" key={index}>
											{period === "FREE" && <div className="fs-4 mx-3">{period}</div>}
											{period !== "FREE" && (
												<div>
													<div className="fs-4 me-4">{period[0]}</div>
													<div className="text-end ms-4" style={{ whiteSpace: "nowrap" }}>
														{period[1]}
													</div>
												</div>
											)}
										</td>
									))}
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
