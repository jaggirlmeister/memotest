//Armado de tabla y matrix
var table =[];
var countries=[];
var positions=[]; //propiedades de position: row: i, col: j, country: XXX
var num = parseInt(document.getElementById("difficulty").value);
var totalFlags=18;
var positionFlag;
var cont=0;

//Jugabilidad
var playerOnePoints=0;
var playerTwoPoints=0;
var actualPlayerOnePoints=0;
var actualPlayerTwoPoints=0;
var turn=0;
var pair=0;
var second=0;
var first=0;
var firstCountry="";
var secondCountry="";
var pairsFound=0;
var pairsAmount=0;
var canClick = true;
var tileValue=0;
var lastFlag="";

/*Esto es para agregarles nombres a los jugadores
var player1=prompt("Ingrese nombre del primer jugador");
var player2=prompt("Ingrese nombre del jugador 2");*/

/*Así podemos guardar en localStorage y llamarlos. Pero no lo estamos usando.
localStorage.setItem('tile', tileValue);
localStorage.getItem('tile');
*/

function loadGame(){

    //Reinicio todos los valores
    chosenNumbers = [];
    countries=[];
    positions=[];
    cont=0;
    pairsFound=0;
    tileValue=0;
    $("#player1Points").empty();
    $("#player1Points").append(actualPlayerOnePoints);
    $("#player2Points").empty();
    $("#player2Points").append(actualPlayerTwoPoints);

    //Vuelvo a pedir el valor de num (tamaño de la tabla: 4, 5 o 6)
    var num = parseInt(document.getElementById("difficulty").value);
    if(num==4){
        tileValue=5;
    }else if(num==5){
        tileValue=10;
    }else{
        tileValue=15;
    }

    //Calculo la cantidad de pares que voy a tener
    pairsAmount=Math.floor((num*num)/2);

    //Creo un array con números de 0 a 17(total de banderas)
    for(var p=0; p<totalFlags; p++){
        chosenNumbers.push(p);
    }

    //Llamo a las funciones que generan la matriz y la tabla
    generateMatrix(num);
    createTable(num);
}

function generateMatrix(num){

    //Vacío la tabla
    table=[];

    //Creo la matriz
    for(var i=0; i<num; i++){
        table.push([]);

        for(var j=0; j<num; j++){
            table[i].push(0);
            positions.push({row:i,col:j,flag:""});
            //Lleno el array positions con objetos que tienen los valores de columna, fila y bandera.
            //Flag asigna un valor vacío que luego vamos a llenar con el código de la bandera "XXX".
        }
    }

    //llenamos el espacio vacío
    //llamo a una función que llena el array countries[] *LEER QUÉ HACE createRandomFlags*
    createRandomFlags(num);
    for(var n=0; n<num*num; n++){
        positions[n].flag = countries[n];//Asignamos en la posición [n] de positions (el array que le faltaba el valor flag) el valor de flag que obtuvimos en la otra función
    }
    if(num==5){
        lastFlag=countries[24];
        console.info(lastFlag);
    }
    shuffle(positions); //bien, hasta acá el array estaba ordenado. Ahora simplemente pasamos el array a esa función y ya se desordena. TERMINAMOS LA MATRIZ.
}

function createRandomFlags(num){
    
    //este for se repite a corde a la cantidad de PARES que necesitmos. Es decir, que será LA MITAD del total de las fichas en la tabla
    for(var k=0; k<Math.floor(num*num)/2; k++){
        var ran = random(); // Copiamos el valor que nos devuelve random() en la variable ran. *LEER QUÉ HACE random()* 
        var selectedCountry = cards[ran].country; //Creamos una variable que se llama selectedCountry y pedimos el valor "country" del objeto cards[en la posición del número ran]
        countries.push(selectedCountry); //Copiamos el valor obtenido del objeto en el array selectedCountry 2 VECES.
        countries.push(selectedCountry); //¿Por qué 2 veces? porque necesitamos asignarle este valor a DOS fichas para formar el par. Y ahora sí podemos llenar el espacio vacío de "flag".
    }
}

