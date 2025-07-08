
import Navbar from './Navbar';
import Areachart from './Areachart';
import Linechart from './Linechart';
import React, { useState } from 'react'

export default function Home() {
    const items=[
        {text:"Manav Dhruve"},
        {text:"md@tcs.com"}
      ];
      const [date_data,setdatedata] = useState([]);
      const submit=()=>{
          const start_date = document.getElementById('start_date').value;
          const end_date = document.getElementById('end_date').value;
  
          const dict = {'start_date':start_date,'end_date':end_date}
          console.log(dict)
          setdatedata(dict)
      }
  return (
    <div>
    <Navbar title="ISAE ADMIN"/>
    {/* <div style={{width:"100%",marginTop:'5%'}}>
        <p class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Enter the Start Date and End Date to generate the charts:</p>
        <div style={{display:'flex'}}>
        <input id='start_date' type='date' placeholder='start date'class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required></input>
        <input id='end_date' type='date' placeholder='end date' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required></input>
        <button type="submit" onClick={submit} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
    </div> */}
    <Areachart data={date_data}/>
    <Linechart data={date_data}/>
    
    </div>
  )
}
