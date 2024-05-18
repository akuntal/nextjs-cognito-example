"use client";
import { handleConfirmSignUp, handleSignIn } from "@/lib/cognitoAction";
import { getErrorMessage } from "@/utils/get-error-message";
import { autoSignIn, confirmSignUp } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ConfirmSignup() {
  // State variables for each input field
  const [phone, setPhone] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const router = useRouter();

  // Handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // You can handle the submission logic here, such as sending data to a server
    console.log("Phone:", phone);
    console.log("confirmationCode:", confirmationCode);

    // await handleConfirmSignUp(phone, confirmationCode);
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: phone,
        confirmationCode,
      });
      await autoSignIn();
      router.push("/");

    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.log(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Confirm Signup Page</h3>
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
        <label htmlFor="password">OTP:</label>
        <input
          type="text"
          id="confirmationCode"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          required
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
