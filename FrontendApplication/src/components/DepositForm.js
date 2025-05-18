// components/DepositForm.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const DepositForm = () => {
  const { auth } = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/transactions/deposit/${auth.user.id}`,
        { amount: parseFloat(amount) },
        {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setSuccess('Deposit successful!');
      setError('');
      setAmount('');
    } catch (err) {
      setError(err.response?.data?.message || 'Deposit failed');
      setSuccess('');
    }
  };

  return (
    <div className="deposit-form">
      <h2>Deposit Money</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="deposit-button">Deposit</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default DepositForm;