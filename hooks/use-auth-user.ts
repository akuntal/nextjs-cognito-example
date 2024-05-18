import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from "aws-amplify/auth";
import { useEffect, useState } from "react";

export default function useAuthUser() {
  const [user, setUser] = useState<Record<string, any>>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const session = await fetchAuthSession();
      if (!session.tokens) {
        setLoading(false);
        return;
      }
      const user = {
        ...(await getCurrentUser()),
        ...(await fetchUserAttributes()),
        isAdmin: false,
      };
      const groups = session.tokens.accessToken.payload["cognito:groups"];
      // @ts-ignore
      user.isAdmin = Boolean(groups && groups.includes("admins"));
      setLoading(false);
      setUser(user);
    }

    getUser();
  }, []);

  return { user, loading };
}
