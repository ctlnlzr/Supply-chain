from datetime import datetime
from utils.contract_adapters import buy_seeds, germinate_seeds, plant, stimulate, harvest, transport, store, display_vegetables, add_actor, register_actor, get_batch


def buy_seeds_log(transactions_details, w3, contract, seed_seller, farmer):
    transactions_details['buy_seeds']['create_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    transactions_details['buy_seeds']['initial_gas_price'].append(w3.eth.gas_price)

    raw_transaction = buy_seeds(w3, contract, seed_seller, farmer)

    transaction_receipt = w3.eth.get_transaction_receipt(raw_transaction)
    transactions_details['buy_seeds']['first_confirmation_timestamp'].append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    transactions_details['buy_seeds']['gas_used'].append(transaction_receipt['gasUsed'])
    transactions_details['buy_seeds']['cumulative_gas_used'].append(transaction_receipt['cumulativeGasUsed'])
    transactions_details['buy_seeds']['effective_gas_price'].append(transaction_receipt['effectiveGasPrice'])
    transactions_details['buy_seeds']['gas_used_for_l1'].append(transaction_receipt['gasUsedForL1'])
    transactions_details['buy_seeds']['status'].append(transaction_receipt['status'])
