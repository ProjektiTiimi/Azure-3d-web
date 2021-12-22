import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('AddCustomer function processed a request.');

    let idocument = context.bindings.inputDocument;

    let newcustomer = req.body;

    newcustomer._id = Date.now().toString();

    idocument[0].customerlist.push(newcustomer);

    let message = ("req.body: " + JSON.stringify(req.body));

    context.bindings.outputDocument = idocument;
    

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: message
    };
 
};

export default httpTrigger;