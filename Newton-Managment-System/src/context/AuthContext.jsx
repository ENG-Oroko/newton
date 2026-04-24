import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext();

/* =========================
   FAKE USERS DATABASE
========================= */
const USERS = [
  {
    name: "Student User",
    email: "student@next.com",
    password: "2002.dec",
    role: "student",
  },
  {
    name: "Lecturer User",
    email: "lecturer@next.com",
    password: "2002.dec",
    role: "lecturer",
  },
  {
    name: "Finance User",
    email: "finance@next.com",
    password: "2002.dec",
    role: "finance",
  },
  {
    name: "Registrar User",
    email: "registrator@next.com",
    password: "2002.dec",
    role: "registrator",
  },
  {
    name: "College Admin",
    email: "admin@next.com",
    password: "2002.dec",
    role: "college_admin",
  },
  {
    name: "Super Admin",
    email: "super@next.com",
    password: "2002.dec",
    role: "super_admin",
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  /* =========================
     RESTORE SESSION
  ========================= */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ncl_user");

      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (err) {
      localStorage.removeItem("ncl_user");
    } finally {
      setLoading(false);
    }
  }, []);

  /* =========================
     LOGIN FUNCTION
  ========================= */
  const login = async (email, password) => {
    setError("");

    const foundUser = USERS.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );

    if (!foundUser) {
      setError("Invalid email or password");
      return null;
    }

    const sessionUser = {
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      token: "ncl_" + Date.now(),
    };

    setUser(sessionUser);
    localStorage.setItem("ncl_user", JSON.stringify(sessionUser));

    return sessionUser;
  };

  /* =========================
     LOGOUT
  ========================= */
  const logout = () => {
    setUser(null);
    setError("");
    localStorage.removeItem("ncl_user");
    window.location.href = "/";
  };

  /* =========================
     ROLE CHECK
  ========================= */
  const hasRole = (roles = []) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        hasRole,
        error,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);