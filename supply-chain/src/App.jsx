import './App.css';
import * as React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, CssBaseline, Toolbar, Container, Fab, Fade, Button, Hidden } from '@mui/material';
import logo from "./assets/logo.png";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Administrator from './components/Administrator';
import Client from './components/Client';
import PesticideSeller from './components/PesticideSeller';
import SeedSeller from './components/SeedSeller';
import Warehouse from './components/Warehouse';
import Farmer from './components/Farmer';
import Distributer from './components/Distributer';
import Store from './components/Store';
import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { getUserRole } from './utils/ContractAdapter';
import { formatBalance } from './utils/ContractAdapter';


function ScrollTop(props){
  const { children } = props;

  const handlerClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor',);

    if (anchor) {
      anchor.scrollIntoView({block:'center',});
    }
  };

  return (
    <Fade>
      <Box onClick={handlerClick}
           role="presentation"
           sx={{position: 'fixed', bottom: 16, right: 16}}>
            {children}
           </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
}

function App(props) {
  const [hasProvider, setHasProvider] = useState(false);
  const initialState = {accounts: [], balance: "", chainId: ""};
  const [wallet, setWallet] = useState(initialState);
  const [role, setRole] = useState("CLIENT");


  useEffect(() => {
    const refreshAccounts = (accounts) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
        refreshRole(accounts)
      } else {
        setWallet(initialState);
      }
    };

    const refreshChain = (chainId) => {
      setWallet((wallet) => ({...wallet, chainId}));
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({silent: true});
      setHasProvider(Boolean(provider));

      if (provider) {
        const accounts = await window.ethereum.request({method: "eth_accounts"});
        refreshAccounts(accounts);  

        window.ethereum.on("accountsChanged", refreshAccounts);
        window.ethereum.on("chainChanged", refreshChain);
      }
    };

    getProvider();
    return () => {
      window.ethereum?.removeListener("accountsChanged", refreshAccounts);
      window.ethereum?.removeListener("chainChanged", refreshChain);
    };
  }, []);

  const updateWallet = async (accounts) => {
    const balance = formatBalance(await window.ethereum.request({method: "eth_getBalance", params: [accounts[0], "latest"],}));
    const chainId = await window.ethereum.request({method: "eth_chainId",});
  
    setWallet({accounts, balance, chainId});
  };

  
  const refreshRole = async (accounts) => {
    if(accounts[0] == undefined) setRole("CLIENT"); 
    else {
      const currentRole = await getUserRole(accounts[0]);
      setRole(currentRole);
    }
  }

  const handlerConnect = async () => {
    console.log("connect to metamask");
    let accounts = await window.ethereum.request({method: "eth_requestAccounts", });
    updateWallet(accounts);
  }

  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <AppBar>
          <Toolbar sx={{backgroundColor: "#C1FF72", display:"flex", flexDirection: "row", justifyContent: 'space-between'}}>
            <img src={logo} style={{width: "120px", height: "1/5", m: 0, p: 0}}/>
            {window.ethereum?.isMetaMask && wallet.accounts.length < 1 
            && <Button sx={{color: "#8F5BBD"}}
                       variant="outlined"
                       onClick={handlerConnect}>Connect with Metamask</Button> }
          </Toolbar>
        </AppBar>
        <Toolbar id="back-to-top-anchor" />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            gridTemplateRows: 'auto',
            gridTemplateAreas: `". . ."
          ". main . "
          ". . ."`,
          }}
        >
          <Box sx={{ gridArea: 'main',}}>
            {role === "PESTICIDE_SELLER" && <PesticideSeller address={wallet.accounts[0]}/>}
            {role === "ADMINISTRATOR" && <Administrator address={wallet.accounts[0]}/>}
            {role === "DISTRIBUTER" && <Distributer address={wallet.accounts[0]}/>}            
            {role === "SEED_SELLER" && <SeedSeller address={wallet.accounts[0]}/>}
            {role === "WAREHOUSE" && <Warehouse address={wallet.accounts[0]}/>}
            {role === "FARMER" && <Farmer address={wallet.accounts[0]}/>}
            {role === "CLIENT" && <Client address={wallet.accounts[0]}/>}
            {role === "STORE" && <Store address={wallet.accounts[0]}/>}
           </Box>
        </Box>
      <Container sx={{display:"flex", justifyContent: "center", alignItems:"center", height: "100%", width: "100%"}}>
      </Container>
      <ScrollTop {...props}>
          <Fab size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
          </Fab>
      </ScrollTop>
      </React.Fragment>
    </>
  )
}

export default App
