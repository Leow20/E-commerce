import React from "react";
import "./referEarn.css";
import imgRefer from "../../assets/imgReferEarn.png";
import { useMediaQuery } from "react-responsive";

const ReferAndEarn = () => {
    const isMobile = useMediaQuery({ maxWidth: 820 });
    return (
        <>
            {!isMobile && (<h1 className="refer-h1">My Refer and Earn</h1>)}
            <div className="container-refer">
                {!isMobile && (<hr />)}
                <div className="image-Refer">
                    <img src={imgRefer} alt="imgRefer" />
                </div>
                <div className="text-one">
                    <p>Invite your friend and earn $20 on every invite</p>
                </div>
                <div className="input-code">
                    <input type="text" id="code-text" />
                </div>
                <div className="text-two">
                    <p>Tap to copy the code.</p>
                </div>
                <div className="text-three">
                    <p>How does this works?</p>
                </div>
                <div className="box-text">
                    <ul>
                        <li>Invite your friends to CORAL</li>
                        <li>Ask your friends to place their order with your code & get $20 discount</li>
                        <li>Once the order gets delivered you get the discount as well.</li>
                    </ul>
                </div>
                <button className="button-invite">Inivite now</button>

            </div>
        </>
    );

};

export default ReferAndEarn;