import { useState, useContext } from "react";
import "../styles/Auth.css";
import PasswordInput from "../components/PasswordInput";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';

const LoginPage = () => {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext); // <-- get setAuth from context
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const credentials = {
                emailOrPhone: emailOrPhone,
                password: password,
                role: isAdmin ? "ADMIN" : "CUSTOMER"
            };

            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();

            console.log('Login response:', data); // Debug log

            // Save token and user info
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setAuth({ token: data.token, user: data.user });

            navigate("/");
        } catch (error) {
            setError("Invalid Credentials : " + error.message)
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email or Phone</label>
                        <input
                            type="text"
                            name="emailOrPhone"
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            placeholder="Enter your email or phone"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <PasswordInput name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                    </div>
                    {/* Add admin login checkbox */}
                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                            Login as Admin
                        </label>
                    </div>
                    <button className="auth-btn" type="submit">
                        Login
                    </button>
                    {error && <p className="error">{error}</p>}
                </form>
                <div className="auth-footer">
                    <span>Don't have an account?</span>
                    <a href="/register">Register</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;