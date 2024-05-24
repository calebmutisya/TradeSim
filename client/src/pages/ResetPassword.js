import React, { useState, useContext } from 'react';
import '../css/Reset.css';
import { useNavigate } from 'react-router-dom'


export default function ResetPassword() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate()

    const handleResetPassword = async (e) => {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:5000/reset-password', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password: newPassword,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage('Password updated successfully');
            navigate('/')
        } else {
            setMessage(data.message || 'An error occurred');
        }
    };

    return (
        <div className='resetcont'>
            <h2>Reset Password</h2>
            <form className='resetform' onSubmit={handleResetPassword}>
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='New Password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type='submit' className='resetbtn'>
                    SUBMIT
                </button>
            </form>
            {message && <p>{message}</p>}
            <p>Insert correct username and email to change your password.</p>
        </div>
    );
}
