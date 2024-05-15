import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl } from '@mui/material';
import { FormLabel } from '@mui/material';
import { registerActor } from '../utils/ContractAdapter';

const role = (
  <Box
    component="span"
    sx={{ display: 'inline-block', color: "#8F5BBD"}}
  >
    Client
  </Box>
);

export default function Client(props) {
  function _registerActor() {
    registerActor(props.address);
  }

  return (
    <Box sx={{ minWidth: 700 }}>
      <Card variant="outlined" sx={{display:"flex", flexDirection:"column", justifyContent: "center", alignItems:"center"}}>
          <CardContent>
            <Typography variant="h2" component="div" color={"#C1FF72"}>
              Hello, {role}!
            </Typography>
          </CardContent>
          <CardActions>
            <FormControl  sx={{display:"flex", flexDirection: "column", justifyContent: 'space-between', border: 1,  borderRadius: 1, borderColor: "#C1FF72", p: '2em'}}>
              <FormLabel> Companies have to pay a 0.001 eth fee to be an actor of the supply chain. After registration, the Administrator will add the company. </FormLabel>
              <Button variant="contained" onClick={_registerActor}>Register Actor</Button>
            </FormControl>
        </CardActions>
      </Card>
    </Box>
  );
}