/* eslint-disable react/prop-types */
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useQuery({
    queryKey: ["user"],
    queryFn: auth,
  });

  async function auth() {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");
      if (!token) {
        return null;
      }
      const rs = await axios.get("http://localhost:3001/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(rs.data)
      setUser(rs.data);
      return (rs.data)
    } catch (err) {
      console.log(err.message);
      return null
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    try {
      setLoading(true);
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;
