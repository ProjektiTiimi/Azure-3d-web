import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    let id = "1584912f-41f8-48e7-b721-6b3fe32482ff"

    context.bindings.outputDocument = JSON.stringify({
        YTunnus: req.body.YTunnus,
        asiakkaanNimi: req.body.asiakkaanNimi,
        Postitusosoite: req.body.Postitusosoite,
        Postinumero: req.body.Postinumero,
        Toimipaikka: req.body.Toimipaikka
    });
    let message = ("req.body: " + JSON.stringify(req.body));
    

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: message
    };

};

export default httpTrigger;