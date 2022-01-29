#!/usr/bin/python3
# -*- coding: utf-8 -*-
"""
This script converts the customers.txt into an json - file.
"""
import json

customers = []

with open("customer.txt", 'r') as file:
    for line in file:
        text = line.replace("\t", ",")
        items = text.split(",")

        element = {"Firstname": items[1], "Lastname": items[2], "Gender": items[3],
                   "Email": items[4], "Birthday": items[5], "AddressId": items[6]}
        customers.append(element)

with open('Customers.json', 'w') as outfile:
    json.dump(customers, outfile)
