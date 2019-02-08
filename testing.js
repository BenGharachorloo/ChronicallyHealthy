
function MACD(weightVector) {
 //PARAMS:
 var NS = 1;
 var NL = 6;
 
 var alphS = 2/(NS+1);
 var alphL = 2/(NL+1);
 //Oldest day to check:
var N = weightVector.length;
 
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

function initNoiseVector(numNoiseTypes, noiseMultipliers,noiseVector ){

for(var n = 1; n < numNoiseTypes; n++){
  		document.write("noiseMultiplier: ");
  		document.write((Math.random()*2*noiseMultipliers[n-1]) - noiseMultipliers[n-1]);
  		document.write("<br>");
		for(nV = 0; nV < noiseVector[0].length; nV++){
        	noiseVector[n][nV] += (Math.random()*2*noiseMultipliers[n-1]) - noiseMultipliers[n-1];
            noiseVector[n][nV] = Math.round(noiseVector[n][nV] * 1000) / 1000
        }
	}
	return noiseVector;

}

function test(){


  //STUDY: Patterns of Weight Change Preceding Hospitalization for HF
  //the +1 is bc all patients started at -1 for some reason from their baseline weight so i'm doing an example to cancel that out

  var numWeights =  45; //Dimension: time
  var numTrialTypes =  7; //Dimension: healthy / increasing / decreasing
                          //0-healthy constant, 1-increasing unhealthy acc to study, 2-increasing unhealthy acc to last 14 days of study (largest increase), 3-increasing with + 1, 4-increasing acc to last 14 days of study w + 1 5-decreasing Quickly, 6-decreasing slowly, 7-MAYBE increasing healthy, implement later
  var numNoiseTypes =  5; //Dimension: Noise level
                          //0-no noise, 1-little noise*0.2, 2-some noise*0.6, 3-lots of noise*1.0, 4-loooots of noise *1.4
  var numWeightAvgs =  9; //Dimension: Average Weight
  
  var avgWeights = [50, 55, 60,65,70,75,80,85,90,95, 100];
  var unhealthyIncreaseLong = [-1,-0.2,-0.2,0.2,0.1,-0.05,-0.4,-0.1,-0.2,0,0,0.15,-0.1,0.15,0.2,0.4,0,0,0,0,0.2,0.5,0.5,0,0.7,1,1.1,1.3,1.25,2,2.3];
  var unhealthyIncreaseShort = [0,0,0,0,0.2,0.5,0.5,0,0.7,1,1.1,1.3,1.25,2,2.3];
  var unhealthyIncreaseLong_1 = [0,0.8,0.8,1.2,1.1,0.95,0.6,0.9,0.8,1,1,1.15,0.9,1.15,1.2,1.4,1,1,1,1,1.2,1.5,1.5,1,1.7,2,2.1,2.3,2.25,3,3.3];
  var unhealthyIncreaseShort_1 = [1,1,1,1,1.2,1.5,1.5,1,1.7,2,2.1,2.3,2.25,3,3.3];
  var DecreaseShort = -1*unhealthyIncreaseShort_1;
  var DecreaseLong = -1*unhealthyIncreaseLong_1;
  
  
  var noiseVector = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

	var noiseMultipliers = [0.2,0.6,1.0,1.4]

	noiseVector = initNoiseVector(numNoiseTypes, noiseMultipliers,noiseVector )
    
    
    
    
    //CREATE WEIGHT VECTOR
    var weightVector
    
    
    

//*/
  document.write("noiseVector: ");
  document.write(noiseVector[0]);
  document.write("<br>");
  document.write(noiseVector[1]);
  document.write("<br>");
  document.write(noiseVector[2]);
  document.write("<br>");
  document.write(noiseVector[3]);
  document.write("<br>");
  document.write(noiseVector[4]);
  document.write("<br>");
}


var threshold = 0.4;

test();







var weightVector = [70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70.6,70.9,71,71.6,71.8,72.3]; //will replace with weight data from scale

//MACD
document.write("CALCULATING WEIGHT TRENDS.");

for(var i = 0; i < 6; i ++){
  document.write("<br>");
  document.write("<br>");
  document.write("*************");
  var result = MACD(weightVector);
  document.write("Weight trend is: ");
  document.write(weightVector);
  document.write("<br>");
  document.write("<br>");
  document.write("OI Result is: ");
  document.write(result);

  document.write("<br>");
  document.write("<br>");
if (result  > threshold)
    document.write("UH OH! Something is wrong! Please see a doctor.");
  else{
    document.write("You're safe.");}
    if(i == 0)//They didn't eat much 
    weightVector =  [70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70]; 
  if(i == 1)
    weightVector =  [70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70.1,70.7,71.3,72.1,72.5]; 
  if(i == 2)
    weightVector =  [70,70,70,70,70,70,70,70,70,68.5,70,69,70.1]; 
  if(i == 3)
    weightVector =  [70,70,70,70,70,70,70,70,70,68.5,70,72,75.1];
  if(i == 4)//They didn't eat much 
    weightVector =  [70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,72];  //*/
  
}
//*/

</script>

