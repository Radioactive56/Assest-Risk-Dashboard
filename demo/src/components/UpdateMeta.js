import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router'
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import { _getAbsoluteHeight } from 'ag-grid-enterprise';
import { API_URL } from '../App';
import Swal from 'sweetalert2';

export default function Update() {
    const {id}=useParams();
    console.log(id);
    const token = Cookies.get('Token'); 
    const navigate=useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(()=>{
        if (id){
        fetch(`${API_URL}/getmeta/${id}`,{
          method:'GET',
          headers:{
             'Content-Type':'application/json',
              'Authorization': `Bearer ${token}`
          }
        })
        .then((response)=>{
            if (!response.ok){
                console.log('error calling api');
            }
            return response.json();
        })
        .then((data)=>{
            console.log(data[0]);
            reset(data[0]);

        })

    }},[]);

    const onSubmit=(data)=>{
        console.log(data);

        fetch(`${API_URL}/metaUpdate/${id}/`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(data),
        })
.then(response=>{
            if (!response.ok){
                // alert('error in sending data....')
              Swal.fire({
                title: "Error",
                text : 'Error in Sending Data to Database.',
                icon: 'error',
                confirmButtonText:"Ok",
                showConfirmButton:true,
                customClass:{
                    confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                }
                }).then(result=>{
                    if (result.isConfirmed){
                    }
                });
            }
            else if(response.status === 403){
              Swal.fire({
                title: "Error",
                text : 'You dont have the permission to perform this function.',
                icon: 'error',
                confirmButtonText:"Ok",
                showConfirmButton:true,
                customClass:{
                    confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                }
                }).then(result=>{
                    if (result.isConfirmed){
                    }
                });
            }
            else{
              Swal.fire({
                title: "Success",
                text : 'Data Added Succesfully.',
                icon: 'success',
                confirmButtonText:"Ok",
                showConfirmButton:true,
                customClass:{
                    confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                }
                }).then(result=>{
                    if (result.isConfirmed){
                      navigate('/database');
                    }
                });
            }
        })
    }
  return (
    <>
    <Navbar title="ISAE ADMIN"/>
    <div class=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{marginTop:"5%",marginLeft:"25%",marginRight:"25%"}}>
        <form onSubmit={handleSubmit(onSubmit)}>
            
        <div>
        <label>Pending Id:</label>
        <input
          {...register('Pending_id')} class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled
        />
        {/* {errors.name &&<p>{errors.name.message}</p>} */}
      </div>
      <div style={{paddingBottom:"4%"}}>
        <label>Scan ID:</label>
        <input
          {...register('scan_id')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        />
        {/* {errors.name &&<p>{errors.name.message}</p>} */}
      </div>
      <div style={{paddingBottom:"4%"}}>
        <label>Ip Address:</label>
        <input
          {...register('Ip')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        />
        {/* {errors.name &&<p>{errors.name.message}</p>} */}
      </div>
      <div style={{paddingBottom:"4%"}}>
        <label>Send Status</label>
        <input
          {...register('Send_status')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        />
        {/* {errors.name &&<p>{errors.name.message}</p>} */}
      </div>
      <div style={{paddingBottom:"4%"}}>
        <label>Meta ID :</label>
        <input
          {...register('Meta_id')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        />
        {/* {errors.name &&<p>{errors.name.message}</p>} */}
      </div>
      <div>
        <label>Meta Start Time: </label>
        <input
          {...register('Meta_start_time')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        />
        {/* {errors.name &&<p>{errors.name.message}</p>} */}
      </div><div>
        <label>Meta Stop Time: </label>
        <input
          {...register('Meta_stop_time')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        />
        {/* {errors.name &&<p>{errors.name.message}</p>} */}
      </div>
      <div style={{paddingBottom:"4%"}}>
        <label>Scan Status :</label>
        <input
          {...register('Meta_scan_status')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        />
        {/* {errors.name &&<p>{errors.name.message}</p>} */}
      </div>
      <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </div>
        </form>
    </div>
      
    </>
  )
}
