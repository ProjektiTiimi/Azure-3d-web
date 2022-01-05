import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('getBiller function processed a request.');
    let idocument = context.bindings.inputDocument;
    let resp = JSON.stringify(idocument[0]);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: resp
    };

};

export default httpTrigger;