//Random() desordena chosenNumbers[] y devuelve el último número; Luego lo elimina con .pop(). O sea, random() nos devuelve 1 SÓLO NÚMERO cada vez que lo llamamos.
//chosenNumbers[] es el array con los numeros de 0 a 17
function random(){
    shuffle(chosenNumbers);
    var last = chosenNumbers.pop();
    return last;
}

function createTable(num){
    /*Esto es para agregarles nombre a los jugadores
    $("#pointsPl1").html(player1);
    $("#pointsPl2").html(player2);*/

    $("#table").empty(); //vacío el tablero

    for(var i=0; i<num; i++){
        //creo la cantidad de "divs filas" que necesito y con la función generateCol() le anexo los "divs columnas"
        $("#table").append("<div>"+generateCol(i, num)+"</div>");
    }

    //if tabla es 5. Entonces obtener el id de la ficha diferente y cambiar el onclick.
}

function generateCol(row, num){
    var col="";
    //los divs columnas que voy a crear tienen: sus id's sacados del numero de los for (i)(j); llaman a la función onclick "flip" que pasa como parámetro su ID; y dentro de cada div hay un tag img con la bandera que necesitamos (que pedimos del objeto "flags", el otro archivo .js). Y LISTO, YA ESTÁ LA TABLA.
    for(var j=0; j<num; j++){
        var actualFlag = positions[cont].flag;

        //Pregunto si el tablero es de 5 para poder darle una función diferente a la ficha especial
        if(num==5 && actualFlag==lastFlag){
            col+="<div class='flip-card' onclick='specialTile("+(row+1)+(j+1)+")'><div id='"+(row+1)+(j+1)+"' class='flip-card-inner'><div class='flip-card-front'><img width='70' src='"+flags[actualFlag]+"'></img></div><div class='flip-card-back'></div></div></div>";
            cont++;
        }
        else{ 
            col+="<div class='flip-card' onclick='flip("+(row+1)+(j+1)+",\""+actualFlag+"\")'><div id='"+(row+1)+(j+1)+"' class='flip-card-inner'><div class='flip-card-front'><img width='70' src='"+flags[actualFlag]+"'></img></div><div class='flip-card-back'></div></div></div>";
            cont++;
        }
    }
    return col;
}

//JUGABILIDAD

function flip(position, flag){
    
    if(canClick && position!=first){ 
        if(pair==0){
            first=position;
            firstCountry=flag;
            $("#"+first).removeClass("rotateBack");
            $("#"+first).addClass("rotate");
            pair ++;
        }
        else if(pair==1){
            second=position;
            secondCountry=flag;
            $("#"+second).removeClass("rotateBack");
            $("#"+second).addClass("rotate");
            pair=0;

            //si no son par..
            if(firstCountry!==secondCountry){
                canClick = false;
                setTimeout(flipBack, 1000);
            }
            //si son par..
            else{
                //deshabilito el onclick
                $("#"+first).parent().addClass("disable");
                $("#"+second).parent().addClass("disable");

                //si el turno es del jugador 1...
                if(turn==0){
                    actualPlayerOnePoints=actualPlayerOnePoints+tileValue;
                    playerOnePoints=playerOnePoints+tileValue;
                    $("#player1Points").empty();
                    $("#player1Points").append(actualPlayerOnePoints);
                    $("#player1TotalPoints").empty();
                    $("#player1TotalPoints").append(playerOnePoints);
                }
                //si el turno es del jugador 2...
                else{
                    actualPlayerTwoPoints=actualPlayerTwoPoints+tileValue;
                    playerTwoPoints=playerTwoPoints+tileValue;
                    $("#player2Points").empty();
                    $("#player2Points").append(actualPlayerTwoPoints);
                    $("#player2TotalPoints").empty();
                    $("#player2TotalPoints").append(playerTwoPoints);
                }
                pairsFound++;

                if(pairsFound==pairsAmount){
                    //Ganó el jugador 1
                    if(actualPlayerOnePoints>actualPlayerTwoPoints){
                        setTimeout(winFlip, 500);
                        $("#table").append("<div id='announce'><p>¡Ganó el jugador 1!</p><button onclick='loadGame()'>Jugar de nuevo</button> <button onclick='sureAbout()'>Reiniciar juego</button></div>");

                        actualPlayerOnePoints=0;
                        actualPlayerTwoPoints=0;
                    }
                    //Ganó el jugador 2
                    else if(actualPlayerOnePoints<actualPlayerTwoPoints){
                        setTimeout(winFlip, 500);
                        $("#table").append("<div id='announce'><p>¡Ganó el jugador 2!</p><button onclick='loadGame()'>Jugar de nuevo</button> <button onclick='sureAbout()'>Reiniciar juego</button></div>");

                        actualPlayerOnePoints=0;
                        actualPlayerTwoPoints=0;
                    }
                    //Empate!
                    else{
                        setTimeout(winFlip, 500);
                        $("#table").append("<div id='announce'><p>¡Empate!</p><button onclick='loadGame()'>Jugar de nuevo</button> <button onclick='sureAbout()'>Reiniciar juego</button></div>");

                        actualPlayerOnePoints=0;
                        actualPlayerTwoPoints=0;
                    }     
                }
            }
        }
    }
}

