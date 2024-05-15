const hre = require("hardhat");

async function main() {
    const VegetablesSupplyChain = await hre.ethers.getContractFactory("VegetablesSupplyChain");
    const vegetablesSupplyChain = await VegetablesSupplyChain.deploy();

    await vegetablesSupplyChain.deployed();

    console.log("Deployed contract address: ", `${vegetablesSupplyChain.address}`);
}

main().catch((error) => {
    console.log(error);
})