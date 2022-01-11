# Azure-3D-Web

Tässä projektissa on siirretty 3d-web-sovellus Azure-ympäristöön käyttämällä Azure Static Web Apps, Azure Functions ja Cosmos DB resursseja. React sovellus pyörii Static Web Appsissa, rajapinta Azure Functionsissa ja tietokanta Cosmos DB:ssä.

## Esivaatimukset paikalliselle kehittämiselle

Koneella täytyy olla asennettuna Azure Static Web Apps CLI sekä Azure Functions Core tools -työkalut, jotta projekti voidaan ajaa paikallisesti.

Azure Static Web Apps CLI asennus komennolla:
```
npm i -g @azure/static-web-apps-cli
```
Azure Functions Core Tools asennus komennolla:
```
npm i -g azure-functions-core-tools@4 --unsafe-perm true
```

## Projektin ajaminen paikallisesti

1. Kloonaa projekti omalle koneelle komennolla
```
git clone <projektin osoite>
```
2. Avaa terminaali projektin pääkansiossa ja siirry frontend-kansioon
```
cd frontend
```
3. Asenna riippuvuudet ja käynnistä paikallinen dev-serveri komennoilla:
```
npm i
npm start
```
4. Siirry api-kansioon ja aja komennot:
```
npm i
npm run build
```
5. Siirry pääkansioon ja käynnistä swa emulaattori
```
cd ..
swa start http://localhost:3000 --api-location ./api
```
Tällä komennolla swa emulaattori käynnistää react appin localhost:4280 portissa ja apin localhost:7071 portissa.

 
