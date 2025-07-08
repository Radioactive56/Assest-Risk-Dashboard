// import React, { useEffect, useState } from 'react'
// import Box from '@mui/material/Box';
// import Popover from '@mui/material/Popover';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import ReactApexChart from "react-apexcharts";
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import { API_URL } from '../App';

// export default function Areachart({ datedata }) {

//   const [radial_data, set_radial_data] = useState([44, 55, 67, 54]);
//   const [radar_data_core, set_radar_data_core] = useState([5, 5, 5, 5, 10]);
//   const [radar_data_meta, set_radar_data_meta] = useState([5, 5, 5, 5, 10]);
//   const [donut_data, set_donut_data] = useState([5, 5, 5, 5, 10]);
//   const [donut_columns, set_donut_columns] = useState([43,21,32,12]);
//   const [monthly_core_os, set_monthly_core_os] = useState([ ['Linux', 'Windows', 'MAC', 'Others']])
//   const [chartdata, setchartdata] = useState([2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]);

//   useEffect(() => {
//     const api_url = `${API_URL}/chartdataweekly/`
//     // var start_date = "6-6-2025";
//     fetch(api_url,{
//       method:'GET',
//       // headers:{
//       //   'start_date': start_date,
        
//       // }
//     })
//       .then(response => {
//         if (!response.ok) {
//           console.error("Error in fetching chartdata")
//         }
//         return response.json()
//       })
//       .then(data => {
//         const c = data.result
//         // console.log(c[0].Monthly_scan)
//         setchartdata(c[0].Monthly_scan)

//         let c_nmap = c[0].Nmap_count
//         let c_core = c[0].Core_count
//         let c_meta = c[0].Meta_count
//         let c_result = c[0].Result_count
//         let myarray = [c_nmap, c_core, c_meta, c_result]
//         set_radial_data(myarray)

//         const week1_core = c[0].Week1[2]
//         const week2_core = c[0].Week2[2]
//         const week3_core = c[0].Week3[2]
//         const week4_core = c[0].Week4[2]
//         const week5_core = c[0].Week5[2]
//         const radar_array_core = [week1_core, week2_core, week3_core, week4_core, week5_core]
//         set_radar_data_core(radar_array_core)


//         const week1_meta = c[0].Week1[3]
//         const week2_meta = c[0].Week2[3]
//         const week3_meta = c[0].Week3[3]
//         const week4_meta = c[0].Week4[3]
//         const week5_meta = c[0].Week5[3]
//         const radar_array_meta = [week1_meta, week2_meta, week3_meta, week4_meta, week5_meta]
//         set_radar_data_meta(radar_array_meta)
//       })

//     const monthly_api_url= `${API_URL}/chartdatamonthly/`;    

//     fetch(monthly_api_url)
//     .then(response=>{
//       if (!response.ok){
//         console.error('Error calling the monthly_api_url')
//       }
//       else{
//       return response.json()
//   }})
//     .then(data=>{
//       const donut_data = data.result.top_core_os.map(item => ({
//         data: item[0],
//         }));
//         console.log(donut_data)
//     })
//   }, [])

//   const state = {

