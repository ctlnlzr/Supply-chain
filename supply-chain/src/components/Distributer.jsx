import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { FormControl, FormLabel } from '@mui/material';
import { useState } from "react";
import { transport, store } from '../utils/ContractAdapter';

const role = (
  <Box
    component="span"
    sx={{ display: 'inline-block', color: "#8F5BBD"}}
  >
    Distributer
  </Box>
);

export default function Distributer(props) {
  const [destinationStore, setDestinationStore] = useState('');
  const [batchTransport, setBatchTransport] = useState(0);
  const [destination, setDestination] = useState('');
  const [batchStore, setBatchStore] = useState(0);
  const [source, setSource] = useState('');

  function _transport() {
    transport(props.address, batchTransport, source, destination);
    setBatchTransport('');
    setDestination('');
    setSource('');
  }

  function _store() {
    store(props.address, batchStore, destinationStore);
    setDestinationStore('');
    setBatchStore('');
  }

  return (
    <Box sx={{ minWidth: 1000 }}>
      <Card variant="outlined" sx={{display:"flex", flexDirection:"column", justifyContent: "center", alignItems:"center"}}>
    <CardContent>
      <Typography variant="h2" component="div" color={"#C1FF72"}>
        Hello, {role}!
      </Typography>
    </CardContent>
    <CardActions sx={{display:"flex", flexDirection: "column", alignItems: 'space-between', m: '2em'}}>
      <FormControl sx={{display:"flex", flexDirection: "row", justifyContent: 'space-between', border: 1,  borderRadius: 1, borderColor: "#C1FF72", p: '2em', m: '0.5em', minWidth: 1000}}>
        <div style={{display: 'flex', flexDirection:'column'}}>
          <FormLabel> Enter batch's Id </FormLabel>
          <TextField type="text" variant='filled' size="small"
          onChange={(e) => setBatchTransport(e.target.value)}
          value={batchTransport}></TextField>
        </div>
        <div style={{display: 'flex', flexDirection:'column'}}>
          <FormLabel> Enter source address </FormLabel>
          <TextField type="text" variant='filled' size="small"
          onChange={(e) => setSource(e.target.value)}
          value={source}></TextField>
        </div>
        <div style={{display: 'flex', flexDirection:'column'}}>
          <FormLabel> Enter destination address </FormLabel>
          <TextField type="text" variant='filled' size="small"
          onChange={(e) => setDestination(e.target.value)}
          value={destination}></TextField>
        </div>
        <Button variant="contained" onClick={_transport}>Transport</Button>
      </FormControl>
      
      <FormControl sx={{display:"flex", flexDirection: "row", justifyContent: 'space-between', border: 1,  borderRadius: 1, borderColor: "#C1FF72", p: '2em', m: '0.5em', minWidth: 1000}}>
        <div style={{display: 'flex', flexDirection:'column'}}>
          <FormLabel> Enter batch's Id </FormLabel>
          <TextField type="text" variant='filled' size="small"
          onChange={(e) => setBatchStore(e.target.value)}
          value={batchStore}></TextField>
        </div>
        <div style={{display: 'flex', flexDirection:'column'}}>
          <FormLabel> Enter destination </FormLabel>
          <TextField type="text" variant='filled' size="small"
          onChange={(e) => setDestinationStore(e.target.value)}
          value={destinationStore}></TextField>
        </div>
        <Button variant="contained" onClick={_store}>Store</Button>
      </FormControl>
     </CardActions>
    </Card>
    </Box>
  );
}