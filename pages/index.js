// pages/index.js
import Link from "next/link";
import styles from "../styles/HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to My Next.js App</h1>
      <nav className={styles.nav}>
        <Link href="/signup">Signup</Link>
        <Link href="/login">Login</Link>
      </nav>
    </div>
  );
}
