//Konrad Bogacz, Zuzanna Stachura, Alicja Winnicka

//#region zmienne

var maze=false;
var all;
var onebar = 40
var constant = 50 //zwiazana z odlegloscia miedzy "początkami kratek"
var dim = 5;
var Roads;
var directionNESW = [false, false, false, false] // gora, prawo, dol, lewo
var directions = [-1,-1,-1,-1]
var currentIndex = 0
var ballx = 0;
var bally = 0;
var ballindex = 0;
var start = true
var lastx=0;
var lasty = 0;
//#endregion

//#region start
//funkcje na start strony
window.addEventListener('load',function(){
	DownloadMazeJSON(dim,dim);
	DrawMazeCanvas()
	onStart()
	},true);
//#endregion

//#region Rysowanie canvas
function DrawMazeCanvas()
{
	if(maze===false)
		setTimeout(DrawMazeCanvas,900);
	else
	{
		Roads=maze.paths;
		//wymiary calkowite siatki labiryntu
		var w=dim*50+20;
		var h=dim*50+20;
		cc = document.getElementById("lab");
		cc.width = w+30;
		cc.height = h+30;
		
		
		//tlo labiryntu
		var ctx = cc.getContext("2d");
		ctx.fillStyle = '#c6c5b9';
		ctx.fillRect(10, 10, w, h)
		
		//mniejszy prostokat labirynty
		var ctx = cc.getContext("2d");
		ctx.fillStyle = '#000000';
		ctx.fillRect(10, 10, w, h)
	
		for(let i=0; i<Roads.length; i++) 		
		{
			//dla kazdej kostki
			let x1=Roads[i].x;
			let y1=Roads[i].y;
			
			//dla kazdej sciezki od kostki
			for(let j=0; j<Roads[i].L.length; j++)
			{				
				let x2=Roads[Roads[i].L[j]].x;
				let y2=Roads[Roads[i].L[j]].y;
				if(x2>=x1 && y2>=y1)
				{
					let dx = (x2-x1);
                    let dy = (y2-y1);
                            
                    let xlen = onebar + dx * constant;// + przerwyX * dim;
                    let ylen = onebar + dy * constant;// + przerwyY * dim;
                 //   console.log(x1, y1, xlen, ylen)
                    ctx.beginPath();
                
                    ctx.rect(x1*constant+20, y1*constant+20, xlen, ylen);
                    ctx.fillStyle = "#c6c5b9";
                    ctx.fill();

				}
				
				//rysowanie numerkow
				ctx.beginPath();
                ctx.font = "15px Arial";
				ctx.fillStyle = "#c6c5b9";
				ctx.fillText(i, x1*constant+40, y1*constant+40);
			}
			
		}
	
	if(start)
		DrawBall(cc, currentIndex)
	
	start = false

	}
}

//Rysowanie kuleczki
function DrawBall(cc, index, nextIndex)
{	
	var ctx = cc.getContext("2d");
	ctx.arc(xx, yy, onebar/2-3, 0, 2 * Math.PI);
	ctx.fillStyle = "#c6c5b9";
	ctx.fill();
	
	directionNESW = [false, false, false, false]
	console.log(index)
	var xx = Roads[index].x * constant + onebar-2;
	var yy = Roads[index].y * constant + onebar-2;
	
	ballx = xx;
	bally = yy;

	lastx = Roads[Roads.length-1].x * constant + onebar-2;
	lasty= Roads[Roads.length-1].y * constant + onebar-2;
	
	ctx.arc(xx, yy, onebar/2-8, 0, 2 * Math.PI);
	ctx.fillStyle = "#000000";
	ctx.fill();
	
	directions = [-1,-1,-1,-1]
	
	for(let i = 0; i<Roads[index].L.length;i++)
	{
		var dx = Roads[Roads[index].L[i]].x - Roads[index].x
		var dy = Roads[Roads[index].L[i]].y - Roads[index].y

		console.log("DX: "+dx+" oraz DY: "+dy)
		
		if(dx>0 && dy == 0) //prawo
		{
			console.log("W PRAWO");
			directionNESW[1] = true;
			directions[1] = Roads[index].L[i]
			
		}
		else if(dx<0 && dy ==0) //lewo
		{
			console.log("W LEWO");
			directionNESW[3] = true;
			directions[3] = Roads[index].L[i]
		}
		else if(dx==0 && dy>0) //dol
		{
			console.log("W DOL");
			directionNESW[2] = true;
			directions[2] = Roads[index].L[i]
		}
		else if(dx==0 && dy<0) //gora
		{
			console.log("W GORE");
			directionNESW[0] = true;
			directions[0] = Roads[index].L[i]
		}
	}
	//console.log("Kuleczka: " +xx+"    "+yy)
	//console.log("Last    : "+lastx+"    "+lasty)	
	//sprawdzenie czy koniec labiryntu
	if(ballx==lastx && bally==lasty)
	{
		console.log("wygrana")
		var modal=document.getElementById("myModal");
		modal.style.display="block";
		window.onclick=function(event){
			if(event.target==modal){
				modal.style.display="none";
				window.location.reload(true);
				}
		}
	}
}

