var table =[]

function generateMatrix(){

    var num = parseInt(document.getElementById("difficulty").value);

    for(i=0; i<num; i++){
        table.push([]);

        for(j=0; j=i; j++){
            table[i].push(0);
        }
    }
}

 function generateTable(){
    $("#table").empty();
    var num = parseInt(document.getElementById("difficulty").value);
    for(i=0; i<num; i++){
        $("#table").append("<div>"+generateCol(i, num)+"</div>");
    }
 }

 function generateCol(row, num){
    var col="";
    
    for(j=0; j<num; j++){
        col+="<div class='flip-card'><div class='flip-card-inner'><div class='flip-card-front'><img width='70' src='"+flags[cards[random()].country]+"'></img></div><div class='flip-card-back'></div></div></div>";
    }
    return col;
 }

 function random(){
    var random = Math.floor(Math.random()*18);
    return random;
    //hacer que este número no se repita 2 veces
 }

 function changeMotive(){
    var motive = parseInt(document.getElementById("motive").value);
    $("td").attr("", "blue");
 }

 function assignPlace(){
     //preguntar si el valor de la bandera es "false"
     //llamar a número random entre 0 y max->(4, 5 o 6) para el primer valor de la matrix []
     //llamar a otra vez a num random entre 0 y max(4,5 o 6) para asignar el segundo valor de la matrix[][]
     //crear un for(k=0; k<2; k++) -> es un for que sólo se repite dos veces. Para ubicar la misma carta en 2 lugares random
     //switchear el valor de la tarjeta/bandera de "false" a "true"
 }