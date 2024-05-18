import { getErrorMessage } from "@/utils/get-error-message";
import {
  signIn,
  signUp,
  resetPassword,
  confirmSignUp,
  autoSignIn,
  signOut,
  resendSignUpCode,
} from "aws-amplify/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import Router from "next/router";

export async function handleSignUp(
  phoneNumber: string,
  name: string,
  password: string
) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: phoneNumber,
      password,
      options: {
        userAttributes: {
          name,
        },
        // optional
        autoSignIn: true,
      },
    });
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    console.log(errorMsg);
    return errorMsg;
  }
//   redirect("/auth/confirm-signup");
}

export async function handleSignIn(phoneNumber: string, password: string) {
  let redirectLink = "/";

  try {
    const { nextStep, isSignedIn } = await signIn({
      username: phoneNumber,
      password,
    });
    if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
    //   await resendSignUpCode({
    //     username: phoneNumber,
    //   });
      redirectLink = "/auth/confirm-signup";
    }
  } catch (error) {
    if (isRedirectError(error)) {
      console.error(error);
      throw error;
    }
    // return getErrorMessage(error);
  }
  redirect(redirectLink);
}

export async function handleConfirmSignUp(
  username: string,
  confirmationCode: string
) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username,
      confirmationCode,
    });
    await autoSignIn();
  } catch (error) {
    return getErrorMessage(error);
  }
  redirect("../");
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log(getErrorMessage(error));
  }
  redirect("/login");
}