//     series: [
//       {
//         name: 'Actual',
//         data: [
//           {
//             x: 'January',
//             y: chartdata[0],
//             goals: [
//               {
//                 name: 'Expected',
//                 value: 2500,
//                 strokeHeight: 4,
//                 strokeDashArray: 4,
//                 strokeColor: '#f22930'
//               }
//             ]
//           },
//           {
//             x: 'February',
//             y: chartdata[1],
//             goals: [
//               {
//                 name: 'Expected',
//                 value: 2500,
//                 strokeHeight: 4,
//                 strokeDashArray: 4,
//                 strokeColor: '#f22930'
//               }
//             ]
//           },
//           {
//             x: 'March',
//             y: chartdata[2],
//             goals: [
//               {
//                 name: 'Expected',
//                 value: 2500,
//                 strokeHeight: 4,
//                 strokeDashArray: 4,
//                 strokeColor: '#f22930'
//               }
//             ]
//           },
//           {
//             x: 'April',
//             y: chartdata[3],
//             goals: [
//               {
//                 name: 'Expected',
//                 value: 2500,
//                 strokeHeight: 4,
//                 strokeDashArray: 4,
//                 strokeColor: '#f22930'
//               }
//             ]
//           },
//           {
//             x: 'May',
//             y: chartdata[4],
//             goals: [
//               {
//                 name: 'Expected',
//                 value: 2500,
//                 strokeHeight: 4,
//                 strokeDashArray: 4,
//                 strokeColor: '#f22930'
//               }
//             ]
//           },
//           {
//             x: 'June',
//             y: chartdata[5],
//             goals: [
//               {
//                 name: 'Expected',
//                 value: 2500,
//                 strokeHeight: 4,
//                 strokeDashArray: 4,
//                 strokeColor: '#f22930'
//               }
//             ]
//           },
//           {
//             x: 'July',
//             y: chartdata[6],
//             goals: [
//               {
//                 name: 'Expected',
//                 value: 2500,
//                 strokeHeight: 4,
//                 strokeDashArray: 4,
//                 strokeColor: '#f22930'
//               }
//             ]
//           },
//           {
//             x: 'August',
//             y: chartdata[7],
//             goals: [
//               {
//                 name: 'Expected',
//                 value: 2500,
//                 strokeHeight: 4,
//                 strokeDashArray: 4,
//                 strokeColor: '#f22930'
//               }
//             ]
//           },
//           {
//             x: 'September',
//             y: chartdata[8],
//             goals: [
//               {
//                 name: 'Expected',
//                 value: 2500,
//                 strokeHeight: 4,
//                 strokeDashArray: 4,
//                 strokeColor: '#f22930'
//               }
//             ]
//           },
//           {
//             x: 'October',
//             y: chartdata[9],
//             goals: [
//               {
//                 name: 'Expected',
//                 value: 2500,
//                 strokeHeight: 4,
//                 strokeDashArray: 4,
//                 strokeColor: '#f22930'
//               }
//             ]
//           },
//           {
//             x: 'November',
//             y: chartdata[10],
//             goals: [
//               {
//                 name: 'Expected',
//                 value: 2500,
//                 strokeHeight: 4,
//                 strokeDashArray: 4,
//                 strokeColor: '#f22930'
//               }
//             ]
//           },
//           {
//             x: 'December',
//             y: chartdata[11],
//             goals: [
//               {
//                 name: 'Expected',
//                 value: 2500,
//                 strokeHeight: 4,
//                 strokeDashArray: 4,
//                 strokeColor: '#f22930'
//               }
//             ]
//           },
//         ]
//       }
//     ],
//     options: {
//       chart: {
//         height: 350,
//         type: 'bar'
//       },
//       plotOptions: {
//         bar: {
//           columnWidth: '60%'
//         }
//       },
//       colors: ['#0084ff'],
//       dataLabels: {
//         enabled: false
//       },
//       legend: {
//         show: true,
//         showForSingleSeries: true,
//         customLegendItems: ['Actual', 'Expected'],
//         markers: {
//           fillColors: ['#0084ff', '#f22930']
//         }
//       }
//     },


//   };

//   const data = radial_data;
//   const normalized_value = [8, 8, 40, 8]

//   const normaldata = data.map((value, index) =>
//     (value / normalized_value[index]) * 100
//   );
//   const radial_state = {

//     series: normaldata,
//     options: {
//       chart: {
//         height: 390,
//         type: 'radialBar',
//       },
//       plotOptions: {
//         radialBar: {
//           offsetY: 0,
//           startAngle: 0,
//           endAngle: 270,
//           hollow: {
//             margin: 5,
//             size: '30%',
//             background: 'transparent',
//             image: undefined,
//           },
//           dataLabels: {
//             name: {
//               show: false,
//             },
//             value: {
//               show: false,
//             }
//           },
//           barLabels: {
//             enabled: true,
//             useSeriesColors: true,
//             offsetX: -8,
//             fontSize: '16px',
//             formatter: function (seriesName, opts) {
//               return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%";
//             },
//           },
//         }
//       },
//       colors: ['#fc0313', '#0084ff', '#03fc39', '#e3d50b'],
//       labels: ['Nmap WIP', 'Core WIP', 'Meta WIP', 'Result Push Pending'],
//       responsive: [{
//         breakpoint: 480,
//         options: {
//           legend: {
//             show: false
//           }
//         }
//       }]
//     },


//   };

//   var radar_options = {

