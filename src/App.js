import React from 'react';
import Charts from './components/Charts';
import DropDown from './components/dropdown';

const App = (props) => (

  <div>  
    <DropDown/>
    <Charts  height="400" width="400"  />
  </div>
);

export default App;