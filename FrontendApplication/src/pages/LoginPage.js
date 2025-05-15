import { useState } from "react";
import "../styles/Auth.css";
import PasswordInput from "../components/PasswordInput";

const LoginPage = ({ onLogin }) => {
    const [form, setForm] = useState({ emailOrPhone: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(form);
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
                            value={form.emailOrPhone}
                            onChange={handleChange}
                            placeholder="Enter your email or phone"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <PasswordInput name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" required />
                    </div>
                    <button className="auth-btn" type="submit">
                        Login
                    </button>
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