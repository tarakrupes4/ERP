import React from 'react'
import { useState,useEffect } from 'react'
import { InwardDto } from '../Inward/model/InwardDto'
import axios from 'axios';
import { PaginationDto } from '../Inward/model/PaginationDto';
import { headers } from '../Inward/model/Headers';
import { error } from 'console';
import { Button} from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';


function InwardList() {

  const [reqObj, setReqObj] = useState<PaginationDto>({
    page: 1,
    pageSize: 10,
    sortOrder: '0'
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleChange = (event: SelectChangeEvent) => {
    setReqObj({
      ...reqObj,
      pageSize : parseInt(event.target.value),
    })
  };

  const changePage = (value:Boolean) => {
    setReqObj((prevReqObj) => {
      let newPage = prevReqObj.page;

      if (value) {
        newPage += 1;
      } else {
        newPage = Math.max(newPage - 1, 1);
      }

      console.log(newPage);
      getPaginationData({ ...prevReqObj, page: newPage });
      return { ...prevReqObj, page: newPage };
    });
  }
  const [listData, setListData] = useState<InwardDto[]>([]);
  const navigate = useNavigate();


  const getPaginationData = (reqObj:PaginationDto) => {
    axios.post("http://3.109.238.224:20080/api/v1/chemical/inward", reqObj, { headers })
      .then((resp) => {
        setListData(resp.data.dataList);
      }).catch((error) => {
        console.error("Error occurred while fetching data:", error);
      })
  }

  useEffect(() => {
    getPaginationData(reqObj);
  }, []);

  return (
    <div className='container'>
      <div className='spaceInBetween'>
        <h2>Inward</h2>
        <Button variant='contained' size="large" onClick={() =>navigate("add")}>ADD NEW </Button>
      </div>
      <br/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow key='header'>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="right">Slip Number</StyledTableCell>
              <StyledTableCell align="right">Party Name</StyledTableCell>
              <StyledTableCell align="right">Total Quantity</StyledTableCell>
              <StyledTableCell align="right">Total Amount</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {listData.map((data) => (
              <StyledTableRow key={data.id}>
                <StyledTableCell component="th" scope="row">
                  {data.date}
                </StyledTableCell>
                <StyledTableCell align="right">{data.grnNumber}</StyledTableCell>
                <StyledTableCell align="right">{data.party?.companyName}</StyledTableCell>
                <StyledTableCell align="right">{data.totalWeight}</StyledTableCell>
                <StyledTableCell align="right">{data.totalAmount}</StyledTableCell>
                <StyledTableCell align="right">{data.approvalStatus?.statusName}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody> 
        </Table>
      </TableContainer>
      <div>
        <FormControl sx={{ m: 1, minWidth: 80 }} size='small'>
          <InputLabel id="demo-simple-select-autowidth-label">Page Size</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={reqObj.pageSize.toString()}
            onChange={handleChange}
            autoWidth
            label="Page Size"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
        >
          <ButtonGroup size="small" aria-label="small button group">
            <Button key="back" onClick={()=>changePage(false)}>Back</Button>
            <Button key="next" onClick={()=>changePage(true)}>Next</Button>
          </ButtonGroup>
        </Box>
      </div>
    </div>
  )
}

export default InwardList