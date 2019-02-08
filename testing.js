

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

  var numDays =  45; //Dimension: time
  var numTrialTypes =  7; //Dimension: healthy / increasing / decreasing
                          //0-healthy constant, 1-increasing unhealthy acc to study, 2-increasing unhealthy acc to last 14 days of study (largest increase), 
                          //3-increasing with + 1, 4-increasing acc to last 14 days of study w + 1 5-decreasing Quickly, 
                          //6-decreasing slowly, 7-MAYBE increasing healthy, implement later
  var numNoiseTypes =  5; //Dimension: Noise level
                          //0-no noise, 1-little noise*0.2, 2-some noise*0.6, 3-lots of noise*1.0, 4-loooots of noise *1.4
  var numWeightAvgs =  9; //Dimension: Average Weight
  
  var avgWeights = [50, 55, 60,65,70,75,80,85,90,95, 100];
  
  //trials:
  var unhealthyIncreaseLong = [-1,-0.2,-0.2,0.2,0.1,-0.05,-0.4,-0.1,-0.2,0,0,0.15,-0.1,0.15,0.2,0.4,0,0,0,0,0.2,0.5,0.5,0,0.7,1,1.1,1.3,1.25,2,2.3];
  var unhealthyIncreaseShort = [0,0,0,0,0.2,0.5,0.5,0,0.7,1,1.1,1.3,1.25,2,2.3];
  var unhealthyIncreaseLong_1 = [0,0.8,0.8,1.2,1.1,0.95,0.6,0.9,0.8,1,1,1.15,0.9,1.15,1.2,1.4,1,1,1,1,1.2,1.5,1.5,1,1.7,2,2.1,2.3,2.25,3,3.3];
  var unhealthyIncreaseShort_1 = [1,1,1,1,1.2,1.5,1.5,1,1.7,2,2.1,2.3,2.25,3,3.3];
  var DecreaseShort = -1*unhealthyIncreaseShort_1;
  var DecreaseLong = -1*unhealthyIncreaseLong_1;
  
  //first is healthy
  var trialTrends = [[0,0],unhealthyIncreaseLong,unhealthyIncreaseShort, unhealthyIncreaseLong_1,
  					unhealthyIncreaseShort_1, DecreaseShort, DecreaseLong];
  
  
  var noiseVector = [[],[],[],[],[]];
  for(var n = 0; n < noiseVector.length; n++){
  	for(var day = 0; day < numDays; day++){
    	noiseVector[n][day] = 0;
    }
  }

	var noiseMultipliers = [0.2,0.6,1.0,1.4];

	noiseVector = initNoiseVector(numNoiseTypes, noiseMultipliers,noiseVector );
    
    
    
    
    //CREATE WEIGHT VECTOR
    
    //dimensions are:
    //1-time-,2-types,3-noise level,4-avg weights
    //var weightVector[numDays][numTrialTypes][numNoiseTypes][numWeightAvgs]; 
    var weightVector = new Array(numWeightAvgs);
    
    for(var weight = 0; weight < numWeightAvgs; weight++){
    
    	weightVector[weight] = new Array(numTrialTypes);        
    	for(var trial = 0; trial < numTrialTypes; trial++){
        
    		weightVector[weight][trial] = new Array(numNoiseTypes);            
    		for(var noise = 0; noise < numNoiseTypes; noise++){
            
    			weightVector[weight][trial][noise] = new Array(numDays); 
                
                //initialize with average weight                    
                for(var day = 0; day < numDays; day++){
        			weightVector[weight][trial][noise][day] = avgWeights[weight];
        		}
                //add trial trend
                for(var day = 0; day < numDays; day++){
                    if(day < trialTrends[trial].length ){
        				weightVector[weight][trial][noise][numDays - 1 - day] += trialTrends[trial][trialTrends[trial].length - 1 - day];
                    }
        		}
                //add noise
                for(var day = 0; day < numDays; day++){
        			weightVector[weight][trial][noise][day] += noiseVector[noise][day];
        		}
        	
        	}
    	}
    }
    

//*/

	return weightVector;
}


var threshold = 0.4;

weightVector = test();



  var numDays =  45; //Dimension: time
  var numTrialTypes =  7; //Dimension: healthy / increasing / decreasing
                          //0-healthy constant, 1-increasing unhealthy acc to study, 2-increasing unhealthy acc to last 14 days of study (largest increase), 
                          //3-increasing with + 1, 4-increasing acc to last 14 days of study w + 1 5-decreasing Quickly, 
                          //6-decreasing slowly, 7-MAYBE increasing healthy, implement later
  var numNoiseTypes =  5; //Dimension: Noise level
                          //0-no noise, 1-little noise*0.2, 2-some noise*0.6, 3-lots of noise*1.0, 4-loooots of noise *1.4
  var numWeightAvgs =  9;


var numHealthy = 0;
var numSick = 0;
var sickCoords = [];

//MACD
document.write("CALCULATING WEIGHT TRENDS.");
var coords = {w:0,t:0,n:0};

for(var weight = 0; weight < numWeightAvgs; weight++){
    
    	for(var trial = 0; trial < numTrialTypes; trial++){
                
    		for(var noise = 0; noise < numNoiseTypes; noise++){
            
  				var result = MACD(weightVector[weight][trial][noise]);
  				
                if (result  > threshold){
                	numSick ++;
                    coords.w = weight;
                    coords.t = trial;
                    coords.n = noise;
                    sickCoords.push(coords);
                    
				}
                else{
                	numHealthy ++;
                }
                	
                
			}
		}
}

  		document.write("<br>");
document.write("DONE CALCULATING WEIGHT TRENDS.");
  		document.write("<br>");
document.write("numHealthy: ");
document.write(numHealthy);
  		document.write("<br>");
document.write("numSick: ");
document.write(numSick);
  		document.write("<br>");
        var output = '';
for (var coord in sickCoords) {
  		output += coord + ': ' + sickCoords[coord]['w']+', ' + sickCoords[coord]['t']+', ' + sickCoords[coord]['n']+'; ';
	
}
  		document.write(output);



//*/

</script>

