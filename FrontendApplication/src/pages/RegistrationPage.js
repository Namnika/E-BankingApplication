import React, { useState } from "react";
import "../styles/Auth.css";
import PasswordInput from "../components/PasswordInput";
import { useNavigate } from 'react-router-dom';
const RegisterPage = () => {
	const [form, setForm] = useState({
		username: "",
		password: "",
		email: "",
		phoneNumber: "",
		fullName: "",
		address: "",
		role: 'CUSTOMER' // Default role

	});

	const [message, setMessage] = useState("");
	const [errors, setErrors] = useState({});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");

		try {
			const response = await fetch("http://localhost:8080/users/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(form)
			})

			if (response.ok) {
				setMessage("Registration successful!");
				navigate('/login');
				setForm({
					username: "",
					password: "",
					email: "",
					phoneNumber: "",
					fullName: "",
					address: "",
				})
				// Redirect to login page
			} else if (response.status === 400) {
				const data = await response.json();
				setErrors(data);

			}

			else {
				const error = await response.json();
				setMessage(error.message || "Registeration failed!")
			}
		} catch (error) {
			setMessage("Server error: " + error.message)
		}
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
						{errors.username && <div className="error">{errors.username}</div>}
					</div>
					<div className="form-group">
						<label>Password</label>
						<PasswordInput name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" required />

					</div>
					{errors.password && <p className="error">{errors.password}</p>}
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
						{errors.email && <div className="error">{errors.email}</div>}
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
						{errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
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

					<div className="form-group">
						<label>Role</label>
						<select
							name="role"
							value={form.role}
							onChange={handleChange}
						>
							<option value="CUSTOMER">Customer</option>
							<option value="ADMIN">Admin</option>
						</select>
					</div>

					<button className="auth-btn" type="submit">
						Register
					</button>
					{message && <div>{message}</div>}
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