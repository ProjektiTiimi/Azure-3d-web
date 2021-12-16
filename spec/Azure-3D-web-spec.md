## Toiminnallisuus

Laskun tulostaminen pdf-muotoon tietokantaan tallennetuista asiakastiedoista. 

Tulostuksen pitää toimia puhelimellakin ja nappeihin pitää osua myös pakkasella sormikkaat kädessä. 

Toiminnallisuus, kuten aiemmin toteutetussa 3D-Web -sovelluksessa lisättynä seuraavilla ominaisuuksilla.
* Laskut tallennetaan järjestelmään json-muodossa, ei pdf-dokumentteina. 
* Uuden laskuttajan luonti tulee olla mahdollista automaattisesti käyttämällä erillistä "Luo uusi laskuttaja" -toimintoa kirjautumissivulla.

## Teknologiat 
* Azure
* UI 
  * Azure Static Web App
  * React.js + TypeScript 
* API 
  * Azure Functions ja/tai Container Instances
  * node.js (+TypeScript) 
* DB 
  * Azure PaaS
  * esim. Cosmos DB, PostgreSQL, MSSQL
* Testiautomaatio
  * Robot Framework 
  * Automaattinen testaus ennen julkaisua.

## Työkalut 
* Azure
* Git 
  * Kaikki tuotokset Git-versionhallintaan. 
* Slack

## Ei-toiminnalliset vaatimukset

1. Käyttäjän tulee tunnistautua käyttäjätunnuksella ja salasanalla
- alussa 1 käyttäjä riittää
- myös apikey käy tunnistautumiseksi.
- tämä koskee käyttöliittymää ja API-palveluita.
2. Eri laskuttajien tietojen tulee olla loogisesti eroteltuna tietokannan tasolla. Laskuttajat eivät siis voi nähdä tai muokata toisten laskuttajien tietoja missään olosuhteissa.
3. Asiakastiedot tulee salata tietokannassa.
