// Login.jsx (simplified)
import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/');
        } catch (err) { alert(err.response?.data?.message || 'Login error'); }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-5">
                <h3>Login</h3>
                <form onSubmit={submit}>
                    <input className="form-control my-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" className="form-control my-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
}
