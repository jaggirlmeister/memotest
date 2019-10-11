var table =[];
var positions=[];
//propiedades de position: row: i, col: j, country: XXX
var num = parseInt(document.getElementById("difficulty").value);

var chosenNumbers = [];

var countries=[];
var shuffledCountries=[];

for(var k=0; k<num*num; k++){
        var ran = random();
        var selectedCountry = cards[ran].country;
    for(var l=0; l<2; l++){
        countries.push(selectedCountry);
    }
console.log(countries);
}
//select onClick generateMatrix();
function generateMatrix(){

    var num = parseInt(document.getElementById("difficulty").value);

    //var country= countries[i];

    for(var i=0; i<num; i++){
        table.push([]);

        for(var j=0; j<num; j++){
            table[i].push(0);
            positions.push({row:i,col:j,flag:""}); //Asigna un valor vacío que luego vamos a llenar con el código de la bandera.
        }
    }
    //llenamos el espacio vacío
    for(var n=0; n<num*num; n++){
        positions[n].flag = countries[n];
    }
    console.log(positions);
}


 function generateTable(){
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

 function generateCol(row, num){
    var col="";
    
    for(var j=0; j<num; j++){
        //var actualFlag = positions[j].flag; Esto no funciona porque todavía no existe la variable positions. Pero es lo que hay que hacer.
        col+="<div class='flip-card'><div class='flip-card-inner'><div class='flip-card-front'><img width='70' src='"+flags[cards[random()].country]+"'></img>"+cards[random()].country+"</div><div class='flip-card-back'></div></div></div>";
    }
    return col;
 }


/*
Podemos: 
O crear un numero random y compararlo con posiciones en un array al que le vamos sumando numeros usados con .push .
O crear un array con numeros entre 0 y 18 ordenados. Luego pasárselo a la función shuffle() para que los mezcle y que la función random() devuelva un número de ese array.

Nota: esto que dejé escrito no funciona*/

 function random(){
    var random = Math.floor(Math.random()*18);

    chosenNumbers.push(random);

    console.log(chosenNumbers);
    return random;
 }

 //cambiar el 18 por flags.length

 function changeMotive(){
    var motive = parseInt(document.getElementById("motive").value);
    $("td").attr("", "blue");
 }