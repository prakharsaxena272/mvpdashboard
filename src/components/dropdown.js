import React, { Component } from 'react';
import axios from "axios";
// import Charts from './Charts';
// import ReactDOM from 'react-dom';
// import {Route, withRouter} from 'react-router-dom';
class DropDown extends Component {
    constructor() {
        super();
        this.state = {
            sales: [],
            filters:{},
            filtered:[]
           
        };
        let abc=[];
    }
componentDidMount()
 {
    let salesman = [];
    let c={};
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
        console.log(res);
        for (const dataObj of res.data) {
            //salesman.push(parseInt(dataObj.salary));
            salesman.push((dataObj));
            c[dataObj.firstName]=false;
          
          }
          
        console.log(c);
        this.setState({
            sales: salesman,
            filters:c,
        });
    })
    .catch(err => {
        console.log(err);
      });
}











handleCheckbox = (e) => {
  
  // e.preventDefault();
  

  const {name, value, checked} = e.target;
  console.log("got click"+ value);

  let newData=[];
  axios.get('http://localhost:8090/api/sales/'+ value,
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
    console.log(res);
    for (const dataObj of res.data) {
        //salesman.push(parseInt(dataObj.salary));
        newData.push((dataObj));    
      }
    console.log(newData);
    this.setState({
        filtered: newData,

    });
})
.catch(err => {
    console.log(err);
  });
    }

    
render()
{
      let optionItems = this.state.sales.map((salesman) =>
    <input
    type="checkbox"
    onClick={this.handleCheckbox}
    name={salesman.firstName}
    value={salesman.firstName}/> 
);
//   let optionItems = this.state.sales.forEach( customer => {
   
//     return  <input type="checkbox"  onClick={this.display(customer)} />
// })
  // this.display();
  
  return (
  <div>Connectivities
     {optionItems}
     
     <div>
       {/* <div> <Charts chrtData={this.state.filtered}/></div> */}
      </div>
      
  </div>
  )
}
  

}
// // after component is finished
export default DropDown;
// ReactDOM.render(<DropDown/>, document.getElementById('react-search'));