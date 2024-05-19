import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, TextField } from '@mui/material';
import { FormLabel } from '@mui/material';
import { addActor } from '../utils/ContractAdapter';
import { useState } from "react";

const role = (
  <Box
    component="span"
    sx={{ display: 'inline-block', color: "#8F5BBD" }}
  >
    Administrator
  </Box>
);

export default function Administrator(props) {
  const [companyAddress, setCompanyAddress] = useState('');
  const [actorAddress, setActorAddress] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyLink, setCompanyLink] = useState('');
  const [actorRole, setActorRole] = useState('');

  function _addActor() {
    addActor(props.address, actorAddress, companyAddress, companyLink, companyName, actorRole);
    setCompanyAddress('');
    setActorAddress('');
    setCompanyName('');
    setCompanyLink('');
    setActorRole('');
  }

  return (
    <Box sx={{ minWidth: 1500 }}>
      <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <CardContent>
          <Typography variant="h2" component="div" color={"#C1FF72"}>
            Hello, {role}!
          </Typography>
        </CardContent>
        <CardActions>
          <FormControl sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', border: 1, borderRadius: 1, borderColor: "#C1FF72", p: '2em' }}>
            <div>
              <FormLabel> Enter actor's address </FormLabel>
              <TextField type="text" variant='filled' size="small"
                onChange={(e) => setActorAddress(e.target.value)}
                value={actorAddress}
                required></TextField>
            </div>
            <div>
              <FormLabel> Enter company's name </FormLabel>
              <TextField type="text" variant='filled' size="small"
                onChange={(e) => setCompanyName(e.target.value)}
                value={companyName}
                required></TextField>
            </div>
            <div>
              <FormLabel> Enter company's address </FormLabel>
              <TextField type="text" variant='filled' size="small"
                onChange={(e) => setCompanyAddress(e.target.value)}
                value={companyAddress}
                required></TextField>
            </div>
            <div>
              <FormLabel> Enter company's site link </FormLabel>
              <TextField type="text" variant='filled' size="small"
                onChange={(e) => setCompanyLink(e.target.value)}
                value={companyLink}
                required></TextField>
            </div>
            <div>
              <FormLabel> Enter actor's role </FormLabel>
              <TextField type="text" variant='filled' size="small"
                onChange={(e) => setActorRole(e.target.value)}
                value={actorRole}
                required></TextField>
            </div>
            <Button variant="contained" onClick={_addActor}>Add Actor</Button>
          </FormControl>
        </CardActions>
      </Card>
    </Box>
  );
}