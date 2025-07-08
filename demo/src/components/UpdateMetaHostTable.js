import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router'
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import { _getAbsoluteHeight } from 'ag-grid-enterprise';
import { API_URL } from '../App';
import Swal from 'sweetalert2';


export default function UpdateMetaHostTable() {
  const {id}=useParams();
  console.log(id);
  const token = Cookies.get('Token'); 
  const navigate=useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(()=>{
      if (id){
      fetch(`${API_URL}/getmetahost/${id}`,{
        method:"GET",
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

      fetch(`${API_URL}/metahosttableUpdate/${id}/`,{
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
    
    <div style={{paddingBottom:"4%"}}>
    <label>Meta Host Id:</label>
    <input
      {...register('Host_id', { required: 'Name is required' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>     
 <div style={{paddingBottom:"4%"}}>
    <label>Meta Scan Id:</label>
    <input
      {...register('scan_id', { required: 'Name is required' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>   
  <div style={{paddingBottom:"4%"}}>
    <label>Created at:</label>
    <input
      {...register('created_at', { required: 'Name is required' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Address :</label>
    <input type='datetime-local'
      {...register('address')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Mac :</label>
    <input
      {...register('mac')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Comm</label>
    <input
      {...register('comm')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Name :</label>
    <input type='datetime-local'
      {...register('name')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>State :</label>
    <input type='datetime-local'
      {...register('state')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>     <div style={{paddingBottom:"4%"}}>
    <label>Os name :</label>
    <input type='datetime-local'
      {...register('os_name')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Os Flavor :</label>
    <input 
      {...register('os_flavor')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>     <div style={{paddingBottom:"4%"}}>
    <label>Os sp:</label>
    <input
      {...register('os_sp')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
  <label>os Lang :</label>
    <input 
      {...register('os_lang')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>   
  <div style={{paddingBottom:"4%"}}>    
  <label>Arch :</label>
    <input 
      {...register('arch')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Workspace Id:</label>
    <input
      {...register('workspace_id')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Updated At:</label>
    <input
      {...register('updated_at')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Purpose :</label>
    <input type='datetime-local'
      {...register('purpose')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Info :</label>
    <input 
      {...register('info')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Comments:</label>
    <input 
      {...register('comments')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Scope:</label>
    <input
      {...register('scope')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Virtual Host :</label>
    <input
      {...register('virtual_host')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Note Count:</label>
    <input
      {...register('note_count')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Vuln Count:</label>
    <input
      {...register('vuln_count')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Service Count:</label>
    <input
      {...register('service_count')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Host Detail Count:</label>
    <input
      {...register('host_detail_count')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Exploit Attempt Count:</label>
    <input
      {...register('exploit_attempt_count')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Cred Count :</label>
    <input
      {...register('cred_count')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>History Count:</label>
    <input
      {...register('history_count')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Detected Arch:</label>
    <input
      {...register('detected_arch')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Os Family:</label>
    <input
      {...register('os_family')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>total service scanned :</label>
    <input
      {...register('total_service_scanned')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>service scanned:</label>
    <input
      {...register('service_scanned')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Total Vuln Scanned:</label>
    <input
      {...register('total_vuln_scanned')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{paddingBottom:"4%"}}>
    <label>Vuln Scanned:</label>
    <input
      {...register('vuln_scanned')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    />
    {/* {errors.name &&<p>{errors.name.message}</p>} */}
  </div>
  <div style={{display:'flex',justifyContent:"center"}}>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </div>
    </form>
</div>
  </>
  )
}
