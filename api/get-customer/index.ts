import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    let idocument = context.bindings.inputDocument;
    let cList = idocument[0].customerlist;
    let getC

    try {
        getC = cList.findIndex( ({_id}) => _id == req.body._id);
    } catch (error) {
        context.log("GetCustomer failed, error: " + error);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: cList[getC]
    };

};

export default httpTrigger;