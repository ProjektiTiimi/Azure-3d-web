***Settings***
Library     SeleniumLibrary

Suite Teardown      Close Browser

***Variables***

${Browser}  Chrome

#Variables for test user
${USER}  Robot OY
${PASSWORD}  robottisalasana
${USER_YTUNNUS}  RobotYTunnus
${USER_EMAIL}    robot@mail.com
${USER_IBAN}     FI49 5000 9420 0287 30

#Variables for test customer
${CUSTOMER_YTUNNUS}     RobotAsiakkaanYTunnus
${CUSTOMER_NAME}        RobotAsiakas
${CUSTOMER_ADDRESS}     Robottiosoite
${CUSTOMER_ADDNUM}      12345
${CUSTOMER_CITY}        RobottiKaupunki

#Variables to edit customer
${EDIT_YTUNNUS}     RoboEditYTunnus
${EDIT_NAME}        RoboEdit
${EDIT_ADDRESS}     EditOsoite
${EDIT_ADDNUM}      12345678
${EDIT_CITY}        EditKaupunki

***Test Cases***
Open Browser
    Open Browser To Login Page
# Register
#     Set Selenium Speed  0.1
#     Open Browser To Login Page
#     Register New User With Invalid Credentials
#     Register New User With Valid Credentials

# Login
#     Login With Invalid Credentials
#     Login With Valid Credentials

# Add Customer
#     Navigate To Add Customer
#     Add Invalid Data For New Customer
#     Add Data For New Customer
#     Save New Customer

# Modify Customer
#     Navigate To Customerlist
#     Select Customer
#     Modify Customer

# Add Data For invoice
#     Fill First Form Invalid Data
#     Fill First Form Valid Data
#     Fill Second Form

# Remove Test Data
#     Remove Test Customer
#     Remove Test User

***Keywords***

Open Browser To Login Page
    Open Browser    ${URL}  ${Browser}  
    #options=add_argument("--ignore-certificate-errors"); add_experimental_option("excludeSwitches", ["enable-logging"]); add_argument('--window-size=1920,1080'); add_argument('--no-sandbox')
    Maximize Browser Window
    Click Element  //*[@id="root"]/nav/a[2]/button
    Page Should Contain  Laskuttajan tiedot

Register New User With Invalid Credentials
    Click Element  //*[@id="root"]/div/div/div/a
    Page Should Contain  Rekisteröidy
    Click Element  //*[@id="root"]/div/div/input[6]
    Page Should Contain  Tunnus ei voi olla tyhjä
    Page Should Contain  Salasana ei voi olla tyhjä
    Page Should Contain  Y-tunnus ei voi olla tyhjä
    Page Should Contain  Email ei voi olla tyhjä
    Page Should Contain  Tilinumero ei voi olla tyhjä

Register New User With Valid Credentials
    Click Element  //*[@id="root"]/nav/a[2]/button
    Click Element  //*[@id="root"]/div/div/div/a
    Page Should Contain  Rekisteröidy
    Input Text  //*[@id="root"]/div/div/input[1]    ${USER}
    Input Text  //*[@id="root"]/div/div/input[2]    ${PASSWORD}
    Input Text  //*[@id="root"]/div/div/input[3]    ${USER_YTUNNUS}
    Input Text  //*[@id="root"]/div/div/input[4]    ${USER_EMAIL}
    Input Text  //*[@id="root"]/div/div/input[5]    ${USER_IBAN}
    Click Element  //*[@id="root"]/div/div/input[6]

Login With Invalid Credentials
    Click Element  //*[@id="root"]/nav/a[2]/button
    Page Should Contain  Kirjaudu
    Click Element  //*[@id="root"]/div/div/div/input[3]
# Tähän epäonnistuneen kirjautumisen tarkistus kun se tulee valmiiks!

Login With Valid Credentials
    Click Element  //*[@id="root"]/nav/a[2]/button
    Page Should Contain  Kirjaudu
    Input Text  //*[@id="root"]/div/div/div/input[1]    ${USER}
    Input Text  //*[@id="root"]/div/div/div/input[2]    ${PASSWORD}
    Click Element  //*[@id="root"]/div/div/div/input[3]
# Tähän onnistuneen kirjautumisen varmistus!

Navigate To Add Customer
    Click Element       //*[@id="root"]/nav/ul/li[2]/a
    Location Should Contain     /addcustomer

