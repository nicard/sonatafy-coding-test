import { CreateReceiptUseCase } from "./create-receipt.use-case";

describe('CreateReceiptUseCase', () => {
    it('Should create new receipt', async () => {    
        var useCase = new CreateReceiptUseCase();

        var itens = [
            {
                product: "Book",
                quantity: 1,
                amount: 12.49,
                isTaxFree: true
            },    
            {
                product: "Book",
                quantity: 1,
                amount: 12.49,
                isTaxFree: true
            },    
            {
                product: "Music CD",
                quantity: 1,
                amount: 14.99,
                isTaxFree: false
            },    
            {
                product: "Chocolate bar",
                quantity: 1,
                amount: 0.85 ,
                isTaxFree: true
            }
        ]
                
        var  result = await useCase.execute(itens);
        
        expect(result.itens[0].quantity).toStrictEqual(2)
        expect(result.itens[1].quantity).toStrictEqual(1)
        expect(result.itens[2].quantity).toStrictEqual(1)
        expect(result.itens[0].totalValue).toStrictEqual(24.98)
        expect(result.itens[0].unitValue).toStrictEqual(12.49)
        expect(result.totalAmount).toStrictEqual(42.32)
        expect(result.totalTaxAmount).toStrictEqual(1.50)
    })

    it('Should create new receipt with imported itens', async () => {    
        var useCase = new CreateReceiptUseCase();

        var itens = [
            {
                product: "Imported box of chocolates",
                quantity: 1,
                amount: 10.00,
                isTaxFree: true
            },    
            {
                product: "Imported bottle of perfume ",
                quantity: 1,
                amount: 47.50,
                isTaxFree: false
            }
        ]
                
        var  result = await useCase.execute(itens);
        
        expect(result.totalAmount).toStrictEqual(65.15)
        expect(result.totalTaxAmount).toStrictEqual(7.65)
    })

    it('Should create new receipt with mixed imported itens and tax free itens', async () => {    
        var useCase = new CreateReceiptUseCase();

        var itens = [
            {
                product: "Imported bottle of perfume",
                quantity: 1,
                amount: 27.99,
                isTaxFree: false
            },    
            {
                product: "Bottle of perfume",
                quantity: 1,
                amount: 18.99,
                isTaxFree: false
            },    
            {
                product: "Packet of headache pills",
                quantity: 1,
                amount:  9.75,
                isTaxFree: true
            },    
            {
                product: "Imported box of chocolates",
                quantity: 1,
                amount:  11.25,
                isTaxFree: true
            },    
            {
                product: "Imported box of chocolates",
                quantity: 1,
                amount:  11.25,
                isTaxFree: true
            }
        ]
                
        var  result = await useCase.execute(itens);
        
        expect(result.totalAmount).toStrictEqual(86.53)
        expect(result.totalTaxAmount).toStrictEqual(7.30)
    })
 })