import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import './App.css';
import Layout from './components/layout/Layout';
import TransactionsPage from './pages/TransactionsPage';
import BeneficiaryPage from './pages/BeneficiaryPage';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import AccountDetailsPage from './pages/AccountDetailsPage';


function App() {
  // Placeholder for authentication state
  // In a real app, this would come from a context, Redux, or local storage after login

  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main >
            <Layout>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<div className='main-content'><DashboardPage /></div>} /> {/* Default dashboard route */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />

                {/* Protected routes */}
                <Route path="/account-details" element={<ProtectedRoute><AccountDetailsPage /></ProtectedRoute>} />
                <Route path="/transactions" element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>} />
                <Route path="/beneficiaries" element={<ProtectedRoute><BeneficiaryPage /></ProtectedRoute>} />
                <Route path="/user" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />

                {/* Fallback for any unmatched dashboard routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;