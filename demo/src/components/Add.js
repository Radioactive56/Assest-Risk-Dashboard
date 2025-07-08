// This the add of nmap_core dashboard in Scans sidebar.......
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router'
import Navbar from './Navbar';
import { API_URL } from '../App';
import Swal from 'sweetalert2';


export default function Add(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate=useNavigate();
    const token = Cookies.get('Token'); 
    const onSubmit=(data)=>{
        fetch(`${API_URL}/addScan/`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(data),
        })
        .then(response=>{
          if (response.ok){
            Swal.fire({
            title: "Success",
            text : 'Data Added Successfully',
            icon: 'success',
            confirmButtonText:"Ok",
            showConfirmButton:true,
            customClass:{
                confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            }
            }).then(result=>{
                if (result.isConfirmed){
                    navigate('/scans');
                }
            });
          }
          else if (response.status === 403){
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
                        navigate('/scans');
                    }
                });
          }
          else if (response.status===400){
            // alert(".....")
            Swal.fire({
              title: "Error",
              text : "Error in saving data to the model as the format didn't match.",
              icon: 'error',
              confirmButtonText:"Ok",
              showConfirmButton:true,
              customClass:{
                  confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              }
              }).then(result=>{
                  if (result.isConfirmed){
                      navigate('/scans');
                  }
              });
          }
          else{
            console.error("Error in calling the api....")
          }
        })
    }
  return (
    <>
    <div>
         <Navbar title="ISAE ADMIN"/>
    <div class=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{marginTop:"5%",marginLeft:"25%",marginRight:"25%"}}>
        <form onSubmit={handleSubmit(onSubmit)}>
            
        <div style={{paddingBottom:"4%"}}>
        {/* <label>Scan Id:</label>
        <input
          {...register('Scan_id', { required: 'Name is required' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required
        /> */}
        {/* {errors.name &&<p>{errors.name.message}</p>} */}
      </div><div style={{paddingBottom:"4%"}}>
        <label>Ip:</label>
        <input
          {...register('ip')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        />
      <div class="help" id="id_password1_helptext">
        <div><ul><li li class="text-xs font-normal text-gray-500 dark:text-gray-300">Please enter a valid ip address of format XXX.XXX.XXX</li></ul></div>
    </div>
        {/* {errors.name &&<p>{errors.name.message}</p>} */}
      </div>
      <div style={{paddingBottom:"4%"}}>
        <label>Ip Type:</label>
        <input
          {...register('ip_type')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        />
    <div class="help" id="id_password1_helptext">
        <div><ul><li li class="text-xs font-normal text-gray-500 dark:text-gray-300">Should be either Public or Private..</li></ul></div>
    </div>
        {/* {errors.name &&<p>{errors.name.message}</p>} */}
      </div>
      <div style={{paddingBottom:"4%"}}>
        <label>PT Start Time</label>
        <input type='datetime-local'
          {...register('pt_start_time')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        />
        {/* {errors.name &&<p>{errors.name.message}</p>} */}
      </div>
      <div style={{paddingBottom:"4%"}}>
        <label>PT Stop Time :</label>
        <input type='datetime-local'
          {...register('pt_stop_time')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        />
        {/* {errors.name &&<p>{errors.name.message}</p>} */}
      </div>
      <div style={{paddingBottom:"4%"}}>
        <label>Current Status :</label>
        <input
          {...register('current_status')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        />
      <div class="help" id="id_password1_helptext">
        <div><ul><li li class="text-xs font-normal text-gray-500 dark:text-gray-300">Please enter a valid text character..</li></ul></div>
    </div>
        {/* {errors.name &&<p>{errors.name.message}</p>} */}
      </div>
      <div style={{paddingBottom:"4%"}}>
        <label>Estimated Time Completion : </label>
        <input
          {...register('etc')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        />
        {/* {errors.name &&<p>{errors.name.message}</p>} */}
      </div>
      <div style={{display:'flex',justifyContent:"center"}}>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
        </form>
    </div>
      </div>
    </>

  )
}
