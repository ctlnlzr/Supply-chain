import json

def persist_data(data, rollup_chain):
    with open("data_{}_1.json".format(rollup_chain), "x") as file:
        json.dump(data, file)


def read_data(filename):
    with open(filename, 'r') as file:
        return json.load(file)