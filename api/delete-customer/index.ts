import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('DeleteCustomer function processed a request.');
    let idocument = context.bindings.inputDocument;
    let cList = idocument[0].customerlist;

    try {
        let deleteC = cList.findIndex( ({id}) => id == req.body.id);
        if(deleteC > -1){
            context.log("delete customer with index " + deleteC);
    
            cList.splice(deleteC, 1);
        
            context.bindings.outputDocument = idocument;
        }
        else{
            context.log("Customer with given ID not found!");
        }
    } catch (error) {
        context.log("DeleteCustomer failed, error: " + error);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "test"
    };

};

export default httpTrigger;