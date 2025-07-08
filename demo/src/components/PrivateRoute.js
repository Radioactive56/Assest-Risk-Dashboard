import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { API_URL } from '../App';
 
export default function PrivateRoute({ children }) {
  const [isValidToken, setIsValidToken] = useState(null);
  const token = Cookies.get('Token'); 
  console.log(token);

    useEffect(()=>{

        if (!token){
            setIsValidToken(false)
        }

        fetch(`${API_URL}/validate/`,{
            method:"GET",
            headers:{
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response=>{
            if(response.ok){
                setIsValidToken(true)
            }
            else if (response.status === 401){
                setIsValidToken(false)
                console.error("Invalid Token / Credentials....")
            }
            else{
                setIsValidToken(false)
            }
        })
    },[token])

    if (isValidToken === null) {
        return <div>Loading...</div>;
    }
  return isValidToken ? children : <Navigate to="/" />;
}