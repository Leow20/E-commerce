import "./loading.css";

import React from "react";

const Loading = ({ page, animation }) => {
	return (
		<div
			className={
				page === "modal"
					? `loading-modal ${animation}`
					: `loading-container ${animation}`
			}
		>
			<div className="loader"></div>
		</div>
	);
};

export default Loading;
