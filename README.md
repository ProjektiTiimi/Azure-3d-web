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
3. Asenna riippuvuudet komennolla:
```
npm i
```
4. Käynnistä paikallinen dev-serveri (edelleen frontend kansion sisällä)
```
npm start
```
5. Käynnistä swa emulaattori
```
swa start http://localhost:3000
```
Tällä komennolla

## Github Actions

Github Actions on jatkuvan kehityksen ja jatkuvan toimituksen (CI/CD) alusta, minkä avulla voidaan automatisoida build, testi ja deployment putkea. Automatisointi tapahtuu workflow tiedoston avulla, missä määritellään mitä ja milloin tehdään. 

Tässä projektissa on määritelty workflow tiedostot, mitkä seuraavat frontend- ja api-kansioiden muutoksia main-haarassa. Lisäksi on määritelty workflow tiedosto dev-haaran muutoksille, missä projektille ajetaan yksikkötestit.

1. Tehdään koodimuutoksia paikallisesti omassa haarassa ja pusketaan githubiin
2. Avataan pull request, jossa verrataan uutta haaraa dev-haaraan, jolloin yksikkötestit lähtee ajoon
3. Tehdään merge dev-haaraan
4. Avataan pull request, jossa verrataan dev-haaraa mainiin
5. Workflow tiedoston build and test job lähtee käyntiin, missä sovellus buildataan ja deployataan stage sitelle, minkä jälkeen ajetaan robottitestit.
6. Tehdään merge main-haaraan, jolloin workflow tiedoston build and deploy job lähtee käyntiin, missä sovellus deployataan tuotantoon
