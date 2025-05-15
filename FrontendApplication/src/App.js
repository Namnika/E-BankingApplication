import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import './App.css';
import Layout from './components/layout/Layout';

function App() {
  // Placeholder for authentication state
  // In a real app, this would come from a context, Redux, or local storage after login
  const isLoggedIn = true; // Assume user is logged in for now

  return (
    <Router>
      <div className="app-container">
        {isLoggedIn && <Navbar />}
        <main >
          <Routes>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/*" element={isLoggedIn ? <DashboardRoutes /> : <Navigate to="/login" replace />} />
          </Routes>
        </main>
        {isLoggedIn && <Footer />}
      </div>
    </Router>
  );
}

// Component to handle routes accessible when logged in (i.e., dashboard routes)
function DashboardRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<div className='main-content'><DashboardPage /></div>} /> {/* Default dashboard route */}
        {/* 
        You will add more specific dashboard routes here later, for example:
        <Route path="/transactions" element={<TransactionManagementPage />} />
        <Route path="/beneficiaries" element={<BeneficiaryManagementPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      */}
        {/* Fallback for any unmatched dashboard routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;