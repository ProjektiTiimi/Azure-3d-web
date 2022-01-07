## Github Actions

Github Actions on jatkuvan kehityksen ja jatkuvan toimituksen (CI/CD) alusta, minkä avulla voidaan automatisoida build, testi ja deployment putkea. Automatisointi tapahtuu workflow tiedoston avulla, missä määritellään mitä ja milloin tehdään. 

Tässä projektissa on määritelty workflow tiedostot, mitkä seuraavat frontend- ja api-kansioiden muutoksia main-haarassa. Lisäksi on määritelty workflow tiedosto dev-haaran muutoksille, missä projektille ajetaan yksikkötestit.

1. Tehdään koodimuutoksia paikallisesti omassa haarassa ja pusketaan githubiin
2. Avataan pull request, jossa verrataan uutta haaraa dev-haaraan, jolloin yksikkötestit lähtevät ajoon
3. Tehdään merge dev-haaraan
4. Avataan pull request, jossa verrataan dev-haaraa mainiin
5. Workflow tiedoston build and test job lähtee käyntiin, missä sovellus buildataan ja deployataan stage sitelle, minkä jälkeen ajetaan robottitestit.
6. Tehdään merge main-haaraan, jolloin workflow tiedoston build and deploy job lähtee käyntiin, missä sovellus deployataan tuotantoon

### Github Actions avainsanat

Workflow tiedoston rakenne ja toiminnot määritellään erilaisten avainsanojen avulla. 
