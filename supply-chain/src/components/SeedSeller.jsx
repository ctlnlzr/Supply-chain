import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const role = (
  <Box
    component="span"
    sx={{ display: 'inline-block', color: "#8F5BBD"}}
  >
    Seed Seller
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h2" component="div" color={"#C1FF72"}>
        Hello, {role}!
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function SeedSeller() {
  return (
    <Box sx={{ minWidth: 700 }}>
      <Card variant="outlined" sx={{display:"flex", flexDirection:"column", justifyContent: "center", alignItems:"center"}}>{card}</Card>
    </Box>
  );
}