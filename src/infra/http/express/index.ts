import express, {Express, Response, Request} from 'express';
import { CreateReceiptUseCase } from '../../../application/create-receipt.use-case';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.post('/receipt', async (req: Request, res: Response) => {
    try {
        const createRouteUseCase = new CreateReceiptUseCase();
        const output = await createRouteUseCase.execute(req.body);
        res.status(201).json(output);
    } catch(err){
        res.status(400).send();
    }
    
});

app.post('/receipt-html', async (req: Request, res: Response) => {
    try {
        const createRouteUseCase = new CreateReceiptUseCase();
        const output = await createRouteUseCase.execute(req.body);
        var html = "<h1>Receipt</h1><br/><ul>";
        output.itens.forEach(element => {     
            if(element.quantity > 1)   
                html += "<li>"+element.item+": "+ element.totalValue.toFixed(2) + " ("+element.quantity+" @ "+ element.unitValue.toFixed(2)+")</li>";
            else 
                html += "<li>"+element.item+": "+ element.totalValue.toFixed(2) + "</li>";
        });
        html += "</ul>";
        html += "<h4>Sales Taxes: "+output.totalTaxAmount.toFixed(2)+"</h4>";
        html += "<h4>Total: "+output.totalAmount.toFixed(2)+"</h4>";

        res.status(201).send(html);
    } catch(err){
        res.status(400).send();
    }
});

app.listen(port, () => {
    console.log(`Server run in port ${port}`);
});
