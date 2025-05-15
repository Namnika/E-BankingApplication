import React, { useState } from "react";
import "../styles/Auth.css";
import PasswordInput from "../components/PasswordInput";

const RegisterPage = ({ onRegister }) => {
    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "",
        phoneNumber: "",
        fullName: "",
        address: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(form);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Create Account</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Choose a username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <PasswordInput name="password" value={form.password} onChange={handleChange} required placeholder="Enter your password" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Enter your address"
                            required
                        />
                    </div>
                    <button className="auth-btn" type="submit">
                        Register
                    </button>
                </form>
                <div className="auth-footer">
                    <span>Already have an account?</span>
                    <a href="/login">Login</a>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;