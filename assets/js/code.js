var tableGame = [ [-1, -2, -3, -4], [-5, -6, -7, -8], [-9, -10, -11, -12]];

//Tablas de 4x4, 5x5, 6x6


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
        col+="<td></td>";
    }
    return col;
}

function changeMotive(){
    var motive = parseInt(document.getElementById("motive").value);
    $("td").attr("", "blue");
    alert(motive);
}
