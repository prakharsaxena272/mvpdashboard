import React, { useState, useEffect } from "react";
import { Line , Bar , Pie , Doughnut} from "react-chartjs-2";
import axios from "axios";
import DropDown from './dropdown';
const Charts = (props) => {
  const [chartData, setChartData] = useState({});
  console.log("in child" + props.filtered);

  const chart = () => {
    let empSal = [];
    let empName = [];
    let count =0;

    axios.get("http://localhost:8090/api/employees",
      {
        headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        proxy: {
        host: '127.0.0.1',
        port: 8090
        }
        }
      )
      
      .then(res => {
        console.log(res.data);
        for (const dataObj of res.data) {
          empSal.push(parseInt(dataObj.salary));
          empName.push((dataObj.firstName));
          count=count+1;
        }
        let rgb = [];
          
         
         
         for(var j = 0; j < count; j++){
          var letters = '0123456789ABCDEF';
          var color = '#';
          for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
          }
           rgb.push(color);

         }
         console.log(rgb); 
        setChartData({
          labels: empName,
          datasets: [
            {
              label: "Landmark Bois ",
              data: empSal,
              backgroundColor: rgb,
              borderWidth: 4
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    //console.log(empSal, empAge);
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App" >
      <h1>Employee Data </h1>
      <div >
        {/* <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Salaries", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: true
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        /> */}
      </div>
      <div>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Salaries", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: true
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </div>
      <div>
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Salaries", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: true
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </div>
      <div>
        <Pie
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Salaries", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </div>
      <div><DropDown/></div>
    </div>
  );
};

export default Charts;