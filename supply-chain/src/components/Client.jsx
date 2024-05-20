import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl } from '@mui/material';
import { FormLabel } from '@mui/material';
import {
  registerActor, retrieveStimulateEvents, retrieveTransportEvents, retrieveBuySeedsEvents,
  retrieveStoringEvents, retrieveDisplayEvents, retrieveGerminateSeedsEvents, 
  retrieveHarvestEvents, retrievePlantEvents } from '../utils/ContractAdapter';
import { enhanceStimulateEvents, enhanceBuySeedsEvents, enhanceDisplayEvents,
  enhanceGerminateSeedsEvents, enhanceHarvestEvents,
  enhancePlantEvents, enhanceStoringEvents, enhanceTransportEvents } from '../utils/EnhanceData';  
import { useState } from "react";
import { TextField } from '@mui/material';
import { renderEvent } from '../utils/RenderingUtils';


const role = (
  <Box
    component="span"
    sx={{ display: 'inline-block', color: "#8F5BBD" }}
  >
    Client
  </Box>
);

export default function Client(props) {
  const [batchId, setBatchId] = useState(0);
  const [events, setEvents] = useState([]);
  
  async function _retrieveGerminateSeedsEvents() {
    const contractEvents = await retrieveGerminateSeedsEvents(batchId, props.chainId);
    const enhancedEvents = await enhanceGerminateSeedsEvents(contractEvents);
    
    setEvents(enhancedEvents);
    setBatchId(0);
  }

  async function _retrieveStimulateEvents() {
    const contractEvents = await retrieveStimulateEvents(batchId, props.chainId);
    const enhancedEvents = await enhanceStimulateEvents(contractEvents);

    setEvents(enhancedEvents);
    setBatchId(0);
  }

  async function _retrieveTransportEvents() {
    const contractEvents = await retrieveTransportEvents(batchId, props.chainId);
    const enhancedEvents = await enhanceTransportEvents(contractEvents);

    setEvents(enhancedEvents);
    setBatchId(0);
  }

  async function _retrieveBuySeedsEvents() {
    const contractEvents = await retrieveBuySeedsEvents(batchId, props.chainId);
    const enhancedEvents = await enhanceBuySeedsEvents(contractEvents);

    setEvents(enhancedEvents);
    setBatchId(0);
  }

  async function _retrieveStoringEvents() {
    const contractEvents = await retrieveStoringEvents(batchId, props.chainId);
    const enhancedEvents = await enhanceStoringEvents(contractEvents);

    setEvents(enhancedEvents);
    setBatchId(0);
  }

  async function _retrieveHarvestEvents() {
    const contractEvents = await retrieveHarvestEvents(batchId, props.chainId);
    const enhancedEvents = await enhanceHarvestEvents(contractEvents);

    setEvents(enhancedEvents);
    setBatchId(0);
  }

  async function _retrieveDisplayEvents() {
    const contractEvents = await retrieveDisplayEvents(batchId, props.chainId);
    const enhancedEvents = await enhanceDisplayEvents(contractEvents);

    setEvents(enhancedEvents);
    setBatchId(0);
  }

  async function _retrievePlantEvents() {
    const contractEvents = await retrievePlantEvents(batchId, props.chainId);
    const enhancedEvents = await enhancePlantEvents(contractEvents);

    setEvents(enhancedEvents);
    setBatchId(0);
  }

  function _registerActor() {
    registerActor(props.address);
  }

  return (
    <Box sx={{ minWidth: 1500, display: "flex", flexDirection: "row", justifyContent: 'space-evenly' }}>
      <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <CardContent>
          <Typography variant="h2" component="div" color={"#C1FF72"}>
            Hello, {role}!
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", flexDirection: "column", alignItems: 'space-between', m: '2em' }}>
          <FormControl sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', border: 1, borderRadius: 1, borderColor: "#C1FF72", p: '2em', minWidth: 600, m: '0.5em' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <FormLabel> Enter batch's Id </FormLabel>
              <TextField type="text" variant='filled' size="small"
                onChange={(e) => setBatchId(e.target.value)}
                value={batchId}></TextField>
            </div>
            <Button variant="contained" onClick={_retrieveGerminateSeedsEvents} sx={{ fontSize: '0.7rem', padding: '4px 8px' }}>Retrieve Germination History</Button>
          </FormControl>
          <FormControl sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', border: 1, borderRadius: 1, borderColor: "#C1FF72", p: '2em', minWidth: 600, m: '0.5em' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <FormLabel> Enter batch's Id </FormLabel>
              <TextField type="text" variant='filled' size="small"
                onChange={(e) => setBatchId(e.target.value)}
                value={batchId}></TextField>
            </div>
            <Button variant="contained" onClick={_retrieveStimulateEvents} sx={{ fontSize: '0.7rem', padding: '4px 8px' }}>Retrieve Pesticide History</Button>
          </FormControl>
          <FormControl sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', border: 1, borderRadius: 1, borderColor: "#C1FF72", p: '2em', minWidth: 600, m: '0.5em' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <FormLabel> Enter batch's Id </FormLabel>
              <TextField type="text" variant='filled' size="small"
                onChange={(e) => setBatchId(e.target.value)}
                value={batchId}></TextField>
            </div>
            <Button variant="contained" onClick={_retrieveTransportEvents} sx={{ fontSize: '0.7rem', padding: '4px 8px' }}>Retrieve Transport History</Button>
          </FormControl>
          <FormControl sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', border: 1, borderRadius: 1, borderColor: "#C1FF72", p: '2em', minWidth: 600, m: '0.5em' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <FormLabel> Enter batch's Id </FormLabel>
              <TextField type="text" variant='filled' size="small"
                onChange={(e) => setBatchId(e.target.value)}
                value={batchId}></TextField>
            </div>
            <Button variant="contained" onClick={_retrieveBuySeedsEvents} sx={{ fontSize: '0.7rem', padding: '4px 8px' }}>Retrieve Seed Origin</Button>
          </FormControl>
          <FormControl sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', border: 1, borderRadius: 1, borderColor: "#C1FF72", p: '2em', minWidth: 600, m: '0.5em' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <FormLabel> Enter batch's Id </FormLabel>
              <TextField type="text" variant='filled' size="small"
                onChange={(e) => setBatchId(e.target.value)}
                value={batchId}></TextField>
            </div>
            <Button variant="contained" onClick={_retrieveStoringEvents} sx={{ fontSize: '0.7rem', padding: '4px 8px' }}>Retrieve Storing History</Button>
          </FormControl>
          <FormControl sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', border: 1, borderRadius: 1, borderColor: "#C1FF72", p: '2em', minWidth: 600, m: '0.5em' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <FormLabel> Enter batch's Id </FormLabel>
              <TextField type="text" variant='filled' size="small"
                onChange={(e) => setBatchId(e.target.value)}
                value={batchId}></TextField>
            </div>
            <Button variant="contained" onClick={_retrieveHarvestEvents} sx={{ fontSize: '0.7rem', padding: '4px 8px' }}>Retrieve Harvest Date</Button>
          </FormControl>
          <FormControl sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', border: 1, borderRadius: 1, borderColor: "#C1FF72", p: '2em', minWidth: 600, m: '0.5em' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <FormLabel> Enter batch's Id </FormLabel>
              <TextField type="text" variant='filled' size="small"
                onChange={(e) => setBatchId(e.target.value)}
                value={batchId}></TextField>
            </div>
            <Button variant="contained" onClick={_retrieveDisplayEvents} sx={{ fontSize: '0.7rem', padding: '4px 8px' }}>Retrieve Vegetables Display Date</Button>
          </FormControl>
          <FormControl sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', border: 1, borderRadius: 1, borderColor: "#C1FF72", p: '2em', minWidth: 600, m: '0.5em' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <FormLabel> Enter batch's Id </FormLabel>
              <TextField type="text" variant='filled' size="small"
                onChange={(e) => setBatchId(e.target.value)}
                value={batchId}></TextField>
            </div>
            <Button variant="contained" onClick={_retrievePlantEvents} sx={{ fontSize: '0.7rem', padding: '4px 8px' }}>Retrieve Plant Date</Button>
          </FormControl>
          <FormControl sx={{ display: "flex", flexDirection: "column", justifyContent: 'space-between', border: 1, borderRadius: 1, borderColor: "#C1FF72", p: '2em', maxWidth: 600 }}>
            <FormLabel> Companies have to pay a 0.001 eth fee to be an actor of the supply chain. After registration, the Administrator will add the company. </FormLabel>
            <Button variant="contained" onClick={_registerActor} sx={{ fontSize: '0.75rem' }}>Register Actor</Button>
          </FormControl>
        </CardActions>
      </Card>

      <Card variant="outlined" sx={{ display: "flex", flexDirection:"column", justifyContent: "flex-start", alignItems: "center", minWidth: '1500' }}>
        <CardContent sx={{ minWidth: '1500', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", px:'5em' }}>
          <Typography variant="h2" component="div" color={"#C1FF72"} sx={{mb: "1em"}}>
            Search Results
            </Typography>
            <Typography variant='body1' component="div">
            <div style= {{border: 1, borderRadius: 1, borderColor: "#C1FF72", p: '2em', minWidth: "1500"}}> 
            {events.length > 0 ? (
                events.map(renderEvent)
              ) : (
                <div>No events found.</div>
              )}
            </div>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}