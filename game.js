function setPositions() {
 for (var i = 1; i <=80 ; i++) {
	 positions[i]=new Object();
	 positions[i].from=i;

	 if(snakePositions.indexOf(i)!=-1){
	   positions[i].to=snakeNewPositions[snakePositions.indexOf(i)];
	   positions[i].type="Snake";
	 }
	 else if(ladderPositions.indexOf(i)!=-1){
	   positions[i].to=ladderNewPositions[ladderPositions.indexOf(i)];
	   positions[i].type="Ladders";
	 }
	 else if(i===29 || i===46){
		positions[i].to=i;
		positions[i].type="pythonEffect";
	 }
	 else{
	   positions[i].to=i;
		positions[i].type="Normal";
	 }
	}
	 return positions;
 }

var cells=setPositions();
for (var i = 1; i <=80 ; i++) {
    console.log("Cell: "+i+" type: "+cells[i].type+" From: "+cells[i].from+" To: "+cells[i].to)
}


function newGame(){
	let value = Math.floor(Math.random() * 2)+1;
	if(value==1){
		player1.turn=true;
		document.getElementById("turnInfo").innerHTML="Turn: Player 1";
	}else{
		player2.turn=true;
		document.getElementById("turnInfo").innerHTML="Turn: Player 2";
	}
	document.getElementById("diceInfo").innerHTML="Dice: Roll to start the game";
	document.getElementById("pythonInfo1").innerHTML="Player1 python Effect: Disable";
	document.getElementById("pythonInfo2").innerHTML="Player2 python Effect: Disable";
}

function play(){
  let value;
  document.getElementById("name").style.visibility = "hidden";
  if(getPlayerTurn()==player1 && document.getElementById("p1name").value==="tsitsipas"|| getPlayerTurn()==player2 && document.getElementById("p2name").value==="tsitsipas"){
    if(getPlayerTurn().position===0){
      value=5;
    }else{
      value=4;
    }
  }else{
    value = random();
  }
  updateGUI(value);
	if(getPlayerTurn()==player1){
		if((player1.position + value)>80){
			player1.prev=player1.position;
			player1.position=80-((player1.position + value)-80);
		}else{
			player1.prev=player1.position;
			player1.position=player1.position+value;
		}
		if((positions[player1.position].type=="Ladders") || (positions[player1.position].type=="Snake" && player1.python==false)){
			player1.position=positions[player1.position].to;
		}else if(positions[player1.position].type=="pythonEffect"){
			player1.python=true;
			document.getElementById("pythonInfo1").innerHTML="Player1 python Effect: Enable";
		}
		changePosition1(player1.position);
	}else{
		if((player2.position + value)>80){
			player2.prev=player2.position;
			player2.position=80-((player2.position + value)-80);
		}else{
			player2.prev=player2.position;
			player2.position=player2.position+value;
		}
		if((positions[player2.position].type=="Ladders")|| (positions[player2.position].type=="Snake" && player2.python==false)){
			player2.position=positions[player2.position].to;
		}else if(positions[player2.position].type=="pythonEffect"){
			player2.python=true;
			document.getElementById("pythonInfo2").innerHTML="Player2 python Effect: Enable";
		}
		changePosition2(player2.position);
	}
	changePlayerTurn(value);
	hasPlayerWon();
}

function getPlayerTurn(){
	if (player1.turn){
		return player1;
	}
	return player2;
}

function changePlayerTurn(value){
	if(value!=6){
		if(getPlayerTurn()==player1){
			player1.turn=false;
			player2.turn=true;
			document.getElementById("turnInfo").innerHTML="Turn: Player 2";
		}else{
			player1.turn=true;
			player2.turn=false;
			document.getElementById("turnInfo").innerHTML="Turn: Player 1";
		}
	}
}

function changePosition1(newPosition){
	if(newPosition==player2.position){
		document.getElementById("position"+newPosition).innerHTML="<img  src='imagesBoth/"+newPosition+".png'  height=70 width=70></div>";
	}else{
		document.getElementById("position"+newPosition).innerHTML="<img  src='imagesRed/"+newPosition+".png'  height=70 width=70></div>";
	}
	if(player1.prev>0 &&player1.prev!=player2.position){
		document.getElementById("position"+player1.prev).innerHTML="<img  src='images/"+player1.prev+".png'  height=70 width=70></div>";
	}else if(player1.prev>0 &&player1.prev==player2.position){
		document.getElementById("position"+player1.prev).innerHTML="<img  src='imagesWhite/"+player1.prev+".png'  height=70 width=70></div>";
	}

}

function changePosition2(newPosition){
	if(newPosition==player1.position){
		document.getElementById("position"+newPosition).innerHTML="<img  src='imagesBoth/"+newPosition+".png'  height=70 width=70></div>";
	}else{
		document.getElementById("position"+newPosition).innerHTML="<img  src='imagesWhite/"+newPosition+".png'  height=70 width=70></div>";
	}
	if(player2.prev>0 &&player2.prev!=player1.position){
		document.getElementById("position"+player2.prev).innerHTML="<img  src='images/"+player2.prev+".png'  height=70 width=70></div>";
	}else if(player2.prev>0 &&player2.prev==player1.position){
		document.getElementById("position"+player2.prev).innerHTML="<img  src='imagesRed/"+player2.prev+".png'  height=70 width=70></div>";
	}
}

function hasPlayerWon(){
	if(player1.position==80){
		document.getElementById("winner").innerHTML=document.getElementById("p1name").value +" won the game!!!";
		document.getElementById("rollDice").style.visibility = 'hidden';
    document.getElementById("wingif").innerHTML="<img  src='images/winner.gif'  height=200 width=200>";
	}else if(player2.position==80){
			document.getElementById("winner").innerHTML=document.getElementById("p2name").value +" won the game!!!";
			document.getElementById("rollDice").style.visibility = 'hidden';
      document.getElementById("wingif").innerHTML="<img  src='images/winner.gif'  height=200 width=200>";
	}
}

function updateGUI(value){
  document.getElementById("roll").innerHTML="<img  src='ImagesDice/"+value+".png'  height=70 width=70></div>";
  document.getElementById("diceInfo").innerHTML="Dice: "+value;
}


function random(){
	let value = Math.floor(Math.random() * 6)+1;
	return value;
}

function visible(){
  document.getElementById("rollDice").style.visibility = "visible";
}
