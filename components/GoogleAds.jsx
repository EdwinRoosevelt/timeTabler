import React, { Component } from "react";

class GoogleAds extends Component {
	componentDidMount() {}

	render() {
		return (
			<ins
				className="adsbygoogle"
				style={{ display: "block" }}
				data-ad-client="ca-ca-pub-2846658205429325"
				// data-ad-slot={this.props.slot}
				data-ad-format="auto"
				data-full-width-responsive="true"
			></ins>
		);
	}
}

export default GoogleAds;
