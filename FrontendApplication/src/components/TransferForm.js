// components/TransferForm.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const TransferForm = () => {
    const { auth } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        receiverId: '',
        amount: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Format the request body to match the required format
            const requestBody = {
                senderId: auth.user.id,
                receiverId: parseInt(formData.receiverId), // Convert to number
                amount: parseFloat(formData.amount).toFixed(2) // Format to 2 decimal places
            };

            console.log('Sending transfer request:', requestBody); // Debug log

            const response = await axios.post(
                'http://localhost:8080/transactions/transfer',
                requestBody,
                {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            console.log('Transfer response:', response.data); // Debug log
            // Format success message with transaction details
            const successMessage = `
                Transfer Successful!
                Transaction ID: ${response.data.id}
                Amount: ₹${response.data.amount}
                To: ${response.data.receiverName}
                Status: ${response.data.status}
                Date: ${new Date(response.data.transactionDate).toLocaleString()}
            `;

            setSuccess(successMessage);

            // Reset form
            setFormData({ receiverId: '', amount: '' });
        } catch (err) {
            console.error('Transfer error:', err);
            setError(err.response?.data?.message || 'Transfer failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="transfer-form">
            <h2>Make a Transfer</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Recipient's ID</label>
                    <input
                        type="number"
                        value={formData.receiverId}
                        onChange={(e) => setFormData({ ...formData, receiverId: e.target.value })}
                        placeholder="Enter recipient's Id"
                        required
                        min="1"
                    />
                </div>
                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        placeholder="Enter amount"
                        required
                        min="0.01"
                        step="0.01"
                    />
                </div>
                <button
                    type="submit"

                    disabled={loading}
                    className={loading ? 'loading' : 'transfer-button'}
                >
                    {loading ? 'Processing...' : 'Transfer'}
                </button>

                {error && (
                    <div className="error-message">
                        <p className="error">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="success-message">
                        <p className="success">{success}</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default TransferForm;