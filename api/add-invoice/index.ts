import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    var idocument = context.bindings.inputDocument;

    idocument[0].invoices.push(req.body);
    
    context.bindings.outputDocument = idocument;

    let viesti = ("req.body: " + JSON.stringify(req.body))

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: viesti
    };

};

export default httpTrigger;