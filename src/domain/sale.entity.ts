import { SaleItem } from "./sale-item.entity";

export class Sale {

    private saleItens: Required<SaleItem[]>
    
    constructor(items: SaleItem[]){
        this.saleItens = items;
    }

    get totalTaxAmount() {
        let amount = 0;
        this.saleItens.forEach(x => amount += x.totalTaxAmount);
        return parseFloat(amount.toFixed(2));
    }

    get totalAmount() {
        let amount = 0;
        this.saleItens.forEach(x => amount += x.totalAmount);
        return parseFloat(amount.toFixed(2));
    }

    get itens(): SaleItem[]{
        return this.saleItens;
    }

}