Vaš najboljši prijatelj Vladko, ki ni sosed od Žmauca, ima Majhno podjetje d.o.o. Ugotovil je, da se vsak dan sreèuje z razliènimi dokumenti, ki so sicer shranjeni na nekem skupnem disku, vendar pa bi jim koristili kakšni dodatni podatki.

Napišite spletno aplikacijo, ki bo ustrezala spodnjim zahtevam:

1    Skenirani dokument se doda v spletno aplikacijo, takrat se mu doda tip, datum skeniranja in druge meta podatke.
2    Mogoèe je dodajati nove tipe dokumentov.
3    Vsako spremembo ali dodatek metapodatkov k dokumentu je potrebno zabeležiti in prikazati skupaj z dokumentom.
4    Zabeležiti je treba tudi dostop do dokumentov.
5    Za vsak tip dokumenta lahko doloèimo pravice - kdo ima dostop, kdo lahko ureja metapodatke, ...
6    Za vsak tip dokumenta je mogoèe doloèiti proces potrjevanja. Npr. vsak raèun mora potrditi direktor, šele nato ga vidijo v raèunovodstvu, prošnjo za izdajo potnega naloga ali za dopust pa mora odobriti neposredni nadrejeni.


1. Opis aplikacije, cljina publika in podprte naprave

Konèni izdelek je namenjen vsem uporabnikom vseh generacij. Prva faza projekta je implementirana kar se da minimalistièno. To uporabniku omogoèi
karseda enostavno in unikatno izkušnjo. Posledièno ima implementirane le osnovne funkcionalnosti, kot je vpis/izpis in prenos datoteke na strežnik. 

Sama aplikacija omogoèa prenos podatkov na strežnik, a le èe se uporabnik prej prijavi (admin, admin). Èe se želi prijaviti mora miško postaviti na
siv rob leve strani. Ta se kasneje pomakne v desno kjer uporabniku omogoèa prijavo in prenos. Po uspešnem prenosu, se nova datoteka pojavi v seznamu
ostalih. Aplikacija bo podprta na vseh napravah, ki podpirajo HTML5 in CSS3. Zaradi enostavnosti bi rad uporabo omejil na eno stran, ki se dinamièno spreminja.

Zaradi prenosa datotek na strežnik, sem bil primoran uporabit malo PHP-ja, èe sem želel to funkcionalnost implementirat. Potreboval sem strežnik apache s php. 
Odloèil sem se uporabit službeno domeno in sem si postavil virtualni strežnik, ter nanj namestil XAMP. V naprej prosim asistente, da se ne 
zadržijo s uplodanjem vsebine, kajti za test je zaenkrat možno naložit le en dokument. Aplikacija je dostopna na dostop.structura.si:28080/sp01/


2. Poroèilo o težavah

V aplikaciji je nekaj problemov, ni pravega dodajanja datotek, vpis v spletno stran je zapisan v javascriptu.
Vse to je potrebno implementirati na lepši naèin, s uporabo podatkovne baze in ostalih orodij.
Pravtako ni implementiranega ostranjevanja rezultatov, potrebno je tudi pravilno razporejanje datotek na stran. 


3. Nadgradnje

Vse bo potekalo na eni spletni strani, kjer se bodo odpirala modalna okna za interakcijo s vsem, uporabniki, datotekami, formami.
Na levi bo drsni meni, ki bo ponujal razliène funkcionalnosti. Ko bo uporabnik kliknil na nek element, npr. datoteko, se bo odprlo okno za spreminjanje
lastnosti in metapodatkov datoteke. Pravtako manjka implementacija pravic, nadzor in možnost spreminjanja uporabnika, ter varnost. 
Implementirati je potrebno registiranje novih uporabnikov.

4. Dva gradnika
Implementiral sem 2 gradnika, modalna okna in drsni meni.
Drsni meni uporablja CSS3 transitions in transform, s pomoèjo katerih premikam centralni del v desno. Hkrati pa premikam na 0, moj dejanski meni, ki je
drugaèe v negativnem zamiku. Elementa, ki sta v uporabi: center in lefty


//kursor je pointer
//definiram senco
//definicija tranzicije
lefty {
	cursor: pointer;
	position: fixed;
	left: -224px;//skrijem v negativo
	background-color: #CCCCCC;
	border-right: 30px solid #808080;
	box-shadow: 4px 0 5px rgba(0,0,0,0.2);
	z-index: 1;
	top: 0;
	bottom: 0;
	transition: 500ms ease-in-out;
	-webkit-transition: 500ms ease-in-out;
	-moz-transition: 500ms ease-in-out;
	-ms-transition: 500ms ease-in-out;
	-o-transition 500ms ease-in-out;
}

//deficija lefty po dogodku
//pravtako postavim pušèico
lefty:after {
	position: absolute;
	content:' ';//tole nam nariše pušèico
	width: 0;
	height: 0;
	right: -50px;
	top: 50%;
	border-width: 15px 10px;
	border-style: solid;
	border-color: transparent transparent transparent #808080;
}

//ko miška pride nad element postavi na 0
lefty:hover
{
	left: 0;
}

//ne pozabi na tekst
lefty ul
{
	width: 196px;
	list-style-type: none;
	margin: 0;
	padding: 14px;
}


//definicija centra
center 
{
	z-index: 0;
	position: fixed;
    background-color: white;
	left: 50px;
	height: 80%;
	width:97%;
	border-left: 3px solid #808080;
	display: inline-block;
	text-align: left;
	transition: 500ms ease-in-out;
	-webkit-transition: 500ms ease-in-out;
	-moz-transition: 500ms ease-in-out;
	-ms-transition: 500ms ease-in-out;
	-o-transition 500ms ease-in-out;
}

//pozor pointer events na none
center:after
{

	pointer-events: none;
	position: absolute;
	top: 0;	
	bottom: 0;
}

//animacija premika centra ob tem ko gremo hover nad lefty
lefty:hover ~ center
{
	-webkit-transform: translateX(256px);
	-moz-transform: translateX(256px);
	-ms-transform: translateX(256px);
	-o-transform: translateX(256px);
	transform: translateX(256px);
}


Modalna okna poleg CSS3 uporabljajo tudi javascript in niso tako kompleksna. Enostavno zakrijejo v koordinatnem izhodišèu celoten ekran s transparetno
èrnino. Ko javascript zazna klik iz menija sproži metodo show(modalnoOkno), ki pokaže modalno okno.




Domen Kosmaè
27.11.2016


