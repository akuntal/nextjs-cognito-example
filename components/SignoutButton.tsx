import { handleSignOut } from "@/lib/cognitoAction";
import { getErrorMessage } from "@/utils/get-error-message";
import { useRouter } from "next/navigation";

export default function SignoutButton() {
  const router = useRouter();
  async function handleSignOutClick() {
    try {
      await handleSignOut();
    } catch (error) {
      console.log(getErrorMessage(error));
    }
    window.location.reload();
  }
  return <button onClick={handleSignOutClick}>Sign out</button>;
}
