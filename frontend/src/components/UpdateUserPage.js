import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import '../styles/UpdateUserPage.css';

const UpdateUserPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
		const [bankCard, setBankCard] = useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                setIsAuthenticated(!!token);
                const response = await axios.get('http://localhost:8000/api/user/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const { username, email, first_name, last_name, bank_card } = response.data;
                setUsername(username);
                setEmail(email);
                setFirstName(first_name);
                setLastName(last_name);
								setBankCard(bank_card)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:8000/api/update-user/', {
                username,
                email,
                first_name: firstName,
                last_name: lastName,
								bank_card: bankCard
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/');
        } catch (error) {
            const errMessage = error.response?.data?.detail || 'Update failed. Please check your data and try again.';
            setError(errMessage);
        }
    };

    return (
        <div className="update-user-container">
            <Header isAuthenticated={isAuthenticated}/>
            <main>
                <h2>Update User Information</h2>
                <form onSubmit={handleUpdate} className="update-user-form">
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>First Name:</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
					<div>
                        <label>Bank Card:</label>
                        <input
                            type="text"
                            value={bankCard}
                            onChange={(e) => setBankCard(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Update</button>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default UpdateUserPage;