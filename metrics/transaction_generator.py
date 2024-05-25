from utils.contract_adapters import buy_seeds, germinate_seeds, plant, stimulate, harvest, transport, store, display_vegetables, add_actor, register_actor, get_batch
from utils.providers import get_contract, get_w3, get_farmer, get_seed_seller, get_pesticide_seller, get_distributer, get_store, get_administrator, get_test
from utils.models import transactions_details
from datetime import datetime
from utils.file_management import persist_data
import time


def get_gas_used_for_l1(transaction_receipt):
    return transaction_receipt['gasUsedForL1'] if 'gasUsedForL1' in transaction_receipt.keys() else transaction_receipt['l1GasUsed']

def get_receipt(_w3, raw_transaction):
    while True:
        try:
            transaction_receipt = _w3.eth.get_transaction_receipt(raw_transaction)
        except:
            time.sleep(0.5)
        else:
            break
    return transaction_receipt

print("Enter rollup chain (arb/op): ")
rollup = input()

contract = get_contract(rollup)
w3 = get_w3(rollup)

pesticide_seller = get_pesticide_seller(rollup)
administrator = get_administrator(rollup)
distributer = get_distributer(rollup)
seed_seller = get_seed_seller(rollup)
store_manager = get_store(rollup)
farmer = get_farmer(rollup)

# for i in range(4,5):
#     # buy seeds
#     transactions_details['buy_seeds']['create_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     transactions_details['buy_seeds']['initial_gas_price'].append(w3.eth.gas_price)

#     transaction_receipt = get_receipt(w3, buy_seeds(w3, contract, seed_seller, farmer))

#     transactions_details['buy_seeds']['first_confirmation_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     transactions_details['buy_seeds']['gas_used'].append(transaction_receipt['gasUsed'])
#     transactions_details['buy_seeds']['cumulative_gas_used'].append(transaction_receipt['cumulativeGasUsed'])
#     transactions_details['buy_seeds']['effective_gas_price'].append(transaction_receipt['effectiveGasPrice'])
#     transactions_details['buy_seeds']['gas_used_for_l1'].append(get_gas_used_for_l1(transaction_receipt))
#     transactions_details['buy_seeds']['status'].append(transaction_receipt['status'])

#     # germinate seeds
#     transactions_details['germinate_seeds']['create_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     transactions_details['germinate_seeds']['initial_gas_price'].append(w3.eth.gas_price)

#     transaction_receipt = get_receipt(germinate_seeds(w3, contract, i, farmer))
    
#     transactions_details['germinate_seeds']['first_confirmation_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     transactions_details['germinate_seeds']['gas_used'].append(transaction_receipt['gasUsed'])
#     transactions_details['germinate_seeds']['cumulative_gas_used'].append(transaction_receipt['cumulativeGasUsed'])
#     transactions_details['germinate_seeds']['effective_gas_price'].append(transaction_receipt['effectiveGasPrice'])
#     transactions_details['germinate_seeds']['gas_used_for_l1'].append(get_gas_used_for_l1(transaction_receipt))
#     transactions_details['germinate_seeds']['status'].append(transaction_receipt['status'])

#     # plant seeds
#     transactions_details['plant_seeds']['create_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     transactions_details['plant_seeds']['initial_gas_price'].append(w3.eth.gas_price)

#     transaction_receipt = get_receipt(w3, plant(w3, contract, i, farmer))
    
#     transactions_details['plant_seeds']['first_confirmation_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     transactions_details['plant_seeds']['gas_used'].append(transaction_receipt['gasUsed'])
#     transactions_details['plant_seeds']['cumulative_gas_used'].append(transaction_receipt['cumulativeGasUsed'])
#     transactions_details['plant_seeds']['effective_gas_price'].append(transaction_receipt['effectiveGasPrice'])
#     transactions_details['plant_seeds']['gas_used_for_l1'].append(get_gas_used_for_l1(transaction_receipt))
#     transactions_details['plant_seeds']['status'].append(transaction_receipt['status'])

#     # stimulate
#     transactions_details['stimulate']['create_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     transactions_details['stimulate']['initial_gas_price'].append(w3.eth.gas_price)

#     transaction_receipt = get_receipt(w3, stimulate(w3, contract, i, pesticide_seller, farmer))

#     transactions_details['stimulate']['first_confirmation_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     transactions_details['stimulate']['gas_used'].append(transaction_receipt['gasUsed'])
#     transactions_details['stimulate']['cumulative_gas_used'].append(transaction_receipt['cumulativeGasUsed'])
#     transactions_details['stimulate']['effective_gas_price'].append(transaction_receipt['effectiveGasPrice'])
#     transactions_details['stimulate']['gas_used_for_l1'].append(get_gas_used_for_l1(transaction_receipt))
#     transactions_details['stimulate']['status'].append(transaction_receipt['status'])
    
#     # harvest
#     transactions_details['harvest']['create_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     transactions_details['harvest']['initial_gas_price'].append(w3.eth.gas_price)

#     transaction_receipt = get_receipt(w3, harvest(w3, contract, i, farmer))
    
