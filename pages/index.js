import Head from "next/head";
import Image from "next/image";
import MainPage from "../components/MainPage";
import Modal from "../components/Modal";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Timetabler</title>
				<meta charset="UTF-8"></meta>
				<meta
					name="description"
					content="Create easy, free, colorful timetables for all the classes, teachers and the entire school in minutes."
				/>
				<meta name="keywords" content="easy, free, plot time tables"></meta>
				<meta name="author" content="Edwin Roosevelt"></meta>
				<link rel="icon" href="/T-logo2.png" />
			</Head>

			<MainPage />

			<footer style={{ marginTop: "50px" }}>
				<div className="container text-center">
					<hr></hr>
					<p>
						Made by{" "}
						<a href="https://www.edwinroosevelt.com" target="_blank" rel="noreferrer">
							Edwin Roosevelt
						</a>
					</p>
				</div>
			</footer>
		</div>
	);
}
