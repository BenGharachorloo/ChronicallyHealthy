function MACD(weightVector) {
 //PARAMS:
 var NS = 1;
 var NL = 6;
 
 var alphS = 2/(NS+1);
 var alphL = 2/(NL+1);
 //Oldest day to check:
var N = weightVector.length;
 
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


</script>

<br><br><br>
<p> Hope that's an okay result!</p>



<canvas id="myCanvas" width="800" height="400" style="border:1px solid #d3d3d3;">
Your browser does not support the HTML5 canvas tag.</canvas>

<script>
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0,400);
ctx.lineTo(800,0);
ctx.stroke();
  
  
  
  
  var i;
  for(i = 100; i < 1000; i = i + 200){
    ctx.beginPath();
    ctx.arc(i, 75, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
}
