"use client";
import { handleSignIn } from "@/lib/cognitoAction";
import { getErrorMessage } from "@/utils/get-error-message";
import { resendSignUpCode, signIn } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  // State variables for each input field
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter(); 

  // Handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // You can handle the submission logic here, such as sending data to a server
    console.log("Submitting form with:");
    console.log("Phone:", phone);
    console.log("Password:", password);
    let redirectLink = "/";

    try {
      const { nextStep, isSignedIn } = await signIn({
        username: phone,
        password,
      });
      if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
          await resendSignUpCode({
            username: phone,
          });
        redirectLink = "/auth/confirm-signup";
      }
      router.push(redirectLink);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.log(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login Page</h3>
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
