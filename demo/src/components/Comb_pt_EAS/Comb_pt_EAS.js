import React, { useState, useEffect } from 'react';
import PtAgeing from './PtAgeing.js';
import Enterspriseassestsummary from './Enterspriseassestsummary.js';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Navbar from './Navbar';

export default function Comb_pt_EAS() {
    const [asset_data, setAssetData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [group_loc, setGroup_loc] = useState([]);
    const [group_asset_type, setGroup_asset_type] = useState([]);
    const [group_geo, setGroup_geo] = useState([]);

    const [value, setValue] = React.useState('1');
 
    const handleChange = (event, newValue) => {
      setValue(newValue);
      // console.log("This is va Data : " + String(va_data))
      // console.log(JSON.stringify(va_data, null, 2))
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/asset_summary/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Fetch data:", data);
                setAssetData(data[0]);
                setFilteredData(data[0]);
                setGroup_loc(data[1])
                setGroup_asset_type(data[2])
                setGroup_geo(data[3])
                 // Initialize filtered data
            } catch (error) {                console.error('Fetch error:', error);
            }
        };
        fetchData();
    }, []);

  return (
    <div>
      <Navbar title='ISAE ADMIN'></Navbar>
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ marginTop: '5%' }}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="PT_Ageing" value="1" />
                <Tab label="Enterspriseassestsummary" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
            <PtAgeing ></PtAgeing>
            </TabPanel>
            <TabPanel value="2">
            <Enterspriseassestsummary/>

            </TabPanel>
          </TabContext>
        </Box>
      </div>
      
    </div>
  )
}
