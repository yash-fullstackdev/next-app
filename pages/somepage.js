// pages/somepage.js
import { useRouter } from "next/router";

export default function SomePage() {
  const router = useRouter();

  const handleLogout = () => {
    // Perform logout logic, such as clearing tokens
    localStorage.removeItem("token");
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <div>
      <h1>Some Protected Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
