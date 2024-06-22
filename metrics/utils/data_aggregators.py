from datetime import datetime
import pandas as pd
import csv 

transaction = {
    "buy_seeds": {
        "arb": {
            "transaction_name": "0x32675190",
            "filename": "metrics\\logs\\arbitrum_farmer_2.csv"
        },
        "op": {
            "transaction_name": "0x32675190",
            "filename": "metrics\\logs\\optimism_farmer.csv"
        }
    },
    "germinate_seeds": {
        "arb": {
            "transaction_name": "0xf44cf899",
            "filename": "metrics\\logs\\arbitrum_farmer_2.csv"
        },
        "op": {
            "transaction_name": "0xf44cf899",
            "filename": "metrics\\logs\\optimism_farmer.csv"
        }
    },
    "plant_seeds": {
        "arb": {
            "transaction_name": "0xc383e22b",
            "filename": "metrics\\logs\\arbitrum_farmer_2.csv"
        },
        "op": {
            "transaction_name": "0xc383e22b",
            "filename": "metrics\\logs\\optimism_farmer.csv"
        }
    },
    "stimulate": {
        "arb": {
            "transaction_name": "0x1b0e5ac8",
            "filename": "metrics\\logs\\arbitrum_farmer_2.csv"
        },
        "op": {
            "transaction_name": "0x1b0e5ac8",
            "filename": "metrics\\logs\\optimism_farmer.csv"
        }
    },
    "harvest": {
        "arb": {
            "transaction_name": "Harvest",
            "filename": "metrics\\logs\\arbitrum_farmer_2.csv"
        },
        "op": {
            "transaction_name": "0xddc63262",
            "filename": "metrics\\logs\\optimism_farmer.csv"
        }
    },
    "transport": {
        "arb": {
            "transaction_name": "0xd0847fae",
            "filename": "metrics\\logs\\arbitrum_distributer_2.csv"
        },
        "op": {
            "transaction_name": "0xd0847fae",
            "filename": "metrics\\logs\\optimism_distributer.csv"
        }
    },
    "store": {
        "arb": {
            "transaction_name": "0xceaa3182",
            "filename": "metrics\\logs\\arbitrum_distributer_2.csv"
        },
        "op": {
            "transaction_name": "0xceaa3182",
            "filename": "metrics\\logs\\optimism_distributer.csv"
        }
    },
    "display_vegetables": {
        "arb": {
            "transaction_name": "0x1214c5e5",
            "filename": "metrics\\logs\\arbitrum_store_2.csv"
        },
        "op": {
            "transaction_name": "0x1214c5e5",
            "filename": "metrics\\logs\\optimism_store.csv"
        }
    },
    "add_actor": {
        "arb": {
            "transaction_name": "0x50a24a00",
            "filename": "metrics\\logs\\arbitrum_administrator_2.csv"
        },
        "op": {
            "transaction_name": "0x50a24a00",
            "filename": "metrics\\logs\\optimism_administrator.csv"
        }
    },
    "register_actor": {
        "arb": {
            "transaction_name": "0x2cd0897a",
            "filename": "metrics\\logs\\arbitrum_test_1_2.csv"
        },
        "op": {
            "transaction_name": "0x2cd0897a",
            "filename": "metrics\\logs\\optimism_test_1.csv"
        }
    }
}


def compute_gas_price_approximation_difference(initial_gas_price, effective_gas_price):
    price_approximation_difference = []
    for i in range(0, 100):
        price_approximation_difference.append(effective_gas_price[i] - initial_gas_price[i])
    return price_approximation_difference


def compute_soft_confirmation_duration(creation_timestamp, soft_comparation_timestamp):
    soft_comparation_duration = []
    for i in range(0,100):
        duration = datetime.strptime(soft_comparation_timestamp[i], "%Y-%m-%d %H:%M:%S") - datetime.strptime(creation_timestamp[i], "%Y-%m-%d %H:%M:%S")
        soft_comparation_duration.append(duration.total_seconds()) 
    return soft_comparation_duration


def compute_gas_used_on_rollup(gas_used, gas_used_on_l1):
    l1_data_fee = []
    for i in range(0, 100):
        l1_data_fee.append(gas_used[i] - gas_used_on_l1[i])
    return l1_data_fee


def extract_transaction_price_eth(transaction_name, chain):
    price_eth = []
    with open(transaction[transaction_name][chain]['filename'], mode='r', newline='') as csvfile:
        csvreader = csv.reader(csvfile)    
        for row in csvreader:
            if row[15] == transaction[transaction_name][chain]['transaction_name']:
                price_eth.append(float(row[10]))
    return price_eth


def extract_transaction_price_usd(transaction_name, chain):
    price_usd = []
    with open(transaction[transaction_name][chain]['filename'], mode='r', newline='') as csvfile:
        csvreader = csv.reader(csvfile)    
        for row in csvreader:
            if row[15] == transaction[transaction_name][chain]['transaction_name']:
                price_usd.append(float(row[11]))
    return price_usd
