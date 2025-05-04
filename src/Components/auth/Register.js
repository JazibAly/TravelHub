import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { name, username, email, password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                username,
                email,
                password
            });
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Register</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={onSubmit}>
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={name}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={username}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={email}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={password}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Register
                                </button>
                            </form>
                            <p className="mt-3">
                                Already have an account?{' '}
                                <button
                                    className="btn btn-link p-0"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register; 