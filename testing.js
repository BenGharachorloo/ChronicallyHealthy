
var numWeights =  25; //Dimension: time
var numTrialTypes =  5; //Dimension: healthy / increasing / decreasing
                        //0-healthy, 1-increasing Quickly, 2-decreasing Quickly, 3-increasing Slowly, 4-decreasing Slowly
var numNoiseTypes =  3; //Dimension: Noise level
                        //0-no noise, 1-little noise, 2-lots of noise
var numWeightAvgs =  9; //Dimension: Average Weight
                        var avgWeights = [60,65,70,75,80,85,90,95,100];


for(var weightAvgIdx = 0; type < numTrialTypes; type++){
  var avgWeight = 70;
  var weightArray = new Array(numTrialSets);
  for(var set = 0; set < numTrialSets; set++){ //loop of sets
    weightArray[set] = new Array(numWeights);

    for(var i = 0; i < numWeights; i++){ //loop to make weights
      weightVector.push(avgWeight);
    }

  }
}
