///////////////////
// les variables //
///////////////////

/*Variable du DOM - Zone de jeu*/

var $zoneDeJeu = document.getElementById("jeu");


/*Variable du DOM - Bouton "Recommencer"*/

var $btnRestart = document.getElementById("btnRestart")

/*Variables du DOM - Les Cases*/

var $casel1c1 = document.getElementById("l1c1");
var $casel1c2 = document.getElementById("l1c2");
var $casel1c3 = document.getElementById("l1c3");

var $casel2c1 = document.getElementById("l2c1");
var $casel2c2 = document.getElementById("l2c2");
var $casel2c3 = document.getElementById("l2c3");

var $casel3c1 = document.getElementById("l3c1");
var $casel3c2 = document.getElementById("l3c2");
var $casel3c3 = document.getElementById("l3c3");

// Je stocke les cases dans un tableau pour pouvoir toutes les cibler d'un coup au moment de l'initialisation de la zone de jeu
var toutesLesCases = [	$casel1c1, $casel1c2, $casel1c3,
						$casel2c1, $casel2c2, $casel2c3,
						$casel3c1, $casel3c2, $casel3c3,	];

/*Autre Variables*/

//Je déclare ces varible, mais je ne leur donnerais une valeur qu'au moment de l'initialisation de la partie.
var tourDuJoueur; //pour suivre le tour du joueur 1 ou 2 comme valeur numérique possible
var nombreDeCoups; //pour suivre les tours de l'ensemble des joueurs, valeur numérique de 0 à 9 (il y a 9 cases)

/////////////////////////////////
//   Les Fonctions du jeu      //
/////////////////////////////////


//DEBUT--initialise la partie--
function initialisationDeLaPartie(){
	
	tourDuJoueur = 1; //Définit le joueur 1 comme premier joueur

	//+ optionnel : tire un joueur au hasard
	//+ tourDuJoueur = Math.floor(2*Math.random()+1);

	nombreDeCoups = 0; //Initialise le nombre de coups joués

	//parcour chaque case et supprime les class "joueur1" et "joueur2"
	for( i = 0 ; i < toutesLesCases.length ; i++ ) {
		toutesLesCases[i].classList.remove("joueur1", "joueur2")
	};

};
//FIN--initialise la partie--

//DEBUT--Cocher une case--
function cocherUneCase(event) {
	
	//alert(event.target.id); //<<<<ETAPE  2>>>>>

/*on teste event.target.classList == "case" pour voir si la case cochée ne contient QUE "case" en class :
	>>c'est le cas : on teste également de quel joueur c'est le tour (tourDuJoueur):
		=> 1 : on ajoute "joueur1" aux class de la case cliquée.
		=> 2 : on ajoute "joueur2" aux class de la case cliquée.
	>>ce n'est pas le cas :
		c'est qu'un joueur à déjà joué, on alerte donc le joueur. */
		// <<<<ETAPE 6>>>>
	
	if (event.target.classList == "case" && tourDuJoueur == 1) {
		event.target.classList.add("joueur1");
		nombreDeCoups++; //On ajoute 1 au nombre de coups joués
	} else if (event.target.classList == "case" && tourDuJoueur == 2) {
		event.target.classList.add("joueur2");
		nombreDeCoups++; //On ajoute 1 au nombre de coups joués
	} else {
		alert('Cette case a déjà été jouée, merci de rejouer.');
	};

	/* le joueur a jouer on va tester les conditions de victoires */

	conditionsDeVictoire();

	/* si toutes les cases sont pleine on préviens puis on réinitialise au bout de 2 secondes*/

	if (nombreDeCoups === 9) {
		alert('Plus de coup possible, la partie va redémarrer');
		setTimeout(function(){initialisationDeLaPartie()}, 2000);
	} else {
		changeDeJoueur();	// on change de joueur <<<<ETAPE 3>>>>
	};
};
//FIN--Cocher une case--



//DEBUT--Conditions de victoire--
function conditionsDeVictoire() {

	var alignements = [ 
	// Je stocke dans un tableau des tableaux de séries de 3 cases devant être testées pour déclarer une victoire
	// Les Lignes
	[$casel1c1, $casel1c2, $casel1c3],
	[$casel2c1, $casel2c2, $casel2c3],
	[$casel3c1, $casel3c2, $casel3c3],
	// Les Colonnes
	[$casel1c1, $casel2c1, $casel3c1],
	[$casel1c2, $casel2c2, $casel3c2],
	[$casel1c3, $casel2c3, $casel3c3],
	// Les diagonales
	[$casel1c1, $casel2c2, $casel3c3],
	[$casel1c3, $casel2c2, $casel3c1]
	];


	//on teste chaque serie de trois cases dans le tabeau 'alignement' via le 'for':
	//Parmis les 3 cases, contiennent-elles toutes les class "joueur1" ou "joueur2"
	//'=== true' n'est pas obligatoire
	//<<<<ETAPE 5>>>>


	for ( i = 0 ; alignements.length > i ; i++ ) 
	{
		if (
	alignements[i][0].classList.contains("joueur1") === true &&
	alignements[i][1].classList.contains("joueur1") === true &&
	alignements[i][2].classList.contains("joueur1") === true 

	||

	alignements[i][0].classList.contains("joueur2") === true &&
	alignements[i][1].classList.contains("joueur2") === true &&
	alignements[i][2].classList.contains("joueur2") === true
		)
	//si un des enssemble de 3 conditions est vrais alors : on indique que
	//la partie est finie, on relance après 2 secondes
		{
		alert('Le joueur ' + tourDuJoueur + ' gagne !\nLa partie va recommencer');
		setTimeout(function(){initialisationDeLaPartie()}, 2000)
		};
	};
};
//FIN--Conditions de victoire--

//DEBUT--change de Joueur--
function changeDeJoueur(){
	switch(tourDuJoueur){
		case 1 :
		tourDuJoueur = 2 ;
		break ;
		case 2 :
		tourDuJoueur = 1 ;
		break ;
	};
	/* On aurrait pu faire avec if : */
	// if (tourDuJoueur === 1){
	// 	tourDuJoueur = 2;
	// } else { tourDuJoueur = 1; };
};
//FIN--change de Joueur--

/////////////
// Action! //
/////////////

initialisationDeLaPartie(); //initialiser la partie
$zoneDeJeu.addEventListener('click', cocherUneCase); //Action au clic sur la zone de jeu
$btnRestart.addEventListener('click', initialisationDeLaPartie); //Action au clic sur le bouton "relancer" : Lance le script d'initialisation <<<<ETAPE 4>>>>

///////////////////////////
// On Aurrait pu ajouter //
///////////////////////////

// Compter les points
// Personnaliser l'alertbox
// Un indicateur pour indiquer le tour du joueur
// Une IA
// ...