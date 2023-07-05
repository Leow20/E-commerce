import "./header.css";

function Header() {
    return (
        <header className="Header">
            <div className="logo-header">
                <span>CORA'L</span>
            </div>
            <nav className="nav-category-header">
                <ul>
                    <li><a href="#">Handbags</a></li>
                    <li><a href="#">Watches</a></li>
                    <li><a href="#">Skincare</a></li>
                    <li><a href="#">Jewellery</a></li>
                    <li><a href="#">Apparels</a></li>
                </ul>
            </nav>
            <div className="search-bar-header">
                <input type="text" placeholder="Search for products or brands....." />

            </div>
            <div className="icons">

            </div>
        </header>
    );
}

export default Header;