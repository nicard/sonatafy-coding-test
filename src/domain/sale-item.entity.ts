export type SaleItemProps = {
    product: string,
    quantity: number,
    amount: number,
    isTaxFree: boolean
}

export class SaleItem {

    private props: Required<SaleItemProps>
    readonly taxValue: number = 10;
    readonly importedTaxValue: number = 5;

    constructor(props: SaleItemProps){
        this.props = { ...props};
    }

    get product() {
        return this.props.product;
    }

    get quantity() {
        return this.props.quantity;
    }

    get amount() {
        return this.props.amount;
    }

    get taxAmount() {
        let importedTaxAmount: number = 0;
        if(this.props.product.toLowerCase().includes("imported")) {
            importedTaxAmount = this.props.amount * (this.importedTaxValue / 100);
            importedTaxAmount = Math.round(importedTaxAmount * 100) / 100;
        }

        let taxAmount: number = 0;
        if(!this.props.isTaxFree){
            taxAmount = this.props.amount * (this.taxValue / 100);
            taxAmount = Math.round(taxAmount * 100) / 100;
        }
        
        return this.normalizeCentsValue((taxAmount + importedTaxAmount));
    }

    get totalTaxAmount() {
        return this.nomalizeValue(this.taxAmount * this.quantity);
    }

    get totalAmount() {
        return this.nomalizeValue((this.props.amount + this.taxAmount) * this.quantity);
    }

    private nomalizeValue(number: number): number{
        return parseFloat(number.toFixed(2));
    }

    private normalizeCentsValue(number: number): number {
        let arrAmount = number.toFixed(2).split(".");
        let decimals = arrAmount[1].split("");
        let ten = parseInt(decimals[0]), unity= parseInt(decimals[1]);    
        if(unity == 0 || unity == 5)
            return this.nomalizeValue(number);

        if(unity < 5){
            unity = 5;
        }
        
        if(unity > 5){
            unity = 0;
            ten = ten + 1;
        }

        return this.nomalizeValue(parseFloat(arrAmount[0] + "." + ten + unity));
    }

}