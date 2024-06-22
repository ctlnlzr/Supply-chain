from web3 import Web3

##### Read Events Methods
def retrieve_stimulate_event(batch_id, contract):
    event_filter = contract.events.Stimulate.createFilter(fromBlock='0',
                                                          argument_filters={"batchId": batch_id})
    
    return event_filter.get_all_entries()


def retrieve_transport_event(batch_id, contract):
    event_filter = contract.events.Transport.createFilter(fromBlock='0',
                                                          argument_filters={"batchId": batch_id})
    
    return event_filter.get_all_entries()


def retrieve_plant_event(batch_id, contract):
    event_filter = contract.events.Plant.createFilter(fromBlock='0',
                                                      argument_filters={"batchId": batch_id})
    
    return event_filter.get_all_entries()

def get_batch(batch_id, contract):
    return contract.functions.plantBatches(batch_id).call()


#### Payment Methods

def register_actor(w3, contract, actor):
    transaction = contract.functions.registerActor().build_transaction({
    'nonce': w3.eth.get_transaction_count(actor.address),
    'value': Web3.to_wei(0.0001, 'ether'),
    'from': actor.address,
    'gas': 2000000,
    'gasPrice': w3.eth.gas_price + int(0.2 * w3.eth.gas_price)
   }) 
    signed_transaction = w3.eth.account.sign_transaction(transaction, actor._private_key)
    return w3.eth.send_raw_transaction(signed_transaction.rawTransaction)


#### Change Contract Storage

def buy_seeds(w3, contract, seed_seller, farmer):
    transaction = contract.functions.buySeeds(seed_seller.address, "Tomato").build_transaction({
    'nonce': w3.eth.get_transaction_count(farmer.address),
    'from': farmer.address,
    'gas': 2000000,
    'gasPrice': w3.eth.gas_price + int(0.2 * w3.eth.gas_price)
   }) 
    signed_transaction = w3.eth.account.sign_transaction(transaction, farmer._private_key)
    return w3.eth.send_raw_transaction(signed_transaction.rawTransaction)


def germinate_seeds(w3, contract, batch_id, farmer):
    transaction = contract.functions.germinateSeeds(batch_id).build_transaction({
    'nonce': w3.eth.get_transaction_count(farmer.address),
    'from': farmer.address,
    'gas': 2000000,
    'gasPrice': w3.eth.gas_price + int(0.2 * w3.eth.gas_price)
   }) 
    signed_transaction = w3.eth.account.sign_transaction(transaction, farmer._private_key)
    return w3.eth.send_raw_transaction(signed_transaction.rawTransaction)


def plant(w3, contract, batch_id, farmer):
    transaction = contract.functions.plant(batch_id).build_transaction({
    'nonce': w3.eth.get_transaction_count(farmer.address),
    'from': farmer.address,
    'gas': 2000000,
    'gasPrice': w3.eth.gas_price + int(0.2 * w3.eth.gas_price)
   }) 
    signed_transaction = w3.eth.account.sign_transaction(transaction, farmer._private_key)
    return w3.eth.send_raw_transaction(signed_transaction.rawTransaction)

def stimulate(w3, contract, batch_id, pesticide_seller, farmer):
    transaction = contract.functions.stimulate(batch_id, pesticide_seller.address, "Methamidophos").build_transaction({
    'nonce': w3.eth.get_transaction_count(farmer.address),
    'from': farmer.address,
    'gas': 2000000,
    'gasPrice': w3.eth.gas_price + int(0.2 * w3.eth.gas_price)
   }) 
    signed_transaction = w3.eth.account.sign_transaction(transaction, farmer._private_key)
    return w3.eth.send_raw_transaction(signed_transaction.rawTransaction)

def harvest(w3, contract, batch_id, farmer):
    transaction = contract.functions.harvest(batch_id).build_transaction({
    'nonce': w3.eth.get_transaction_count(farmer.address),
    'from': farmer.address,
    'gas': 2000000,
    'gasPrice': w3.eth.gas_price + int(0.2 * w3.eth.gas_price)
   }) 
    signed_transaction = w3.eth.account.sign_transaction(transaction, farmer._private_key)
    return w3.eth.send_raw_transaction(signed_transaction.rawTransaction)

def transport(w3, contract, batch_id, distributer, source, destination):
    transaction = contract.functions.transport(batch_id, source.address, destination.address).build_transaction({
    'nonce': w3.eth.get_transaction_count(distributer.address),
    'from': distributer.address,
    'gas': 2000000,
    'gasPrice': w3.eth.gas_price + int(0.2 * w3.eth.gas_price)
   }) 
    signed_transaction = w3.eth.account.sign_transaction(transaction, distributer._private_key)
    return w3.eth.send_raw_transaction(signed_transaction.rawTransaction)

def store(w3, contract, batch_id, location, distributer):
    transaction = contract.functions.store(batch_id, location.address).build_transaction({
    'nonce': w3.eth.get_transaction_count(distributer.address),
    'from': distributer.address,
    'gas': 2000000,
    'gasPrice': w3.eth.gas_price + int(0.2 * w3.eth.gas_price)
   }) 
    signed_transaction = w3.eth.account.sign_transaction(transaction, distributer._private_key)
    return w3.eth.send_raw_transaction(signed_transaction.rawTransaction)

def display_vegetables(w3, contract, store, batch_id):
    transaction = contract.functions.displayVegetables(batch_id).build_transaction({
    'nonce': w3.eth.get_transaction_count(store.address),
    'from': store.address,
    'gas': 2000000,
    'gasPrice': w3.eth.gas_price + int(0.2 * w3.eth.gas_price)
   }) 
    signed_transaction = w3.eth.account.sign_transaction(transaction, store._private_key)
    return w3.eth.send_raw_transaction(signed_transaction.rawTransaction)

def add_actor(w3, contract, administrator, actor, id, role):
    transaction = contract.functions.addActor(actor.address, 
                                              "Str. {}, Nr. {}".format(role, id),
                                              "https://{}_{}.com".format(role, id),
                                              "{}_{} SRL".format(role, id), 
                                              role ).build_transaction({
    'nonce': w3.eth.get_transaction_count(administrator.address),
    'from': administrator.address,
    'gas': 2000000,
    'gasPrice': w3.eth.gas_price + int(0.2 * w3.eth.gas_price)
   }) 
    signed_transaction = w3.eth.account.sign_transaction(transaction, administrator._private_key)
    return w3.eth.send_raw_transaction(signed_transaction.rawTransaction)
