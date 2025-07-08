import React, { useEffect, useState } from 'react'
import ReactApexChart from "react-apexcharts";
import { API_URL } from '../App';

export default function BarChart() {
    const [chartdata,setchartdata]=useState([2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]);

    useEffect(()=>{
        const api_url= `${API_URL}/chartdata/`

        fetch(api_url)
        .then(response=>{
            if (!response.ok){
                console.error("Error in fetching chartdata")
            }
            return response.json()
        })
        .then(data=>{
            const c = data.result
            console.log(c[0].Monthly_scan)
            setchartdata(c[0].Monthly_scan)
        })
    },[])


    
    const state = {
          
        series: [{
          name: 'Total Scans',
          data: chartdata
        }],
        options: {
          chart: {
            height: 350,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          dataLabels: {
            enabled: true,
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ["#304758"]
            }
          },
          
          xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            position: 'top',
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            crosshairs: {
              fill: {
                type: 'gradient',
                gradient: {
                  colorFrom: '#D8E3F0',
                  colorTo: '#BED1E6',
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                }
              }
            },
            tooltip: {
              enabled: true,
            }
          },
          yaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false,
            //   formatter: function (val) {
            //     return val + "%";
            //   }
            }
          
          },
          title: {
            text: 'Total Scans',
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
              color: '#444'
            }
          }
        },
      
      
      };
    
  return (
    <a href="#" class="block max-w-xl max-h-73 p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" style={{width:"60%"}}>
        <div id="chart" style={{marginTop:'4%'}}>
                <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
              </div>
              <div id="html-dist"></div>
</a>
  )
}

