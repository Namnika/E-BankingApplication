import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import maskAccountNumber from '../components/MaskAccountNumber';

const AccountDetailsPage = () => {
    const { auth } = useContext(AuthContext);

    return (
        <div className="account-details-container">
            <div className="account-header">
                <h1>Account Details</h1>
            </div>

            <div className="account-content">
                <section className="account-summary">
                    <h2>Account Summary</h2>
                    <div className="summary-cards">
                        <div className="summary-card">
                            <h3>Available Balance</h3>
                            <p className="balance">₹ {auth.user.availableBalance}</p>
                        </div>
                        <div className="summary-card">
                            <h3>Account Number</h3>
                            <p>{maskAccountNumber(auth.user.accountNumber)}</p>
                        </div>
                        <div className="summary-card">
                            <h3>Account Type</h3>
                            <p>{auth.user.role}</p>
                        </div>
                    </div>
                </section>


                <section className="account-features">
                    <h2>Account Features</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <label>Interest Rate</label>
                            <p>3.5% p.a.</p>
                        </div>
                        <div className="feature-item">
                            <label>Minimum Balance</label>
                            <p>₹ 1,000</p>
                        </div>
                        <div className="feature-item">
                            <label>Account Opening Date</label>
                            <p>{auth.user.createdAt}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};


export default AccountDetailsPage;