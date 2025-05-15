import { Link } from "react-router-dom";
// import Logo from "../../assests/images/logo.svg";

const Navbar = () => {
    const brandName = "NexusBank";
    const brandLogo = "Logo";

    const handleLogout = () => {
        console.log("logout action triggered");
        // Implement actual logout logic: clear token, redirect to login, update auth state
        // For ex. navigate("/login"); // use useNavigate() hook  
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to={"/"} className="navbar-logo-link" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                    {brandLogo}
                    {/* <img src={brandLogo} alt="NexusBank-Logo" style={{height: "40px"}} /> */}
                    {/* use logo image  */}
                </Link>
                <Link to={"/"} className="navbar-brand-name" >
                    {brandName}
                </Link>
            </div>
            <ul>
                <li><Link to={"/"}>Dashboard</Link></li>
                <li><Link to={"/transactions"}>Transactions</Link></li>
                <li><Link to={"/beneficiaries"}>Beneficiaries</Link></li>
            </ul>

            <div className="navbar-user-actions">
                <span className="navbar-welcome-message">Welcome User! {/*add user's default image */}</span>
                {/* dropdown for user profile actions */}
                <button onClick={handleLogout} className="navbar-logout-button">Logout</button>
            </div>
        </nav>
    )
}

export default Navbar