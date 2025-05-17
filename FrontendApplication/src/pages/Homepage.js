import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";


const Homepage = () => {
	const { auth } = useContext(AuthContext);
	const navigate = useNavigate();
	const formatBalance = (balance) => {
		return balance ? `${parseFloat(balance).toFixed(2)}` : '0.00';
	};

	const handleAction = (path) => {
		if (!auth || !auth.token) {
			// If not logged in, redirect to login
			navigate('/login');
			return;
		}
		// If logged in, navigate to the requested path
		navigate(path);
	};

	return (
		<div className="homepage-content">
			<h1>Welcome to NexusBank E-Banking</h1>
			<h3>Manage your finances with ease and security.</h3>

			<section className="dashboard-overview">
				<h2>Ouick Overview</h2>
				<div className="widgets-container">
					<div className="widget">
						<h3>Account Balance</h3>
						<p className="balance-amount">&#8377; {formatBalance(auth?.user?.availableBalance)}</p> {/* Replace with actual balance */}
						<button onClick={() => handleAction('/user')}>View Details</button>
					</div>
					<div className="widget">
						<h3>Recent Transactions</h3>
						<p className="balance-amount">No Recent Transactions</p> {/* Replace with actual balance */}
						<button onClick={() => handleAction('/transactions')}>View All Transactions</button>
					</div>
					<div className="widget">
						<h3>Quick Actions</h3>
						<ul className="qustions-actions-list">
							<li><button onClick={() => handleAction('/transactions')}>Make a Transfer</button></li>
							<li><button onClick={() => handleAction('/beneficiaries')}>Add Beneficiary</button></li>
							<li><button onClick={() => handleAction('/user')}>Open a Savings Account</button></li>
						</ul>
					</div>
				</div>
			</section>
			<section className="about-nexusbank">
				<h2>About NexusBank</h2>
				<p>NexusBank is a secure and user-friendly e-banking platform designed to help you manage your finances effectively, anytime, anywhere.</p>
				<p>
					Our platform is built on cutting-edge technology with a strong focus on
					security and customer data protection. We offer a comprehensive suite of
					services, including seamless fund transfers, easy beneficiary management,
					and detailed transaction histories.
				</p>
				<p>
					Our mission is to be your trusted financial partner, helping you achieve
					your financial goals with confidence.
				</p>
			</section>
		</div>
	)
}

export default Homepage