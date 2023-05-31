import React from 'react'
import './Inward.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import {useEffect,useState} from 'react';
import { Party } from './model/Party';
import { StockArea } from './model/StockArea';

function Inward() {
  const [partyList,setPartyList] = useState([]);
  const [stockAreaList,setStockAreaList] = useState([]);
  const [party,setParty] = useState('');
  const [stockArea,setStockArea] = useState('');

  const headers= {
    Authorization: localStorage.getItem('authToken')
  };
  const [slipNo, setSlipNo] = useState('');

  useEffect(()=>{
    axios.get('http://3.109.238.224:20080/api/v1/chemical/inward/getGrnUniqueID',{headers})
     .then((resp)=>{
       setSlipNo(resp.data.data);
     }).catch((error)=>{
       alert(error);
     })
     axios.get('http://3.109.238.224:20080/api/v1/party/getAllByPartner',{headers})
     .then((res)=>{
      setPartyList(res.data.dataList);
     }).catch((error)=>{
        alert(error);
     }) 
     axios.get('http://3.109.238.224:20080/api/v1/chemical/stockArea/getAllByPartner',{headers})
     .then((res)=>{
      setStockAreaList(res.data.dataList);
     }).catch((error)=>{
        alert(error);
     }) 
  },[])

  return (
    <div className='side container'>
      <h2>Inward Detials</h2>
      <br /><hr />
      <br />
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '35ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Date"
            defaultValue=""
          />
          <TextField
            id="outlined-disabled"
            label="Slip Number"
            value={slipNo}
          />
          <TextField
            id="outlined-number"
            label="LR Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-standard-label">Party Name</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={party}
              onChange={(event)=>setParty(event.target.value)}
              label="Party"
            >
              {partyList && partyList.length>0?partyList.map((value:Party)=>(
                <MenuItem value={value.id} key={value.id}>{value.companyName}</MenuItem>
              )
              ):<MenuItem>None</MenuItem>}
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-filled-label">Stock Area</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={stockArea}
              onChange={(event:SelectChangeEvent)=>setStockArea(event.target.value)}
            >
              {stockAreaList && stockAreaList.length>0 ? stockAreaList.map((value:StockArea)=>(
                 <MenuItem value={value.id} key={value.id}>{value.name}</MenuItem>
              )):<MenuItem value="">
              <em>None</em></MenuItem>}
            </Select>
          </FormControl>
        </div>
      </Box>
      <br/>
      <br/>
      <h2>
        Inward Item Details
      </h2>
      <hr/>
    </div>
  )
}

export default Inward