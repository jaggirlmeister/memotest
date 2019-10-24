var table =[];
var positions=[];
//propiedades de position: row: i, col: j, country: XXX
var num = parseInt(document.getElementById("difficulty").value);

var playerOnePoints=0;//futuras variable
var playerTwoPoints=0;
var turn=0;

var turno= true; //turno jugadores

var countries=[];

var totalFlags=18;
var positionFlag;

var cont=0;
var pair=0;
var second=0;
var first=0;
var firstCountry="";
var secondCountry="";

var canClick = true;

function loadGame(){
    chosenNumbers = [];
    countries=[];
    positions=[];
    cont=0;
    for(var p=0; p<totalFlags; p++){
        chosenNumbers.push(p);
    }
    //Random() devuelve el último número de ese array desordenado. Luego lo elimina con .pop()
    var num = parseInt(document.getElementById("difficulty").value);
    generateMatrix(num);
    createTable(num);
 }

function random(){
    shuffle(chosenNumbers);
    var last = chosenNumbers.pop();
    return last;
 }

//meter todo esto en una función para poder vaciar el array
function createRandomFlags(num){
    
    for(var k=0; k<Math.floor(num*num)/2; k++){
        var ran = random();
        var selectedCountry = cards[ran].country;
        //positions[k].name = cards[ran].name;
        for(var l=0; l<2; l++){
            countries.push(selectedCountry);

        }
    }
    for(var p=0; p<totalFlags; p++){
        chosenNumbers.push(p);
    }
}

function generateMatrix(num){
    table=[];

    //var country= countries[i];

    for(var i=0; i<num; i++){
        table.push([]);

        for(var j=0; j<num; j++){
            table[i].push(0);
            positions.push({row:i,col:j,flag:""}); //flag asigna un valor vacío que luego vamos a llenar con el código de la bandera.
        }
    }
    //llenamos el espacio vacío
    createRandomFlags(num);
    for(var n=0; n<num*num; n++){
        positions[n].flag = countries[n];
    }
    shuffle(positions);
}

 function createTable(){
    var num = parseInt(document.getElementById("difficulty").value);
    $("#table").empty();

    for(var i=0; i<num; i++){

        $("#table").append("<div>"+generateCol(i, num, positionFlag)+"</div>");
    }
 }

 function generateCol(row, num){
    var col="";
    
    for(var j=0; j<num; j++){
        var actualFlag = positions[cont].flag;
        col+="<div class='flip-card' onclick='swap("+(row+1)+(j+1)+",\""+actualFlag+"\")'><div id='"+(row+1)+(j+1)+"' class='flip-card-inner'><div class='flip-card-front'><img width='70' src='"+flags[actualFlag]+"'></img></div><div class='flip-card-back'></div></div></div>";
        cont++;
    }
    return col;
 }

function swap(a, b){
    if(canClick && a!=first){ 

        if(pair==0){
            first=a;
            firstCountry=b;
            $("#"+first).removeClass("rotateBack");
            $("#"+first).addClass("rotate");
            pair ++;
        }

        else if(pair==1){
            second=a;
            secondCountry=b;
            $("#"+second).removeClass("rotateBack");
            $("#"+second).addClass("rotate");
            pair=0;
            if(firstCountry!==secondCountry){
            canClick = false;
                setTimeout(swapBack, 1000);

            }
            else{
                    $("#"+first).parent().addClass("disable");
                    $("#"+second).parent().addClass("disable");
                    if(turn==0){
                        playerOnePoints=playerOnePoints+5;
                        $("#player2Points").addClass("");
                        $("#player1Points").empty();
                        $("#player1Points").append(playerOnePoints);
                        turn=1;
                    }else{
                        playerTwoPoints=playerTwoPoints+5;
                        $("#player2Points").empty();
                        $("#player2Points").append(playerTwoPoints);
                        turn=0;
                    }
            }
        }
    }
}

function swapBack(){

    $("#"+first).removeClass("rotate").addClass("rotateBack");
    $("#"+second).removeClass("rotate").addClass("rotateBack");

    canClick = true;

}


//Esta función es para cambiar los motivos y la vamos a usar al final
 function changeMotive(){
    var motive = parseInt(document.getElementById("motive").value);
    $("td").attr("", "blue");
 }

 //Funcion para mezclar
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