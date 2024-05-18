"use client";
import Image from "next/image";
import styles from "./page.module.css";
import useAuthUser from "@/hooks/use-auth-user";
import SignoutButton from "@/components/SignoutButton";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const { user, loading } = useAuthUser();
  console.log(user);
  if(loading) return <p>Loading...</p>
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Home page</p>
        {user && (
          <div>
            <p>Welcome, {user.name}</p>
            <SignoutButton />
          </div>
        )}
        {!user && (
          <div>
            <p>Please Signin or Signup</p>

            <p>
              <Link href="/auth/login">Login</Link>
            </p>

            <p>
              <Link href="/auth/sign-up">Signup</Link>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
