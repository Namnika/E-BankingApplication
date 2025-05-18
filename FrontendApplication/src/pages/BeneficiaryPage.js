// pages/BeneficiaryPage.js
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import maskAccountNumber from '../components/MaskAccountNumber';

const BeneficiaryPage = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    accountNumber: '',
    bankName: '',
    maxTransferLimit: ''
  });


  useEffect(() => {
    if (!auth?.token) {
      navigate('/login');
      return;
    }


    fetchBeneficiaries();
  }, [auth, navigate]);


  const fetchBeneficiaries = async () => {
    try {
      const response = await axios.get('http://localhost:8080/beneficiaries', {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      // map backend beneficiary response [{}, {}]
      const transformedBeneficiaries = response.data.map(beneficiary => ({
        id: beneficiary.beneficiaryId,
        name: beneficiary.beneficiaryName,
        accountNumber: beneficiary.beneficiaryAccountNumber,
        bankName: beneficiary.bankName,
        maxTransferLimit: beneficiary.maxTransferLimit,
        user: beneficiary.beneficiaryUser
      }));

      console.log(transformedBeneficiaries);


      setBeneficiaries(transformedBeneficiaries);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch beneficiaries');
    } finally {
      setLoading(false);
    }
  };


  const handleAddBeneficiary = async (e) => {
    e.preventDefault();
    try {
      const beneficiaryData = {
        userId: auth.user.id,
        ...formData,
        maxTransferLimit: parseFloat(formData.maxTransferLimit)
      };

      const response = await axios.post(
        'http://localhost:8080/beneficiaries',
        beneficiaryData,
        {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      // After successful addition, refresh the list
      fetchBeneficiaries();

      // Reset form and hide it
      setFormData({
        name: '',
        accountNumber: '',
        bankName: '',
        maxTransferLimit: ''
      });
      setShowAddForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add beneficiary');
    }
  };

  const handleDeleteBeneficiary = async (beneficiaryId) => {
    try {
      await axios.delete(`http://localhost:8080/beneficiaries/delete/${beneficiaryId}`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      setBeneficiaries(beneficiaries.filter(b => b.id !== beneficiaryId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete beneficiary');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="beneficiaries-container">
      <div className="beneficiaries-header">
        <h2>My Beneficiaries</h2>
        <button
          className="add-beneficiary-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add New Beneficiary'}
        </button>
      </div>

      {showAddForm && (
        <div className="add-beneficiary-form">
          <h3>Add New Beneficiary</h3>
          <form onSubmit={handleAddBeneficiary}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                minLength={2}
                maxLength={100}
              />
            </div>

            <div className="form-group">
              <label>Account Number</label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                required
                pattern="[0-9]{10,20}"
                title="Account number must be 10-20 digits"
              />
            </div>

            <div className="form-group">
              <label>Bank Name</label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                required
                minLength={2}
                maxLength={100}
              />
            </div>

            <div className="form-group">
              <label>Maximum Transfer Limit (₹)</label>
              <input
                type="number"
                value={formData.maxTransferLimit}
                onChange={(e) => setFormData({ ...formData, maxTransferLimit: e.target.value })}
                required
                min="0.01"
                step="0.01"
              />
            </div>

            <button type="submit">Add Beneficiary</button>
          </form>
        </div>
      )}

      <div className="beneficiaries-list">
        {beneficiaries.length === 0 ? (
          <p className="no-beneficiaries">No beneficiaries added yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Account Number</th>
                <th>Bank Name</th>
                <th>Max Transfer Limit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {beneficiaries.map((beneficiary, index) => (
                <tr key={index}>
                  <td>{beneficiary.name}</td>
                  <td>{maskAccountNumber(beneficiary.accountNumber)}</td>
                  <td>{beneficiary.bankName}</td>
                  <td>₹{beneficiary.maxTransferLimit}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteBeneficiary(beneficiary.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BeneficiaryPage;