import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password}),
            });


            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('userId', result.user._id); 
                localStorage.setItem('userEmail', result.user.email);
                
                console.log(result);
                window.location.href = '/home';
            } else {
                setError(result.message || "Failed to login");
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError("An unexpected error occurred")
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>

                <div className='register-link'>
                    <p>Don't have an account ?
                        <Link to="/register" className='a'>Register</Link>
                    </p>
                </div>

            </form>
        </div>
    );
};

export default Login;