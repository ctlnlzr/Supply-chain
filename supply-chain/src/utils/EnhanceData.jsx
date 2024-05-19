import {
    retrieveFarmer, retrievePesticideSeller, retrieveWarehouse, retrieveDistributer, retrieveStore, 
    retrieveSeedSeller
  } from '../utils/ContractAdapter';

export async function enhanceGerminateSeedsEvents(events) {
    const enhancedEvents = await Promise.all(events.map(async event => {
      let enhancedEvent = new Map();
      enhancedEvent.set('Farmer', enhanceActor(await retrieveFarmer(event.returnValues.farmer)));
      enhancedEvent.set('Germination Date', new Date(Number(event.returnValues.date) * 1000).toLocaleString());

      return enhancedEvent;
    }));
    return enhancedEvents;
}

export async function enhanceStimulateEvents(events) {
    const enhancedEvents = await Promise.all(events.map(async event => {
        let enhancedEvent = new Map();

        enhancedEvent.set('Pesticide Seller', enhanceActor(await retrievePesticideSeller(event.returnValues.pesticideSeller)));
        enhancedEvent.set('Farmer', enhanceActor(await retrieveFarmer(event.returnValues.farmer)));
        enhancedEvent.set('Stimulation Date', new Date(Number(event.returnValues.date) * 1000).toLocaleString());
  
        return enhancedEvent;
      }));
      return enhancedEvents;
  }

export async function enhanceTransportEvents(events) {
    const enhancedEvents = await Promise.all(events.map(async event => {
        let enhancedEvent = new Map();
        enhancedEvent.set('Distributer', enhanceActor(await retrieveDistributer(event.returnValues.distributer)));
        enhancedEvent.set('Source', enhanceActor(await retrieveSource(event.returnValues.from)));
        enhancedEvent.set('Destination', enhanceActor(await retrieveDestination(event.returnValues.to)));

        enhancedEvent.set('Pickup Date', new Date(Number(event.returnValues.date) * 1000).toLocaleString());
  
        return enhancedEvent;
      }));
      return enhancedEvents;
  }

 export async function enhanceBuySeedsEvents(events) {
    const enhancedEvents = await Promise.all(events.map(async event => {
        let enhancedEvent = new Map();
        enhancedEvent.set('Seed Seller', enhanceActor(await retrieveSeedSeller(event.returnValues.seedSeller)));
        enhancedEvent.set('Farmer', enhanceActor(await retrieveFarmer(event.returnValues.farmer)));

        enhancedEvent.set('Purchase Date', new Date(Number(event.returnValues.date) * 1000).toLocaleString());
  
        return enhancedEvent;
      }));
      return enhancedEvents;
  }

 export async function enhanceStoringEvents(events) {
    const enhancedEvents = await Promise.all(events.map(async event => {
        let enhancedEvent = new Map();
        enhancedEvent.set('Location', enhanceActor(await retrieveDestination(event.returnValues.location)));

        enhancedEvent.set('Storage Date', new Date(Number(event.returnValues.date) * 1000).toLocaleString());
  
        return enhancedEvent;
      }));
      return enhancedEvents;
  }

export async function enhanceHarvestEvents(events) {
    const enhancedEvents = await Promise.all(events.map(async event => {
        let enhancedEvent = new Map();
        enhancedEvent.set('Farmer', enhanceActor(await retrieveFarmer(event.returnValues.farmer)));

        enhancedEvent.set('Harvest Date', new Date(Number(event.returnValues.date) * 1000).toLocaleString());
  
        return enhancedEvent;
      }));
      return enhancedEvents;
  }

export async function enhanceDisplayEvents(events) {
    const enhancedEvents = await Promise.all(events.map(async event => {
        let enhancedEvent = new Map();
        enhancedEvent.set('Store', enhanceActor(await retrieveStore(event.returnValues.store)));

        enhancedEvent.set('Display Date', new Date(Number(event.returnValues.date) * 1000).toLocaleString());
  
        return enhancedEvent;
      }));
      return enhancedEvents;
  }

export  async function enhancePlantEvents(events) {
    const enhancedEvents = await Promise.all(events.map(async event => {
        let enhancedEvent = new Map();
        enhancedEvent.set('Farmer', enhanceActor(await retrieveFarmer(event.returnValues.farmer)));

        enhancedEvent.set('Planting Date', new Date(Number(event.returnValues.date) * 1000).toLocaleString());
  
        return enhancedEvent;
      }));
      return enhancedEvents;
  }

  async function retrieveSource(address) {
    return retrieveFarmer(address).then(async (farmer) => {
      if (farmer.isActive == true) return farmer;
      else return retrieveWarehouse(address);
    })
  }

  async function retrieveDestination(address) {
    return retrieveWarehouse(address).then(async (warehouse) => {
      if (warehouse.isActive == true) return warehouse;
      else return retrieveStore(address);
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
