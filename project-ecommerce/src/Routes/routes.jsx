import { Routes, Route, BrowserRouter } from "react-router-dom";
import About from "../Pages/About";
import Home from "../Pages/Home";
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
