import Web3 from "web3";
import { abi } from "../contractJson/VegetablesSupplyChain.json";

const readProviderArb = new Web3("https://arb-sepolia.g.alchemy.com/v2/u6BvkZtN5egHTZ56q-2O-oFQoeUl4Akv");
const readContractArb = new readProviderArb.eth.Contract(abi, "0x632d680897a42749a981856259CE64f988177025");

const readProviderOp = new Web3("https://opt-sepolia.g.alchemy.com/v2/6vmQtTRGOMNZhlfHFn0dMHzj5Cbq-uMT");
const readContractOp = new readProviderOp.eth.Contract(abi, "0x632d680897a42749a981856259CE64f988177025");

const writeProvider = new Web3(window.ethereum);
const writeContract = new writeProvider.eth.Contract(abi, "0x632d680897a42749a981856259CE64f988177025");

export function getUserRole(address, chainId) {
        return getReadContract(chainId).methods.distributers(address).call()
                .then(distributer => {
                        if (distributer.isActive === true) return "DISTRIBUTER";
                        return getReadContract(chainId).methods.farmers(address).call()
                                .then(farmer => {
                                        if (farmer.isActive === true) return "FARMER";
                                        return getReadContract(chainId).methods.pesticidesSellers(address).call()
                                                .then(pesticidesSeller => {
                                                        if (pesticidesSeller.isActive === true) return "PESTICIDE_SELLER";
                                                        return getReadContract(chainId).methods.seedSellers(address).call()
                                                                .then(seedSeller => {
                                                                        if (seedSeller.isActive === true) return "SEED_SELLER";
                                                                        return getReadContract(chainId).methods.warehouses(address).call()
                                                                                .then(warehouse => {
                                                                                        if (warehouse.isActive === true) return "WAREHOUSE";
                                                                                        return getReadContract(chainId).methods.stores(address).call()
                                                                                                .then(store => {
                                                                                                        if (store.isActive === true) return "STORE";
                                                                                                        return getReadContract(chainId).methods.administrator().call()
                                                                                                                .then(adminAddress => {
                                                                                                                        if (adminAddress.toUpperCase() === address.toUpperCase()) return "ADMINISTRATOR";
                                                                                                                        return "CLIENT";
                                                                                                                })
                                                                                                })
                                                                                })
                                                                })
                                                })
                                })
                })
                .catch(error => {
                        console.error("Retrieve role", error);
                });
}

export function buySeeds(senderAddress, seedSellerAddress, plantType) {
        writeContract.methods.buySeeds(seedSellerAddress, plantType)
                .send({ from: senderAddress })
                .then(() => { console.log("BuySeeds succeeded"); return "success"; })
                .catch((error) => console.error(error));
}

export function germinateSeeds(senderAddress, batchId) {
        writeContract.methods.germinateSeeds(batchId)
                .send({ from: senderAddress })
                .then(() => { console.log("Germinate Seeds succeeded"); return "success"; })
                .catch((error) => console.error(error));
}

export function plant(senderAddress, batchId) {
        writeContract.methods.plant(batchId)
                .send({ from: senderAddress })
                .then(() => { console.log("Plant succeeded"); return "success"; })
                .catch((error) => console.error(error));
}

export function stimulate(senderAddress, batchId, pesticideSeller, pesticideType) {
        writeContract.methods.stimulate(batchId, pesticideSeller, pesticideType)
                .send({ from: senderAddress })
                .then(() => { console.log("Stimulate succeeded"); return "success"; })
                .catch((error) => console.error(error));
}

export function harvest(senderAddress, batchId) {
        writeContract.methods.harvest(batchId)
                .send({ from: senderAddress })
                .then(() => { console.log("Harvest succeeded"); return "success"; })
                .catch((error) => console.error(error));
}

export function transport(senderAddress, batchId, from, to) {
        writeContract.methods.transport(batchId, from, to)
                .send({ from: senderAddress })
                .then(() => { console.log("Transport succeeded"); return "success"; })
                .catch((error) => console.error(error));
}

export function store(senderAddress, batchId, location) {
        writeContract.methods.store(batchId, location)
                .send({ from: senderAddress })
                .then(() => { console.log("Store succeeded"); return "success"; })
                .catch((error) => console.error(error));
}

