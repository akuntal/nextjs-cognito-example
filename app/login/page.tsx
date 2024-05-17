'use client';
import { handleSignIn } from '@/lib/cognitoAction';
import React, { useState } from 'react';

export default function Login() {
    // State variables for each input field
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    // Handle the form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // You can handle the submission logic here, such as sending data to a server
        console.log('Submitting form with:');
        console.log('Phone:', phone);
        console.log('Password:', password);

        await handleSignIn(phone, password); // await handleSignUp(phone, password); 
    };

    return (
        <form onSubmit={handleSubmit}>
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

