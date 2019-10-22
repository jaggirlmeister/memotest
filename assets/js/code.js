var table =[];
var positions=[];
//propiedades de position: row: i, col: j, country: XXX
var num = parseInt(document.getElementById("difficulty").value);

var chosenNumbers = [];
var copyChosenNumbers=[];
var executed = false;

var countries=[];
var shuffledCountries=[];

var totalFlags=18;
var positionFlag;

var cont=0;

function loadGame(){
    for(var p=0; p<totalFlags; p++){
        chosenNumbers.push(p);
    }
    countries=[];
    positions=[];
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
        console.info(ran);
        var selectedCountry = cards[ran].country;
        for(var l=0; l<2; l++){
            countries.push(selectedCountry);
        }
        console.log(countries);
        console.log(chosenNumbers);
    }
    for(var p=0; p<totalFlags; p++){
        chosenNumbers.push(p);
    }
}
//HAY QUE HACER QUE EL VALOR NUM LLEGUE A TODAS LAS VARIABLES Y SE ACTUALICE
//select onClick generateMatrix();
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
    console.log(positions);
    $("#prueba").append(JSON.stringify(positions));
    shuffle(positions);
    $("#prueba").append(JSON.stringify(positions));
}


 //Esta función crea un array con números ordenado de 0 a 18 (cantidad total de banderas) y luego los desordena (SÓLO LA PRIMERA VEZ QUE SE LLAMA, es por eso que está la variable executed). Random() devuelve el último número de ese array desordenado. Luego lo elimina con .pop()

 function createTable(){
    var num = parseInt(document.getElementById("difficulty").value);
    $("#table").empty();

    for(var i=0; i<num; i++){

        $("#table").append("<div>"+generateCol(i, num, positionFlag)+"</div>");
    }
 }

 function generateCol(row, num, pos){
    var col="";
    
    for(var j=0; j<num; j++){
        var actualFlag = positions[cont].flag;
        col+="<div class='flip-card'><div class='flip-card-inner'><div id='"+row+j+"' class='flip-card-front'><img width='70' src='"+flags[actualFlag]+"'></img>"+actualFlag+"</div><div class='flip-card-back'></div></div></div>";
        cont++;
    }
    return col;
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