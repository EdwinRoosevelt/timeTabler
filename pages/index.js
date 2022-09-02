import Head from "next/head";
import Image from "next/image";
import MainPage from "../components/MainPage";
import Modal from "../components/Modal";
import ER from "../public/ER.png";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Timetabler</title>
				<meta charSet="UTF-8"></meta>
				<meta
					name="description"
					content="Create easy, free, colorful timetables for all the classes, teachers and the entire school in minutes."
				/>
				<meta name="keywords" content="easy, free, plot time tables"></meta>
				<meta name="author" content="Edwin Roosevelt"></meta>
				<link rel="icon" href="/T1.png" />
			</Head>

			<MainPage />

			<footer style={{ marginTop: "50px" }}>
				<div className="container text-center ">
					<hr></hr>
					<div className="d-flex gap-2 justify-content-center align-items-center">
						<span style={{ fontSize: "1rem" }}>Made by</span>
						<Image src={ER} width="30px" height="30px" />
						<a
							href="https://www.edwinroosevelt.com"
							target="_blank"
							rel="noreferrer"
							style={{ fontSize: "1rem" }}
						>
							Edwin Roosevelt
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
