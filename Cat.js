//confirm("Javascript has started.");
var alive = true;
var wantPlayBall = 3;
var foodWidth = 50;
var petWidth = 30;
var loveWidth = 30;
var score = 0;
var catName = "Your cat";

var randomNumber = Math.floor(Math.random()*4+1);
var variation;


vary();

function vary() {
	variation = setInterval(getRandomNumber, 10000);
} 
 

function getRandomNumber()
{
	randomNumber = Math.floor(Math.random()*4+1);
}

getHungry("food");
getHungry("pet");
getHungry("love");



//this function can be used to find the width of a certain type and add/subtract to it
function typeWidth(type, addition){
	if (typeof addition === 'undefined') { 
	addition = 0; 
	}
  if (type == "food"){ 	   	
  	foodWidth += addition; 
  	if (foodWidth > 100) { foodWidth = 100 }
  	return foodWidth;
  } 
	if (type == "pet") {		  
	  petWidth += addition; 
	  if (petWidth > 100) { petWidth = 100 }
		return petWidth;
	}
	if (type == "love") {	
		loveWidth += addition; 	
		if (loveWidth > 100) { loveWidth = 100 }	
		return loveWidth;
	}
}

//this function can be used to find the progress bar of a certain type in html
function findProgressElement(type)
{
	  if (type == "food"){
    	return document.getElementById("foodProgress"); 
    }
    if (type == "pet") {
      return document.getElementById("petProgress");
    }
    if (type == "love") {
      return  document.getElementById("loveProgress");
    }
}


function submittedName() {
  //search html for the input in the name-field and name it catName
  catName = document.getElementById('name').value;
  confirm("Congratulations. Your cat is now named " + catName + ".");
  //search html for place to display cat's name
  var a = document.querySelector(".nameDisplay");
  //display cat's name in this place 
  a.textContent = (catName);
  //add also special css class to it to change fontsize and other styling
  a.classList.add("nameDisplay2");
  //don't know why or if it's needed to return false. just copied it from other user 
	//show color form and hide name form
	var b = document.querySelector(".colorForm");
	b.style.visibility='visible';
	var c = document.querySelector(".nameForm");
 	//now remove the entire nameForm to make sure the colorForm will be at top of page
	c.parentNode.removeChild(c);
  return false;
}

function submittedColor() {
  //search html for the imput in the color-field and name it colorName
  var colorName = document.getElementById('color').value;
  //adjust color to color picked by user
	var b = document.querySelector(".nameDisplay2");
	b.style.color = "white";
	b.style.backgroundColor = colorName; 
}

function sayMeow() {
  var audio = new Audio("Meow.wav");
  audio.play();
  alert("I am going to miaouw for you.");
}

function feed(type) {
    if (alive == true) {
    getPoints(type);
		fillBar(type);
		colorBar(type);
    talk(type, "improve");
    }
    else {
    alert ("You are not very good with animals, are you?");
    alert ("Clicking has no use. The poor soul is dead.");
    alert ("Restart to try again.");
   }
}

function fillBar(type) {
    //add 10 percent width to the width (of the right type)
    var width = typeWidth (type,5);
		//find progress bar (of the right type)
    var a = findProgressElement(type);
		//the old width of the bar get replaced by the new width
    				a.style.width = width + '%'; 
}

function statusBar(type)
{
		var width = typeWidth (type);
		if (width >= 80) {
	 		return "uitstekend";
		} 
		else if (width >= 45){
			return "goed";
		}
		else if (width >= 25) {
			return "matig";
		}
		else if (width > 0) {
			return "slecht";
		}
		else {
		  alive = false;
		  return "dead";
		}
}

function colorBar(type){
  var a = findProgressElement(type);
	var width = typeWidth (type);
	if (statusBar (type) === "uitstekend"){
		a.style.backgroundColor = 'darkgreen'; 
		}
	else if (statusBar (type) === "goed"){
	a.style.backgroundColor = '#3eb300';  
	}
	else if (statusBar (type) === "matig"){
	a.style.backgroundColor = 'orange';  
	}
	else {
	a.style.backgroundColor = 'red';
	}
}


