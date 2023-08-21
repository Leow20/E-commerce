import "./loading.css";

import React from "react";

const Loading = ({ page }) => {
	return (
		<div className={page === "modal" ? `loading-modal` : `loading-container`}>
			<div className="loader"></div>
		</div>
	);
};

export default Loading;
