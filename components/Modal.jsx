import React, { useState } from "react";

const WEEEKDAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

const TABLEOPTIONS = ["teacher", "class"];

const style = {
	modal: {
		width: "100%",
		height: "100vh",
		position: "fixed",
		zIndex: "10",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		background: "rgba(255, 255, 255, 0.8)",
	},
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "start",
		color: "white",
		height: "60%",
		padding: "1rem",
	},
	btnGrp: {
		size: "0.5rem",
	},
};

const pdfIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		fill="currentColor"
		class="bi bi-filetype-pdf"
		viewBox="0 0 16 16"
	>
		<path
			fill-rule="evenodd"
			d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"
		/>
	</svg>
);

const backIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		fill="currentColor"
		class="bi bi-backspace-fill"
		viewBox="0 0 16 16"
	>
		<path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z" />
	</svg>
);

function Modal({ show, closeModal, table, generalData }) {
	const [tableOptions, setTableOptions] = useState(TABLEOPTIONS[0]);

	const goBack = () => {
		const response = window.confirm("You will lose the data. Are you sue?");
		if (response) closeModal();
	};

	return (
		<>
			{show && (
				<div style={style.modal}>
					<div className="container bg-dark" style={style.container}>
						<div
							// className="bg-primary"
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								width: "100%",
								position: "relative",
								top: "-4rem",
								color: "black",
							}}
						>
							<button className="btn" onClick={goBack}>
								{backIcon} Back to Main page
							</button>
							<button className="btn btn-outline-dark px-3">{pdfIcon} Download</button>
						</div>

						<div className="d-flex justify-content-center gap-3 p-3 flex-wrap">
							<button
								className="btn btn-outline-warning active"
								onClick={() => setTableOptions(TABLEOPTIONS[0])}
							>
								Teachers Table
							</button>
							<button
								className="btn btn-outline-warning"
								onClick={() => setTableOptions(TABLEOPTIONS[1])}
							>
								Class Table
							</button>
							<button className="btn btn-outline-warning disabled">
								Teachers - combined
							</button>
							<button className="btn btn-outline-warning disabled">
								Class - combined
							</button>
						</div>

						{tableOptions === "teacher" && (
							<>
								<h1 className="fs-2 p-3">Teacher&apos;s table</h1>
								<div
									className="p-2"
									style={{
										overflowY: "scroll",
										overflowX: "scroll",
										// overflow: "hidden",
										height: "500px",
										// display: "table",
										width: "100%",
									}}
								>
									{Object.entries(table.teacherTable).map((teacher) => (
										<table
											key={teacher[0]}
											className="table table-bordered bg-light"
											style={{
												objectFit: "contain",
											}}
										>
											<thead>
												<tr>
													<th
														className="fs-5 p-2"
														scope="col"
														style={{ whiteSpace: "nowrap" }}
													>
														{teacher[0]}
													</th>
													{[...Array(parseInt(generalData.totalPeriods)).keys()].map(
														(day) => (
															<th key={day} className="text-center" scope="col">
																{day + 1}
															</th>
														)
													)}
												</tr>
											</thead>
											<tbody>
												{teacher[1].map((day, index) => (
													<tr key={index}>
														<th scope="row">{WEEEKDAYS[index]}</th>
														{day.map((period, index) => (
															<td className="p-2" key={index}>
																{period === "FREE" && <div className="fs-4 mx-3">{period}</div>}
																{period !== "FREE" && (
																	<div>
																		<div className="fs-4 me-4">{period[0]}</div>
																		<div
																			className="text-end ms-4"
																			style={{ whiteSpace: "nowrap" }}
																		>
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
						)}
						{tableOptions === "class" && (
							<>
								<h1 className="fs-2 p-3">Class&apos;s table</h1>
								<div
									className="p-2"
									style={{
										overflowY: "scroll",
										overflowX: "scroll",
										// overflow: "hidden",
										height: "500px",
										// display: "table",
										width: "100%",
									}}
								>
									{Object.entries(table.classTable).map((classId) => (
										<table key={classId} className="table table-bordered bg-light">
											<thead>
												<tr>
													<th className="fs-5 p-2" scope="col">
														{classId[0]}
													</th>
													{[...Array(parseInt(generalData.totalPeriods)).keys()].map(
														(day) => (
															<th key={day} className="text-center" scope="col">
																{day + 1}
															</th>
														)
													)}
												</tr>
											</thead>
											<tbody>
												{classId[1].map((day, index) => (
													<tr key={index}>
														<th scope="row">{WEEEKDAYS[index]}</th>
														{day.map((period, index) => (
															<td className="p-2" key={index}>
																{period === "FREE" && <div className="fs-4 mx-3">{period}</div>}
																{period !== "FREE" && (
																	<div>
																		<div className="fs-4 me-4">{period[0]}</div>
																		<div
																			className="text-end ms-4"
																			style={{ whiteSpace: "nowrap" }}
																		>
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
						)}
					</div>
				</div>
			)}
		</>
	);
}

export default Modal;
