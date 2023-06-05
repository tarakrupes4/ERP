import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Select from '@mui/material/Select';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { StockArea } from './model/StockArea';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { closeAdd } from '../../config/isAddSlice';


function ItemDetails() {
    const [material, setMaterial] = useState('');
    const [materialList, setMaterialList] = useState([]);
    const [totalQty, setTotalQty] = useState('');
    const [price, setPrice] = useState('');
    const [remarks, setRemarks] = useState('');
    const dispatch = useDispatch();
    const headers = {
        Authorization: localStorage.getItem('authToken')
    };
    useEffect(() => {
        axios.get('http://3.109.238.224:20080/api/v1/chemical/item/getAllItem', { headers })
            .then((res) => {
                setMaterialList(res.data.dataList);
            }).catch((error) => {
                alert(error);
            });
    }, []);
    return (
        <div className='popup-overlay'>
            <h2>
                Inward Item Details
            </h2>
            <Button
                variant='outlined' color='error'
                onClick={()=>dispatch(closeAdd())}
            >X</Button>
            <hr />
            <Box component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '35ch' },
                }}
                noValidate
                autoComplete="off">
                <FormControl variant="filled" sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '16px',
                     minWidth: 300
                }}>
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
                        ) : <MenuItem value={0}>None</MenuItem>}
                    </Select>
                    <TextField
                        id="outlined-basic"
                        label="Total Quantity"
                        value={totalQty}
                        variant="outlined"
                        onChange={(event)=>setTotalQty(event.target.value)} />
                    <TextField
                        id="outlined-basic"
                        label="Price"
                        variant="outlined"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)} />
                    
                </FormControl>
            </Box>
        </div>
    )
}

export default ItemDetails