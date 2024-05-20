import {
    retrieveFarmer, retrievePesticideSeller, retrieveWarehouse, retrieveDistributer, retrieveStore, 
    retrieveSeedSeller
  } from '../utils/ContractAdapter';

export async function enhanceGerminateSeedsEvents(events, chainId) {
    const enhancedEvents = await Promise.all(events.map(async event => {
      let enhancedEvent = new Map();
      enhancedEvent.set('Farmer', enhanceActor(await retrieveFarmer(event.returnValues.farmer, chainId)));
      enhancedEvent.set('Germination Date', new Date(Number(event.returnValues.date) * 1000).toLocaleString());

      return enhancedEvent;
    }));
    return enhancedEvents;
}

export async function enhanceStimulateEvents(events, chainId) {
    const enhancedEvents = await Promise.all(events.map(async event => {
        let enhancedEvent = new Map();

        enhancedEvent.set('Pesticide Seller', enhanceActor(await retrievePesticideSeller(event.returnValues.pesticideSeller, chainId)));
        enhancedEvent.set('Farmer', enhanceActor(await retrieveFarmer(event.returnValues.farmer, chainId)));
        enhancedEvent.set('Stimulation Date', new Date(Number(event.returnValues.date) * 1000).toLocaleString());
  
        return enhancedEvent;
      }));
      return enhancedEvents;
  }

export async function enhanceTransportEvents(events, chainId) {
    const enhancedEvents = await Promise.all(events.map(async event => {
        let enhancedEvent = new Map();
        enhancedEvent.set('Distributer', enhanceActor(await retrieveDistributer(event.returnValues.distributer, chainId)));
        enhancedEvent.set('Source', enhanceActor(await retrieveSource(event.returnValues.from, chainId)));
        enhancedEvent.set('Destination', enhanceActor(await retrieveDestination(event.returnValues.to, chainId)));

        enhancedEvent.set('Pickup Date', new Date(Number(event.returnValues.date) * 1000).toLocaleString());
  
        return enhancedEvent;
      }));
      return enhancedEvents;
  }

 export async function enhanceBuySeedsEvents(events, chainId) {
    const enhancedEvents = await Promise.all(events.map(async event => {
        let enhancedEvent = new Map();
        enhancedEvent.set('Seed Seller', enhanceActor(await retrieveSeedSeller(event.returnValues.seedSeller, chainId)));
        enhancedEvent.set('Farmer', enhanceActor(await retrieveFarmer(event.returnValues.farmer, chainId)));

        enhancedEvent.set('Purchase Date', new Date(Number(event.returnValues.date) * 1000).toLocaleString());
  
        return enhancedEvent;
      }));
      return enhancedEvents;
  }

 export async function enhanceStoringEvents(events, chainId) {
    const enhancedEvents = await Promise.all(events.map(async event => {
        let enhancedEvent = new Map();
        enhancedEvent.set('Location', enhanceActor(await retrieveDestination(event.returnValues.location, chainId)));

        enhancedEvent.set('Storage Date', new Date(Number(event.returnValues.date) * 1000).toLocaleString());
  
        return enhancedEvent;
      }));
      return enhancedEvents;
  }

export async function enhanceHarvestEvents(events, chainId) {
    const enhancedEvents = await Promise.all(events.map(async event => {
        let enhancedEvent = new Map();
        enhancedEvent.set('Farmer', enhanceActor(await retrieveFarmer(event.returnValues.farmer, chainId)));

        enhancedEvent.set('Harvest Date', new Date(Number(event.returnValues.date) * 1000).toLocaleString());
  
        return enhancedEvent;
      }));
      return enhancedEvents;
  }

export async function enhanceDisplayEvents(events, chainId) {
    const enhancedEvents = await Promise.all(events.map(async event => {
        let enhancedEvent = new Map();
        enhancedEvent.set('Store', enhanceActor(await retrieveStore(event.returnValues.store, chainId)));

        enhancedEvent.set('Display Date', new Date(Number(event.returnValues.date) * 1000).toLocaleString());
  
        return enhancedEvent;
      }));
      return enhancedEvents;
  }

export  async function enhancePlantEvents(events, chainId) {
    const enhancedEvents = await Promise.all(events.map(async event => {
        let enhancedEvent = new Map();
        enhancedEvent.set('Farmer', enhanceActor(await retrieveFarmer(event.returnValues.farmer, chainId)));

        enhancedEvent.set('Planting Date', new Date(Number(event.returnValues.date) * 1000).toLocaleString());
  
        return enhancedEvent;
      }));
      return enhancedEvents;
  }

  async function retrieveSource(address, chainId) {
    return retrieveFarmer(address, chainId).then(async (farmer) => {
      if (farmer.isActive == true) return farmer;
      else return retrieveWarehouse(address, chainId);
    })
  }

  async function retrieveDestination(address, chainId) {
    return retrieveWarehouse(address, chainId).then(async (warehouse) => {
      if (warehouse.isActive == true) return warehouse;
      else return retrieveStore(address, chainId);
    })
  }

  function enhanceActor(actor) {
    let enhancedActor = new Map();
    enhancedActor.set("companyName", actor.companyName);
    enhancedActor.set("companyAddress", actor.companyAddress);
    enhancedActor.set("companyLink", actor.companyLink);
    enhancedActor.set("creationDate", new Date(Number(actor.initialDate) * 1000).toLocaleString())
  
    return enhancedActor;
  }
