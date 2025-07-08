import React, { createContext, useContext, useState } from 'react';
 
const AuthContext = createContext();
 
export const useAuth = () => useContext(AuthContext);
 
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // const [permissions,setpermissions]=useState(null);
 
  const login = async (username, password) => {
    const api_url="http://localhost:8000/api/checkLogin/"
    const response= await fetch(api_url,
        {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({username,password}),
        })
        if (response.ok){
          const data =await response.json()
          console.log(data)
          if (data.authenticated==true){
            setUser({username})
            alert("Successfull")
            return true
          }
          else{
            console.log("error");
          }
        }
        return false;
  }

  const logout = () => {
    setUser(null);
  };
 
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};