//     series: [{
//       name: 'Core Open Ports',
//       data: radar_data_core
//     }, {
//       name: 'Meta Open Ports',
//       data: radar_data_meta
//     }
//     ],
//     options: {
//       chart: {
//         type: 'bar',
//         height: 350
//       },
//       plotOptions: {
//         bar: {
//           horizontal: false,
//           columnWidth: '55%',
//           borderRadius: 5,
//           borderRadiusApplication: 'end'
//         },
//       },
//       dataLabels: {
//         enabled: false
//       },
//       stroke: {
//         show: true,
//         width: 2,
//         colors: ['transparent']
//       },
//       xaxis: {
//         categories: ['Week1', "Week2", "Week3", 'Week4', "Week5"],
//       },
//       // yaxis: {
//       //   title: {
//       //     text: '$ (thousands)'
//       //   }
//       // },
//       fill: {
//         opacity: 1
//       },
//       // tooltip: {
//       //   y: {
//       //     formatter: function (val) {
//       //       return "$ " + val + " thousands"
//       //     }
//       //   }
//       // }
//     }
//   }



//   var donut_options = {
//     series: [44, 55, 41, 17],
//     chart: {
//       width: 380,
//       // background:"black",
//       // foreColor: 'white',
//       type: 'donut',
//     },
//     labels: ['Linux', 'Windows', 'MAC', 'Others'],
//     dataLabels: {
//       enabled: false
//     },
//     fill: {
//       type: 'gradient',
//     },
//     legend: {
//       offsetY: 55,
//       formatter: function (val, opts) {
//         return val + " - " + opts.w.globals.series[opts.seriesIndex]
//       }
//     },
//     title: {
//       text: 'Types Of Operating System',
//     },
//     grid: {
//       padding: {
//         top: 35,
//       },
//     },
//     responsive: [{
//       breakpoint: 480,
//       options: {
//         chart: {
//           width: 200
//         },
//         legend: {
//           position: 'bottom'
//         }
//       }
//     }]
//   };

//   const style1 = {
//     display: 'flex',
//     marginTop: '5.5%'
//   }

//   const [value, setValue] = React.useState('1');

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };


//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'simple-popover' : undefined;

//   return (
//     <>
//       <div style={style1}>
//         <div class="block max-w-xl max-h-73 p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" style={{ width: "60%" }}>
//           <div style={{ display: 'flex', justifyContent: 'right' }}>
//             <Button aria-describedby={id} onClick={handleClick} style={{ backgroundColor: "#F5f5f5" }}>
//             <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
//   <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z" clip-rule="evenodd"/>
// </svg>

//             </Button>
//             <Popover
//               id={id}
//               open={open}
//               anchorEl={anchorEl}
//               onClose={handleClose}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//             >
//               <Typography sx={{ p: 2 }} class="p-3 space-y-2"><span class="font-semibold text-gray-900 dark:text-white">This Chart shows the total number of scans completed monthly with its expected target.</span></Typography>
//             </Popover>
//           </div>

//           <div id="chart" style={{ marginTop: '4%' }}>
//             <ReactApexChart options={state.options} series={state.series} type="bar" height={400} />
//           </div>
//           <div id="html-dist"></div>
//         </div>
//         <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ marginLeft: '0.5rem', width: '58%' }}>
//           <Box sx={{ width: '100%', typography: 'body1' }}>
//             <TabContext value={value}>
//               <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                 <TabList onChange={handleChange} aria-label="lab API tabs example">
//                   <Tab label="Scans" value="1" />
//                   <Tab label="Information" value="2" />
//                 </TabList>
//               </Box>
//               <TabPanel value="1">
//                 <div>

//                   <div style={{ display: 'flex', justifyContent: 'right' }}>
//                     <Button aria-describedby={id} onClick={handleClick} style={{ backgroundColor: "#F5f5f5" }}>
//                     <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
//   <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z" clip-rule="evenodd"/>
// </svg>

//                     </Button>
//                     <Popover
//                       id={id}
//                       open={open}
//                       anchorEl={anchorEl}
//                       onClose={handleClose}
//                       anchorOrigin={{
//                         vertical: 'bottom',
//                         horizontal: 'left',
//                       }}
//                     >
//                       <Typography sx={{ p: 2 }} class="flex items-center p-4 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600" role="alert"><svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//     <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
//   </svg><span class="font-semibold text-gray-900 dark:text-white">This Chart shows the total number of ips in the respective process. It shows the efficiency of the scanner out of 8.</span></Typography>
//                     </Popover>
//                   </div>

//                   <div id="chart"  >
//                     <ReactApexChart options={radial_state.options} series={radial_state.series} type="radialBar" height={320} />
//                   </div>

