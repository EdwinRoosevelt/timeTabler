import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap"
					rel="stylesheet"
				></link>
				<script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2846658205429325"
					crossOrigin="anonymous"
				></script>
			</Head>
			<body>
				<Main />
				<NextScript />
				{/* <script>(window.adsbygoogle = window.adsbygoogle || []).push({});</script>

				<script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2846658205429325"
					crossOrigin="anonymous"
				></script> */}
			</body>
		</Html>
	);
}
