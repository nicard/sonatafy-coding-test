## Description

Development Coding Test for Sonatafy that I have the develop a code to create a receipt from a list of sale items and show the amount of any item and the total sales taxes for all items.

## Installation and Usage

Install all project dependencies
```
npm install
```

Start project
```
npm start
```

After the project started the server port (default: 3000) is show in console.
```
Server run in port 3000
```

You can run the test too
```
npm run test
```

## My Design Choices

I choice to create a project using some concepts from Clean Architecture and SOLID. Spliting my domain from others project parts, to not create dependeces. My class have only one motive to change and my domain code have no dependents from others parts of project. I choose to used a Express as HTTP server to show and receive user inputs. I build to possible result, one in JSON another in HTML.

## REST API 

|Method|URI|Description|Response Status
|-----|-----|-----|-----|
|`POST`|/receipt|Responsible to create a new receipt from a list of sale itens.|`201`, `400`|
|`POST`|/receipt-html|Responsible to create a new receipt in html from a list of sale itens.|`201`, `400`|

## Receipt
### [POST] `/receipt`

Responsible to create a new receipt from a list of sale itens.

##### `Request`
| Name | Type | Description | Mandatory |
| --------| --------|--------|--------|
| product| string | The name of the product | Yes |
| quantity| number | Quantity of product | Yes |
| amount| number | The amount of product | Yes |
| isTaxFree| boolean | If the product if a tax free item. Sample: books, food and medical products  | yes |

Example:

```
[
    {
        "product": "Imported bottle of perfume",
        "quantity": 1,
        "amount": 27.99,
        "isTaxFree": false
    },    
    {
        "product": "Bottle of perfume",
        "quantity": 1,
        "amount": 18.99,
        "isTaxFree": false
    },    
    {
        "product": "Packet of headache pills",
        "quantity": 1,
        "amount":  9.75,
        "isTaxFree": true
    },    
    {
        "product": "Imported box of chocolates",
        "quantity": 1,
        "amount":  11.25,
        "isTaxFree": true
    },    
    {
        "product": "Imported box of chocolates",
        "quantity": 1,
        "amount":  11.25,
        "isTaxFree": true
    }
]
```

##### `Response`
```
{
    "itens": [
        {
            "item": "Imported bottle of perfume",
            "unitValue": 32.19,
            "quantity": 1,
            "totalValue": 32.19
        },
        {
            "item": "Bottle of perfume",
            "unitValue": 20.89,
            "quantity": 1,
            "totalValue": 20.89
        },
        {
            "item": "Packet of headache pills",
            "unitValue": 9.75,
            "quantity": 1,
            "totalValue": 9.75
        },
        {
            "item": "Imported box of chocolates",
            "unitValue": 11.85,
            "quantity": 2,
            "totalValue": 23.7
        }
    ],
    "totalTaxAmount": 7.3,
    "totalAmount": 86.53
}
```

## Receipt in html
### [POST] `/receipt-html`

Responsible to create a new receipt from a list of sale itens.

##### `Request`
| Name | Type | Description | Mandatory |
| --------| --------|--------|--------|
| product| string | The name of the product | Yes |
| quantity| number | Quantity of product | Yes |
| amount| number | The amount of product | Yes |
| isTaxFree| boolean | If the product if a tax free item. Sample: books, food and medical products  | yes |

Example:

```
[
    {
        "product": "Imported bottle of perfume",
        "quantity": 1,
        "amount": 27.99,
        "isTaxFree": false
    },    
    {
        "product": "Bottle of perfume",
        "quantity": 1,
        "amount": 18.99,
        "isTaxFree": false
    },    
    {
        "product": "Packet of headache pills",
        "quantity": 1,
        "amount":  9.75,
        "isTaxFree": true
    },    
    {
        "product": "Imported box of chocolates",
        "quantity": 1,
        "amount":  11.25,
        "isTaxFree": true
    },    
    {
        "product": "Imported box of chocolates",
        "quantity": 1,
        "amount":  11.25,
        "isTaxFree": true
    }
]
```

##### `Response`
```
Receipt

Imported bottle of perfume: 32.19
Bottle of perfume: 20.89
Packet of headache pills: 9.75
Imported box of chocolates: 23.70 (2 @ 11.85)
Sales Taxes: 7.30
Total: 86.53
```