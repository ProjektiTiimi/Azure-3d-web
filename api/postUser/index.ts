import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Post userData function processed a request.');
    let tuloste = "";
    let billerdata = req.body;
    billerdata.id = "biller";
    context.bindings.outputDocument = billerdata;
    
    try {
        context.log("input document data:" + JSON.stringify(context.bindings.inputDocument));
    } catch (error) {
        context.log("Stringifying user data failed, error: " + error);
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: tuloste
    };

};

export default httpTrigger;