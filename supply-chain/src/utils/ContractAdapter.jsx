import Web3 from "web3";
import { abi } from "../contractJson/VegetablesSupplyChain.json";

const readProvider = new Web3("https://arb-sepolia.g.alchemy.com/v2/u6BvkZtN5egHTZ56q-2O-oFQoeUl4Akv");
const readContract = new readProvider.eth.Contract(abi, "0x632d680897a42749a981856259CE64f988177025");


const writeProvider = new Web3(window.ethereum);
const writeContract = new writeProvider.eth.Contract(abi, "0x632d680897a42749a981856259CE64f988177025");

export function getUserRole(address) {
        return readContract.methods.distributers(address).call()
            .then(distributer => {
                if (distributer.isActive === true) return "DISTRIBUTER";
                return readContract.methods.farmers(address).call();
            })
            .then(farmer => {
                if (farmer && farmer.isActive === true) return "FARMER";
                return readContract.methods.pesticidesSellers(address).call();
            })
            .then(pesticidesSeller => {
                if (pesticidesSeller && pesticidesSeller.isActive === true) return "PESTICIDE_SELLER";
                return readContract.methods.seedSellers(address).call();
            })
            .then(seedSeller => {
                if (seedSeller && seedSeller.isActive === true) return "SEED_SELLER";
                return readContract.methods.warehouses(address).call();
            })
            .then(warehouse => {
                if (warehouse && warehouse.isActive === true) return "WAREHOUSE";
                return readContract.methods.stores(address).call();
            })
            .then(store => {
                if (store && store.isActive === true) return "STORE";
                return readContract.methods.administrator().call();
            })
            .then(adminAddress => {
                if (adminAddress.toUpperCase() === address.toUpperCase()) return "ADMINISTRATOR";
                return "CLIENT";
            })
            .catch(error => {
                console.error("Retrieve role", error);
            });
    }

export function buySeeds(seedSellerAddress, plantType) {
   writeContract.methods.buySeeds(seedSellerAddress, plantType).call()
   .then(() => { console.log("BuySeeds succeeded"); return "success";})
   .catch((error) => console.error(error));
}

export function germinateSeeds(batchId) {
   writeContract.methods.germinateSeeds(batchId).call()
   .then(() => { console.log("Germinate Seeds succeeded"); return "success";})
   .catch((error) => console.error(error));
}

export function plant(batchId){        
   writeContract.methods.plant(batchId).call()
   .then(() => { console.log("Plant succeeded"); return "success";})
   .catch((error) => console.error(error));
}

export function stimulate(batchId, pesticideSeller, pesticideType) { 
writeContract.methods.stimulate(batchId, pesticideSeller, pesticideType).call()
.then(() => { console.log("Stimulate succeeded"); return "success";})
.catch((error) => console.error(error));
}

export function harvest(batchId) {
        writeContract.methods.harvest(batchId).call()
        .then(() => { console.log("Harvest succeeded"); return "success";})
        .catch((error) => console.error(error));
}

export function transport(batchId, from, to) {
        writeContract.methods.transport(batchId, from, to).call()
        .then(() => { console.log("Transport succeeded"); return "success";})
        .catch((error) => console.error(error));
}

export function store(batchId, location) {
        writeContract.methods.store(batchId, location).call()
        .then(() => { console.log("Store succeeded"); return "success";})
        .catch((error) => console.error(error));
}

export function displayVegetables(batchId) {
        writeContract.methods.displayVegetables(batchId).call()
        .then(() => { console.log("DisplayVegetables succeeded"); return "success";})
        .catch((error) => console.error(error));
}

export function registerActor(actorAddress) {
        writeContract.methods.registerActor().send({
          from: actorAddress,
          value: Web3.utils.toWei('0.001', 'ether'),
        })
        .on('transactionHash', (hash) => {
                console.log('Transaction Hash: ', hash);
        })
        .on('confirmation', (confirmationNumber) => {
                console.log('Confirmation: ', confirmationNumber);
        })
        .on('receipt', (receipt) => {
                console.log('Receipt: ', receipt);
        })
        .on('error', (error) => {
                console.error('RegisterActor Error: ', error);
        });
}

export function addActor(actorAddress, companyAddress, companyLink, companyName, role) {
        // console.log(writeProvider.eth.getAccounts().then(accounts => console.log(accounts[0])));
        writeContract.methods.addActor(actorAddress, companyAddress, companyLink, companyName, role).call()
        .then(() => { console.log("Registration succeeded"); return "success";})
        .catch((error) => console.error(error));
}

export function formatBalance (rawBalance) {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
    return balance;
  };
  
export function formatChainAsNum (chainIdHex) {
    const chainIdNum = parseInt(chainIdHex);
    return chainIdNum;
  };
