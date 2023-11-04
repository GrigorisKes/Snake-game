var positions = [];
var snakePositions   = [13,20,28,44,58,59,65,72,78];
var snakeNewPositions=[11,10,7,34,48,39,25,52,69];
var ladderPositions   =[5,16,21,37,42,54,60,67,73];
var ladderNewPositions=[33,36,61,56,53,64,80,77,76];

const player1 ={
	turn:false,
	position:0,
	python:false,
	prev:-1
};

const player2 ={
	turn:false,
	position:0,
	python:false,
	prev:-1
};

function initBoard(){
	document.getElementById("rollDice").style.visibility = "hidden";
	var table = document.getElementById('mainTable');
	var tr = document.createElement('tr');
	for (var i = 8; i >=1; i--) {
	  var tr = document.createElement('tr');
	  for (var j = 9; j >=0; j--) {
	  var td1 = document.createElement('td');
	  var num=i*10-j;
	  td1.innerHTML="<div id='position"+num+"'><img  src='images/"+num+".png'  height=70 width=70></div>";
	  tr.appendChild(td1);

	  }
	  table.appendChild(tr);
	}
	setPositions();
	newGame();
}
