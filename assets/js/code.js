var table =[];
var positions=[];
//propiedades de position: row: i, col: j, country: XXX
var num = parseInt(document.getElementById("difficulty").value);

var chosenNumbers = [];
var executed = false;

var countries=[];
var shuffledCountries=[];

var totalFlags=18;


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
    console.info(positions);
    return array;
    
 }

//meter todo esto en una función para poder vaciar el array
function createRandomFlags(){
    countries = [];
    shuffledCountries =[];
    for(var k=0; k<num*num; k++){
        var ran = random();
        console.info(ran);
        var selectedCountry = cards[ran].country;
        for(var l=0; l<2; l++){
            countries.push(selectedCountry);
        }
        console.log(countries);
    }
}
//HAY QUE HACER QUE EL VALOR NUM LLEGUE A TODAS LAS VARIABLES Y SE ACTUALICE
//select onClick generateMatrix();
function generateMatrix(){

    var num = parseInt(document.getElementById("difficulty").value);

    //var country= countries[i];

    for(var i=0; i<num; i++){
        table.push([]);

        for(var j=0; j<num; j++){
            table[i].push(0);
            positions.push({row:i,col:j,flag:""}); //flag asigna un valor vacío que luego vamos a llenar con el código de la bandera.
        }
    }
    //llenamos el espacio vacío
    createRandomFlags();
    for(var n=0; n<num*num; n++){
        positions[n].flag = countries[n];
    }
    console.log(positions);
}

 function generateTable(){
    executed=false;
    $("#table").empty();
    var num = parseInt(document.getElementById("difficulty").value);
    for(var i=0; i<num; i++){
        $("#table").append("<div>"+generateCol(i, num)+"</div>");
    }
    fill(num);
 }

 function fill(){
    generateMatrix();
    $("#prueba").append(JSON.stringify(positions));
    shuffle(positions);
    $("#prueba").append(JSON.stringify(positions));

 }

 /*hay que lograr parsarle el valor de la bandera a esta función. El problema es que generateCol() se ejecuta ANTES que la matrix. Es decir, la matrix todavía no existe cuando esta función se ejecuta.
 IDEAS:
 1. Crear todos los tags vacíos. Una vez que se termine de ejecutar la matrix crear una función que llamando pór ID cambie los src pór los corespondientes.
 
*/
 function generateCol(row, num){
    var col="";
    
    for(var j=0; j<num; j++){
        //var actualFlag = positions[j].flag; Esto no funciona porque todavía no existe la variable positions. Pero es lo que hay que hacer.
        col+="<div class='flip-card'><div class='flip-card-inner'><div id='"+row+j+"' class='flip-card-front'><img width='70' src='"+flags[cards[randomTry()].country]+"'></img>"+cards[randomTry()].country+"</div><div class='flip-card-back'></div></div></div>";
    }
    return col;
 }

//Esta función solo trae las banderas y luego hay que eliminarla.
 function randomTry(){
    var random = Math.floor(Math.random()*18);

    return random;
 }

 //Esta función crea un array con números ordenado de 0 a 18 (cantidad total de banderas) y luego los desordena (SÓLO LA PRIMERA VEZ QUE SE LLAMA, es por eso que está la variable executed). Random() devuelve el último número de ese array desordenado. Luego lo elimina con .pop()

 function random(){
    if (executed==false){
        for(var p=0; p<totalFlags; p++){
            chosenNumbers.push(p);
        }
        shuffle(chosenNumbers);
        executed=true;
    }
    var last = chosenNumbers.pop();
    return last;
 }


//Esta función es para cambiar los motivos y la vamos a usar al final
 function changeMotive(){
    var motive = parseInt(document.getElementById("motive").value);
    $("td").attr("", "blue");
 }