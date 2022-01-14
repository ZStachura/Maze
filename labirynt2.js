//Konrad Bogacz, Zuzanna Stachura, Alicja Winnicka


var labir=false;
var calosc;
var jednakratka = 40
var stala = 50 //zwiazana z odlegloscia miedzy "początkami kratek"
var dim = 5;
var Sciezki;
var kierunekNESW = [false, false, false, false] // gora, prawo, dol, lewo
var kierunki = [-1,-1,-1,-1]
var currentIndex = 0
var ballx = 0;
var bally = 0;
var ballindex = 0;
var start = true

//funkcje na start strony
window.addEventListener('load',function(){
	PobierzLabiryntJSON(dim,dim);
//	NarysujLabirynt();
	NarysujLabiryntCanvas()
	
	onStart()
	},true);

function NarysujLabiryntCanvas()
{
	if(labir===false)
		setTimeout(NarysujLabiryntCanvas,900);
	else
	{
		Sciezki=labir.paths;
		//wymiary calkowite siatki labiryntu
		var w=dim*50+20;
		var h=dim*50+20;
		cc = document.getElementById("lab");
		cc.width = w+30;
		cc.height = h+30;
		
		
		//tlo labiryntu (zielone)
		var ctx = cc.getContext("2d");
		ctx.fillStyle = '#b3ffb3';
		ctx.fillRect(10, 10, w, h)
		
		//mniejszy prostokat labirynty (fiolet)
		var ctx = cc.getContext("2d");
		ctx.fillStyle = '#290066';
		ctx.fillRect(12, 12, w-4, h-4)
	
		for(let i=0; i<Sciezki.length; i++) 		
		{
			//dla kazdej kostki
			let x1=Sciezki[i].x;
			let y1=Sciezki[i].y;
			
			//dla kazdej sciezki od kostki
			for(let j=0; j<Sciezki[i].L.length; j++)
			{
			
				
				let x2=Sciezki[Sciezki[i].L[j]].x;
				let y2=Sciezki[Sciezki[i].L[j]].y;
				if(x2>=x1 && y2>=y1)
				{
					let dx = (x2-x1);
                    let dy = (y2-y1);
                            
                    let xlen = jednakratka + dx * stala;// + przerwyX * dim;
                    let ylen = jednakratka + dy * stala;// + przerwyY * dim;
                 //   console.log(x1, y1, xlen, ylen)
                    ctx.beginPath();
                
                    ctx.rect(x1*stala+20, y1*stala+20, xlen, ylen);
                    ctx.fillStyle = "#b3ffb3";
                    ctx.fill();

				}
				
				//rysowanie numerkow
				ctx.beginPath();
                ctx.font = "15px Arial";
				ctx.fillStyle = "black";
				ctx.fillText(i, x1*stala+40, y1*stala+40);
			}
			
		}
	
	if(start)
		DrawBall(cc, currentIndex)
	
	start = false

	}
}


function DrawBall(cc, index, nextIndex)
{	
	var ctx = cc.getContext("2d");
	ctx.arc(xx, yy, jednakratka/2-3, 0, 2 * Math.PI);
	ctx.fillStyle = "#b3ffb3";
	ctx.fill();
	
	kierunekNESW = [false, false, false, false]
	console.log(index)
	var xx = Sciezki[index].x * stala + jednakratka-2;
	var yy = Sciezki[index].y * stala + jednakratka-2;
	
	ballx = xx;
	bally = yy;

	
	ctx.arc(xx, yy, jednakratka/2-8, 0, 2 * Math.PI);
	ctx.fillStyle = "red";
	ctx.fill();
	
	kierunki = [-1,-1,-1,-1]
	
	for(let i = 0; i<Sciezki[index].L.length;i++)
	{
		var dx = Sciezki[Sciezki[index].L[i]].x - Sciezki[index].x
		var dy = Sciezki[Sciezki[index].L[i]].y - Sciezki[index].y

		console.log("DX: "+dx+" oraz DY: "+dy)
		
		if(dx>0 && dy == 0) //prawo
		{
			console.log("W PRAWO");
			kierunekNESW[1] = true;
			kierunki[1] = Sciezki[index].L[i]
			
		}
		else if(dx<0 && dy ==0) //lewo
		{
			console.log("W LEWO");
			kierunekNESW[3] = true;
			kierunki[3] = Sciezki[index].L[i]
		}
		else if(dx==0 && dy>0) //dol
		{
			console.log("W DOL");
			kierunekNESW[2] = true;
			kierunki[2] = Sciezki[index].L[i]
		}
		else if(dx==0 && dy<0) //gora
		{
			console.log("W GORE");
			kierunekNESW[0] = true;
			kierunki[0] = Sciezki[index].L[i]
		}
	}
}

