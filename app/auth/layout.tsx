import Link from "next/link";
import styles from "./page.module.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.main}>
      <Link href="/">Go to Home</Link>
      {children}
    </div>
  );
}
