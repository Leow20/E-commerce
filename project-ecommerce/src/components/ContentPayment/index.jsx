import React from "react";
import { useMediaQuery } from "react-responsive";

const ContentPayment = ({
	image,
	content,
	select,
	payment,
	classNameImg = "",
	id = "",
	save,
	setSave,
	codePayment,
	setCodePayment,
}) => {
	const isMobile = useMediaQuery({ maxWidth: 820 });
	return (
		<div
			className={
				(!isMobile && content === payment && content === "Apple Gift Card") ||
				(!isMobile && content === payment && content === "Amazon Gift Card") ||
				(!isMobile && content === payment && content === "Paytm") ||
				(!isMobile && content === payment && content === "Phone Pe") ||
				(!isMobile && content === payment && content === "Google Pay")
					? "box-content-type back-active"
					: "box-content-type"
			}
		>
			<div className="box-card-type">
				<div>
					{id ? (
						<div className="box-content-img">
							<img src={image} alt={content} id={id} className={classNameImg} />
						</div>
					) : (
						<img src={image} alt={content} id={id} className={classNameImg} />
					)}

					<h1>{content}</h1>
				</div>
				<div
					className="box-content-ball"
					onClick={() =>
						payment == content ? select("") : select(`${content}`)
					}
				>
					<div className={payment === content ? "active" : ""}></div>
				</div>
			</div>
			{(!isMobile && content === payment && content === "Apple Gift Card") ||
			(!isMobile && content === payment && content === "Amazon Gift Card") ? (
				<div className="content-payment-input">
					<div>
						<input
							type="text"
							name="UPI ID"
							id="upiID"
							placeholder="Enter your Gift Card code"
							value={codePayment}
							onChange={(e) => setCodePayment(e.target.value)}
						/>
						<p>Eg: XXXX-XXXX-XXXX</p>
					</div>
				</div>
			) : null}

			{(!isMobile && content === payment && content === "Paytm") ||
			(!isMobile && content === payment && content === "Phone Pe") ||
			(!isMobile && content === payment && content === "Google Pay") ? (
				<div className="content-payment-input">
					<div>
						<input
							type="text"
							name="UPI ID"
							id="upiID"
							placeholder="Enter your UPI Id"
							value={codePayment}
							onChange={(e) => {
								setCodePayment(e.target.value);
							}}
						/>
						<p>Eg: 1234567890@ybl</p>
					</div>
					<div>
						<input
							type="checkbox"
							name="Save transactions"
							id="checkboxID"
							onChange={() => setSave(!save)}
						/>
						<label htmlFor="checkboxID">
							Save this for future transactions
						</label>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default ContentPayment;
