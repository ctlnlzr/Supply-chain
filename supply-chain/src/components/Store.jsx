import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { FormControl, FormLabel } from '@mui/material';
import { displayVegetables } from '../utils/ContractAdapter';
import { useState } from "react";

const role = (
  <Box
    component="span"
    sx={{ display: 'inline-block', color: "#8F5BBD" }}
  >
    Store
  </Box>
);


export default function Store(props) {
  const [batchId, setBatchId] = useState(0);

  function _displayVegetables() {
    displayVegetables(props.address, batchId, props.chainId);
    setBatchId(0);
  }

  return (
    <Box sx={{ minWidth: 800 }}>
      <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <CardContent>
          <Typography variant="h2" component="div" color={"#C1FF72"}>
            Hello, {role}!
          </Typography>
        </CardContent>

        <CardActions >
          <FormControl sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', border: 1, borderRadius: 1, borderColor: "#C1FF72", p: '2em', minWidth: 500 }}>
            <div style={{display: 'flex', flexDirection:'column'}}>
              <FormLabel> Enter batch's Id </FormLabel>
              <TextField type="text" variant='filled' size="small"
                onChange={(e) => setBatchId(e.target.value)}
                value={batchId}></TextField>
            </div>
            <Button variant="contained"
              onClick={_displayVegetables}>Display batch</Button>
          </FormControl>
        </CardActions>
      </Card>
    </Box>
  );
}