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

var weightVector = [50,70,70,70,70,70,70,70,70, 70.5, 71, 72, 73.1]; //will replace with weight data from scale

//MACD
document.write("CALCULATING WEIGHT TRENDS.");

var result = MACD(weightVector);

if (result - 1 > threshold)
  document.write("UH OH! Something is wrong! Please see a doctor.");
else
  document.write("You're safe.");
  
