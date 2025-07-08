import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Tab from '@mui/material/Tab';
import HostTable from './HostTable';
import MetaHostTable from './MetaHostTable';
import MetaServiceTable from './MetaServiceTable';
import TabContext from '@mui/lab/TabContext';
import PendingMeta from './PendingMeta';
import MetaScanTable from './MetaScanTable';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Navbar from './Navbar';
import MetaVulnerabilityTable from './MetaVulnerabilityTable'
import { DataGrid,GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import { API_URL } from '../App';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip, IconButton } from '@mui/material';




const CustomToolbar=({selected_scan_id,})=>{
    
    const token = Cookies.get('Token'); 
    const handleDelete = async()=>{
        setOpen(false);
        fetch(`${API_URL}/scantableDelete/`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(selected_scan_id)
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

export default function DataBase() {
    const [selected_scan_id,set_selected_scan_id] = useState([]);
    const [value,setValue] = useState('1');
    const [scan_data,set_scan_data]=useState([])
    const [loading,setloading]=useState(true);
    const [selected_row,set_selected_row]=useState([]);
    const [error,setError]=useState(null);
    const navigate = useNavigate();

    const items=[
        {text:"Manav Dhruve"},
        {text:"md@tcs.com"}
      ];

    const handleChange = (event,newValue) =>{
        setValue(newValue);
    }

    const handleRowClick= (params)=>{
        navigate(`/update_scantable/${params.id}`);
    }

    useEffect(()=>{

        const scan_url=`${API_URL}/scan/`;

        fetch(scan_url)
              .then(response => {
                if (response.status === 403) {
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
                    throw new Error('Network response was not ok');
                }
                else if (response.ok){
                    return response.json();
                }
                else{
                    Swal.fire({
                        title: "Error",
                        text : 'Error in connecting to the database.',
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
                        throw new Error('Network response was not ok');
                }

              })
              .then(data => {
                console.log(data) // Log the data to the console
                set_scan_data(data);
              })
              .catch(error => {
                // setError(error);
                // alert('You dont have the permission to view the table......')
                // set_scan_data([])
              })
          },[]);

    const scan_columns = [
        {
          field: 'scan_id',
          headerName: 'Scan ID',
          width: 200,
          cellClassName:'right-align',
          editable: true,
        },
        {
          field: 'host',
          headerName: 'Host ID',
          width: 200,
          cellClassName:'right-align',
          editable: true,
        },
        {
          field: 'current_status',
          headerName: 'Current Status',
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
            field: 'priority',
            headerName: 'Priority',
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
            field: 'scan_add_time',
            headerName: 'Scan Add Time',
            width: 300,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'pt_start_time',
            headerName: 'PT Start Time',
            width: 300,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'pt_stop_time',
            headerName: 'PT Stop Time',
            width: 300,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'nmap_start_time',
            headerName: 'Nmap Start Time',
            width: 300,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'nmap_stop_time',
            headerName: 'Nmap Stop Time',
            width: 300,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'nmap_scan_pid',
            headerName: 'Nmap Scan ID',
            width: 300,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'nmap_abort_count',
            headerName: 'Nmap Abort Count',
            width: 300,
            cellClassName:'right-align',
            editable: true,
            renderCell:(params)=>{
                return(
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{params.value}</span>
                )
        },
        },
        {
            field: 'core_impact_start_time',
            headerName: 'Core Start Time',
            width: 300,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'core_impact_stop_time',
            headerName: 'Core Stop Time',
            width: 300,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'core_scan_id',
            headerName: 'Core Scan ID',
            width: 300,
            cellClassName:'right-align',
            editable: true,
            renderCell:(params)=>{
                return(
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{params.value}</span>
                )
        },
        },
        {
            field: 'core_abort_count',
            headerName: 'Core Abort Count',
            width: 300,
            cellClassName:'right-align',
            editable: true,
            renderCell:(params)=>{
                return(
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{params.value}</span>
                )
        },
        },
        {
            field: 'scan_restart_count',
            headerName: 'Scan Restart Count',
            width: 300,
            cellClassName:'right-align',
            editable: true,
            renderCell:(params)=>{
                return(
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{params.value}</span>
                )
        },
        },
        {
            field: 'nmap_report',
            headerName: 'Nmap Report',
            width: 300,
            cellClassName:'right-align',
            editable: true,
        },        {
            field: 'core_impact_report',
            headerName: 'Core Report',
            width: 300,
            cellClassName:'right-align',
            editable: true,
        },        {
            field: 'ptid',
            headerName: 'PTID',
            width: 300,
            cellClassName:'right-align',
            editable: true,
            renderCell:(params)=>{
                return(
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{params.value}</span>
                )
        },
        },
        {
            field: 'nmap_push_time',
            headerName: 'Nmap Push Time ',
            width: 300,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'core_push_time',
            headerName: 'Core Push Time ',
            width: 300,
            cellClassName:'right-align',
            editable: true,
            
        },
        {
            field: 'meta_push_time',
            headerName: 'Meta Push Time ',
            width: 300,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'meta_add_time',
            headerName: 'Meta Add Time ',
            width: 300,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'meta_report',
            headerName: 'Meta Report ',
            width: 300,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'debug_info',
            headerName: 'Debug Info',
            width: 300,
            cellClassName:'right-align',
            editable: true,
        },
        {
            field: 'scan_complete',
            headerName: 'Scan Complete ',
            width: 300,
            cellClassName:'right-align',
            renderCell: (params) => (
                <Tooltip title={params.value ? "Active" : "Inactive"}>
                  <IconButton color={params.value ? "success" : "error"}>
                    {params.value ? <CheckIcon /> : <CloseIcon />}
                  </IconButton>
                </Tooltip>
              ),
        },
      ];

      const handleSelectionChange = (newSelection)=>{
        set_selected_scan_id(newSelection);
      }

      console.log(selected_scan_id);
  

  return (
    <>
    <Navbar title="ISAE ADMIN" />
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{marginTop:'5%'}}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Scan Table" value="1" />
                <Tab label="Host Table" value="2" />
                <Tab label="Pending Meta table" value="3" />
                {/* <Tab label="Config Table" value="4" /> */}
                <Tab label="Meta_Scan_Table" value="5" />
                <Tab label="Meta_Host_Table" value="6" />
                <Tab label="Meta_Service_Table" value="7" />
                <Tab label="Meta_Vulnerabiltity_Table" value="8" />
            </TabList>
            </Box>
            <TabPanel value="1">
            <div style={{ height: 440, width: '100%' }}>
            <DataGrid
                rows={scan_data}
                columns={scan_columns}
                getRowId={(scan_data) => scan_data.scan_id}
                slots={{
                    toolbar: ()=> <CustomToolbar selected_scan_id={selected_scan_id} />,
                }}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
                }}
                pageSizeOptions={[5, 10]}
                onRowClick={handleRowClick}
                checkboxSelection
                onRowSelectionModelChange={handleSelectionChange}
            />
            </div>            
            </TabPanel>
            <TabPanel value="2">
            
                <HostTable></HostTable> 
            </TabPanel>
            <TabPanel value="3">
            
                <PendingMeta></PendingMeta> 
            </TabPanel>
            <TabPanel value="5">
            
                <MetaScanTable></MetaScanTable> 
            </TabPanel>
            <TabPanel value="6">
            
            <MetaHostTable/> 
            </TabPanel>
            <TabPanel value="7">
            
            <MetaServiceTable></MetaServiceTable> 
            </TabPanel>
            <TabPanel value="8">
            
            <MetaVulnerabilityTable></MetaVulnerabilityTable> 
            </TabPanel>
        </TabContext>
        </Box>
        </div>
        </>
  )
}
