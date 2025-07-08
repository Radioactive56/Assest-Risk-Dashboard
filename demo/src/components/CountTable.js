import React, { useEffect, useState } from 'react'
import ReactApexChart from "react-apexcharts";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { API_URL } from '../App';

export default function CountTable() {
  const [value, setValue] = useState('1');
  const [anchorEl, setAnchorEl] = useState(null); // for popover

  const handleChange = (event, newValue) => setValue(newValue);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? 'popover-exposure-service' : undefined;

  const [exposures, setExposures] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const api_url = `${API_URL}/chartdatamonthly`;

    fetch(api_url)
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        const services_formatted = data.result.top_core_services.map(item => ({
          name: item[0],
          count: item[1]
        }));

        const exposures_formatted = data.result.top_core_expsoures.map(item => ({
          name: item[0],
          count: item[1]
        }));

        setExposures(exposures_formatted);
        setServices(services_formatted);
      });
  }, []);

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700" style={{ width: "50vw" }}>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <Button aria-describedby={id} onClick={handleClick} style={{ backgroundColor: "#F5f5f5", minWidth: 'auto', padding: 6 }}>
          <InfoOutlinedIcon />
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>
            <span className="font-semibold text-gray-900 dark:text-white">
              These charts show the top 5 most common open exposures and services and their respective counts.
            </span>
          </Typography>
        </Popover>
      </div>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="tabbed charts">
            <Tab label="Top Exposures" value="1" />
            <Tab label="Top Open Services" value="2" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {exposures.map((item, index) => (
              <li key={index} className="py-3">
                <div className="flex items-center">
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {index + 1}. {item.name}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-lg text-sm px-5 py-2.5 shadow-lg">
                      {item.count}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </TabPanel>

        <TabPanel value="2">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {services.map((item, index) => (
              <li key={index} className="py-3">
                <div className="flex items-center">
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {index + 1}. {item.name}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-lg text-sm px-5 py-2.5 shadow-lg">
                      {item.count}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </TabPanel>
      </TabContext>
    </div>
  );
}
