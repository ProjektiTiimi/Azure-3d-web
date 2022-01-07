# Azure Static Web App - API

Azuren portaalissa on määritelty SWA:n workflow tiedostoon [workflow.yml](https://github.com/ProjektiTiimi/Azure-3d-web/blob/main/.github/workflows/azure-static-web-apps-wonderful-sea-0b9eeac03.yml). Tiedosto sisältää azure_static_web_apps_api_tokenin ja linkityksen /api-kansioon. 


## Funktion lisääminen projektiin

Uuden Azure-funktion lisääminen swa-projektiin onnistuu helpoiten käyttämällä Visual Studio Coden [swa-lisäosaa](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps). Tämän jälkeen uuden funktion lisääminen onnistuu suoraan kuvassa näkyvällä komennolla

![](/documentation/images/swa-new-function.png?)

Funktion koodit tulevat omaan alikansioonsa, ja kansio sisältää function.json -määrittelytiedoston ja index.ts-tiedoston. TypeScript käännetään JavaScriptiksi dist-kansioon, joka on [määritetty](/api/tsconfig.json) compilerin outDirectoryksi.
 
## Projektissa käytettävät funktiot

Projektin rajapinta on toteutettu käyttämällä [HTTP-trigger-funktioita](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook-trigger?tabs=javascript). Funktioiden kansioista löytyvistä function.json -tiedostosta selviää kunkin funktion bindingit kannan suuntaan, sekä funktion kutsuun käytettävä api-polku. Rajapintakutsujen tekeminen onnistuu vain autentikoituneelta käyttäjältä, koska frontend-kansion tiedostossa [staticwebapp.config.json](/frontend/staticwebapp.config.json) on näin määritelty.

Funktioita suoritettaessa Azuren puolella, tehdään function.json -tiedoston määrittelemät bindaukset aina ennen itse funktion suorittamista. Tämä tarkoittaa, että virheellisen function.json -tiedoston aiheuttamia ongelmia ei voida logittaa taikka kiertää index.ts-tiedoston koodeilla, eikä esimerkiksi parametrien antaminen bindauksen SQL-querylle tai collectionin nimen säätäminen itse funktion koodissa ole mahdollista. 

### Kannan rakenne

Tietokanta on rakennettu siten, että jokaisella käyttäjällä on oma [collection](https://docs.microsoft.com/en-us/rest/api/cosmos-db/collections) yhteisessä kannassa. Käyttäjän kirjautuessa sisään luodaan linkkaus olemassa olevaan collectioniin, tai luodaan collection mikäli sitä ei vielä ole. Funktio [setContainer](/api/setContainer/index.ts) luo containerin käyttämällä autentikoituneen käyttäjän userID:tä myös containerin id:nä. Container alustetaan kolmella itemillä, "biller", "customers" sekä "invoices". Esimerkki tietokannan rakenteesta alla:

![](/documentation/images/database.png?)

### Kannan linkkaus rajapintaan

HTTP-trigger-funktiot bindataan cosmosDB-kantaan function.json -tiedostossa. Rivi "connectionStringSetting": "3dwebdb_DOCUMENTDB" viittaa azure static web app:n configure-tiedostossa määriteltyyn muuttujaan, johon on tallennettu cosmosDB:n asetuksista löytyvä "PRIMARY CONNECTION STRING".

Bindauksen voi tehdä sisään- tai ulospäin, riippuen haluaako lukea vai kirjoittaa dataa, vai molempia. Esimerkiksi add-customer -funtion [määrittelytiedostossa](/api/add-customer/function.json) on linkkaus kantaan molempiin suuntiin; Ensin funktiossa haetaan asiakaslista-array kannasta, seuraavaksi lisätään siihen uusi asiakas, ja lopuksi ylikirjoitetaan vanha array kantaan. 

Projektin funktiot on yleisesti luotu siten, että kutsureitti on muotoa /api/${ContainerID}/funktionnimi. Reitissä määriteltyä muuttujaa voidaan näin käyttää function.json -tiedostossa rajaamaan bindaus vain yksittäiseen collectioniin koko tietokannan sijaan. Lisää rajausta voidaan tehdä antamalla esimerkiksi sqlQueryllä. Dokumentaatio CosmosDB-konfiguraatoista löytyy [täältä](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-cosmosdb-v2-input?tabs=javascript#configuration).

### Funktioiden koodit

Funktiot ottavat sisään parametrin context, joka sisältää function.jsonissa määritellyt bindingit. Näihin voi viitata koodissa helposti, esimerkiksi add-customer funktiossa rivi "let idocument = context.bindings.inputDocument;" tallentaa muuttujaan asiakaslista-arrayn, joka bindauksen yhteydessä nimettiin inputDocumentiksi. 

Vastaavasti funktioiden parametri req sisältää HTTP request [objektin](https://docs.microsoft.com/en-us/python/api/azure-functions/azure.functions.httprequest?view=azure-python), jonka kautta päästään apipyynnön mukana lähetettyyn dataan esimerkiksi tallentamalla req.body muuttujaan.

Debuggausta varten, paikallisesti funktioita ajaessa, on context-objektin "context.log" ominaisuus kätevä funktion testaamiseen. Azuren puolella funktioita ajaessa logit eivät ole luettavissa swa-resurssissa, mutta Azure Function App -resurssi mahdollistaa pääsyn myös funktion consoleen.

## Rajapinnan tietoturvasta

Vaikka /api/* -reitti on rajattu autentikoiduille käyttäjille, ei se ole tuotantoympäristöön riittävä suojaus. Nykyisellä ratkaisullahan autentikoitunut käyttäjä pääsee käsiksi myös toisten käyttäjien dataan, mikäli arvaa id:n ja tekee apipyynnön esimerkiksi osoitteeseen /api/toisenKäyttäjänID/getCustomers. Lisää suojausta rajapintaan voitaisiin tehdä esimerkiksi seuraavilla tavoilla

### Autentioituneen käyttäjän ID:n tarkistaminen

Funktion vaatiessa autentikoinnin, löytyy context-parametrin headers-osiosta aina cookie "StaticWebAppsAuthCookie", joka sisältää koodattuna autentikoituneen käyttäjän perustiedot, myös userID:n. Toisaalta req-objekti sisältää parametrin ContainerID, ja näin voidaankin lisätä yksinkertainen tarkistus funktion alkuun ja verrata autentikoituneen käyttäjän ja haetun collectionin id:tä toisiinsa. Jos käyttäjä on hakemassa omia tietojaan, ovat ID:t aina samat, ja muussa tapauksessa voidaan hylätä pyyntö ja palauttaa virheviesti. 

Tutkimisen arvoinen on myös mahdollisuus tehdä fetch-pyyntö funktion sisältä /.auth/me -polkuun, ja tarkistaa kirjautuneen käyttäjän id sieltä.

### Custom-roolit rajapintaan

Rajapinta on nyt avoin kaikille autentikoituneille käyttäjille, mutta Azuren portaalista pystyy määrittelemään myös oman käyttäroolin ja laittamaan /api -reitin vain sen roolin käyttäjille. Uudet käyttäjät voi näin pitää rajapinnan ulkopuolella, kunnes admin käy niille erikseen rajapintaoikeudet antamassa.

### Vaihtoehtoiset ratkaisut

Mikäli asiakas haluaa pitää tietokannan sisällön piilossa myös kannan ylläpitäjiltä, on tietokentät salattava jo ennen kantaan lähettämistä (field level encryption). Tämä todennäköisesti onnistuu lisäämällä azure funktioihin middlewarea, mutta out-of-the-box ratkaisua azure functions ei tähän tarjoa, eikä azure functions-rajapinta ole todennäköisesti optimaalinen rajapinta tällaisen toteuttamiseen. 
