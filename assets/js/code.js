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
    var col;
    
    for(j=0; j<num; j++){
        col+="<div class='flip-card'><div class='flip-card-inner'><div class='flip-card-front'><img width='70' src='"+flags[cards[random()].country]+"'></img></div><div class='flip-card-back'></div></div></div>";
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