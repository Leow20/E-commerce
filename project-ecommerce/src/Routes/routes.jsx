import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