//Si no son par esta función los vuelve a girar y les devuelve la función de onclick.
function flipBack(){
    $("#"+first).removeClass("rotate").addClass("rotateBack");
    $("#"+second).removeClass("rotate").addClass("rotateBack");

    //cambio el turno del jugador y el indicador
    if(turn==0){
        turn=1;
        $("#pointsPl2").addClass("glow");
        $("#pointsPl1").removeClass("glow");
    }
    else{
        turn=0;
        $("#pointsPl1").addClass("glow");
        $("#pointsPl2").removeClass("glow");
    }
    canClick = true;
}

//Función para la ficha especial. Se suman 50 puntos al jugador que la encuentra.
function specialTile(position){
    
        var specialTileValue=50;
        $("#"+position).addClass("rotate");
        $("#"+position).addClass("specialTile");
        $("#"+position).parent().addClass("disable");
        if(turn==0){ 
            playerOnePoints=playerTwoPoints+specialTileValue;
            $("#player1Points").empty();
            $("#player1Points").append(playerOnePoints);
        }
        else{
            playerTwoPoints=playerTwoPoints+specialTileValue;
            $("#player2Points").empty();
            $("#player2Points").append(playerTwoPoints);
        }
        lastFlag="";
    }

//giro de las fichas al ganar
function winFlip(){
    $(".flip-card-inner").removeClass("rotate");
    $(".flip-card-inner").addClass("rotateWin");
}

function resetGame(){
    playerOnePoints=0;
    playerTwoPoints=0;
    totalPlayer2Points=0;
    totalPlayer1Points=0;
    $("#player1Points").empty();
    $("#player1Points").append(playerOnePoints);
    $("#player2Points").empty();
    $("#player2Points").append(playerTwoPoints);

    $("#player1TotalPoints").empty();
    $("#player1TotalPoints").append(playerOnePoints);
    $("#player2TotalPoints").empty();
    $("#player2TotalPoints").append(playerTwoPoints);

    loadGame();
}

function sureAbout(){
    $("#announce").empty();
    $("#announce").append("<p>¿Está seguro? Si reinicia la partida perderá sus puntos</p><button onclick='loadGame()'>No</button><button onclick='resetGame()'>Sí</button>");
}

//Esta función es para cambiar los motivos y la vamos a usar al final
function changeMotive(){
    var motive = document.getElementById("motive").value;

    $("body").css("background-image","url('assets/images/"+motive+".jpg'");
}


 //Funcion para mezclar. (Nos la pasó Fabián de internet)
var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
    return array;
}