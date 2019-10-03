var tableGame = [ 
    ["v", "v", "v", "v", "v", "v"], 
    ["v", "v", "v", "v", "v", "v"], 
    ["v", "v", "v", "v", "v", "v"],
    ["v", "v", "v", "v", "v", "v"],
    ["v", "v", "v", "v", "v", "v"],
    ["v", "v", "v", "v", "v", "v"],
];

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
        col+="<td><img width='70' src='"+flags[cards[j].country]+"'></img></td>";
    }
    return col;
}

function changeMotive(){
    var motive = parseInt(document.getElementById("motive").value);
    $("td").attr("", "blue");
    alert(motive);
}

