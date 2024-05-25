import json

def persist_data(data, rollup_chain):
    with open("data_{}.json".format(rollup_chain), "x") as file:
        json.dump(data, file)