Add Invalid Data For New Customer
    Input Text  //*[@id="root"]/div/div/input[3]    ${CUSTOMER_ADDRESS}
    Input Text  //*[@id="root"]/div/div/input[4]    ${CUSTOMER_ADDNUM}
    Input Text  //*[@id="root"]/div/div/input[5]    ${CUSTOMER_CITY}
    Click Element  //*[@id="root"]/div/div/button
    Page Should Contain  Y-tunnus ei voi olla tyhjä
    Page Should Contain  Yrityksen nimi ei voi olla tyhjä

Add Data For New Customer
    Input Text  //*[@id="root"]/div/div/input[1]    ${CUSTOMER_YTUNNUS}
    Input Text  //*[@id="root"]/div/div/input[2]    ${CUSTOMER_NAME}
    Input Text  //*[@id="root"]/div/div/input[3]    ${CUSTOMER_ADDRESS}
    Input Text  //*[@id="root"]/div/div/input[4]    ${CUSTOMER_ADDNUM}
    Input Text  //*[@id="root"]/div/div/input[5]    ${CUSTOMER_CITY}

Save New Customer
    Click Element  //*[@id="root"]/div/div/button
    Page Should Contain  Asiakas lisätty onnistuneesti

Navigate To Customerlist
    Click Element  //*[@id="root"]/nav/ul/li[1]/a
    Location Should Contain     /invoice

Select Customer
    Input Text  //*[@id="root"]/div/div/div[1]/input  ${CUSTOMER_NAME}
    Click Element  //*[@id="root"]/div/div/div[1]/div[1]/div/a/button

Modify Customer    
    Input Text  //*[@id="root"]/div/div/input[1]    ${EDIT_YTUNNUS}
    Input Text  //*[@id="root"]/div/div/input[2]    ${EDIT_NAME}
    Input Text  //*[@id="root"]/div/div/input[3]    ${EDIT_ADDRESS}
    Input Text  //*[@id="root"]/div/div/input[4]    ${EDIT_ADDNUM}
    Input Text  //*[@id="root"]/div/div/input[5]    ${EDIT_CITY}
    Click Element  //*[@id="root"]/div/div/button
    Navigate To Customerlist
    Input Text  //*[@id="root"]/div/div/div[1]/input  ${EDIT_NAME}
    Click Element  //*[@id="root"]/div/div/div[1]/div/div/button

Fill First Form Invalid Data
    Location Should Contain     /invoice
    Input Text  //*[@id="root"]/div/div/div[2]/input[1]     FI37 1590 3000 0007 77
    Input Text  //*[@id="root"]/div/div/div[2]/div[3]/input[1]  123456789
    Click Element  //*[@id="root"]/div/div/div[2]/button
    Element Should Not Be Visible  //*[@id="barCodeImg"]/img

Fill First Form Valid Data
    Location Should Contain     /invoice
    Input Text  //*[@id="root"]/div/div/div[2]/input[1]     FI37 1590 3000 0007 76
    Input Text  //*[@id="root"]/div/div/div[2]/div[3]/input[1]  123456789
    Click Element  //*[@id="root"]/div/div/div[2]/button
    Element Should Be Visible  //*[@id="barCodeImg"]/img


Fill Second Form
    Input Text  //*[@id="root"]/div/div/div[3]/div/input[1]  RobottiLasku
    Input Text  //*[@id="root"]/div/div/div[3]/div/input[2]  2
    Input Text  //*[@id="root"]/div/div/div[3]/div/input[3]  44
    Click Element  //*[@id="root"]/div/div/div[3]/button 
    ${kpl}=  Get Text  //*[@id="DivToPrint"]/body/div[1]/table[1]/tr/td[2]
    Should Be Equal As Strings  ${kpl}  2
    ${hinta}=  Get Text  //*[@id="DivToPrint"]/body/div[1]/table[1]/tr/td[3]
    Should Be Equal As Strings  ${hinta}    44

Remove Test Customer
    Input Text  //*[@id="root"]/div/div/div[1]/input  ${EDIT_NAME}
    Click Element  //*[@id="root"]/div/div/div[1]/div[1]/div/a/button
    Page Should Contain     Muokkaa asiakasta
    Click Element  //*[@id="root"]/div/div/button[2]
    Page Should Contain  Poistettu

Remove Test User
    Click Element  //*[@id="root"]/nav/ul/li[1]/a
    Click Element  //*[@id="root"]/div/div/div[4]/div[3]/button[1]