//                 </div>
//               </TabPanel>
//               <TabPanel value="2">
//                 <div class="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="services" role="tabpanel" aria-labelledby="services-tab" >
//                 <div style={{ display: 'flex', justifyContent: 'right' }}>
//                     <Button aria-describedby={id} onClick={handleClick} style={{ backgroundColor: "#F5f5f5" }}>
//                       <svg class="w-4 h-4 ms-2 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
//                     </Button>
//                     <Popover
//                       id={id}
//                       open={open}
//                       anchorEl={anchorEl}
//                       onClose={handleClose}
//                       anchorOrigin={{
//                         vertical: 'bottom',
//                         horizontal: 'left',
//                       }}
//                     >
//                       <Typography sx={{ p: 2 }} class="p-3 space-y-2"><span class="font-semibold text-gray-900 dark:text-white">This Chart shows the total number of ips in the respective process. It shows the efficiency of the scanner out of 8.</span></Typography>
//                     </Popover>
//                   </div>
//                   <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//                     {/* <div id="chart" style={{marginTop: '-4%',display:'flex'}}>
//                 <ReactApexChart options={radar_options} series={radar_options.series} type="radar" height={250}/>
//               </div>
//               <div id="html-dist"></div>
//              */}
             
//                     <div id="chart" style={{ marginTop: '-4%', display: 'flex' }}>
//                       <ReactApexChart options={radar_options.options} series={radar_options.series} type="bar" height={250} />
//                     </div>
//                     <div id="html-dist"></div>
//                     <div id="chart" style={{ marginTop: '-4%', display: 'flex' }}>
//                       <ReactApexChart options={donut_options} series={donut_options.series} type="donut" height={250} />
//                     </div>
//                     <div id="html-dist"></div>
//                   </div>
//                 </div>
//               </TabPanel>
//             </TabContext>
//           </Box>
//         </div>
//       </div>
//     </>
//   )
// }

import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ReactApexChart from "react-apexcharts";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { API_URL } from '../App';

