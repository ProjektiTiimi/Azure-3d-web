import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('EditCustomer function processed a request.');

    let idocument = context.bindings.inputDocument;
    let cList = idocument[0].customerlist;

    try {
        let editC = cList.findIndex( ({_id}) => _id == req.body._id);
        if(editC > -1){
            context.log("edit customer with index " + editC);
    
            cList[editC] = req.body
        
            context.bindings.outputDocument = idocument;
        }
        else{
            context.log("Customer with given ID not found!");
        }
    } catch (error) {
        context.log("DeleteCustomer failed, error: " + error);
    }

    let message = ("req.body: " + JSON.stringify(req.body));
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: message
    };

};

export default httpTrigger;