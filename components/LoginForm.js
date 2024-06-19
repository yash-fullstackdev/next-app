import { useState } from "react";
import styles from "../styles/LoginForm.module.css";
import axios from "axios";
import { useRouter } from "next/router";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post("/api/login", { email, password });
      const { token, user } = loginRes.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      let apiUrl;
      if (user.role === "customer") {
        apiUrl = "/api/customer-data";
      } else if (user.role === "backoffice") {
        apiUrl = "/api/backoffice-data";
      } else {
        throw new Error("Access restricted to customers and backoffice only.");
      }

      const userDataRes = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userUid: user.userUid,
        },
      });

      router.push({
        pathname:
          user.role === "customer"
            ? "/customerTableView"
            : "/backofficeTableView",
        query: { userDataRes: JSON.stringify(userDataRes.data) },
      });
    } catch (error) {
      setMessage(
        error.response?.data?.error || "An error occurred during login"
      );
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Login
        </button>
        {message && <p className={styles.error}>{message}</p>}
      </form>
    </div>
  );
}
