import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Navbar from './Navbar';
import MetaScan from './MetaScan';
import { useNavigate, useRouteLoaderData } from 'react-router';
import { API_URL } from '../App';
import Cookies from 'js-cookie';
import { WindowSharp } from '@mui/icons-material';
import Swal from 'sweetalert2';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip, IconButton } from '@mui/material';



const CustomToolbar=({selected_scan_id,})=>{
    const navigate = useNavigate();
    const token = Cookies.get('Token'); 
    const handleDelete = async()=>{
      setOpen(false)
        fetch(`${API_URL}/scanDelete/`,{
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
        <button type="button" onClick={()=>navigate('/addScan')} class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add </button>
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


export default function Scans() {
    const [value, setValue] = React.useState('1');
    const [selected_scan_id,set_selected_scan_id] = useState([]);

    // const handleSelectionChange = (newSelectionModel) => {
    //     setSelectedRowIds(newSelectionModel); // Store the selected row IDs in state
    //     console.log(selectedRowIds)
    // };


    const navigate=useNavigate();
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleRowClick = (params) =>{
        navigate(`/update_scan/${params.id}`);
    }

    const [nmap_data,setnmap_data]=useState("");

    const [loading,setloading]=useState(true);


    useEffect(() => {
        const nmap_url = `${API_URL}/nmap/`;
            setloading(true);
            fetch(nmap_url)
              .then(response=>{
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
                            setnmap_data([])
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
                      text : 'Error in Connecting to Database.',
                      icon: 'error',
                      confirmButtonText:"Ok",
                      showConfirmButton:true,
                      customClass:{
                          confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      }
                      }).then(result=>{
                          if (result.isConfirmed){
                            setnmap_data([])
                          }
                      });
                  }
              })
              .then(data => {
                setnmap_data(data);
              })
              .catch(error=>{
                // console.log(error)
                // alert('You dont have the permission to view this table........')
                // setnmap_data([]);
              })
              .finally(()=>{
                setloading(false);
              });
            
          },[]);

    const nmap_columns = [
    { field: 'Scan_id', headerName: 'Scan ID', width:200 },
    { field: 'ip', headerName: 'IP Address', width: 200 },
    { field: 'ip_type', headerName: 'IP Type', width: 200,
        renderCell:(params)=>{
            return(
            <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{params.value}
            </span>
            )
        }
     },
    {
    field: 'pt_start_time',
    headerName: 'PT Start Time',
    width: 200,
    },
    {
        field: 'pt_stop_time',
        headerName: 'PT Stop Time',
        width: 200,
    },
    {
        field: 'etc',
        headerName: 'ETC',
        width: 200,
    },
    {
        field: 'current_status',
        headerName: 'Current Status',
        width: 200,
        renderCell:(params)=>{
            return(
                <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{params.value}</span>
            )
    },
}

];

         
    if (loading){
        return <CircularProgress></CircularProgress>
    }

    const handleSelectionChange = (newSelection) => {
        set_selected_scan_id(newSelection);
      };
    

    return (
        <>
        <Navbar title="ISAE ADMIN"/>
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{marginTop:'5%'}}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Nmap and Core" value="1" />
                <Tab label="Metasploit" value="2" />
            </TabList>
            </Box>
            <TabPanel value="1">
            <div style={{ height: 440, width: '100%' }}>
            <DataGrid
                rows={nmap_data}
                columns={nmap_columns}
                getRowId={(row) => row.Scan_id}
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
                onRowSelectionModelChange={handleSelectionChange} // Handle row selection change
            />
            </div>            
            </TabPanel>
            <TabPanel value="2">
                <MetaScan></MetaScan>
            </TabPanel>
        </TabContext>
        </Box>
        </div>
        </>
    );
}
