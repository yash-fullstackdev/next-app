import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/SignupForm.module.css";
import axios from "axios";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/signup", {
        email,
        name,
        password,
        role,
      });
      setMessage(res.data.message);
      setEmail("");
      setName("");
      setPassword("");
      setRole("customer");
      // Redirect to the home page after a successful signup
      router.push("/");
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Signup</h2>
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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <div className={styles.formGroup}>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={styles.select}
          >
            <option value="customer">Customer</option>
            <option value="backoffice">Backoffice</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>
          Signup
        </button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
}