#     transactions_details['harvest']['first_confirmation_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     transactions_details['harvest']['gas_used'].append(transaction_receipt['gasUsed'])
#     transactions_details['harvest']['cumulative_gas_used'].append(transaction_receipt['cumulativeGasUsed'])
#     transactions_details['harvest']['effective_gas_price'].append(transaction_receipt['effectiveGasPrice'])
#     transactions_details['harvest']['gas_used_for_l1'].append(get_gas_used_for_l1(transaction_receipt))
#     transactions_details['harvest']['status'].append(transaction_receipt['status'])
    
#     # transport 
#     transactions_details['transport']['create_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     transactions_details['transport']['initial_gas_price'].append(w3.eth.gas_price)

#     transaction_receipt = get_receipt(w3, transport(w3, contract, i, distributer, farmer, store_manager))

#     transactions_details['transport']['first_confirmation_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     transactions_details['transport']['gas_used'].append(transaction_receipt['gasUsed'])
#     transactions_details['transport']['cumulative_gas_used'].append(transaction_receipt['cumulativeGasUsed'])
#     transactions_details['transport']['effective_gas_price'].append(transaction_receipt['effectiveGasPrice'])
#     transactions_details['transport']['gas_used_for_l1'].append(get_gas_used_for_l1(transaction_receipt))
#     transactions_details['transport']['status'].append(transaction_receipt['status'])

#     # store 
#     transactions_details['store']['create_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     transactions_details['store']['initial_gas_price'].append(w3.eth.gas_price)

#     transaction_receipt = get_receipt(w3, store(w3, contract, i, store_manager, distributer))
    
#     transactions_details['store']['first_confirmation_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     transactions_details['store']['gas_used'].append(transaction_receipt['gasUsed'])
#     transactions_details['store']['cumulative_gas_used'].append(transaction_receipt['cumulativeGasUsed'])
#     transactions_details['store']['effective_gas_price'].append(transaction_receipt['effectiveGasPrice'])
#     transactions_details['store']['gas_used_for_l1'].append(get_gas_used_for_l1(transaction_receipt))
#     transactions_details['store']['status'].append(transaction_receipt['status'])

#     # display vegetables
#     transactions_details['display_vegetables']['create_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     transactions_details['display_vegetables']['initial_gas_price'].append(w3.eth.gas_price)

#     transaction_receipt = get_receipt(w3, display_vegetables(w3, contract, store_manager, i))
    
#     transactions_details['display_vegetables']['first_confirmation_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     transactions_details['display_vegetables']['gas_used'].append(transaction_receipt['gasUsed'])
#     transactions_details['display_vegetables']['cumulative_gas_used'].append(transaction_receipt['cumulativeGasUsed'])
#     transactions_details['display_vegetables']['effective_gas_price'].append(transaction_receipt['effectiveGasPrice'])
#     transactions_details['display_vegetables']['gas_used_for_l1'].append(get_gas_used_for_l1(transaction_receipt))
#     transactions_details['display_vegetables']['status'].append(transaction_receipt['status'])


test_account = get_test(rollup)

for i in range(1, 2):
    # register actor
    transactions_details['register_actor']['create_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    transactions_details['register_actor']['initial_gas_price'].append(w3.eth.gas_price)

    transaction_receipt = get_receipt(w3, register_actor(w3, contract, test_account))

    transactions_details['register_actor']['first_confirmation_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    transactions_details['register_actor']['gas_used'].append(transaction_receipt['gasUsed'])
    transactions_details['register_actor']['cumulative_gas_used'].append(transaction_receipt['cumulativeGasUsed'])
    transactions_details['register_actor']['effective_gas_price'].append(transaction_receipt['effectiveGasPrice'])
    transactions_details['register_actor']['gas_used_for_l1'].append(get_gas_used_for_l1(transaction_receipt))
    transactions_details['register_actor']['status'].append(transaction_receipt['status'])

    # add actor
    transactions_details['add_actor']['create_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    transactions_details['add_actor']['initial_gas_price'].append(w3.eth.gas_price)

    transaction_receipt = get_receipt(w3, add_actor(w3, contract, administrator, test_account, i, "FARMER"))
    
    transactions_details['add_actor']['first_confirmation_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    transactions_details['add_actor']['gas_used'].append(transaction_receipt['gasUsed'])
    transactions_details['add_actor']['cumulative_gas_used'].append(transaction_receipt['cumulativeGasUsed'])
    transactions_details['add_actor']['effective_gas_price'].append(transaction_receipt['effectiveGasPrice'])
    transactions_details['add_actor']['gas_used_for_l1'].append(get_gas_used_for_l1(transaction_receipt))
    transactions_details['add_actor']['status'].append(transaction_receipt['status'])


persist_data(transactions_details, rollup)

# print(get_batch(4, contract))
# raw_transaction = transport(w3, contract, 4, distributer, farmer, store_manager)
# transaction_receipt = w3.eth.get_transaction_receipt(raw_transaction)
#    (transaction_receipt)
