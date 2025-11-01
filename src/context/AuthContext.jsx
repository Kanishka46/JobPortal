// import React, { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) setUser(storedUser);
//   }, []);

//   const login = (email, password) => {
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const existingUser = users.find(
//       (u) => u.email === email && u.password === password
//     );

//     if (existingUser) {
//       setUser(existingUser);
//       localStorage.setItem("user", JSON.stringify(existingUser));
//       return { success: true, role: existingUser.role };
//     } else {
//       return { success: false };
//     }
//   };

//   const register = (email, password, role) => {
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const userExists = users.find((u) => u.email === email);

//     if (userExists) return { success: false, message: "User already exists" };

//     const newUser = { email, password, role };
//     users.push(newUser);
//     localStorage.setItem("users", JSON.stringify(users));
//     return { success: true };
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, register }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // ✅ LOGIN FUNCTION WITH DAILY LOG TRACKING
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem("user", JSON.stringify(existingUser));

      // ✅ Track login count
      const logs = JSON.parse(localStorage.getItem("dailyLogs")) || [];
      const today = new Date().toISOString().split("T")[0];

      let todayLog = logs.find((log) => log.date === today);

      if (todayLog) {
        todayLog.logins += 1;
      } else {
        logs.push({ date: today, logins: 1, logouts: 0 });
      }

      localStorage.setItem("dailyLogs", JSON.stringify(logs));

      return { success: true, role: existingUser.role };
    } else {
      return { success: false };
    }
  };

  // ✅ REGISTER FUNCTION (ONLY SAVE USER)
  const register = (email, password, role) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((u) => u.email === email);

    if (userExists) return { success: false, message: "User already exists" };

    const newUser = { email, password, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return { success: true };
  };

  // ✅ LOGOUT FUNCTION WITH TRACKING
  const logout = () => {
    // Track logout count
    const logs = JSON.parse(localStorage.getItem("dailyLogs")) || [];
    const today = new Date().toISOString().split("T")[0];

    let todayLog = logs.find((log) => log.date === today);

    if (todayLog) {
      todayLog.logouts += 1;
    } else {
      logs.push({ date: today, logins: 0, logouts: 1 });
    }

    localStorage.setItem("dailyLogs", JSON.stringify(logs));

    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
