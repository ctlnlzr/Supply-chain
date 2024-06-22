# Per Rollup per transaction
# Aggregated
# SoftConfirmationDuration(first_confirmation_timestamp - create_timestamp)
# GasPriceApproximationAccuracy(effective_gas_price-initial_gas_price)
# TransactionPrice 
# Simple comparisons
# GasUsedOnRollup
# GasUsedOnL1



from utils.data_aggregators import compute_soft_confirmation_duration, compute_gas_used_on_rollup, compute_gas_price_approximation_difference, extract_transaction_price_eth, extract_transaction_price_usd
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
        transaction_gas_used_on_rollup_optimism = compute_gas_used_on_rollup(optimism_data[transaction]['gas_used'], optimism_data[transaction]['gas_used_for_l1'])
        transaction_gas_used_on_rollup_arbitrum = compute_gas_used_on_rollup(arbitrum_data[transaction]['gas_used'], arbitrum_data[transaction]['gas_used_for_l1'])

        plt.plot(range(0,100), transaction_gas_used_on_rollup_arbitrum, label='Arbitrum', color='blue', marker='o')
        plt.plot(range(0,100), transaction_gas_used_on_rollup_optimism, label='Optimism', color='green', marker='o')
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

def generate_average_values(optimism_data, arbitrum_data):
    f = open("averages.csv", "a")
    f.write("Chain,Transaction,Metric,Average\n")
    
    for metric in ["l1_blob_base_fee_scalar", "cumulative_gas_used", "effective_gas_price", "l1_base_fee_scalar", "initial_gas_price", "l1_blob_base_fee", "gas_used_for_l1", "l1_gas_price", "gas_used", "l1_fee"]:
        for transaction in ["buy_seeds", "germinate_seeds", "plant_seeds", "stimulate", "harvest", "transport", "store", "display_vegetables", "add_actor", "register_actor"]:
            f.write("Arbitrum," + transaction + "," + metric + "," + str(sum(arbitrum_data[transaction][metric])/len(arbitrum_data[transaction][metric])) + "\n")
            f.write("Optimism," + transaction + "," + metric + "," + str(sum(optimism_data[transaction][metric])/len(optimism_data[transaction][metric])) + "\n")

    for transaction in ["buy_seeds", "germinate_seeds", "plant_seeds", "stimulate", "harvest", "transport", "store", "display_vegetables", "add_actor", "register_actor"]:
            transaction_gas_used_on_rollup_optimism = compute_gas_used_on_rollup(optimism_data[transaction]['gas_used'], optimism_data[transaction]['gas_used_for_l1'])
            transaction_gas_used_on_rollup_arbitrum = compute_gas_used_on_rollup(arbitrum_data[transaction]['gas_used'], arbitrum_data[transaction]['gas_used_for_l1'])
            f.write("Arbitrum," + transaction + ",gas_used_on_rollup," + str(sum(transaction_gas_used_on_rollup_arbitrum)/len(transaction_gas_used_on_rollup_arbitrum)) + "\n")
            f.write("Optimism," + transaction + ",gas_used_on_rollup," + str(sum(transaction_gas_used_on_rollup_optimism)/len(transaction_gas_used_on_rollup_optimism)) + "\n")

    for transaction in ["buy_seeds", "germinate_seeds", "plant_seeds", "stimulate", "harvest", "transport", "store", "display_vegetables", "add_actor", "register_actor"]:
            transaction_price_optimism = extract_transaction_price_usd(transaction, "op")
            transaction_price_arbitrum = extract_transaction_price_usd(transaction, "arb")
            f.write("Arbitrum," + transaction + ",price_usd," + str(sum(transaction_price_arbitrum)/len(transaction_price_arbitrum)) + "\n")
            f.write("Optimism," + transaction + ",price_usd," + str(sum(transaction_price_optimism)/len(transaction_price_optimism)) + "\n")
    
    for transaction in ["buy_seeds", "germinate_seeds", "plant_seeds", "stimulate", "harvest", "transport", "store", "display_vegetables", "add_actor", "register_actor"]:
            transaction_price_optimism = extract_transaction_price_eth(transaction, "op")
            transaction_price_arbitrum = extract_transaction_price_eth(transaction, "arb")
            f.write("Arbitrum," + transaction + ",price_eth," + str(sum(transaction_price_arbitrum)/len(transaction_price_arbitrum)) + "\n")
            f.write("Optimism," + transaction + ",price_eth," + str(sum(transaction_price_optimism)/len(transaction_price_optimism)) + "\n")

    for transaction in ["buy_seeds", "germinate_seeds", "plant_seeds", "stimulate", "harvest", "transport", "store", "display_vegetables", "add_actor", "register_actor"]:
            soft_confirmation_duration_optimism = compute_soft_confirmation_duration(optimism_data[transaction]['create_timestamp'], optimism_data[transaction]['first_confirmation_timestamp'])
            soft_confirmation_duration_arbitrum = compute_soft_confirmation_duration(arbitrum_data[transaction]['create_timestamp'], arbitrum_data[transaction]['first_confirmation_timestamp'])
            f.write("Arbitrum," + transaction + ",soft_confirmation_duration," + str(sum(soft_confirmation_duration_arbitrum)/len(soft_confirmation_duration_arbitrum)) + "\n")
            f.write("Optimism," + transaction + ",soft_confirmation_duration," + str(sum(soft_confirmation_duration_optimism)/len(soft_confirmation_duration_optimism)) + "\n")
    
    for transaction in ["buy_seeds", "germinate_seeds", "plant_seeds", "stimulate", "harvest", "transport", "store", "display_vegetables", "add_actor", "register_actor"]:
            gas_price_approximation_difference_optimism = compute_gas_price_approximation_difference(optimism_data[transaction]['initial_gas_price'], optimism_data[transaction]['effective_gas_price'])
            gas_price_approximation_difference_arbitrum = compute_gas_price_approximation_difference(arbitrum_data[transaction]['initial_gas_price'], arbitrum_data[transaction]['effective_gas_price'])
            f.write("Arbitrum," + transaction + ",gas_price_approximation_accuracy," + str(sum(gas_price_approximation_difference_arbitrum)/len(gas_price_approximation_difference_arbitrum)) + "\n")
            f.write("Optimism," + transaction + ",gas_price_approximation_accuracy," + str(sum(gas_price_approximation_difference_optimism)/len(gas_price_approximation_difference_optimism)) + "\n")

    f.close()

optimism_data = read_data("D:\\Disi disi stresi misi\\Supply chain\\metrics\\json\\data_op.json")
arbitrum_data = read_data("D:\\Disi disi stresi misi\\Supply chain\\metrics\\json\\data_arb_1.json")

# generate_soft_confirmation_duration_graph(optimism_data, arbitrum_data)
# generate_gas_price_approximation_accuracy_graph(optimism_data, arbitrum_data)
# generate_transaction_price_eth_graph()
# # generate_transaction_price_usd_graph()
# generate_gas_used_on_rollup_graph(optimism_data, arbitrum_data)
# generate_gas_used_on_l1_graph(optimism_data, arbitrum_data)

generate_average_values(optimism_data, arbitrum_data)