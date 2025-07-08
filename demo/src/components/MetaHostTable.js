import React, { useEffect, useState } from 'react';
import { DataGrid,GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import { API_URL } from '../App';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Swal from 'sweetalert2';

const CustomToolbar=({selected_row})=>{
    const token = Cookies.get('Token'); 
    const handleDelete = async()=>{
        setOpen(false);
        fetch(`${API_URL}/metahosttableDelete/`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(selected_row)
    })
    .then(response=>{
                if (response.status===403){
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
                              window.location.reload('/database')
                            }
                        });
                }
                else if (!response.ok){
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
                                window.location.reload('/database')
                            }
                        });
                }
                else{
                     Swal.fire({
                        title: "Success",
                        text : 'Data Deleted Successfully',
                        icon: 'success',
                        confirmButtonText:"Ok",
                        showConfirmButton:true,
                        customClass:{
                            confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        }
                        }).then(result=>{
                            if (result.isConfirmed){
                                window.location.reload('/database')
                            }
                        });
                }
            })
            }
  
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
  
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
  
    //   const handleDelete=()=>{
    //     console.log(selected_scan_id)
    //   }
    
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
        <div style={{display:"flex"}}>
        <button type="button" onClick={handleOpen} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you really want to Delete the selected rows ? 
          </Typography>
          <div style={{display: 'flex',justifyContent: 'space-around',paddingTop: '5%'}}>
          <button type="button" onClick={handleDelete} class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Yes</button>
          <button type="button" onClick={handleClose} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">No</button>
          </div>
        </Box>
      </Modal>
        </div>
      </GridToolbarContainer>
    );
  }

export default function MetaHostTable() {
    const [meta_host_data,set_meta_host_data]=useState('');
    const [selected_row,set_selected_row]=useState([]);
    const [meta_errors,meta_scansetErrors]=useState('');

    const navigate=useNavigate();

    const token= Cookies.get('Token');
    useEffect(()=>{
        const api_url=`${API_URL}/meta_host`;

        fetch(api_url,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response=>{
                if (response.status === 403){
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
                                set_meta_host_data([]);
                            }
                        });
                   throw new Error('You dont have the permission to view the table........')
                }
                else if (response.ok){
                    return response.json()
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
                            set_meta_host_data([]);
                        }
                    });
                }
            })
            .then(data=>{
                set_meta_host_data(data);
            })
            .catch(error=>{
            })
    },[])

    const meta_host_columns = [
        {
          field: 'Host_id',
          headerName: 'Host_id',
          width: 200,
          cellClassName:'right-align',
          editable: true,
        },
        {
          field: 'created_at',
          headerName: 'created_at',
          width: 200,
          cellClassName:'right-align',
          editable: true,
        },
        {
          field: 'address',
          headerName: 'address',
          width: 200,
          cellClassName:'right-align',
          editable: true,
        },
        {
            field: 'mac',
            headerName: 'mac',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'comm',
            headerName: 'comm',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'name',
            headerName: 'name',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'state',
            headerName: 'state',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'os_name',
            headerName: 'os_name',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'os_flavor',
            headerName: 'os_flavor',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'os_sp',
            headerName: 'os_sp',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'os_lang',
            headerName: 'os_lang',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'arch',
            headerName: 'arch',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'workspace_id',
            headerName: 'workspace_id',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'updated_at',
            headerName: 'updated_at',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'purpose',
            headerName: 'purpose',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'info',
            headerName: 'info',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'comments',
            headerName: 'comments',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'scope',
            headerName: 'scope',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'virtual_host',
            headerName: 'virtual_host',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'note_count',
            headerName: 'note_count',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'vul_count',
            headerName: 'vul_count',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'service_count',
            headerName: 'service_count',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'host_detail_count',
            headerName: 'host_detail_count',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'exploit_attempt_count',
            headerName: 'exploit_attempt_count',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'cred_count',
            headerName: 'cred_count',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'history_count',
            headerName: 'history_count',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'detected_arch',
            headerName: 'detected_arch',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'os_family',
            headerName: 'os_family',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'total_services_scanned',
            headerName: 'total_services_scanned',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'services_scanned',
            headerName: 'services_scanned',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'total_vuln_scanned',
            headerName: 'total_vuln_scanned',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'vuln_scanned',
            headerName: 'vuln_scanned',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'scan_id',
            headerName: 'scan_id',
            width: 200,
            cellClassName:'right-align',
            editable: true,
        },
       
    ]

    const handleRowClick = (params) =>{
        navigate(`/update_metahosttable/${params.id}`);
      }

    const handleSelectionChange = (newSelection) =>{
        set_selected_row(newSelection);
    }

  return (
    <div>
        <div style={{ height: 440, width: '100%' }}>
        <DataGrid
                rows={meta_host_data}
                columns={meta_host_columns}
                getRowId={(meta_host_data) => meta_host_data.Host_id}
                slots={{
                    toolbar: ()=> <CustomToolbar selected_row={selected_row} />,
                }}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                onRowClick={handleRowClick}
                onRowSelectionModelChange={handleSelectionChange}
            />

            </div>
    </div>
  )
}
