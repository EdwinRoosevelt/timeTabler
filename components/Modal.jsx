import React, { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Table from "./Table";

const doc = new jsPDF({
	orientation: "landscape",
	putOnlyUsedFonts: true,
});

import { COLORS } from "../logic/data";

const WEEEKDAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

const TABLEOPTIONS = [
	{ id: 0, name: "Teacher", isEnabled: true },
	{ id: 1, name: "Teacher [combined]", isEnabled: false },
	{ id: 2, name: "Class", isEnabled: true },
	{ id: 3, name: "Class [combined]", isEnabled: false },
];

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
		height: "80%",
		padding: "2rem",
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
		className="bi bi-filetype-pdf"
		viewBox="0 0 16 16"
	>
		<path
			fillRule="evenodd"
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
		className="bi bi-backspace-fill"
		viewBox="0 0 16 16"
	>
		<path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z" />
	</svg>
);

function Modal({ show, closeModal, table, generalData }) {
	const [tableOptions, setTableOptions] = useState(TABLEOPTIONS[0].id);

	const goBack = () => {
		const response = window.confirm("You will lose the data. Are you sue?");
		if (response) closeModal();
	};

	const handlePrint = () => {
		if (!table) return;
		// Heading
		doc.setFont("helvetica", "", "bold");
		doc.setFontSize(75);
		doc.text("TimeTabler", 25, 100);
		// Line 2
		doc.setFontSize(20);
		doc.setFont("helvetica", "italic", "normal");
		doc.text("2 minutes time tables", 25, 110);

		// courtesy
		doc.setFontSize(10);
		doc.text("Project by Edwin Roosevelt", 230, 200);
		doc.addPage();

		// Table pages
		doc.setFontSize(25);
		doc.setFont("courier", "", "normal");

		Object.entries(table).map((tableCategory) => {
			Object.entries(table[tableCategory[0]]).map((content) => {
				doc.text(`${tableCategory[0].toUpperCase()} - ${content[0]}`, 20, 40);
				// setting head
				const tableHead = Array(parseInt(generalData.totalPeriods) + 1).fill(0);
				tableHead[0] = "";
				[...Array(parseInt(generalData.totalPeriods)).keys()].map(
					(day) => (tableHead[day + 1] = day + 1)
				);

				// setting body
				const tableBody = Array.from(
					{ length: parseInt(generalData.totalDays) },
					() => Array(parseInt(generalData.totalPeriods) + 1).fill(0)
				);
				content[1].map((day, index1) => {
					tableBody[index1][0] = WEEEKDAYS[index1];

					day.map((period, index2) => {
						if (period === "FREE") tableBody[index1][index2 + 1] = "FREE";
						else tableBody[index1][index2 + 1] = `${period[0]}\n\n${period[1]}`;
					});
				});

				autoTable(doc, {
					theme: "grid",
					styles: {
						halign: "center",
						valign: "middle",
						fontSize: 13,
						font: "courier",
						cellPadding: 3,
						overflow: "ellipsize",
					},
					margin: { top: 50 },
					head: [tableHead],
					body: tableBody,
				});
				doc.addPage();
			});
		});
		doc.deletePage();

		doc.save("timeTabler1.pdf");
	};

	return (
		<>
			{show && (
				<div style={style.modal}>
					<div
						// className="bg-primary"
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							width: "80%",
							position: "relative",
							marginBottom: "1rem",
							color: "black",
						}}
					>
						<button className="btn bg-light" onClick={goBack}>
							{backIcon} Back to Main page
						</button>
						<button className="btn btn-outline-dark px-3" onClick={handlePrint}>
							{pdfIcon} Download
						</button>
					</div>
					<div className="container bg-secondary" style={style.container}>
						<div
							className="d-flex justify-content-center gap-3 p-3 flex-wrap"
							style={{ marginBottom: "auto" }}
						>
							{TABLEOPTIONS.map((option) => (
								<button
									key={option.id}
									className={`btn btn-outline-warning ${
										tableOptions === option.id && "active"
									}`}
									disabled={!option.isEnabled}
									onClick={() => setTableOptions(TABLEOPTIONS[option.id].id)}
								>
									{option.name}
								</button>
							))}
						</div>

						{!table && (
							<div
								style={{ textAlign: "center", width: "100%", marginBottom: "auto" }}
							>
								Loading...
							</div>
						)}

						{table && tableOptions === 0 && (
							<Table
								table={table.teacherTable}
								generalData={generalData}
								heading="Teacher's table"
								colorMap={table.colorMap}
							/>
						)}
						{table && tableOptions === 2 && (
							<Table
								table={table.classTable}
								generalData={generalData}
								heading="Class's table"
								colorMap={table.colorMap}
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
}

export default Modal;
