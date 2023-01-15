import React from 'react';
import { useState,useEffect} from 'react';
import './App.css';

function App() {

  const[datas,setDatas]=useState([]);
  const[filterInput,setFilterInput]=useState('');
  const[error,setError]=useState('');
  const[filteredData,setFilteredData]=useState([]);

  
  const inputHandler=(e)=>{
    setFilterInput(e.target.value);
  }

  const buttonHandler=()=>{

    console.log('btn click');
    let filterArray=[];
    filterArray= datas?.filter((res)=>{return res.Country===filterInput.toUpperCase()});
    setFilterInput('');
    setFilteredData(filterArray);
    if(filterArray.length===0) {setError('No Results Found'); setFilterInput('');}
  }

  useEffect(()=>{
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json')
    .then((res)=>res.json())
    .then((data)=>{setDatas(data.Results)})
  },[]);

  const vehicleData = (data)=>{ 
    return(
    data?.map((items)=>
    <>
    {
     ( items.VehicleTypes.length ? 
   ( items.VehicleTypes.map((type)=>
   <tr>
       <td >{type.Name}</td>
       <td >{items.Country}</td>
       <td >{items.Mfr_Name}</td>
       <td >{items.Mfr_CommonName}</td>
   </tr>) ) : (<tr>
    <td></td>
       <td >{items.Country}</td>
       <td >{items.Mfr_Name}</td>
       <td >{items.Mfr_CommonName}</td>
   </tr> ))
 
 }
 </>
 ))
  }

  return (
    <div className="App">
      <h1>Vehicle List</h1>
      <input value={filterInput} onChange={inputHandler} placeholder='Enetr country Name'/>
      <button onClick={buttonHandler}>Filter</button>
      <table>
        <thead>
        <tr>
          <th>Vehicle Type</th>
          <th>Country</th>
          <th>Name</th>
          <th>mfr_commonName</th>
        </tr>
        
        </thead>
        <tbody>
        {
         filteredData.length? vehicleData(filteredData) : vehicleData(datas)
        }
        </tbody>
      </table>
      {error? <div>{error}</div>:''}
      {/* {datas['Results'] && datas['Results'][0]['VehicleTypes'][1]['Name']} */}

    </div>
  );
}

export default App;
