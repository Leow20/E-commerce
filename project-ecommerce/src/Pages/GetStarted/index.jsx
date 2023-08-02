import "./getStarted.css";
import { useNavigate, Link } from "react-router-dom"

const GetStarted = () => {
    const navigate = useNavigate()
    return (
        <div className="container-get-started">
            <div className="box-get-started">
                <h3>The shopping destination you need</h3>

                <button className="button-get" onClick={() => navigate("/signup")}>Get Started</button>

                <p>I already have an <Link to="/login">account</Link></p>
            </div>

        </div>
    );
};

export default GetStarted;