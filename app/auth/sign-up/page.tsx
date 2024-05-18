'use client';
import { handleSignUp } from '@/lib/cognitoAction';
import { getErrorMessage } from '@/utils/get-error-message';
import { signUp } from 'aws-amplify/auth';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Signup() {
    // State variables for each input field
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    // Handle the form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // You can handle the submission logic here, such as sending data to a server
        console.log('Submitting form with:');
        console.log('Name:', name);
        console.log('Phone:', phone);
        console.log('Password:', password);

        // const data = await handleSignUp(phone, name, password); 
        try {const { isSignUpComplete, userId, nextStep } = await signUp({
            username: phone,
            password,
            options: {
              userAttributes: {
                name,
              },
              // optional
              autoSignIn: true,
            },
          });
          router.push("/auth/confirm-signup");

        } catch (error) {
          const errorMessage = getErrorMessage(error);
          console.log(errorMessage);
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Signup Page</h3>
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

