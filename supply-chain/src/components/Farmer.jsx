import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { FormControl, FormLabel } from '@mui/material';
import { buySeeds, germinateSeeds, harvest, plant, stimulate } from '../utils/ContractAdapter';


const role = (
  <Box
    component="span"
    sx={{ display: 'inline-block', color: "#8F5BBD"}}
  >
    Farmer
  </Box>
);


export default function Farmer() {
  const [pesticideSeller, setPesticideSeller] = useState('');
  const [pesticideType, setPesticideType] = useState('');
  const [germinateId, setGerminateId] = useState(0);
  const [pesticideId, setPesticideId] = useState(0);
  const [seedSeller, setSeedSeller] = useState('');
  const [plantType, setPlantType] = useState('');
  const [harvestId, setHarvestId] = useState(0);
  const [plantId, setPlantId] = useState(0);

  function _germinateSeeds() {
    germinateSeeds(germinateId);
    setGerminateId(0);
  }

  function _obtainSeeds() {
    buySeeds(seedSeller, plantType);
    setSeedSeller('');
    setPlantType('');
  }

  function _stimulate() {
    stimulate(pesticideId, pesticideSeller, pesticideType);
    setPesticideSeller('');
    setPesticideType('');
    setPesticideId(0);
  }

  function _harvest() {
    harvest(harvestId);
    setHarvestId(0);
  }

  function _plant() {
    plant(plantId);
    setPlantId(0);
  }

  return (
    <Box sx={{ minWidth: 700 }}>
      <Card variant="outlined" sx={{display:"flex", flexDirection:"column", justifyContent: "center", alignItems:"center"}}>
    <CardContent>
      <Typography variant="h2" component="div" color={"#C1FF72"}>
        Hello, {role}!
      </Typography>
    </CardContent>
    <CardActions sx={{display:"flex", flexDirection: "column", alignItems: 'space-between', m: '2em'}}>
      <FormControl sx={{display:"flex", flexDirection: "row", justifyContent: 'space-between', border: 1,  borderRadius: 1, borderColor: "#C1FF72", p: '2em'}}>
        <div>
          <FormLabel> Enter seed seller's address </FormLabel>
          <TextField type="text" variant='filled' size="small"
          onChange={(e) => setSeedSeller(e.target.value)}
          value={seedSeller}></TextField>
        </div>
        <div>
          <FormLabel> Enter plant type </FormLabel>
          <TextField type="text" variant='filled' size="small"
          onChange={(e) => setPlantType(e.target.value)}
          value={plantType}></TextField>
        </div>
        <Button variant="contained"
        onClick={_obtainSeeds}>Obtain seeds</Button>
      </FormControl>
      
      <FormControl sx={{display:"flex", flexDirection: "row", justifyContent: 'space-between', border: 1,  borderRadius: 1, borderColor: "#C1FF72", p: '2em'}}>
        <div>
          <FormLabel> Enter batch id </FormLabel>
          <TextField type="text" variant='filled' size="small"
          onChange={(e) => setGerminateId(e.target.value)}
          value={germinateId}></TextField>
        </div>
        <Button variant="contained"
        onClick={_germinateSeeds}>Germinate Seeds</Button>
      </FormControl>
 
      <FormControl sx={{display:"flex", flexDirection: "row", justifyContent: 'space-between', border: 1,  borderRadius: 1, borderColor: "#C1FF72", p: '2em'}}>
        <div>
          <FormLabel> Enter batch id </FormLabel>
          <TextField type="text" variant='filled' size="small"
          onChange={(e) => setPlantId(e.target.value)}
          value={plantId}></TextField>
        </div>
        <Button variant="contained"
        onClick={_plant}>Plant Seeds</Button>
      </FormControl>
 
      <FormControl sx={{display:"flex", flexDirection: "row", justifyContent: 'space-between', border: 1,  borderRadius: 1, borderColor: "#C1FF72", p: '2em'}}>
        <div>
          <FormLabel> Enter batch id </FormLabel>
          <TextField type="text" variant='filled' size="small"
          onChange={(e) => setPesticideId(e.target.value)}
          value={pesticideId}></TextField>
        </div>
        <div>
          <FormLabel> Enter pesticide seller's address </FormLabel>
          <TextField type="text" variant='filled' size="small"
          onChange={(e) => setPesticideSeller(e.target.value)}
          value={pesticideSeller}></TextField>
        </div>
        <div>
          <FormLabel> Enter pesticide type </FormLabel>
          <TextField type="text" variant='filled' size="small"
          onChange={(e) => setPesticideType(e.target.value)}
          value={pesticideType}></TextField>
        </div>
        <Button variant="contained"
        onClick={_stimulate}>Stimulate batch</Button>
      </FormControl>
      
      <FormControl sx={{display:"flex", flexDirection: "row", justifyContent: 'space-between', border: 1,  borderRadius: 1, borderColor: "#C1FF72", p: '2em'}}>
        <div>
          <FormLabel> Enter batch id </FormLabel>
          <TextField type="text" variant='filled' size="small"
          onChange={(e) => setHarvestId(e.target.value)}
          value={harvestId}></TextField>
        </div>
        <Button variant="contained"
        onClick={_harvest}>Harvest</Button>
      </FormControl>
     </CardActions>
      </Card>
    </Box>
  );
}