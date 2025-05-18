import { Link, useNavigate } from "react-router-dom";
// import Logo from "../../assests/images/logo.svg";
import { AuthContext } from "../context/AuthContext";
import { useState, useContext, useRef } from "react";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineLogout, MdAccountBalanceWallet, MdAccountBalance, MdManageAccounts } from "react-icons/md";
const Navbar = () => {
    const brandName = "NexusBank";
    const brandLogo = "Logo";
    const navigate = useNavigate();
    const { auth, logout } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout(); // Implemented actual logout logic: clear token, redirect to login, update auth state
        navigate("/login");
    }

    let welcomeMessage = "";
    if (auth && auth.user) {
        if (auth.user.role === "ADMIN") {
            welcomeMessage = "Welcome admin!";
        } else if (auth.user.role === "CUSTOMER") {
            welcomeMessage = `Welcome ${auth.user.username}!`;
        }
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
            {/* main navigation links */}
            <ul className="navbar-links">
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/transactions"}>Transactions</Link></li>
                <li><Link to={"/beneficiaries"}>Beneficiaries</Link></li>
            </ul>

            {/* User actions */}
            <div className="navbar-user-actions" ref={dropdownRef}>
                {
                    auth?.user ? (
                        <div className="user-profile">
                            <button className="user-profile-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                <div className="user-info">
                                    <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${auth.user.fullName}&fontSize=75&chars=2&size=32&radius=50&backgroundColor=5e35b1,3949ab&backgroundType=gradientLinear&backgroundRotation=0&scale=50&clip=true&textColor=ffffff&fontFamily=Verdana`} alt="Profile" />

                                    <span className="welcome-message">{welcomeMessage} </span>
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="dropdown-menu">
                                    <Link to="/user" className="dropdown-item">
                                        <MdManageAccounts /> My Profile

                                    </Link>
                                    <Link to="/account-details" className="dropdown-item">
                                        <MdAccountBalance /> Account Details
                                    </Link>
                                    <Link to="/transactions" className="dropdown-item">
                                        <MdAccountBalanceWallet /> Transactions
                                    </Link>
                                    <Link to="/beneficiaries" className="dropdown-item">
                                        <FaUsers /> Beneficiaries
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <button onClick={handleLogout} className="dropdown-item logout">
                                        <MdOutlineLogout /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="login-button">Login</Link>
                            <Link to="/register" className="register-button">Register</Link>
                        </div>
                    )
                }



            </div>
        </nav>
    )
}

export default Navbar