import time


def get_gas_used_for_l1(transaction_receipt):
    return int(transaction_receipt['gasUsedForL1'], 16) if 'gasUsedForL1' in transaction_receipt.keys() else int(transaction_receipt['l1GasUsed'], 16)

def get_l1_blob_base_fee_scalar(transaction_receipt):
    return int(transaction_receipt['l1BlobBaseFeeScalar'], 16) if 'l1BlobBaseFeeScalar' in transaction_receipt.keys() else -1


def get_l1_base_fee_scalar(transaction_receipt):
    return int(transaction_receipt['l1BaseFeeScalar'], 16) if 'l1BaseFeeScalar' in transaction_receipt.keys() else -1


def get_l1_blob_base_fee(transaction_receipt):
    return int(transaction_receipt['l1BlobBaseFee'], 16) if 'l1BlobBaseFee' in transaction_receipt.keys() else -1


def get_l1_gas_price(transaction_receipt, w3_sepolia):
    return int(transaction_receipt['l1GasPrice'], 16) if 'l1GasPrice' in transaction_receipt.keys() else w3_sepolia.eth.gas_price


def get_l1_fee(transaction_receipt):
    return int(transaction_receipt['l1Fee'], 16) if 'l1Fee' in transaction_receipt.keys() else -1


def get_receipt(w3, raw_transaction):
    while True:
        try:
            transaction_receipt = w3.eth.get_transaction_receipt(raw_transaction)
        except:
            time.sleep(0.5)
        else:
            break
    return transaction_receipt
