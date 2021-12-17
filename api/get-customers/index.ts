import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    let tuloste = "";
    try {
        tuloste = JSON.stringify(context.bindings.inputDocument[0].customerlist);
    } catch (error) {
        context.log("Stringifying customerlist failed, error: " + error);
    }
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: tuloste
    };

};

export default httpTrigger;