//#endregion

//#region Ruchy kuleczki
function MoveDown(cc, currentPos, nextPos) //indeksy
{
	if(directionNESW[2])
	{
		console.log("ruch w dol")
//	kierunki = [-1,-1,-1,-1]
	DrawMazeCanvas()
	DrawBall(cc, nextPos)
	currentIndex = nextPos;
	ballindex = nextPos;
	}
}

function MoveRigth(cc, currentPos, nextPos)
{
	if(directionNESW[1])
	{
		console.log("ruch w prawo")

//	kierunki = [-1,-1,-1,-1]
	DrawMazeCanvas()
	DrawBall(cc, nextPos)
	currentIndex = nextPos;
	ballindex = nextPos;
	}
}

function MoveUp(cc, currentPos, nextPos) //indeksy
{
	if(directionNESW[0])
	{
		console.log("ruch w gore")

//	kierunki = [-1,-1,-1,-1]
    DrawMazeCanvas()
	DrawBall(cc, nextPos)
	currentIndex = nextPos;
	ballindex = nextPos;
	}	
}

function MoveLeft(cc, currentPos, nextPos) //indeksy
{
	if(directionNESW[3])
	{
		console.log("ruch w lewo")
	
//	kierunki = [-1,-1,-1,-1]
	DrawMazeCanvas()
	DrawBall(cc, nextPos)
	currentIndex = nextPos;
	ballindex = nextPos;
	
	}
}
//#endregion

//#region Czujniki
//podłączenie czujników ruchu
function onStart() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then((state) => {
          if (state === 'granted') {
            console.log("dodany motion")
			window.addEventListener('deviceorientation', handleOrientation);		  
		  } else {
            console.error('Request to access the orientation was rejected');
          }
        })
        .catch(console.error);
    } else {
		console.log("dodany motion")
      window.addEventListener('deviceorientation', handleOrientation);
    }
}

//sprawdzenie czy dana przeglądarka obsługuje czujniki
if (window.DeviceOrientationEvent) {
	

    window.addEventListener("deviceorientation", function(event) {
		beta  = frontToBack;
		gamma = leftToRight;
        // alpha: rotation around z-axis
        var rotateDegrees = event.alpha;
        // gamma: left to right
        var leftToRight = event.gamma;
        // beta: front back motion
        var frontToBack = event.beta;

		
        handleOrientationEvent(frontToBack, leftToRight, rotateDegrees);
    }, true);
}
else {
    console.log("Sorry, your browser doesn't support Device Orientation");
  }

var handleOrientationEvent = function(frontToBack, leftToRight, rotateDegrees) {
	
	console.log("nowy obrot")
	if (frontToBack>45 && directionNESW[2])
	{
		console.log("dol")
		MoveDown(cc, currentIndex, directions[2])
	}
	else if(frontToBack<20 && directionNESW[0])
	{
		console.log("gora")
		MoveUp(cc,currentIndex,directions[0])		
	}
	
	if(leftToRight>30 && directionNESW[1])
	{
		console.log("prawo")
		MoveRigth(cc, currentIndex, directions[1])
	}
	else if(leftToRight<-30 && directionNESW[3])
	{
		console.log("lewo")
		MoveLeft(cc,currentIndex,directions[3])
	}	
};
//#endregion	

//#region Pobranie PHP
function DownloadMazeJSON(width,height){
	let ajax=new XMLHttpRequest();
	ajax.open("POST",`https://tales.ms.polsl.pl/marek.zabka/spec/maze.php?width=${width}&height=${height}`,true);
	ajax.onreadystatechange=function(){
		if(ajax.readyState==4 && ajax.status==200)
		{
			console.log(ajax.responseText);
			try{
				maze=JSON.parse(ajax.responseText); // let nie można tu
			}
			catch (r){
				console.log("error -- bad maze");
				getMazeError('error -- bad maze');
				maze=false;
			}
		}
		else if(ajax.readyState==4)
		{
			getMazeError('error -- ajax.status='+ajax.status);
		}
	};
	ajax.send();
}

function getMazeError(d)
{
	document.querySelector('body').innerHTML=d;
}
//#endregion
