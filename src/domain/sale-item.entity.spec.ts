import { SaleItem, SaleItemProps } from "./sale-item.entity";

describe('Sale Item Entity test', () => {

    test('Calc sale item tax for free tax itens', ()  => {
        let  saleItemProps: SaleItemProps = {
            product: "Book",
            quantity: 1,
            amount: 12.49,
            isTaxFree: true
        }
        let saleItem = new SaleItem(saleItemProps);
        
        expect(saleItem.taxAmount).toStrictEqual(0)
        expect(saleItem.totalAmount).toStrictEqual(12.49)

        saleItemProps.quantity = 2;
        saleItem = new SaleItem(saleItemProps);
        
        expect(saleItem.totalTaxAmount).toStrictEqual(0)
        expect(saleItem.totalAmount).toStrictEqual(24.98)
    })

    test('Calc sale item tax for commom itens', ()  => {
        let  saleItemProps: SaleItemProps = {
            product: "Music CD",
            quantity: 1,
            amount: 14.99,
            isTaxFree: false
        }
        let saleItem = new SaleItem(saleItemProps);
        
        expect(saleItem.taxAmount).toStrictEqual(1.5)
        expect(saleItem.totalAmount).toStrictEqual(16.49)

        saleItemProps.quantity = 2;
        saleItem = new SaleItem(saleItemProps);
        expect(saleItem.totalTaxAmount).toStrictEqual(3)
        expect(saleItem.totalAmount).toStrictEqual(32.98)


        saleItemProps.quantity = 1;
        saleItemProps.amount= 18.99;
        saleItem = new SaleItem(saleItemProps);
        expect(saleItem.totalTaxAmount).toStrictEqual(1.9)
        expect(saleItem.totalAmount).toStrictEqual(20.89)
        
    })
    

    test('Calc sale item tax for imported common itens', ()  => {
        let  saleItemProps: SaleItemProps = {
            product: "Imported bottle of perfume",
            quantity: 1,
            amount: 27.99,
            isTaxFree: false
        }
        let saleItem = new SaleItem(saleItemProps);

        expect(saleItem.taxAmount).toStrictEqual(4.2)
        expect(saleItem.totalAmount).toStrictEqual(32.19)

        saleItemProps.quantity = 2;
        saleItem = new SaleItem(saleItemProps);
        expect(saleItem.totalTaxAmount).toStrictEqual(8.4)
        expect(saleItem.totalAmount).toStrictEqual(64.38)

        
        saleItemProps.quantity = 1;
        saleItemProps.amount =  47.50;
        saleItem = new SaleItem(saleItemProps);
        expect(saleItem.taxAmount).toStrictEqual(7.15)
        expect(saleItem.totalAmount).toStrictEqual(54.65)
    })

    test('Calc sale item tax for imported free tax itens', ()  => {
        let  saleItemProps: SaleItemProps = {
            product: "Imported box of chocolates",
            quantity: 1,
            amount: 11.25,
            isTaxFree: true
        }
        let saleItem = new SaleItem(saleItemProps);

        expect(saleItem.taxAmount).toStrictEqual(0.6)
        expect(saleItem.totalAmount).toStrictEqual(11.85)

        saleItemProps.quantity = 2;
        saleItem = new SaleItem(saleItemProps);
        expect(saleItem.totalTaxAmount).toStrictEqual(1.2)
        expect(saleItem.totalAmount).toStrictEqual(23.70)
    })

})