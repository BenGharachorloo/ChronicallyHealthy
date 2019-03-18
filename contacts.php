<?php
 
$filename = 'contacts.txt';
 
if(file_exists($filename)){
	#each contact has 4 lines
	$fileName = "contacts.txt";
	$file = fopen("contacts.txt","r");
	$i = 0;
	$patient = array("name","telephone","email","fax");
	$emergencyContact = array("name","telephone","email","fax");
	$physician = array("name","telephone","email","fax");
	if($file){ //double check if file is open
		while(! feof($file)){
			if(($i/4)<1){
				$patient[$i%4] = fgets($file);	
			}	
			else if (($i/4)<2){
				$emergencyContact[$i%4] = fgets($file);
			}
			else if (($i/4)<3){
				$physician[$i%4] = fgets($file);
			}
			$i++;
		}
		fclose($file);
	}else{
		echo '                    file: ' ;
		echo $fileName;
		echo' is not opened, or not found.';		
	}


	
}else{
	
	$url = 'http://localhost/ChronicallyHealthy/insertContacts.php'; 
	header("Location: $url");
}



?>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1"> 
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="/ChronicallyHealthy/sidebar.css">
<style>
body {font-family: "Lato", sans-serif;}


.tab { margin-left: 40px; }

.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  background-color: #79ada5;
  transition: 0.3s;
  width: 20%;
  font-size: 25px;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  background-color: #699d95;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.container {
  font-size: 15px;
  padding: 2px 16px;
  background-color: #c9ede5;
  margin-left: 40px;
}
/*lighter: #D9FdF5
  darker: #699d95
  default: #79ada5
  */




</style>
</head>





<body>
 
  <div class="sidebar">
    
    <a href="http://localhost/ChronicallyHealthy/canvasjs-2.3/weightGraph.php"><i class="fa fa-fw fa-line-chart"></i> Weight Trend</a>
    <a href="http://localhost/ChronicallyHealthy/weightHistory.php"><i class="fa fa-fw fa-history"></i> Weight History</a>
    <a href="http://localhost/ChronicallyHealthy/preVisitAssessment.php"><i class="fa fa-fw fa-hospital-o"></i> Doctor's Visits</a>
    <a href="http://localhost/ChronicallyHealthy/contacts.php"><i class="fa fa-fw fa-envelope"></i> Contacts</a>
    <a href="http://localhost/ChronicallyHealthy/about.php"><i class="fa fa-fw fa-info-circle"></i> About</a>
    <a href="http://localhost/ChronicallyHealthy/userGuide.php"><i class="fa fa-fw fa-question-circle"></i> User Guide</a>
  </div>
  <br>
  <br>
  <div style = "margin-left:20%;">
    <div>
      
      
      <div class="card" style="position: absolute; left: 20%; top: 100px;">
        <div class="container">
          <h4><b><?php echo $patient[0];?> (Patient)</b></h4>
          <p><i>TEL: <?php echo $patient[1];?></i></p>
          <p><i>EMAIL: <?php echo $patient[2];?></i></p>
          <p><i>FAX: <?php echo $patient[3];?></i></p>
        </div>
      </div>
      <div class="card" style="position: absolute; left: 46.4%; top: 100px;">
        <div class="container">
          <h4><b><?php echo $emergencyContact[0];?> (Emergency Contact)</b></h4>
          <p><i>TEL: <?php echo $emergencyContact[1];?></i></p>
          <p><i>EMAIL: <?php echo $emergencyContact[2];?></i></p>
          <p><i>FAX: <?php echo $emergencyContact[3];?></i></p>
        </div>
      </div>
      <div class="card" style="position: absolute; left: 72.8%; top: 100px;">
        <div class="container">
          <h4><b><?php echo $physician[0];?>  (Primary Physician)</b></h4>
          <p><i>TEL: <?php echo $physician[1];?> </i></p>
          <p><i>EMAIL: <?php echo $physician[2];?> </i></p>
          <p><i>FAX: <?php echo $physician[3];?> </i></p>
        </div>
      </div>
      
      
      
    </div>
  </div>
</body>
</html>
