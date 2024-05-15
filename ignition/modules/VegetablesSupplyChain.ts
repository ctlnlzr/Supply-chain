import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const VegetablesSupplyChainModule = buildModule("VegetablesSupplyChainModule", (m) => {
  const chai = m.contract("VegetablesSupplyChain");

  return { chai };
});

export default VegetablesSupplyChainModule;
