import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('setContainer function processed a request.');
    let responseMessage = "";
    let billerdata = {'id' : 'biller'};
    let customerlist = {'id' : 'customers', 'customerlist' : []};
    let invoices = {'id': 'invoices', 'invoices' : []};
    context.bindings.outputDocument = [billerdata, customerlist, invoices];
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;