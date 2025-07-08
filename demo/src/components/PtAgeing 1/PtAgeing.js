import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Navbar from './Navbar';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
 
 
export default function DataGridTable() {
 
  const [va_data, set_va_data] = useState('');
  const [pt_data, set_Pt_data] = useState('');
  const [pt_data_asset_type, set_pt_data_asset_type] = useState('');
  const [pt_data_geography, set_pt_data_geography] = useState('');
  // const [pt_data, set_Pt_data] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/va_chartAPI/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log("this is data "+ data);
        set_va_data(data)
        
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    const PT_data = async () => {
      try {
        const response = await fetch('/api/asset_summary/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const ptdata = await response.json();
        // console.log("this is data "+ data);
        set_Pt_data(ptdata[1])
        set_pt_data_asset_type(ptdata[2])
        console.log("this is data "+ ptdata[2]);

        set_pt_data_geography(ptdata[3])

      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    PT_data();
    fetchData();
  }, []);
 
 
  const [value, setValue] = React.useState('1');
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // console.log("This is va Data : " + String(va_data))
    // console.log(JSON.stringify(va_data, null, 2))
  };
 
  // const rowData = [
  //   // { branch: 'Japan', col1: 11, col2: 40, col3: 88, col4: 612, col5: 1, col6: 3, col7: 62, col8: 47, col9: 104, col10: 245, col11: 104, col12: 79, total: 1840 },
  //   // { branch: 'New Delhi', col1: 11, col2: 40, col3: 88, col4: 612, col5: 1, col6: 3, col7: 62, col8: 47, col9: 104, col10: 245, col11: 104, col12: 79, total: 1840 },
  //   // { branch: 'USA', col1: 11, col2: 40, col3: 88, col4: 612, col5: 1, col6: 3, col7: 62, col8: 47, col9: 104, col10: 245, col11: 104, col12: 79, total: 1840 },
  //   // Add all the rows data here
  // ];
 
  const columnDefs1 = [
 
    { headerName: 'Branches/Verticals', field: 'branch', pinned: 'left', width: 150 },
    {
      headerName: 'TCS Owned Customer Managed', children: [
        { headerName: 'Less than 7 Days', field: 'col1' },
        { headerName: '8 to 50 Days', field: 'col2' },
        { headerName: '51 to 150 Days', field: 'col3' },
        { headerName: 'More than 150 Days', field: 'col4' },
      ]
    },
    {
      headerName: 'TCS Owned Internally Managed', children: [
        { headerName: 'Less than 7 Days', field: 'col5_6_sum'},
        { headerName: '8 to 50 Days', field: 'col7_8_sum'},
        { headerName: '51 to 150 Days', field: 'col9_10_sum'},
        { headerName: 'More than 150 Days', field: 'col11_12_sum'},
      ]
    },
    {
      headerName: 'TCS Owned Project Managed', children: [
        { headerName: 'Less than 7 Days', field: 'col13' },
        { headerName: '8 to 50 Days', field: 'col14' },
        { headerName: '51 to 150 Days', field: 'col15' },
        { headerName: 'More than 150 Days', field: 'col16' },
      ]
    },
    { headerName: 'Grand Total', field: 'col17', width: 100 }
  ];
 
   const columnDef2 = [
    { headerName: 'Location', field: 'Location', pinned: 'left', width: 150 },
    { headerName: 'less_than_7', field: 'less_than_7'},
    { headerName: '8_to_50_Days', field: 'days_8_to_50'},
    { headerName: '51_to_150_Days', field: 'days_51_to_150'},
    { headerName: 'More_than_150', field: 'more_than_150'},
   ]

   const columnDef3 = [
    { headerName: 'Geography', field: 'Geography', pinned: 'left', width: 150 },
    { headerName: 'less_than_7', field: 'less_than_7'},
    { headerName: '8_to_50_Days', field: 'days_8_to_50'},
    { headerName: '51_to_150_Days', field: 'days_51_to_150'},
    { headerName: 'More_than_150', field: 'more_than_150'},
   ]
   
   
   const columnDef4 = [
    { headerName: 'Device', field: 'Device', pinned: 'left', width: 150 },
    { headerName: 'less_than_7', field: 'less_than_7'},
    { headerName: '8_to_50_Days', field: 'days_8_to_50'},
    { headerName: '51_to_150_Days', field: 'days_51_to_150'},
    { headerName: 'More_than_150', field: 'more_than_150'},
   ]
 
  return (
    <>
      <Navbar title='ISAE ADMIN'></Navbar>
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ marginTop: '1%' }}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="VA_Ageing" value="1" />
                <Tab label="Ageing_ByLocation" value="2" />
                <Tab label="Ageing_ByGeography" value="3" />
                <Tab label="Ageing_ByDevices" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div style={{ height: 480, width: '100%' }}>
                <div className="ag-theme-alpine" style={{ height: 480, width: '100%', marginTop: '2%' }}>
                  <AgGridReact
                    rowData={va_data}
                    columnDefs={columnDefs1}
                  />
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div style={{ height: 480, width: '100%' }}>
                <div className="ag-theme-alpine" style={{ height: 480, width: '100%', marginTop: '2%' }}>
                <AgGridReact
                    rowData={pt_data}
                    columnDefs={columnDef2}
                    pagination={true}
                    paginationPageSize={10}
                />
                </div>
              </div>
            </TabPanel>
            <TabPanel value="3">
              <div style={{ height: 480, width: '100%' }}>
                <div className="ag-theme-alpine" style={{ height: 480, width: '100%', marginTop: '2%' }}>
                  <AgGridReact
                    rowData={pt_data_geography}
                    columnDefs={columnDef3}
                  />
                </div>
              </div>
            </TabPanel>
            <TabPanel value="4">
              <div style={{ height: 480, width: '100%' }}>
                <div className="ag-theme-alpine" style={{ height: 480, width: '100%', marginTop: '2%' }}>
                  <AgGridReact
                    rowData={pt_data_asset_type}
                    columnDefs={columnDef4}
                  />
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
 
  );
}
 

