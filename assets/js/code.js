var table =[];
var positions=[];
//propiedades de position: row: i, col: j, country: XXX
var num = parseInt(document.getElementById("difficulty").value);

var countries=[];

for(var k=0; k<num*num; k++){
        var ran = random();
        var selectedCountry = cards[ran].country;
    for(var l=0; l<2; l++){
        countries.push(selectedCountry);
    }
console.log(countries);
}

function generateMatrix(){

    var num = parseInt(document.getElementById("difficulty").value);

    //var country= countries[i];

    for(var i=0; i<num; i++){
        table.push([]);

        for(var j=0; j<num; j++){
            table[i].push(0);
            //var flagNum = countries[j];
            //,flag:countries[j]
            positions.push({row:i,col:j,flag:"XXX"}); //Asignar pares de países sin que se repitan.
        }
    }
    console.log(positions);
}


/*function x(){

Asignar 1 país a al array countries[] y repetirlo una vez para formar un par.
No repetir un país ya usado.

La función debería devolver un array así:
[AAA, AAA, BBB, BBB ... ];
}

O: NO usar una función. Directamente asignar todos los valores de countries[] afuera. Arriba de generateMatrix();
*/

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
    for(var m =0; m<num*num; m++){
        positions[m].flag = countries[m];
    }
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

 //Para cargar las imágenes: USAR LA MISMA LÓGICA QUE ARRIBA. QUE VAYA DE A 2. ELIGE EL MISMO CÓDIGO DE LA BANDERA Y SE LAS ASIGNA A 2 POSICIONES, DEPSUÉS PASA A OTRA BANDERA Y ASÍ HASTA EL INICIO DEL ARRAY.
 // Supongo que esto cambiaría la forma en que mostramos las imágenes en la tabla generateCol.

 function generateCol(row, num){
    var col="";
    
    for(var j=0; j<num; j++){
        col+="<div class='flip-card'><div class='flip-card-inner'><div class='flip-card-front'><img width='70' src='"+flags[cards[random()].country]+"'></img>"+cards[random()].country+"</div><div class='flip-card-back'></div></div></div>";
    }
    return col;
 }


 function random(){
    var random = Math.floor(Math.random()*18);
    return random;
 }


 function changeMotive(){
    var motive = parseInt(document.getElementById("motive").value);
    $("td").attr("", "blue");
 }

