import { getErrorMessage } from "@/utils/get-error-message";
import { signIn, signUp } from "aws-amplify/auth";
import { redirect } from "next/navigation";

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
    return getErrorMessage(error);
  }
  redirect("/login");
}



export async function handleSignIn(
    phoneNumber: string,
    password: string
  ) {
    try {
      const user = await signIn({
        username: phoneNumber,
        password,
      });
      debugger;
    } catch (error) {
      return getErrorMessage(error);
    }
    redirect("/login");
  }
  