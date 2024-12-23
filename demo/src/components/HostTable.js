import React, { useEffect, useState } from 'react';
import { DataGrid,GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import { API_URL } from '../App';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const CustomToolbar=({selected_row})=>{
  const navigate = useNavigate();
  const token = Cookies.get('Token'); 
  const handleDelete = async()=>{
      fetch(`${API_URL}/hosttableDelete/`,{
          method:"POST",
          headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${token}`
          },
          body:JSON.stringify(selected_row)
  })
  .then(response=>{
      if (response.status===403){
          alert("You dont have the permission to delete....")
          window.location.reload('/scans')
      }
      else if (!response.ok){
        console.error('Error in calling the delete_multiple_scan api....')
      }
      else{
          alert('Data Deleted successfully.... please refresh the page if the changes are not shown...')
          window.location.reload('/scans')
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




export default function HostTable() {
    const[host_data,set_host_data]=useState([])
    const [selected_row,set_selected_row]=useState([]);
    const [host_error,host_setError]=useState(null);

    const navigate=useNavigate();

    useEffect(()=>{
        const api_url= `${API_URL}/host/` 
        fetch(api_url)
              .then(response => {
                if (response.status === 404) {
                  throw new Error('Network response was not ok');
                }
                else if (response.ok){
                  return response.json();
                }
                else{
                  console.error('Error in calling /host api..........')
                }
              })
              .then(data => {
                console.log(data) // Log the data to the console
                set_host_data(data);
              })
              .catch(error => {
                alert('You dont have the permission to view the table ......')
                set_host_data([])
                console.error(error);
              });
          },[]);
    const host_columns = [
            {
              field: 'ip_address',
              headerName: 'ip_address',
              width: 200,
              cellClassName:'right-align',
              editable: true,
            },
            {
              field: 'ip_type',
              headerName: 'ip_type',
              width: 200,
              cellClassName:'right-align',
              editable: true,
              renderCell:(params)=>{
                return(
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{params.value}</span>
                )
        },
            },
            {
              field: 'ip_version',
              headerName: 'ip_version',
              width: 200,
              cellClassName:'right-align',
              editable: true,
            },
            {
                field: 'add_time',
                headerName: 'add_time',
                width: 200,
                cellClassName:'right-align',
                editable: true,
              },
            ]

            const handleSelectionChange = (newSelection) =>{
              set_selected_row(newSelection);
            }

            const handleRowClick= (params)=>{
              navigate(`/update_hosttable/${params.id}`);
          }

  return (
    <div>
    <div style={{ height: 440, width: '100%' }}>
        <DataGrid
                rows={host_data}
                columns={host_columns}
                getRowId={(host_data) => host_data.ip_address}
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
            The selected rows are : {selected_row.join(', ')}
    </div>
    </div>
  )
}
