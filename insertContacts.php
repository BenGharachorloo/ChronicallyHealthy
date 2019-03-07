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
.error {color: #FF0000;}

.bouton{
  background-color: green;
  border-style: solid;
  border-color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 4px 2px;
  cursor: pointer;
}

</style>
</head>





<body>


<?php
// define variables and set to empty values
$nameErr = $emailErr = $phoneErr = $faxErr = "";
$cnameErr = $cemailErr = $cphoneErr = $cfaxErr = "";
$pnameErr = $pemailErr = $pphoneErr = $pfaxErr = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	
  if (empty($_POST["patientName"])) {
    $nameErr = "Name is required";
  } else {
    $patientName = test_input($_POST["patientName"]);
  }
  
  if (empty($_POST["patientEmail"])) {
    $emailErr = "Email is required";
  } else {
    $patientEmail = test_input($_POST["patientEmail"]);
  }
    
  if (empty($_POST["patientPhone"])) {
    $phoneErr = "Phone number is required";
  } else {
    $patientPhone = test_input($_POST["patientPhone"]);
  }
    
  if (empty($_POST["patientFax"])) {
    $faxErr = "Fax number is required";
  } else {
    $patientFax = test_input($_POST["patientFax"]);
  }
  
  
  
  if (empty($_POST["caretakerName"])) {
    $cnameErr = "Name is required";
  } else {
    $caretakerName = test_input($_POST["caretakerName"]);
  }
  
  if (empty($_POST["caretakerEmail"])) {
    $cemailErr = "Email is required";
  } else {
    $caretakerEmail = test_input($_POST["caretakerEmail"]);
  }
    
  if (empty($_POST["caretakerPhone"])) {
    $cphoneErr = "Phone number is required";
  } else {
    $caretakerPhone = test_input($_POST["caretakerPhone"]);
  }
    
  if (empty($_POST["caretakerFax"])) {
    $cfaxErr = "Fax number is required";
  } else {
    $caretakerFax = test_input($_POST["caretakerFax"]);
  }
	
	
	
  if (empty($_POST["physicianName"])) {
    $pnameErr = "Name is required";
  } else {
    $physicianName = test_input($_POST["physicianName"]);
  }
  
  if (empty($_POST["physicianEmail"])) {
    $pemailErr = "Email is required";
  } else {
    $physicianEmail = test_input($_POST["physicianEmail"]);
  }
    
  if (empty($_POST["physicianPhone"])) {
    $pphoneErr = "Phone number is required";
  } else {
    $physicianPhone = test_input($_POST["physicianPhone"]);
  }
    
  if (empty($_POST["physicianFax"])) {
    $pfaxErr = "Fax number is required";
  } else {
    $physicianFax = test_input($_POST["physicianFax"]);
  }

}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>


 
  <div class="sidebar">
    
    <a href="https://bengharachorloo.github.io/ChronicallyHealthy/canvasjs-2.3/weightGraph.html"><i class="fa fa-fw fa-line-chart"></i> Weight Trend</a>
    <a href="https://bengharachorloo.github.io/ChronicallyHealthy/weightHistory.html"><i class="fa fa-fw fa-history"></i> Weight History</a>
    <a href="https://bengharachorloo.github.io/ChronicallyHealthy/preVisitAssessment.html"><i class="fa fa-fw fa-hospital-o"></i> Doctor's Visits</a>
    <a href="https://bengharachorloo.github.io/ChronicallyHealthy/contacts.html"><i class="fa fa-fw fa-envelope"></i> Contacts</a>
    <a href"https://bengharachorloo.github.io/ChronicallyHealthy/about.html"><i class="fa fa-fw fa-info-circle"></i> About</a>
  </div>
  <br>
  <br>
  <div style = "margin-left:20%;">
    <div>
      
      
     
	 <h2>Contact Information Form</h2>
	<p><span class="error">* required field</span></p>
	<form method="post" action="<?php


	$file = fopen("contacts.txt","w");
	
	fwrite($file ,$patientName);
	fwrite($file ,"\r\n");
	fwrite($file ,$patientEmail);
	fwrite($file ,"\r\n");
	fwrite($file ,$patientPhone);
	fwrite($file ,"\r\n");
	fwrite($file ,$patientFax);
	fwrite($file ,"\r\n");
	
	fwrite($file ,$caretakerName);
	fwrite($file ,"\r\n");
	fwrite($file ,$caretakerEmail);
	fwrite($file ,"\r\n");
	fwrite($file ,$caretakerPhone);
	fwrite($file ,"\r\n");
	fwrite($file ,$caretakerFax);
	fwrite($file ,"\r\n");
	
	fwrite($file ,$physicianName);
	fwrite($file ,"\r\n");
	fwrite($file ,$physicianEmail);
	fwrite($file ,"\r\n");
	fwrite($file ,$physicianPhone);
	fwrite($file ,"\r\n");
	fwrite($file ,$physicianFax);
	fwrite($file ,"\r\n");
	
	
	
	
	?>">  
	<div class = "card">
		  <b>Patient</b><br><br>
		  Name: <input type="text" name="patientName">
		  <span class="error">* <?php echo $nameErr;?></span>
		  <br><br>
		  E-mail: <input type="text" name="patientEmail">
		  <span class="error">* <?php echo $emailErr;?></span>
		  <br><br>
		  Phone: <input type="text" name="patientPhone">
		  <span class="error">* <?php echo $phoneErr;?></span>
		  <br><br>
		  Fax: <input type="text" name="patientFax">
		  <span class="error">* <?php echo $faxErr;?></span>
		  <br><br>
	</div>
	<br><br>
	<br><br>
	<div class = "card">
		  <b>Primary Caretaker</b><br><br>
		  Name: <input type="text" name="caretakerName">
		  <span class="error">* <?php echo $cnameErr;?></span>
		  <br><br>
		  E-mail: <input type="text" name="caretakerEmail">
		  <span class="error">* <?php echo $cemailErr;?></span>
		  <br><br>
		  Phone: <input type="text" name="caretakerPhone">
		  <span class="error">* <?php echo $cphoneErr;?></span>
		  <br><br>
		  Fax: <input type="text" name="caretakerFax">
		  <span class="error">* <?php echo $cfaxErr;?></span>
		  <br><br>
	</div>
	<br><br>
	<br><br>
	<div class = "card">
		  <b>Primary Physician</b><br><br>
		  Name: <input type="text" name="physicianName">
		  <span class="error">* <?php echo $pnameErr;?></span>
		  <br><br>
		  E-mail: <input type="text" name="physicianEmail">
		  <span class="error">* <?php echo $pemailErr;?></span>
		  <br><br>
		  Phone: <input type="text" name="physicianPhone">
		  <span class="error">* <?php echo $pphoneErr;?></span>
		  <br><br>
		  Fax: <input type="text" name="physicianFax">
		  <span class="error">* <?php echo $pfaxErr;?></span>
		  <br><br>
	</div>
	<br><br>
	<br><br>
		  
		  
		  <input class = "bouton" type="submit" name="submit" value="Submit">  
	</form>
      
      
      
    </div>
  </div>
</body>
</html>