function getHungry(type) {
    var a = findProgressElement(type);
    var width = typeWidth(type);
    var talkSometimes = 0;
    var id = setInterval(frame, 3000);  //set interval to 3000 ms
    function frame() {
        if (width < 0) {
            talk (type);
            clearInterval(id);
            return false;
        } 
        else {
            typeWidth(type, -1);
            width = typeWidth(type);
            a.style.width = width + '%'; 
            colorBar(type);
            talkSometimes ++;
            if (talkSometimes == 5){
            	talk (type, "worsen");
            	talkSometimes = 0;
            }
        }
    }
}

function getPoints(type) {
		if (typeWidth(type) < 100)
		{
			score ++;
			var a = document.getElementById("scoreText");
			var b = document.getElementById ("level");
			var c = document.querySelector (".scoreDisplay");
			a.textContent = (score); 
			if (score >= 25){
				b.textContent = ("beginner");
				c.style.background = "#5c87b2";
			}  
			if (score >= 50) {
				b.textContent = ("beginner II");
				c.style.background = "#969696";
			}
			if (score >= 100) {
				b.textContent = ("intermediate");
				c.style.background = "#969696";
			}
			if (score >= 150) {
				b.textContent = ("intermediate II");
				c.style.background = "#c049e4";
			}
			if (score >= 200) {
				b.textContent = ("expert");
				c.style.background = "#e44e6c";
			}
			if (score >= 250) {
				b.textContent = ("expert II");
				c.style.background = "#df2a4e";
			}
			if (score >= 300) {
				b.textContent = ("superhuman");
				c.style.background = "#4cd11f";
			}
		}
}

function talk(type, effect)
{
  var a = document.getElementById("feelText");
  if (statusBar (type) === "uitstekend"){
  			if (type == "food" && effect == "improve") {  
						if (randomNumber > 2) {
							a.textContent = ("I've never been so full in my life!");
						}
						else if (randomNumber > 1) {
							a.textContent = ("That was a great meal!");
						}
						else {
							a.textContent = ("I am stuffed!"); 
						}
						
				} 
				if (type == "pet" && effect == "improve") {  
				
							if (randomNumber == 1 || randomNumber == 2) {
								a.textContent = ("Purrrrrrrrrrrrrrrrrrrrrrrrr");
							}
							else if (randomNumber == 3) {
									a.textContent = ("Life of a cat is awesome!");
							}
							else {
								a.textContent = ("Excellent petting!"); 
							}
				} 
				if (type == "love" && effect == "improve") {  
					  	if (randomNumber == 1) {
								a.textContent = ("Wow I feel loved!!!!");
							}
							else if (randomNumber == 2) {
								a.textContent = ("Holy fish! Love is in the air!");
							}
							else if (randomNumber == 3) {
								a.textContent = ("I feel warm and fluffy!");
							}
							else {
								a.textContent = ("Love you too!"); 
							}
				} 
  }
  else if (statusBar (type) === "goed"){
  			if (type == "food" && effect == "improve") {  
  			  		if (randomNumber > 2) {
								a.textContent = ("Mmmm... that's tasty... chicken?");
							}
							else if (randomNumber > 1) {
								a.textContent = ("Mmmm... that's tasty... salmon?");
							}
							else {
								a.textContent = ("Did you cook that yourself?"); 
							}
  			}
		 		if (type == "food" && effect == "worsen") {  
		 				a.textContent = ("I wouldn't mind getting a little extra treat.");
		 		}
		 		if (type == "pet") {  
		 					if (randomNumber == 1 || randomNumber == 2) {
								a.textContent = ("Thumbs up for cuddling me.");
							}
							else if (randomNumber == 3) {
								a.textContent = ("You're pretty ok for a human.");	
							}
							else {
								a.textContent = ("Please scratch behind my ears."); 
							}
				} 
		 		if (type == "pet" && effect == "worsen") {  
		 				a.textContent = ("May I nuzzle up against your legs?");
		 		}
		 		
		 		if (type == "love" && effect == "improve") {  
		 				a.textContent = ("I feel so much better now");
		 		}
		 		
		 		if (type == "love" && effect == "worsen") {  
		 				a.textContent = ("You won't leave me alone, will you?");
		 		}
		 		
	}
	else if (statusBar (type) === "matig"){
  			if (type == "food") {  
		 				a.textContent = ("Uhm? I am getting a little hungry...");
		 		}
		 		if (type == "pet") {  
		 				a.textContent = ("I am looking for attention");
		 		}
		 		
		 		if (type == "love" && effect == "worsen") {
		 		 	if (randomNumber == 1) {
								a.textContent = ("I feel a bit sad...");
							}
							else if (randomNumber == 2) {
								a.textContent = ("Do you love me?");
							}
							else if (randomNumber == 3) {
								a.textContent = ("I feel a bit insecure....");
							}
							else {
								a.textContent = ("I wish someone would love me..."); 
							}
		 		}
	}
	else if (statusBar (type) === "slecht"){
  			if (type == "food") {  
		 				a.textContent = ("I'm hungry! Please give me some food");
		 		}
		 		if (type == "pet") {  
		 				a.textContent = ("Would you pet me please?");
		 		}
		 		if (type == "love") {  
		 					if (randomNumber == 1) {
								a.textContent = ("I feel so lonely!");
							}
							else if (randomNumber == 2) {
								a.textContent = ("Would they have forgotten about me?");
							}
							else if (randomNumber == 3) {
								a.textContent = ("Where is everyone?");
							}
							else {
								a.textContent = ("What a terrible life..."); 
							}
		 		}
	}
	else {
				if (type == "food") {  
		 				alert ("Oh no, I died from starvation!");
		 		}
		 		if (type == "pet") {  
		 				alert ("I am sorry to bring this to you, but " + catName + " has just died from neglection.");
		 		}
		 		if (type == "love") {  
		 				alert ("RIP: " + catName + ". " + catName + " has died because of a broken heart.");
		 		}
	}
	
}

