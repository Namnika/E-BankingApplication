import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

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
                            <p>{auth.user.accountNumber}</p>
                        </div>
                        <div className="summary-card">
                            <h3>Account Type</h3>
                            <p>{auth.user.role}</p>
                        </div>
                    </div>
                </section>

                <section className="recent-transactions">
                    <h2>Recent Transactions</h2>
                    <div className="transactions-list">
                        {auth.user.recentTransactions?.map(transaction => (
                            <div key={transaction.id} className="transaction-item">
                                <div className="transaction-info">
                                    <p className="transaction-type">{transaction.role}</p>
                                    <p className="transaction-date">{transaction.transactionDate}</p>
                                </div>
                                <p className="transaction-amount">₹ {transaction.amount}</p>
                            </div>
                        ))}
                    </div>
                    <button>View All Transactions</button>
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