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
import { Button } from '@mui/material';
import ItemDetails from './ItemDetails';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../config/store';
import { openAdd, closeAdd } from '../../config/isAddSlice';
import { InwardItemDetails } from './model/InwardItemDetails';
import { InwardDto } from './model/InwardDto';
import InwardTable from './InwardTable';

function Inward() {
  const [partyList,setPartyList] = useState([]);
  const [stockAreaList,setStockAreaList] = useState([]);
  const [party,setParty] = useState('');
  const [stockArea, setStockArea] = useState('');
  const isAdd = useSelector((state: RootState) => state.isAdd.value);
  const [material, setMaterial] = useState('');
  const [materialList, setMaterialList] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState('');
  const [slipNo, setSlipNo] = useState('');
  const [itemDetailsList, setItemDetailsList] = useState<InwardItemDetails[]>([]);
  const dispatch = useDispatch();

  const headers= {
    Authorization: localStorage.getItem('authToken')
  };
  

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
    axios.get('http://3.109.238.224:20080/api/v1/chemical/item/getAllItem', { headers })
      .then((res) => {
        setMaterialList(res.data.dataList);
      }).catch((error) => {
        alert(error);
      });
  }, [])
  
  const handleSaveInward = () => {
    const inwardDto: InwardDto = {
      date: date,
      partyId: parseInt(party),
      stockAreaId: parseInt(stockArea),
      grnNumber: slipNo,
      inwardItemDetails: itemDetailsList,
      party: null,
      stockArea: null,
      totalWeight: 0,
      totalAmount: 0,
      approvalStatus: null,
      id: null
    }
    console.log(inwardDto);
    axios.post('http://3.109.238.224:20080/api/v1/chemical/inward/save/v3',inwardDto, { headers })
      .then((res) => {
        console.log(res.data.data);
      }).catch((error) => {
        alert(error);
      });
  }

  const createItemDetails = () => {
    const item: InwardItemDetails = {
      name: material,
      quantity: totalQty,
      price: price,
      itemId : parseInt(material)
    }
    setItemDetailsList([...itemDetailsList, item]);
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <div className='side container'>
      <h2>Inward</h2>
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
            id="outlined-required"
            label="Date"
            type='date'
            value={date}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDateChange}
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
      {isAdd ? (<div>
        <div className='header'>
          <h2>
            Inward Item Details
          </h2>
          <Button
            variant='contained' color='error' size="large"
            onClick={() => dispatch(closeAdd())}
          >X</Button>
        </div>
        <hr />
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '35ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
              <InputLabel id="demo-simple-select-standard-label">Material</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select"
                value={material}
                label="Material"
                onChange={(event) => setMaterial(event.target.value)}
              >
                {materialList && materialList.length > 0 ? materialList.map((data: StockArea) => (
                  <MenuItem value={data.id} key={data.id}>{data.name}</MenuItem>
                )
                ) : <MenuItem>None</MenuItem>}
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Total Quantity"
              value={totalQty}
              variant="outlined"
              onChange={(event) => setTotalQty(parseInt(event.target.value))} />
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              value={price}
              onChange={(event) => setPrice(parseInt(event.target.value))} />
            <Button className='floatRight' variant='contained' size="large" onClick={() => createItemDetails()}>ADD</Button>
          </div>
        </Box>
      </div>) :
        (
          <>
            <div className='inwardItemDetails'>
              <h2>
                Inward Item Details
              </h2>
              <Button variant='contained' size="large" onClick={() => dispatch(openAdd())}>Add</Button>
            </div>
            <hr />
          </>
        )}
      {itemDetailsList && itemDetailsList.length > 0 ?
        (<InwardTable itemDetailsList={itemDetailsList} />) 
        : <></>}
      
      <Button className="spaceAround"
        variant="contained"
        color="success"
      onClick={handleSaveInward}>
        Save
      </Button>
    </div>
  )
}

export default Inward