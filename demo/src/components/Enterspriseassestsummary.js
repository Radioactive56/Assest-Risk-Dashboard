import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
// import moduleName from 'module'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../index.css'; // Ensure your CSS is imported
import { DataGrid } from "@mui/x-data-grid";
import { API_URL } from '../App';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
 
const Enterpriseassestsummary = () => {
 
    const [assest_data,setassest_data]=useState("");
    // const [meta_error,setmeta_error]=useState(null);
    // const [selected_row,set_selected_row]=useState([]);
 
    useEffect(()=>{
        const assest_url=`${API_URL}/enterprise`
        fetch(assest_url)
        .then(response=>{
            if (response.status===403) {
                Swal.fire({
                title: "Error",
                text : 'You dont have the permission to view.',
                icon: 'error',
                confirmButtonText:"Ok",
                showConfirmButton:true,
                customClass:{
                    confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                }
                }).then(result=>{
                    if (result.isConfirmed){
                        setassest_data([])
                    }
                });
                }
            else if (response.ok){
                return response.json();
            }
            else{
                Swal.fire({
                title: "Error",
                text : 'Error in Connecting to Database.',
                icon: 'error',
                confirmButtonText:"Ok",
                showConfirmButton:true,
                customClass:{
                    confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                }
                }).then(result=>{
                    if (result.isConfirmed){
                        setassest_data([]);
                    }
                });
            }
        })
        .then(data=>{
            console.log(data);
            const withIds = data.map(row => ({
                    ...row,
                    id: uuidv4(),
                }));
 
                setassest_data(withIds);
        })
        .catch(error=>{
            // alert('You dont have the permission to view the data.........')
            // console.error(error)
            // setmeta_data([]);
        })
    },[]);
 
         
    const columns = [
        { headerName: 'IP Address',field: 'IP Address',width:200 },
        { headerName: 'IP Type',field: 'IP Type_x', width:200 },
        { headerName: 'Asset Type',field: 'Device' ,width:200 },
        { headerName: 'Branch',field: 'Branch' ,width:200 },
        { headerName: 'Location',field: 'Location' ,width:200 },
        { headerName: 'Geography',field: 'Geography' ,width:200 },
        { headerName: 'Managed By_x',field: 'Managed By_x' ,width:200 },
        { headerName: 'List of open ports',field: 'List of open ports',width:200 },
        { headerName: 'Count of open ports',field: 'open_ports',width:200 },
        { headerName: 'Count of exposure',field: 'exposure',width:200 }
    ];
         
      return (
        <>
         <div>
                <div style={{ height: 440, width: '100%' }}>
                    <DataGrid
                        rows={assest_data}
                        columns={columns}
                        // slots={{
                        //     toolbar: ()=> <CustomToolbar selected_scan_id={selected_row}/>,
                        //   }}
                        initialState={{
                            pagination: {
                            paginationModel: { pageSize: 100, page: 0 },
                            },
                        }}
                        pageSizeOptions={[10, 50, 100, 200]} // include 100 here!
                    />
                    <div>
                    </div>
                    </div>
             
            </div>
              </>
          );
 
 
}
 
export default Enterpriseassestsummary;