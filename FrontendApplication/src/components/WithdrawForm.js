// components/WithdrawForm.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const WithdrawForm = () => {
  const { auth } = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/transactions/withdraw/${auth.user.id}`,
        { amount: amount },
        {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setSuccess('Withdrawal successful!');
      setError('');
      setAmount('');
    } catch (err) {
      setError(err.response?.data?.message || 'Withdrawal failed');
      setSuccess('');
    }
  };

  return (
    <div className="withdraw-form">
      <h2>Withdraw Money</h2>
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
        <button type="submit" className='withdraw-button'>Withdraw</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default WithdrawForm;