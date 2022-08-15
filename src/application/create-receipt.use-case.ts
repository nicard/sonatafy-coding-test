import { SaleItem } from "../domain/sale-item.entity";
import { Sale } from "../domain/sale.entity";

export class CreateReceiptUseCase {

    constructor(){
        
    }

    async execute(input: CreateReceiptInput[]) : Promise<CreateReceiptOutput> {
        if(input == undefined || input.length <= 0)
            throw new Error("the number of elements is 0");
        let itensList = input.map(x => new SaleItem(x));
        let sale = new Sale(itensList);
       
        let receiptItens: CreateReceiptItemOutput[] = [];        
        sale.itens.forEach(item => {
            var itemInReceipt = receiptItens.find(x => x.item == item.product);
            if(itemInReceipt === undefined) {
                itemInReceipt = {
                    item: item.product,
                    unitValue: item.totalAmount,
                    quantity: item.quantity,
                    totalValue: item.totalAmount
                }
                receiptItens.push(itemInReceipt);
            } else {
                itemInReceipt.quantity += item.quantity;
                itemInReceipt.totalValue += item.totalAmount;
            }
        });
        
        return {
            itens: receiptItens,
            totalTaxAmount: sale.totalTaxAmount,
            totalAmount: sale.totalAmount
        }
    }
}

export type CreateReceiptInput = {
    product: string,
    quantity: number,
    amount: number,
    isTaxFree: boolean
}

export type CreateReceiptItemOutput = {    
    item: string,
    unitValue: number,
    quantity: number,
    totalValue: number
}

export type CreateReceiptOutput = {    
    itens: CreateReceiptItemOutput[],
    totalTaxAmount: number,
    totalAmount: number
}
