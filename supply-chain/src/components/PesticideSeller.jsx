import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { renderEvent } from '../utils/RenderingUtils';
import { useState } from "react";
import { FormControl } from '@mui/material';
import { retrieveStimulateEventsByAddress } from '../utils/ContractAdapter';
import { enhanceStimulateEvents } from '../utils/EnhanceData';

const role = (
  <Box
    component="span"
    sx={{ display: 'inline-block', color: "#8F5BBD" }}
  >
    Pesticide Seller
  </Box>
);

export default function PesticideSeller(props) {
  const [events, setEvents] = useState([]);

  async function _retrieveStimulateEvents() {
    const contractEvents = await retrieveStimulateEventsByAddress(props.address, props.chainId);
    const enhancedEvents = await enhanceStimulateEvents(contractEvents);

    setEvents(enhancedEvents);
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
          <FormControl sx={{ display: "flex", flexDirection: "row", justifyContent: 'center', border: 1, borderRadius: 1, borderColor: "#C1FF72", p: '2em', minWidth: 600, m: '0.5em' }}>
            <Button variant="contained" onClick={_retrieveStimulateEvents}>Retrieve History</Button>
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