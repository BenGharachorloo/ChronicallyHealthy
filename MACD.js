function MACD(weightVector) {
 
 var result = weightVector[1] - weightVector[0]
 
 return result;
}

var threshold = 1;

var weightVector = [70,70,70,70,70,70,70,70,70, 70.5, 71, 72, 73.1]; //will replace with weight data from scale

//MACD

var result = MACD(weightVector);

if (result > threshold)
  document.write("UH OH! Something is wrong! Please see a doctor.");
else
  document.write("You're safe.");
  
