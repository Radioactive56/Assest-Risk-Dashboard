import React from 'react'
import { useForm,Controller } from 'react-hook-form';
import Select from 'react-select';
import Navbar from './Navbar';
import { useNavigate } from 'react-router';
import { API_URL } from '../App';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

export default function Users() {
  const items=[
    {text:"Manav Dhruve"},
    {text:"md@tcs.com"}
  ];
  const token = Cookies.get('Token');
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const navigate=useNavigate();
  const onSubmit = data => {
    console.log(data);

    fetch(`${API_URL}/addUser/`,{
      method:"POST",
      headers:{"Content-Type":"application/json",'Authorization': `Bearer ${token}`

      },
      body : JSON.stringify(data),
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
                        navigate('/user');
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
                            navigate('/user');
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
                          navigate('/user');
                      }
                  });
              }
              else{
                console.error("Error in calling the api....")
              }
            })
        }
  const model_options=[
    { value:"1", label:"All of the below Models"},
    {  value:"2", label:"Scan"},
    {  value:"3", label:"Host"},
    {  value:"4", label:"Meta_Dashboard"},
    {  value:"5", label:"Meta_scan_table"},
    {  value:"6", label:"Meta_service_table"},
    {  value:"7", label:"Meta_vulnerability_table"},
    {  value:"8", label:"Nmap_core_dashboard"},
  ]
  const  options=[
    {  value:"1", label:"All of the below"},
    {  value:"2", label:"Can view"},
    {  value:"3", label:"Can delete"},
    {  value:"4", label:"Can change"},
    {  value:"5", label:"Can add"},
  ]

  return (
    <>
    <Navbar title="ISAE ADMIN"/>
    <div class=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{marginTop:"5%",marginLeft:"25%",marginRight:"25%"}}>
        <h4 class=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Add User</h4>
<form onSubmit={handleSubmit(onSubmit)}>
    <div style={{marginTop:"2%"}}>
        <div>
            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input name="username"
        {...register("username", { required: "Username is required." })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required />
        {errors.username && <p>{errors.username.message}</p>}
        <div class="help" id="id_username_helptext">
            <div class="text-xs font-normal text-gray-500 dark:text-gray-300">Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.</div>
        </div>
        </div>
        <div >
        <label htmlFor="model_name" style={{paddingTop:'2%'}} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Model Name :</label>
        <Controller
          name="model_name"
          control={control}
          // rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              isMulti
              options={model_options}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          )}
        />
        <label htmlFor="privilege" style={{paddingTop:'2%'}} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select type of privileges, you want to add to above selected Models.</label>
        <Controller
          name="privilege"
          control={control}
          // rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              isMulti
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          )}
        />
        </div>
    </div>
    <label style={{paddingTop:'2%'}} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Permissions </label>
<div class="flex">
    <div class="flex items-center h-5">
        {/* <label htmlfor="permission_active" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Active</label> */}
        <input type='checkbox' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        name="permission_active_status" id="permission_active_status"
        {...register("permission_active_status")}>
      </input>
    </div>
    <div class="ms-2 text-sm">
        <label for="helper-checkbox" class="font-medium text-gray-900 dark:text-gray-300">Active</label>
        <p id="helper-checkbox-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">Designates whether this user should be treated as active. Unselect this instead of deleting accounts.</p>
    </div>
    <div class="flex items-center h-5">
        {/* <label htmlfor="permission_active" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Active</label> */}
        <input type='checkbox' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        name="permission_Staff_status" id="permission_Staff_status"
        {...register("permission_Staff_status")}>
      </input>
    </div>
    <div class="ms-2 text-sm">
        <label for="helper-checkbox" class="font-medium text-gray-900 dark:text-gray-300">Staff Status</label>
        <p id="helper-checkbox-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">Designates whether the user can log into this admin site.</p>
    </div>    
    <div class="flex items-center h-5">
        {/* <label htmlfor="permission_active" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Active</label> */}
        <input type='checkbox' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        name="permission_Superuser_status" id="permission_Superuser_status"
        {...register("permission_Superuser_status")}>
      </input>
    </div>
    <div class="ms-2 text-sm">
        <label for="helper-checkbox" class="font-medium text-gray-900 dark:text-gray-300">Superuser Status</label>
        <p id="helper-checkbox-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">Designates that this user has all permissions without explicitly assigning them.</p>
    </div>
</div>
    <div className="mb-6" style={{marginTop:"1%"}}>
        <label style={{paddingTop:'2%'}} for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password"
        name="password"
        {...register("password", { required: "Password is required." })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
    {errors.password && <p>{errors.password.message}</p>}
    <div class="help" id="id_password1_helptext">
        <div><ul><li class="text-xs font-normal text-gray-500 dark:text-gray-300">Your password can’t be too similar to your other personal information.</li><li class="text-xs font-normal text-gray-500 dark:text-gray-300">Your password must contain at least 8 characters.</li><li class="text-xs font-normal text-gray-500 dark:text-gray-300">Your password can’t be a commonly used password.</li><li class="text-xs font-normal text-gray-500 dark:text-gray-300">Your password can’t be entirely numeric.</li></ul></div>
    </div>
    </div> 
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
</div>
  </>
);
};