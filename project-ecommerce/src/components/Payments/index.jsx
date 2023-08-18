import React, { useState } from "react";

//Style
import "./payments.css";

//React Responsive
import { useMediaQuery } from "react-responsive";

//Component
import ContentPayment from "../ContentPayment";

//icons
import GooglePay from "../../assets/icons/google-pay.svg";
import PhonePe from "../../assets/icons/phone-pe.svg";
import Paytm from "../../assets/icons/paytm.svg";
import ApplePay from "../../assets/icons/apple-pay.png";
import AmazonPay from "../../assets/icons/amazon-pay.svg";
import UPI from "../../assets/icons/UPI.svg";
import Card from "../../assets/icons/Card.svg";

const Payments = ({
	content,
	setContent,
	payment,
	setPayment,
	save,
	setSave,
	codePayment,
	setCodePayment,
}) => {
	const isMobile = useMediaQuery({ maxWidth: 820 });

	if (isMobile) {
		return (
			<div className="container-payments">
				<div className="box-payment">
					<div
						className={
							content === "Debit Card/Credit Card"
								? "box-text-payment back-active-mob"
								: "box-text-payment"
						}
					>
						<h1>Debit Card/Credit Card</h1>
						<button
							onClick={() =>
								content === "Debit Card/Credit Card"
									? setContent("")
									: setContent("Debit Card/Credit Card")
							}
						>
							{content == "Debit Card/Credit Card" ? "-" : "+"}
						</button>
					</div>

					{content === "Debit Card/Credit Card" ? (
						<>
							<div className="content-payment">
								<ContentPayment
									image={
										"https://cdn.icon-icons.com/icons2/2341/PNG/512/visa_payment_method_card_icon_142729.png"
									}
									content={"VISA"}
									select={setPayment}
									classNameImg={"credit"}
									payment={payment}
									codePayment={codePayment}
									setCodePayment={setCodePayment}
								/>
								<ContentPayment
									image={
										"https://w7.pngwing.com/pngs/92/785/png-transparent-mastercard-logo-mastercard-credit-card-payment-visa-nyse-ma-mastercard-logo-text-logo-sign.png"
									}
									content={"MASTERCARD"}
									classNameImg={"credit"}
									select={setPayment}
									payment={payment}
								/>
								<ContentPayment
									image={
										"https://cdn.icon-icons.com/icons2/2341/PNG/512/elo_payment_method_card_icon_142740.png"
									}
									content={"ELO"}
									classNameImg={"credit"}
									select={setPayment}
									payment={payment}
									codePayment={codePayment}
									setCodePayment={setCodePayment}
								/>
							</div>
						</>
					) : null}
				</div>
				<div className="box-payment">
					<div
						className={
							content === "UPI"
								? "box-text-payment back-active-mob"
								: "box-text-payment"
						}
					>
						<h1>UPI</h1>
						<button
							onClick={() =>
								content === "UPI" ? setContent("") : setContent("UPI")
							}
						>
							{content == "UPI" ? "-" : "+"}
						</button>
					</div>

					{content === "UPI" ? (
						<>
							<div className="content-payment">
								<ContentPayment
									image={GooglePay}
									content={"Google Pay"}
									select={setPayment}
									payment={payment}
									id={GooglePay}
									codePayment={codePayment}
									setCodePayment={setCodePayment}
								/>
								<ContentPayment
									image={PhonePe}
									content={"Phone Pe"}
									select={setPayment}
									payment={payment}
									classNameImg="upi"
									codePayment={codePayment}
									setCodePayment={setCodePayment}
								/>
								<ContentPayment
									image={Paytm}
									content={"Paytm"}
									select={setPayment}
									payment={payment}
									classNameImg="upi"
									codePayment={codePayment}
									setCodePayment={setCodePayment}
								/>
							</div>
							{payment === "Paytm" ||
							payment === "Phone Pe" ||
							payment === "Google Pay" ? (
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
						</>
					) : null}
				</div>
				<div className="box-payment">
					<div
						className={
							content === "Apple Pay"
								? "box-text-payment back-active-mob"
								: "box-text-payment"
						}
					>
						<h1>Apple Pay</h1>
						<button
							onClick={() =>
								content === "Apple Pay"
									? setContent("")
									: setContent("Apple Pay")
							}
						>
							{content == "Apple Pay" ? "-" : "+"}
						</button>
					</div>

					{content === "Apple Pay" ? (
						<>
							<div className="content-payment">
								<ContentPayment
									image={ApplePay}
									content={"Apple Gift Card"}
									select={setPayment}
									classNameImg={"apple"}
									payment={payment}
									codePayment={codePayment}
									setCodePayment={setCodePayment}
								/>
								<ContentPayment
									image={ApplePay}
									content={"Apple Account"}
									select={setPayment}
									payment={payment}
									classNameImg={"apple"}
									codePayment={codePayment}
									setCodePayment={setCodePayment}
								/>
							</div>
							{payment === "Apple Gift Card" ? (
								<div className="content-payment-input">
									<div>
										<input
											type="text"
											name="UPI ID"
											id="upiID"
											placeholder="Enter your Gift Card code"
											value={codePayment}
											onChange={(e) => {
												setCodePayment(e.target.value);
											}}
										/>
										<p>Eg: XXXX-XXXX-XXXX</p>
									</div>
								</div>
							) : null}
						</>
					) : null}
				</div>
				<div className="box-payment">
					<div
						className={
							content === "Amazon Pay"
								? "box-text-payment back-active-mob"
								: "box-text-payment"
						}
					>
						<h1>Amazon Pay</h1>
						<button
							onClick={() =>
								content === "Amazon Pay"
									? setContent("")
									: setContent("Amazon Pay")
							}
						>
							{content == "Amazon Pay" ? "-" : "+"}
						</button>
					</div>

					{content === "Amazon Pay" ? (
						<>
							<div className="content-payment">
								<ContentPayment
									image={AmazonPay}
									content={"Amazon Gift Card"}
									select={setPayment}
									classNameImg={"credit"}
									payment={payment}
									codePayment={codePayment}
									setCodePayment={setCodePayment}
								/>
								<ContentPayment
									image={AmazonPay}
									content={"Amazon Account"}
									classNameImg={"credit"}
									payment={payment}
									select={setPayment}
									codePayment={codePayment}
									setCodePayment={setCodePayment}
								/>
							</div>
							{payment === "Amazon Gift Card" ? (
								<div className="content-payment-input">
									<div>
										<input
											type="text"
											name="UPI ID"
											id="upiID"
											placeholder="Enter your Gift Card code"
											value={codePayment}
											onChange={(e) => {
												setCodePayment(e.target.value);
											}}
										/>
										<p>Eg: XXXX-XXXX-XXXX</p>
									</div>
								</div>
							) : null}
						</>
					) : null}
				</div>
			</div>
		);
	} else {
		return (
			<div className="container-payments">
				<div className="box-payment">
					<div
						className={
							content === "UPI" ? "card-payment back-active" : "card-payment"
						}
						onClick={() =>
							content === "UPI" ? setContent("") : setContent("UPI")
						}
					>
						<div className="box-content-ball-card">
							<div className={content === "UPI" ? "active" : ""}></div>
						</div>
						<img src={UPI} alt="" />
						<h1>UPI</h1>
					</div>

					<div
						className={
							content === "Credit/Debit Card"
								? "card-payment back-active"
								: "card-payment"
						}
						onClick={() =>
							content === "Credit/Debit Card"
								? setContent("")
								: setContent("Credit/Debit Card")
						}
					>
						<div className="box-content-ball-card">
							<div
								className={content === "Credit/Debit Card" ? "active" : ""}
							></div>
						</div>
						<img src={Card} alt="" />
						<h1>Credit/Debit Card</h1>
					</div>

					<div
						className={
							content === "Apple Pay"
								? "card-payment back-active"
								: "card-payment"
						}
						onClick={() =>
							content === "Apple Pay" ? setContent("") : setContent("Apple Pay")
						}
					>
						<div className="box-content-ball-card">
							<div className={content === "Apple Pay" ? "active" : ""}></div>
						</div>
						<img src={ApplePay} alt="" />
						<h1>Apple Pay</h1>
					</div>

					<div
						className={
							content === "Amazon Pay"
								? "card-payment back-active"
								: "card-payment"
						}
						onClick={() =>
							content === "Amazon Pay"
								? setContent("")
								: setContent("Amazon Pay")
						}
					>
						<div className="box-content-ball-card">
							<div className={content === "Amazon Pay" ? "active" : ""}></div>
						</div>
						<img src={AmazonPay} alt="" />
						<h1>Amazom Pay</h1>
					</div>
				</div>

				{content === "Credit/Debit Card" ? (
					<>
						<div className="content-payment">
							<ContentPayment
								image={
									"https://cdn.icon-icons.com/icons2/2341/PNG/512/visa_payment_method_card_icon_142729.png"
								}
								content={"VISA"}
								select={setPayment}
								classNameImg={"credit"}
								payment={payment}
								codePayment={codePayment}
								setCodePayment={setCodePayment}
							/>
							<ContentPayment
								image={
									"https://w7.pngwing.com/pngs/92/785/png-transparent-mastercard-logo-mastercard-credit-card-payment-visa-nyse-ma-mastercard-logo-text-logo-sign.png"
								}
								content={"MASTERCARD"}
								classNameImg={"credit"}
								select={setPayment}
								payment={payment}
								codePayment={codePayment}
								setCodePayment={setCodePayment}
							/>
							<ContentPayment
								image={
									"https://cdn.icon-icons.com/icons2/2341/PNG/512/elo_payment_method_card_icon_142740.png"
								}
								content={"ELO"}
								classNameImg={"credit"}
								select={setPayment}
								payment={payment}
								codePayment={codePayment}
								setCodePayment={setCodePayment}
							/>
						</div>
					</>
				) : null}
				{content === "UPI" ? (
					<>
						<div className="content-payment">
							<ContentPayment
								image={GooglePay}
								content={"Google Pay"}
								select={setPayment}
								payment={payment}
								id={GooglePay}
								save={save}
								setSave={setSave}
								codePayment={codePayment}
								setCodePayment={setCodePayment}
							/>

							<ContentPayment
								image={PhonePe}
								content={"Phone Pe"}
								select={setPayment}
								payment={payment}
								classNameImg="upi"
								save={save}
								setSave={setSave}
								codePayment={codePayment}
								setCodePayment={setCodePayment}
							/>

							<ContentPayment
								image={Paytm}
								content={"Paytm"}
								select={setPayment}
								payment={payment}
								classNameImg="upi"
								save={save}
								setSave={setSave}
								codePayment={codePayment}
								setCodePayment={setCodePayment}
							/>
						</div>
					</>
				) : null}
				{content === "Apple Pay" ? (
					<>
						<div className="content-payment">
							<ContentPayment
								image={ApplePay}
								content={"Apple Gift Card"}
								select={setPayment}
								classNameImg={"apple"}
								payment={payment}
							/>
							<ContentPayment
								image={ApplePay}
								content={"Apple Account"}
								select={setPayment}
								payment={payment}
								classNameImg={"apple"}
							/>
						</div>
					</>
				) : null}
				{content === "Amazon Pay" ? (
					<>
						<div className="content-payment">
							<ContentPayment
								image={AmazonPay}
								content={"Amazon Gift Card"}
								select={setPayment}
								classNameImg={"apple"}
								payment={payment}
								codePayment={codePayment}
								setCodePayment={setCodePayment}
							/>

							<ContentPayment
								image={AmazonPay}
								content={"Amazon Account"}
								classNameImg={"apple"}
								payment={payment}
								select={setPayment}
								codePayment={codePayment}
								setCodePayment={setCodePayment}
							/>
						</div>
					</>
				) : null}
			</div>
		);
	}
};

export default Payments;
