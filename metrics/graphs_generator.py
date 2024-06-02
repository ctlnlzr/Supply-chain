# Per Rollup per transaction
# Aggregated
# SoftConfirmationDuration(first_confirmation_timestamp - create_timestamp)
# GasPriceApproximationAccuracy(effective_gas_price-initial_gas_price)
# TransactionPrice 
# Simple comparisons
# GasUsedOnRollup
# GasUsedOnL1



from utils.data_aggregators import compute_soft_confirmation_duration, compute_gas_price_approximation_difference, extract_transaction_price_eth, extract_transaction_price_usd
from utils.file_management import read_data
import matplotlib.pyplot as plt

def generate_soft_confirmation_duration_graph(optimism_data, arbitrum_data):
    for transaction in ["buy_seeds", "germinate_seeds", "plant_seeds", "stimulate", "harvest", "transport", "store", "display_vegetables", "add_actor", "register_actor"]:
        soft_confirmation_duration_optimism = compute_soft_confirmation_duration(optimism_data[transaction]['create_timestamp'], optimism_data[transaction]['first_confirmation_timestamp'])
        soft_confirmation_duration_arbitrum = compute_soft_confirmation_duration(arbitrum_data[transaction]['create_timestamp'], arbitrum_data[transaction]['first_confirmation_timestamp'])

        plt.plot(range(0,100), soft_confirmation_duration_arbitrum, label='Arbitrum', color='blue', marker='o')
        plt.plot(range(0,100), soft_confirmation_duration_optimism, label='Optimism', color='green', marker='o')
        plt.title(f"Soft Confirmation Duration for {transaction} transaction")
        plt.legend()
        plt.savefig(f"metrics\\graphs\\soft_confirmation_duration_2_{transaction}.jpg", format='jpg', dpi=300)
        plt.clf()


def generate_gas_price_approximation_accuracy_graph(optimism_data, arbitrum_data):
    for transaction in ["buy_seeds", "germinate_seeds", "plant_seeds", "stimulate", "harvest", "transport", "store", "display_vegetables", "add_actor", "register_actor"]:
        gas_price_approximation_difference_optimism = compute_gas_price_approximation_difference(optimism_data[transaction]['initial_gas_price'], optimism_data[transaction]['effective_gas_price'])
        gas_price_approximation_difference_arbitrum = compute_gas_price_approximation_difference(arbitrum_data[transaction]['initial_gas_price'], arbitrum_data[transaction]['effective_gas_price'])

        plt.plot(range(0,100), gas_price_approximation_difference_arbitrum, label='Arbitrum', color='blue', marker='o')
        plt.plot(range(0,100), gas_price_approximation_difference_optimism, label='Optimism', color='green', marker='o')
        plt.title(f"L2 Gas Price Difference for {transaction} transaction")
        plt.legend()
        plt.savefig(f"metrics\\graphs\\gas_price_approximation_difference_2_{transaction}.jpg", format='jpg', dpi=300)
        plt.clf()


def generate_transaction_price_eth_graph():
    for transaction in ["buy_seeds", "germinate_seeds", "plant_seeds", "stimulate", "harvest", "transport", "store", "display_vegetables", "add_actor", "register_actor"]:
        transaction_price_optimism = extract_transaction_price_eth(transaction, "op")
        transaction_price_arbitrum = extract_transaction_price_eth(transaction, "arb")

        plt.plot(range(0,100), transaction_price_arbitrum, label='Arbitrum', color='blue', marker='o')
        plt.plot(range(0,100), transaction_price_optimism, label='Optimism', color='green', marker='o')
        plt.title(f"Transaction Price for {transaction} transaction")
        plt.legend()
        plt.savefig(f"metrics\\graphs\\transaction_price_eth_2_{transaction}.jpg", format='jpg', dpi=300)
        plt.clf()


def generate_transaction_price_usd_graph():
    for transaction in ["buy_seeds", "germinate_seeds", "plant_seeds", "stimulate", "harvest", "transport", "store", "display_vegetables", "add_actor", "register_actor"]:
        transaction_price_optimism = extract_transaction_price_usd(transaction, "op")
        transaction_price_arbitrum = extract_transaction_price_usd(transaction, "arb")

        plt.plot(range(0,100), transaction_price_arbitrum, label='Arbitrum', color='blue', marker='o')
        plt.plot(range(0,100), transaction_price_optimism, label='Optimism', color='green', marker='o')
        plt.title(f"Transaction Price for {transaction} transaction")
        plt.legend()
        plt.savefig(f"metrics\\graphs\\transaction_price_usd_2_{transaction}.jpg", format='jpg', dpi=300)
        plt.clf()


def generate_gas_used_on_rollup_graph(optimism_data, arbitrum_data):
    for transaction in ["buy_seeds", "germinate_seeds", "plant_seeds", "stimulate", "harvest", "transport", "store", "display_vegetables", "add_actor", "register_actor"]:
        plt.plot(range(0,100),  arbitrum_data[transaction]['gas_used'], label='Arbitrum', color='blue', marker='o')
        plt.plot(range(0,100), optimism_data[transaction]['gas_used'], label='Optimism', color='green', marker='o')
        plt.title(f"Gas used on Rollup for {transaction} transaction")
        plt.legend()
        plt.savefig(f"metrics\\graphs\\gas_used_on_rollup_2_{transaction}.jpg", format='jpg', dpi=300)
        plt.clf()


def generate_gas_used_on_l1_graph(optimism_data, arbitrum_data):
    for transaction in ["buy_seeds", "germinate_seeds", "plant_seeds", "stimulate", "harvest", "transport", "store", "display_vegetables", "add_actor", "register_actor"]:
        plt.plot(range(0,100), arbitrum_data[transaction]['gas_used_for_l1'], label='Arbitrum', color='blue', marker='o')
        plt.plot(range(0,100), optimism_data[transaction]['gas_used_for_l1'], label='Optimism', color='green', marker='o')
        plt.title(f"Gas Used On L1 for {transaction} transaction")
        plt.legend()
        plt.savefig(f"metrics\\graphs\\gas_used_on_l1_2_{transaction}.jpg", format='jpg', dpi=300)
        plt.clf()


optimism_data = read_data("D:\\Disi disi stresi misi\\Supply chain\\data_op.json")
arbitrum_data = read_data("D:\\Disi disi stresi misi\\Supply chain\\data_arb_1.json")

generate_soft_confirmation_duration_graph(optimism_data, arbitrum_data)
generate_gas_price_approximation_accuracy_graph(optimism_data, arbitrum_data)
# generate_transaction_price_eth_graph()
# generate_transaction_price_usd_graph()
generate_gas_used_on_rollup_graph(optimism_data, arbitrum_data)
generate_gas_used_on_l1_graph(optimism_data, arbitrum_data)