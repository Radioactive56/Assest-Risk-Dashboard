import React, { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts";
import CountTable from './CountTable';
import { API_URL } from '../App';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Linechart() {
  const [bar_services, set_bar_services] = useState([100, 100, 100, 100, 100]);
  const [bar_exposures, set_bar_exposures] = useState([100, 100, 100, 100, 100]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverId, setPopoverId] = useState('');

  const handleClick = (id) => (event) => {
    setAnchorEl(event.currentTarget);
    setPopoverId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setPopoverId('');
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    const api_url = `${API_URL}/chartdataweekly/`;

    fetch(api_url)
      .then(response => {
        if (!response.ok) {
          console.error('error calling chartdata api');
        }
        return response.json();
      })
      .then(data => {
        const c = data.result;

        const array_exposure = [
          c[0].Week1[1],
          c[0].Week2[1],
          c[0].Week3[1],
          c[0].Week4[1],
          c[0].Week5[1]
        ];
        set_bar_exposures(array_exposure);

        const array_service = [
          c[0].Week1[0],
          c[0].Week2[0],
          c[0].Week3[0],
          c[0].Week4[0],
          c[0].Week5[0]
        ];
        set_bar_services(array_service);
      });
  }, []);

  const bar_state = {
    series: [
      {
        name: "Number of Exposures",
        data: bar_exposures
      },
      {
        name: "Number of Services",
        data: bar_services
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 430
      },
      plotOptions: {
        bar: {
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff']
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
      },
      tooltip: {
        shared: true,
        intersect: false
      },
      xaxis: {
        categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      },
    }
  };

  return (
    <div style={{ display: 'flex', marginTop: '1vw' }}>
      <CountTable />
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ marginLeft: "0.5rem", width: '70vw' }}>
        <div style={{ display: 'flex', justifyContent: 'right', paddingTop: '2%' }}>
          <Button aria-describedby="popover-bar" onClick={handleClick('bar')} style={{ backgroundColor: "#F5f5f5", minWidth: 'auto', padding: 6 }}>
            <InfoOutlinedIcon />
          </Button>
          <Popover
            id="popover-bar"
            open={popoverId === 'bar' && open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 }} className="p-3 space-y-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                This chart shows the weekly count of exposures and services discovered.
              </span>
            </Typography>
          </Popover>
        </div>

        <div id="chart" style={{ marginTop: "4%" }}>
          <ReactApexChart options={bar_state.options} series={bar_state.series} type="bar" height={430} />
        </div>
      </div>
    </div>
  );
}