export function displayVegetables(senderAddress, batchId) {
        writeContract.methods.displayVegetables(batchId)
                .send({ from: senderAddress })
                .then(() => { console.log("DisplayVegetables succeeded"); return "success"; })
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

export function addActor(senderAddress, actorAddress, companyAddress, companyLink, companyName, role) {
        writeContract.methods.addActor(actorAddress, companyAddress, companyLink, companyName, role)
                .send({ from: senderAddress })
                .then(() => { console.log("Registration succeeded"); return "success"; })
                .catch((error) => console.error(error));
}

export function retrieveStimulateEvents(_batchId, _chainId) {
        return getReadContract(_chainId).getPastEvents('Stimulate', {
                filter: { batchId: _batchId },
                fromBlock: 0,
                toBlock: 'latest'
        });
}

export function retrieveTransportEvents(_batchId, _chainId) {
        return getReadContract(_chainId).getPastEvents('Transport', {
                filter: { batchId: _batchId },
                fromBlock: 0,
                toBlock: 'latest'
        });
}

export function retrieveBuySeedsEvents(_batchId, _chainId) {
        return getReadContract(_chainId).getPastEvents('BuySeeds', {
                filter: { batchId: _batchId },
                fromBlock: 0,
                toBlock: 'latest'
        });
}

export function retrieveGerminateSeedsEvents(_batchId, _chainId) {
       return getReadContract(_chainId).getPastEvents('GerminateSeeds', {
                filter: { batchId: _batchId },
                fromBlock: 0,
                toBlock: 'latest'
        });
}

export function retrieveStoringEvents(_batchId, _chainId) {
        return getReadContract(_chainId).getPastEvents('Storing', {
                filter: { batchId: _batchId },
                fromBlock: 0,
                toBlock: 'latest'
        });
}

export function retrieveHarvestEvents(_batchId, _chainId) {
        return getReadContract(_chainId).getPastEvents('Harvest', {
                filter: { batchId: _batchId },
                fromBlock: 0,
                toBlock: 'latest'
        });
}

export function retrieveDisplayEvents(_batchId, _chainId) {
       return getReadContract(_chainId).getPastEvents('Display', {
                filter: { batchId: _batchId },
                fromBlock: 0,
                toBlock: 'latest'
        });
}

export function retrievePlantEvents(_batchId, _chainId) {
        return getReadContract(_chainId).getPastEvents('Plant', {
                filter: { batchId: _batchId },
                fromBlock: 0,
                toBlock: 'latest'
        });
}

export function retrieveStimulateEventsByAddress(_address, _chainId) {
        return getReadContract(_chainId).getPastEvents('Stimulate', {
                filter: { pesticideSeller: _address },
                fromBlock: 0,
                toBlock: 'latest'
        });
}

export function retrieveStoreEventsByAddress(_address, _chainId) {
        return getReadContract(_chainId).getPastEvents('Storing', {
                filter: { location: _address },
                fromBlock: 0,
                toBlock: 'latest'
        });
}

export function retrieveBuySeedsEventsByAddress(_address, _chainId) {
        return getReadContract(_chainId).getPastEvents('BuySeeds', {
                filter: { seedSeller: _address },
                fromBlock: 0,
                toBlock: 'latest'
        });
}

export function retrieveSeedSeller(address, chainId) {
        return getReadContract(chainId).methods.seedSellers(address).call();
}

export function retrieveDistributer(address, chainId) {
        return getReadContract(chainId).methods.distributers(address).call();
}

export function retrievePesticideSeller(address, chainId) {
        return getReadContract(chainId).methods.pesticidesSellers(address).call();
}

export function retrieveWarehouse(address, chainId) {
        return getReadContract(chainId).methods.warehouses(address).call();
}

export function retrieveStore(address, chainId) {
        return getReadContract(chainId).methods.stores(address).call();
}

export function retrieveFarmer(address, chainId) {
        return getReadContract(chainId).methods.farmers(address).call();
}

export function formatBalance(rawBalance) {
        const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
        return balance;
};

export function formatChainAsNum(chainIdHex) {
        const chainIdNum = parseInt(chainIdHex);
        return chainIdNum;
};

function getReadContract(chainId) {
        if (chainId==="0xaa37dc") return readContractOp;
        else return readContractArb
}