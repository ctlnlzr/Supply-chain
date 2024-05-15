import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const ARBITRUM_ONE_SEPOLIA_URL = process.env.ARBITRUM_ONE_SEPOLIA_URL;
const OP_SEPOLIA_URL = process.env.OP_SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    arbitrum_one_sepolia: {
      url: ARBITRUM_ONE_SEPOLIA_URL,
      accounts: [PRIVATE_KEY!],
      gas: 2100000,
      gasPrice: 8000000000,
    },
    op_sepolia: {
      url: OP_SEPOLIA_URL,
      accounts: [PRIVATE_KEY!],
      gas: 2100000,
      gasPrice: 8000000000,  
    }
  }
};

export default config;