function MoveDown(cc, currentPos, nextPos) //indeksy
{
	if(kierunekNESW[2])
	{
		console.log("ruch w dol")
//	kierunki = [-1,-1,-1,-1]
	NarysujLabiryntCanvas()
	DrawBall(cc, nextPos)
	currentIndex = nextPos;
	ballindex = nextPos;
	}
}

function MoveRigth(cc, currentPos, nextPos)
{
	if(kierunekNESW[1])
	{
		console.log("ruch w prawo")

//	kierunki = [-1,-1,-1,-1]
	NarysujLabiryntCanvas()
	DrawBall(cc, nextPos)
	currentIndex = nextPos;
	ballindex = nextPos;
	}
}

function MoveUp(cc, currentPos, nextPos) //indeksy
{
	if(kierunekNESW[0])
	{
		console.log("ruch w gore")

//	kierunki = [-1,-1,-1,-1]
NarysujLabiryntCanvas()
	DrawBall(cc, nextPos)
	currentIndex = nextPos;
	ballindex = nextPos;
	}	
}

function MoveLeft(cc, currentPos, nextPos) //indeksy
{
	if(kierunekNESW[3])
	{
		console.log("ruch w lewo")
	
//	kierunki = [-1,-1,-1,-1]
	NarysujLabiryntCanvas()
	DrawBall(cc, nextPos)
	currentIndex = nextPos;
	ballindex = nextPos;
	
	}
}


//podłączenie czujników ruchu
function onStart() {
	console.log("jestem tu")
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
	if (frontToBack>45 && kierunekNESW[2])
	{
		console.log("dol")
		MoveDown(cc, currentIndex, kierunki[2])
		//kierunki = [-1,-1,-1,-1]
	}
	else if(frontToBack<20 && kierunekNESW[0])
	{
		console.log("gora")
		MoveUp(cc,currentIndex,kierunki[0])
		//kierunki = [-1,-1,-1,-1]
		
	}
	
	if(leftToRight>30 && kierunekNESW[1])
	{
		console.log("prawo")
		MoveRigth(cc, currentIndex, kierunki[1])
		//kierunki = [-1,-1,-1,-1]
	}
	else if(leftToRight<-30 && kierunekNESW[3])
	{
		console.log("lewo")
		MoveLeft(cc,currentIndex,kierunki[3])
		//kierunki = [-1,-1,-1,-1]
	}

	
};
	
	 
  
  
  
function NarysujLabirynt()
{
	if(labir===false)
		setTimeout(NarysujLabirynt,900);
	else
	{
		calosc=document.createElement('main');
		calosc.style.width=(labir.width*50+20)+'px';
		calosc.style.height=(labir.height*50+20)+'px';
		Sciezki=labir.paths;
		
		for(let i=0; i<Sciezki.length; i++) 		
		{
			let x1=Sciezki[i].x;
			let y1=Sciezki[i].y;
			
			for(let j=0; j<Sciezki[i].L.length; j++)
			{
				let x2=Sciezki[Sciezki[i].L[j]].x;
				let y2=Sciezki[Sciezki[i].L[j]].y;	
				let kratka=document.createElement('div');
			
				if(x2>=x1 && y2>=y1)
				{
					let xlen = (x2-x1)*stala+jednakratka;
					let ylen = (y2-y1)*stala+jednakratka;
				//	console.log(xlen+" and "+ylen)
					let marginestop = y1*stala+15 //margines nad labiryntem
					let marginesleft = x1*stala+15 //margines z lewej labiryntu
					
					kratka.className='pathElement';	
					kratka.style.width=`${xlen}px`;
					kratka.style.height=`${ylen}px`;
					kratka.style.top=`${marginestop}px`;
					kratka.style.left=`${marginesleft}px`;
					
					calosc.appendChild(kratka);
				}

			}
			
		}
		document.querySelector('body').appendChild(calosc);
		
	}
}

function PobierzLabiryntJSON(width,height){
	let ajax=new XMLHttpRequest();
	ajax.open("POST",`https://tales.ms.polsl.pl/marek.zabka/spec/maze.php?width=${width}&height=${height}`,true);
	ajax.onreadystatechange=function(){
		if(ajax.readyState==4 && ajax.status==200)
		{
			console.log(ajax.responseText);
			try{
				labir=JSON.parse(ajax.responseText); // let nie można tu
			}
			catch (r){
				console.log("error -- bad maze");
				getMazeError('error -- bad maze');
				labir=false;
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

function resetGame(endOfGame)
{
	document.querySelector('body').removeChild(endOfGame);
	document.querySelector('body').removeChild(calosc);
	labir=false;
	
	PobierzLabiryntJSON(10,7);
	NarysujLabirynt();
}