function playBall(){
			if (wantPlayBall > 0)
			{
					score = score + 5;
					var a = document.getElementById("scoreText");
					a.textContent = (score); 
					var b = document.getElementById("feelText");
					if (wantPlayBall > 1){
							if (randomNumber == 1) {
									b.textContent = ("I love playing with the ball!");
							}
							else if (randomNumber == 2) {
									b.textContent = ("It's so cool to play with the ball!");
							}
							else if (randomNumber == 3) {
									b.textContent = ("Got the ball!");
							}
							else {
									b.textContent = ("Yippy! Ball playing!"); 
							}
					}
					else {
							if (randomNumber == 1) {
									b.textContent = ("I loved playing with the ball!");
							}
							else if (randomNumber == 2) {
									b.textContent = ("It was great to play with the ball!");
							}
							else if (randomNumber == 3) {
									b.textContent = ("Wow! Score = cat 1 : 0 human");
							}
							else {
									b.textContent = ("I had a blast! Now I am tired."); 
							}
					}
					wantPlayBall --;
					var c = document.getElementById("ball");
					//als de bal naar links is, schuif naar rechts en andersom.
					if (c.style.marginRight == "50px"){
						c.style.marginRight = "0px";
					}
					else {
						c.style.marginRight = "50px";
					}
			} 
			else
			{
				    var id;
				    if (!id) {
				 			 id = setTimeout(restartBall, 10000);  
				 		}
    				function restartBall() {
								wantPlayBall = 3;
								var b = document.getElementById("feelText");
								if (randomNumber == 1) {
									b.textContent = ("Want to play with the ball again?");
								}
								else if (randomNumber == 2) {
									b.textContent = ("I wonder where the ball went?");
								}
								else if (randomNumber == 3) {
									b.textContent = ("How about some ball-gaming?");
								}
								else {
									b.textContent = ("Do you see the ball?"); 
								}
						}
			}
		
					
}




