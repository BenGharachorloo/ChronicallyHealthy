function MACD(weightVector) {
 //PARAMS:
 var NS = 1;
 var NL = 6;
 
 var alphS = 2/(NS+1);
 var alphL = 2/(NL+1);
 //Oldest day to check:
var N = 10;
 
 //Side note Minjia -******* are you sure it's the write algorithm? they both sum all the way back.
 
var t = weightVector.length - 1;
var x;
var shortSum = 0, longSum = 0;
//first sum
for(x = 0; x < N && t-x > 0; x++){
	shortSum += Math.pow((1-alphS),x) * weightVector[t - x];	
}
//second sum
for(x = 0; x < N && t-x > 0; x++){
	longSum += Math.pow((1-alphL),x) * weightVector[t - x];	
}


var OI = alphS*shortSum - alphL*longSum;
 
 
 return OI;
}

var threshold = 0.4;

var weightVector = [70,70,70,70,70,70,70,70,70,70,70,70,70.6,70.9,71,71.6,71.8,72.3]; //will replace with weight data from scale

//MACD
document.write("CALCULATING WEIGHT TRENDS.");


for(int i = 0; i < 4; i ++){
<br>
<br>
document.write("*************");
var result = MACD(weightVector);
document.write("Weight trend is: ");
document.write(weightVector);
<br>
<br>
document.write("OI Result is: ");
document.write(result);

<br>
<br>

if (result - 1 > threshold)
  document.write("UH OH! Something is wrong! Please see a doctor.");
else
  document.write("You're safe.");
	if(i == 0)
		weightVector =  [70,70,70,70,70,70,70,70,70,70,70,70,70]; 
	if(i == 1)
		weightVector =  [70,70,70,70,71,70,68,70,70,70,70,71,70.1]; 
	if(i == 2)
		weightVector =  [70,70,70,70,70,70,70,70,70,68.5,70,69,70.1]; 
	if(i == 3)
		weightVector =  [70,70,70,70,70,70,70,70,70,68.5,70,72,75.1]; 
	
	weightVector =  [70,70,70,70,70,70,70,70,70,70,70,70,70]; 
}
