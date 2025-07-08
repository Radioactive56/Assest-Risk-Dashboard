import React, { useEffect, useState } from 'react'

export default function Shake() {
    const [data,setdata] = useState([])

    useEffect(()=>{

        const api_value = "https://www.omdbapi.com/?i=tt3896198&apikey=1c12799f&s=titanic&page=1";

        fetch(api_value)
        .then(response=>{
            if (!response.ok){
                console.log("error")
            }
            return response.json()
        })
        .then(data=>{
            console.log(data)
            setdata(data.Search);
        })
        console.log(data)
    })
  return (
    <div>
      <div>{data}</div>
    </div>
  )
}