export default function Areachart({ datedata }) {
  const [radial_data, set_radial_data] = useState([44, 55, 67, 54]);
  const [radar_data_core, set_radar_data_core] = useState([5, 5, 5, 5, 10]);
  const [radar_data_meta, set_radar_data_meta] = useState([5, 5, 5, 5, 10]);
  const [chartdata, setchartdata] = useState([2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]);

  // Popover anchor states
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);

  const handlePopoverOpen = (setter) => (event) => setter(event.currentTarget);
  const handlePopoverClose = (setter) => () => setter(null);

  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);

  useEffect(() => {
    fetch(`${API_URL}/chartdataweekly/`)
      .then(response => response.json())
      .then(data => {
        const c = data.result;
        setchartdata(c[0].Monthly_scan);
        set_radial_data([
          c[0].Nmap_count,
          c[0].Core_count,
          c[0].Meta_count,
          c[0].Result_count
        ]);
        set_radar_data_core([
          c[0].Week1[2], c[0].Week2[2], c[0].Week3[2], c[0].Week4[2], c[0].Week5[2]
        ]);
        set_radar_data_meta([
          c[0].Week1[3], c[0].Week2[3], c[0].Week3[3], c[0].Week4[3], c[0].Week5[3]
        ]);
      });
  }, []);

  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => setValue(newValue);

  const style1 = { display: 'flex', marginTop: '5.5%' };
  const normalized_value = [8, 8, 40, 8];
  const normaldata = radial_data.map((value, i) => (value / normalized_value[i]) * 100);

  const state = {
    series: [{
      name: 'Actual',
      data: chartdata.map((val, idx) => ({
        x: new Date(2025, idx, 1).toLocaleString('default', { month: 'long' }),
        y: val,
        goals: [{ name: 'Expected', value: 2500, strokeHeight: 4, strokeDashArray: 4, strokeColor: '#f22930' }]
      }))
    }],
    options: {
      chart: { height: 350, type: 'bar' },
      plotOptions: { bar: { columnWidth: '60%' } },
      colors: ['#0084ff'],
      dataLabels: { enabled: false },
      legend: {
        show: true, showForSingleSeries: true,
        customLegendItems: ['Actual', 'Expected'],
        markers: { fillColors: ['#0084ff', '#f22930'] }
      }
    }
  };

  const radial_state = {
    series: normaldata,
    options: {
      chart: { height: 390, type: 'radialBar' },
      plotOptions: {
        radialBar: {
          offsetY: 0, startAngle: 0, endAngle: 270,
          hollow: { margin: 5, size: '30%' },
          dataLabels: { name: { show: false }, value: { show: false } },
          barLabels: {
            enabled: true,
            useSeriesColors: true,
            offsetX: -8,
            fontSize: '16px',
            formatter: (seriesName, opts) =>
              `${seriesName}: ${opts.w.globals.series[opts.seriesIndex].toFixed(0)}%`
          },
        }
      },
      colors: ['#fc0313', '#0084ff', '#03fc39', '#e3d50b'],
      labels: ['Nmap WIP', 'Core WIP', 'Meta WIP', 'Result Push Pending'],
      responsive: [{ breakpoint: 480, options: { legend: { show: false } } }]
    }
  };

  const radar_options = {
    series: [
      { name: 'Core Open Ports', data: radar_data_core },
      { name: 'Meta Open Ports', data: radar_data_meta }
    ],
    options: {
      chart: { type: 'bar', height: 350 },
      plotOptions: {
        bar: {
          horizontal: false, columnWidth: '55%', borderRadius: 5,
          borderRadiusApplication: 'end'
        }
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ['transparent'] },
      xaxis: { categories: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5'] },
      fill: { opacity: 1 }
    }
  };

  const donut_options = {
    series: [44, 55, 41, 17],
    chart: { width: 380, type: 'donut' },
    labels: ['Linux', 'Windows', 'MAC', 'Others'],
    dataLabels: { enabled: false },
    fill: { type: 'gradient' },
    legend: {
      offsetY: 55,
      formatter: (val, opts) =>
        `${val} - ${opts.w.globals.series[opts.seriesIndex]}`
    },
    title: { text: 'Types Of Operating System' },
    grid: { padding: { top: 35 } },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: { width: 200 },
        legend: { position: 'bottom' }
      }
    }]
  };

  return (
    <div style={style1}>
      {/* Chart Card 1: Bar */}
      <div className="block max-w-xl max-h-73 p-4 bg-white border border-gray-200 rounded-lg shadow" style={{ width: "60%" }}>
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <IconButton onClick={handlePopoverOpen(setAnchorEl1)} color="primary">
            <InfoOutlinedIcon />
          </IconButton>
          <Popover open={open1} anchorEl={anchorEl1} onClose={handlePopoverClose(setAnchorEl1)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
            <Typography sx={{ p: 2 }}>
              <span className="font-semibold">This Chart shows the total number of scans completed monthly with its expected target.</span>
            </Typography>
          </Popover>
        </div>
        <div id="chart" style={{ marginTop: '4%' }}>
          <ReactApexChart options={state.options} series={state.series} type="bar" height={400} />
        </div>
      </div>

      {/* Chart Card 2: Tabs */}
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow" style={{ marginLeft: '0.5rem', width: '58%' }}>
        <Box sx={{ width: '100%' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                <Tab label="Scans" value="1" />
                <Tab label="Information" value="2" />
              </TabList>
            </Box>

            {/* Tab 1: Radial */}
            <TabPanel value="1">
              <div style={{ display: 'flex', justifyContent: 'right' }}>
                <IconButton onClick={handlePopoverOpen(setAnchorEl2)} color="primary">
                  <InfoOutlinedIcon />
                </IconButton>
                <Popover open={open2} anchorEl={anchorEl2} onClose={handlePopoverClose(setAnchorEl2)}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                  <Typography sx={{ p: 2 }}>
                    <span className="font-semibold">This Chart shows the total number of IPs in respective process. It shows scanner efficiency out of 8.</span>
                  </Typography>
                </Popover>
              </div>
              <ReactApexChart options={radial_state.options} series={radial_state.series} type="radialBar" height={320} />
            </TabPanel>

            {/* Tab 2: Radar & Donut */}
            <TabPanel value="2">
              <div style={{ display: 'flex', justifyContent: 'right' }}>
                <IconButton onClick={handlePopoverOpen(setAnchorEl3)} color="primary">
                  <InfoOutlinedIcon />
                </IconButton>
                <Popover open={open3} anchorEl={anchorEl3} onClose={handlePopoverClose(setAnchorEl3)}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                  <Typography sx={{ p: 2 }}>
                    <span className="font-semibold">This Chart shows the total number of IPs in respective process. It shows scanner efficiency out of 8.</span>
                  </Typography>
                </Popover>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <ReactApexChart options={radar_options.options} series={radar_options.series} type="bar" height={250} />
                <ReactApexChart options={donut_options} series={donut_options.series} type="donut" height={250} />
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}