#!/usr/bin/python3
# -*- coding: utf-8 -*-
"""
This script converts the customers.txt into an json - file.
"""
import json

address = []

with open("address.txt", 'r') as file:
    for line in file:
        text = line.replace("\t", ",")
        items = text.split(",")

        element = {"AddressId": items[0], "CustomerId": items[1],
                   "Address": items[4], "City": items[6]}
        address.append(element)

with open('Address.json', 'w') as outfile:
    json.dump(address, outfile)
