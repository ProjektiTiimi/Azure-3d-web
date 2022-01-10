## Azure Static Web Apps

Azure Static Web Apps on palvelu, joka automaattisesti rakentaa ja ottaa käyttöön full stack verkkosovelluksia Azureen koodivarastosta.

Azure Static Web Appsin työnkulku on räätälöity kehittäjän päivittäiseen työnkulkuun. Sovellukset rakennetaan ja otetaan käyttöön koodimuutosten perusteella.

Kun luot Azure Static Web Apps -resurssin, Azure on suoraan vuorovaikutuksessa GitHubin tai Azure DevOpsin kanssa ja valvoo valitsemaasi haaraa. Joka kerta, kun työnnät sitoumuksia tai hyväksyt vetopyynnöt valvottuun haaraan, koontiversio suoritetaan automaattisesti ja sovelluksesi ja API otetaan käyttöön Azuressa.

Staattiset verkkosovellukset rakennetaan yleensä käyttämällä kirjastoja ja kehyksiä, kuten Angular, React, Svelte, Vue tai Blazor, joissa palvelinpuolen renderöintiä ei vaadita. Nämä sovellukset sisältävät HTML-, CSS-, JavaScript- ja kuvasisällöt, jotka muodostavat sovelluksen. Perinteisessä verkkopalvelimessa näitä resursseja palvellaan yhdeltä palvelimelta vaadittujen API-päätepisteiden ohella.

Staattisten verkkosovellusten avulla staattiset resurssit erotetaan perinteisestä verkkopalvelimesta, ja niitä palvellaan sen sijaan pisteistä, jotka sijaitsevat maantieteellisesti ympäri maailmaa. Tämä jakelu nopeuttaa tiedostojen toimittamista huomattavasti, koska tiedostot ovat fyysisesti lähempänä loppukäyttäjiä. Lisäksi API-päätepisteitä isännöidään palvelimettomalla arkkitehtuurilla, mikä välttää täyden taustapalvelimen tarpeen.

### Avainominaisuudet

* Verkkopalvelu staattiselle sisällölle, kuten HTML, CSS, JavaScript ja kuvat.
* Azure Functionsin tarjoama integroitu API-tuki, jossa on mahdollisuus linkittää olemassa oleva Azure Functions -sovellus tavallisella tilillä.
*  Ensiluokkainen GitHub- ja Azure DevOps -integraatio, jossa arkiston muutokset käynnistävät koonnoksia ja käyttöönottoja.
*  Globaalisti jaettu staattinen sisältö, joka tuo sisällön lähemmäs käyttäjiäsi.
* Ilmaiset SSL-sertifikaatit, jotka uusitaan automaattisesti.
* Muokatut verkkotunnukset tarjotaksesi brändimuokkauksia sovelluksellesi.
* Saumaton suojausmalli käänteisellä välityspalvelimella sovellusliittymiä kutsuttaessa, mikä ei vaadi CORS-määritystä.
* Todennuspalveluntarjoajan integraatiot Azure Active Directoryn, GitHubin ja Twitterin kanssa.
* Mukautettava valtuutusroolin määrittely ja tehtävät.
* Taustareitityssäännöt mahdollistavat täyden hallinnan tarjoamaasi sisältöä ja reittejä kohtaan.
* Luodut vaiheversiot, jotka perustuvat vetopyyntöihin, mikä mahdollistaa sivustosi esikatselun ennen julkaisua.

### Mitä voit tehdä Static Web Appsillä

* Rakenna moderneja verkkosovelluksia JavaScript-kehyksillä ja kirjastoilla, kuten Angular, React, Svelte, Vue, tai Blazorilla WebAssembly-sovellusten luomiseen Azure Functions -taustajärjestelmän avulla.
* Julkaise staattisia sivustoja kehyksillä, kuten Gatsby, Hugo, VuePress.
* Ota verkkosovelluksia käyttöön kehyksillä, kuten Next.js ja Nuxt.js. 