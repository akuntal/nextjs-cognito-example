'use client';
import { handleSignUp } from '@/lib/cognitoAction';
import React, { useState } from 'react';

export default function Signup() {
    // State variables for each input field
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    // Handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // You can handle the submission logic here, such as sending data to a server
        console.log('Submitting form with:');
        console.log('Name:', name);
        console.log('Phone:', phone);
        console.log('Password:', password);

        handleSignUp(phone, name, password); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

