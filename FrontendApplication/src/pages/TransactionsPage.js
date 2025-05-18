// TransactionsPage.js

import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import TransferForm from '../components/TransferForm';
import DepositForm from '../components/DepositForm';
import WithdrawForm from '../components/WithdrawForm';
import maskAccountNumber from '../components/MaskAccountNumber';
const Transactions = () => {
	const { auth } = useContext(AuthContext);
	const [transactions, setTransactions] = useState([]);
	const [filteredTransactions, setFilteredTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const isAdmin = auth.user.role === 'ADMIN';

	const [filters, setFilters] = useState({
		status: 'ALL',
		amount: '',
		startDate: '',
		endDate: ''
	});


	const [showForm, setShowForm] = useState(null); // 'transfer', 'deposit', 'withdraw', or null

	const renderForm = () => {
		switch (showForm) {
			case 'transfer':
				return <TransferForm />;
			case 'deposit':
				return <DepositForm />;
			case 'withdraw':
				return <WithdrawForm />;
			default:
				return null;
		}
	};


	// Fetch latest transactions 
	useEffect(() => {



		// Only fetch if we have the user ID
		if (auth?.user?.id) {
			fetchTransactions();
		}

	}, [auth?.user?.id, auth?.token]);

	const fetchTransactions = async () => {
		try {
			let response;
			if (isAdmin) {
				// Admin can see all transactions
				response = await axios.get('/transactions', {
					headers: { Authorization: `Bearer ${auth.token}` }
				});
			} else {
				// Regular users can only see their transactions
				response = await axios.get(
					`http://localhost:8080/transactions/users/${auth.user.id}/latest`, // all transactions routes are protected
					// error console cors (not acces due to id not match)                user.id == senderId, 2 == 2
					{
						headers: {
							'Authorization': `Bearer ${auth.token}`,
							'Content-Type': 'application/json'
						},
						withCredentials: true
					}

				)
			}

			console.log('Transactions response:', response.data);
			setTransactions(response.data);
			setFilteredTransactions(response.data);
		} catch (err) {
			console.error('Error fetching transactions:', err);
			setError('Failed to fetch transactions');
		} finally {
			setLoading(false);
		}
	};

	// Filter transactions
	const handleFilter = async () => {
		try {
			let response;

			// Handle status filter
			if (filters.status !== 'ALL') {
				response = await axios.get(
					`http://localhost:8080/transactions/status/${filters.status}`,
					{
						headers: {
							'Authorization': `Bearer ${auth.token}`,
							'Content-Type': 'application/json'
						},
						withCredentials: true
					}
				);
				// Check if response data is empty
				if (!response.data || response.data.length === 0) {
					setError(`No ${filters.status.toLowerCase()} transactions found`);
					setFilteredTransactions([]); // Clear the transactions list
					return; // Exit the function
				}

			}
			// Handle amount filter
			else if (filters.amount) {
				response = await axios.get(
					`http://localhost:8080/transactions/amount?amount=${filters.amount}`,
					{
						headers: {
							'Authorization': `Bearer ${auth.token}`,
							'Content-Type': 'application/json'
						},
						withCredentials: true
					}
				);

				if (!response.data || response.data.length === 0) {
					setError(`No transactions found above ₹${filters.amount}`);
					setFilteredTransactions([]);
					return;
				}
			}

			// Handle date range filter
			else if (filters.startDate || filters.endDate) {
				const params = new URLSearchParams();
				if (filters.startDate) {
					const startDate = new Date(filters.startDate);
					params.append('startDate', startDate.toISOString());
				}
				if (filters.endDate) {
					const endDate = new Date(filters.endDate);
					endDate.setHours(23, 59, 59, 999);
					params.append('endDate', endDate.toISOString());
				}

				response = await axios.get(
					`http://localhost:8080/transactions/sender/${auth.user.id}?${params.toString()}`,
					{
						headers: {
							'Authorization': `Bearer ${auth.token}`,
							'Content-Type': 'application/json'
						},
						withCredentials: true
					}
				);

				if (!response.data || response.data.length === 0) {
					setError('No transactions found for the selected date range');
					setFilteredTransactions([]);
					return;
				}
			}
			// If no filters are applied, fetch latest transactions
			else {
				response = await axios.get(
					`http://localhost:8080/transactions/users/${auth.user.id}/latest`,
					{
						headers: {
							'Authorization': `Bearer ${auth.token}`,
							'Content-Type': 'application/json'
						},
						withCredentials: true
					}
				);

				if (!response.data || response.data.length === 0) {
					setError('No transactions found');
					setFilteredTransactions([]);
					return;
				}
			}

			console.log('Filter response:', response.data);

			// If we have data, clear any previous errors and update the transactions
			setError(null);
			setFilteredTransactions(response.data);


		} catch (err) {
			console.error('Error filtering transactions:', err);
			setError('Failed to fetch transactions');
			setFilteredTransactions([]); // Clear transactions on error
		}
	};

	// Add a function to clear error when filters change
	const handleFilterChange = (e) => {
		setFilters({ ...filters, [e.target.name]: e.target.value });
		setError(null); // Clear error when filters change
	};

	// Add a reset filters function
	const resetFilters = () => {
		setFilters({
			status: 'ALL',
			amount: '',
			startDate: '',
			endDate: ''
		});
	}
	//  loading state for initial auth check
	if (!auth?.user?.id) {
		return <div>Loading user data...</div>;
	}


	const handleDeleteTransaction = async (transactionId) => {
		if (!isAdmin) return; // Only admin can delete

		try {
			await axios.delete(`/transactions/${transactionId}`, {
				headers: { Authorization: `Bearer ${auth.token}` }
			});

			// Refresh transactions after deletion
			fetchTransactions();
		} catch (err) {
			setError('Failed to delete transaction');
		}
	};


	return (
		<div className="transactions-container">
			<div className="transactions-header">
				<h1>Transaction History</h1>
				<div className="account-summary">
					<div className="balance-card">
						<h3>Available Balance</h3>
						<p className="balance">₹ {auth.user.availableBalance}</p>
					</div>
					<div className="account-info">
						<p>Account Number: {maskAccountNumber(auth.user.accountNumber)}</p>
					</div>
				</div>
			</div>

			{/* Filters Section */}
			<div className="filters-section">
				<div className="filter-group">
					<label>Status</label>
					<select
						name="status"
						value={filters.status}
						onChange={handleFilterChange}
					>
						<option value="ALL">All</option>
						<option value="SUCCESS">Successful</option>
						<option value="FAILED">Failed</option>
						<option value="PENDING">Pending</option>
					</select>
				</div>

				<div className="filter-group">
					<label>Date Range</label>
					<input
						type="date"
						name="startDate"
						value={filters.startDate}
						onChange={handleFilterChange}
					/>
					<input
						type="date"
						name="endDate"
						value={filters.endDate}
						onChange={handleFilterChange}
					/>
				</div>

				<div className="filter-group">
					<label>Amount Above</label>
					<input
						type="number"
						name="amount"
						value={filters.amount}
						onChange={handleFilterChange}
						placeholder="Enter amount"
					/>
				</div>

				<button onClick={handleFilter}>Apply Filters</button>
				<button onClick={resetFilters}>Reset Filters</button>
			</div>

			{/* Quick Actions */}
			<div className="quick-actions">
				<button onClick={() => setShowForm('transfer')}>
					Make a Transfer
				</button>
				<button onClick={() => setShowForm('deposit')}>
					Deposit Money
				</button>
				<button onClick={() => setShowForm('withdraw')}>
					Withdraw Money
				</button>
			</div>

			{/* Form Section */}
			{showForm && (
				<div className="form-section">
					<button className="close-btn" onClick={() => setShowForm(null)}>×</button>
					{renderForm()}
				</div>
			)}

			{/* Transactions List */}
			<div className="transactions-list">
				{loading ? (
					<div className="loading">Loading transactions...</div>
				) : error ? (
					<div className="error">{error}</div>
				) : filteredTransactions.length === 0 ? (
					<div className="no-transactions">No transactions found</div>
				) : (
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Transaction ID</th>
								<th>Amount</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{filteredTransactions.map(transaction => (
								<tr key={transaction.id}>
									<td>{transaction.transactionDate}</td>
									<td>{transaction.id}</td>
									<td>
										&#8377; {transaction.amount}
									</td>
									<td>
										<span className={`status ${transaction.status.toLowerCase()}`}>
											{transaction.status}
										</span>
									</td>
									{isAdmin && (
										<td>
											<button
												onClick={() => handleDeleteTransaction(transaction.id)}
												className="delete-btn"
											>
												Delete
											</button>
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default Transactions;