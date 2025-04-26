
PIB = [
               "https://api.worldbank.org/v2/country/US/indicator/NY.GDP.MKTP.CD?format=json",
               "https://api.worldbank.org/v2/country/CN/indicator/NY.GDP.MKTP.CD?format=json",
               "https://api.worldbank.org/v2/country/JP/indicator/NY.GDP.MKTP.CD?format=json",   
               "https://api.worldbank.org/v2/country/ES/indicator/NY.GDP.MKTP.CD?format=json",
            ]

Riqueza = [
                "https://api.worldbank.org/v2/country/US/indicator/NY.ADJ.NNTY.CD?format=json",
                "https://api.worldbank.org/v2/country/CN/indicator/NY.ADJ.NNTY.CD?format=json",
                "https://api.worldbank.org/v2/country/JP/indicator/NY.ADJ.NNTY.CD?format=json",
                "https://api.worldbank.org/v2/country/ES/indicator/NY.ADJ.NNTY.CD?format=json"
]
    
for p in PIB:
    print(p)


for r in Riqueza:
    print(r)