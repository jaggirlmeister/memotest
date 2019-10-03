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
        $("#table").append("<tr>"+generateCol(i, num)+"</tr>");
    }
 }

 function generateCol(row, num){
    var col;
    
    for(j=0; j<num; j++){
        col+="<td><img width='70' src='"+flags[cards[random()].country]+"'></img></td>";
    }
    return col;
 }

 function random(){
    var random = Math.floor(Math.random()*18);
    return random;
 }

 function generateFlags(){
    var random = Math.random()*19;
    return random;
 }
 function changeMotive(){
    var motive = parseInt(document.getElementById("motive").value);
    $("td").attr("", "blue");
    alert(motive);
 }