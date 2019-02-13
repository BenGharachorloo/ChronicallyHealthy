
<script>
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

//0 = NO FLAG
//1 = FLAG




var OI = alphS*shortSum - alphL*longSum;
 
 var threshold = 0.4;
 return (OI > threshold);
}


function RoT(weightVector) {
//gain thresh1 in 1 day or thresh2 in one wek ==> flag raised
//sources:
//https://theheartcenter.md/images/pdfs/CHFbooklet_web.pdf
//https://wa.kaiserpermanente.org/healthAndWellness?item=%2Fcommon%2FhealthAndWellness%2Fconditions%2FheartDisease%2FchfBasics.html
	//current recommended
    var N = weightVector.length;
    var thresh1 = 1.36078; //3lbs;
    var thresh2 = 2.26796; //5lbs
    if(N <= 7)
    	return 0;
	if((weightVector[N-1] >= weightVector[N-1-1] + thresh1 )|| (weightVector[N-1] >= weightVector[N-1-7] + thresh2 ) )
		return 1;
    else
    	return 0;
}

function initNoiseVector(numNoiseTypes, noiseMultipliers,noiseVector ){

for(var n = 1; n < numNoiseTypes; n++){
  		//document.write("noiseMultiplier: ");
  		//document.write((Math.random()*2*noiseMultipliers[n-1]) - noiseMultipliers[n-1]);
  		//document.write("<br>");
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
  var numNoiseTypes =  7; //Dimension: Noise level
                          //0-no noise, 1-little noise*0.2, 2-some noise*0.6, 3-lots of noise*1.0, 4-loooots of noise *1.4
  
  var avgWeight = 70;
  
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
  
  
  var noiseVector = [[],[],[],[],[],[],[]];
  for(var n = 0; n < noiseVector.length; n++){
  	for(var day = 0; day < numDays; day++){
    	noiseVector[n][day] = 0;
    }
  }

	var noiseMultipliers = [0.2,0.4,0.6,0.8,1.0,1.2,1.4];

	noiseVector = initNoiseVector(numNoiseTypes, noiseMultipliers,noiseVector );
    
    
    
    
    //CREATE WEIGHT VECTOR
    
    //dimensions are:
    var weightVector = new Array(numTrialTypes);       
    	for(var trial = 0; trial < numTrialTypes; trial++){
        
    		weightVector[trial] = new Array(numNoiseTypes);            
    		for(var noise = 0; noise < numNoiseTypes; noise++){
            
    			weightVector[trial][noise] = new Array(numDays); 
                
                //initialize with average weight                    
                for(var day = 0; day < numDays; day++){
        			weightVector[trial][noise][day] = avgWeight;
        		}
                //add trial trend
                for(var day = 0; day < numDays; day++){
                    if(day < trialTrends[trial].length ){
        				weightVector[trial][noise][numDays - 1 - day] += trialTrends[trial][trialTrends[trial].length - 1 - day];
                    }
        		}
                //add noise
                for(var day = 0; day < numDays; day++){
        			weightVector[trial][noise][day] += noiseVector[noise][day];
        		}
        	
        	}
    	}
    
    

//*/

	return weightVector;
}








  var numDays =  45; //Dimension: time
  var numTrialTypes =  7; //Dimension: healthy / increasing / decreasing
                          //0-healthy constant, 1-increasing unhealthy acc to study, 2-increasing unhealthy acc to last 14 days of study (largest increase), 
                          //3-increasing with + 1, 4-increasing acc to last 14 days of study w + 1 5-decreasing Quickly, 
                          //6-decreasing slowly, 7-MAYBE increasing healthy, implement later
  var numNoiseTypes =  7; //Dimension: Noise level
                          //0-no noise, 1-little noise*0.2, 2-some noise*0.6, 3-lots of noise*1.0, 4-loooots of noise *1.4
  var numWeightAvgs =  1;


var numHealthy = 0;
var numSick = 0;






    //Tesrt
  
    //TRIAL AND NOISE
    //HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
	
    numTests = 1000;
    var AVGresultsRot = new Array(numTrialTypes);
    var AVGresultsMACD = new Array(numTrialTypes);
    for(var trial = 0; trial < numTrialTypes; trial++){
        AVGresultsRot[trial] = new Array(numNoiseTypes);
        AVGresultsMACD[trial] = new Array(numNoiseTypes);
    
    	for(var noise = 0; noise < numNoiseTypes; noise++){
        	AVGresultsRot[trial][noise] = 0;
        	AVGresultsMACD[trial][noise] = 0;
        
        }
        
    }  
    
    for (var n = 0; n < numTests; n++){
    weightVector = test();
    
    var resultsRot = new Array(numTrialTypes);
    var resultsMACD = new Array(numTrialTypes);
    for(var trial = 0; trial < numTrialTypes; trial++){
        resultsRot[trial] = new Array(numNoiseTypes);
        resultsMACD[trial] = new Array(numNoiseTypes);
    
    	for(var noise = 0; noise < numNoiseTypes; noise++){      
    
    		for(var weight = 0; weight < numWeightAvgs; weight++){//NOT a real for loop, im just lazy
        		
                var weightByDay = weightVector[trial][noise];
                var dayBack = 0;
                var earliestDay = -1;
                for(dayBack = 0; dayBack < 14 ; dayBack++){                    	
					if(RoT(weightByDay.slice(0, numDays - dayBack)))
                    	earliestDay = dayBack;
                }
        		resultsRot[trial][noise] = earliestDay;
                var earliestDay = -1;
                for(dayBack = 0;dayBack < 14; dayBack++){                    	
					if(MACD(weightByDay.slice(0, numDays - dayBack))){
                    	earliestDay = dayBack;
                        }
                }
        		resultsMACD[trial][noise] = earliestDay;
			}
        }
        	
	}
    
    //SUM INTO THING
    if(n%9==0)
                          		document.write("<br>");
    
    	for(var trial = 0; trial < numTrialTypes; trial++){
    if(n%9==0)
                          		document.write("<br>");
    		for(var noise = 0; noise < numNoiseTypes; noise++){
           	 		if(n%9==0){
                       document.write(AVGresultsRot[trial][noise]);
                       document.write(",");}
        		AVGresultsRot[trial][noise] += resultsRot[trial][noise];
        		AVGresultsMACD[trial][noise] += resultsMACD[trial][noise];
    		}
    
    	}
    
    }
    for(var trial = 0; trial < numTrialTypes; trial++){
    
    		for(var noise = 0; noise < numNoiseTypes; noise++){
        		AVGresultsRot[trial][noise] = AVGresultsRot[trial][noise] / numTests;
        		AVGresultsMACD[trial][noise] = AVGresultsMACD[trial][noise] / numTests;
    		}
    
    	}


  	var trialTypeNames = ["healthy constant", "increasing unhealthy acc to study", "increasing unhealthy acc to last 14 days of study (largest increase)",
  "increasing with + 1", "increasing acc to last 14 days of study w + 1", "decreasing Quickly","decreasing slowly"]
	
  
  		document.write("<br>");
          		document.write("<br>");
                  		document.write("<br>");
                          		document.write("<br>");
document.write("RESULTS:");
  		document.write("<br>");

    
                                
	//test against trial types & noise                  noiseMultipliers
    
        	document.write("MACD:");   
    for(var trial = 0; trial < numTrialTypes; trial++){ 
        	document.write("<br>");   
    	//document.write(trialTypeNames[trial])
    	for(var noise = 0; noise < numNoiseTypes; noise++){
        		document.write(AVGresultsMACD[trial][noise]);
        		document.write(",");
    	}
    }
        	document.write("<br>");   
        	document.write("<br>");   
        	document.write("RoT:");   
 
    for(var trial = 0; trial < numTrialTypes; trial++){ 
    	//document.write(trialTypeNames[trial]);
        	document.write("<br>");   
    	for(var noise = 0; noise < numNoiseTypes; noise++){
        		document.write(AVGresultsRot[trial][noise]);
        		document.write(",");
    	}
    }
 



//*/
</script>
