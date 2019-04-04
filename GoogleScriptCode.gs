// The following code consists of 4 functions 
// 1) checkHealth:
//    a) chooses the algorithm to use
//    b) analyzes the weights according to the chosen algorithm
//    c) records the result back to a Google spreadsheet
// 2) RoT: implements the RoT method as described by Zhang et al. (2009)
// 3) MACD: implements the MACD method as described by Eggerth et al. (2017)
// 4) daysBetween: provided 2 date strings, returns the number of days between them

function checkHealth() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Sheet1');
  var last_row = sheet.getLastRow();
  
  // set headers on a new sheet
  if (last_row <= 2) {  
    sheet.getRange(1, 1).setValue("Date");
    sheet.getRange(1, 2).setValue("Weight (kg)");
    sheet.getRange(1, 3).setValue("Days since last reset");
    sheet.getRange(1, 4).setValue("Health status");
    sheet.getRange(1, 5).setValue("Method");
    sheet.getRange(1, 6).setValue(1);
    for (var curr_col = 1; curr_col <= 6; curr_col++) {
      sheet.getRange(1, curr_col).setFontWeight("bold");
    }
    return;
  }
  
  // wait until weight information is entered before processing
  if(sheet.getRange(last_row, 1).isBlank() || sheet.getRange(last_row, 2).isBlank()) return;
  
  // user has clicked their button to reset weight trends (after visiting physician)
  if(sheet.getRange(1, 8).getValue() == "Reset requested!") { 
    sheet.getRange(last_row, 3).setValue(0);
    sheet.getRange(1, 8).clear();
  }
  
  // find newest entry that doesn't have health status
  var first_unprocessed_row = last_row;
  while (sheet.getRange(first_unprocessed_row-1, 4).isBlank()) first_unprocessed_row--;
  
  for (var processing_row=first_unprocessed_row; processing_row <= last_row; processing_row++) {
    // use bubble sort on the newest weight information
    var cont = true;
    var out_of_order = false;
    var put_before;
    var new_date_str = sheet.getRange(processing_row, 1).getValue();
    
    for (var curr_row = processing_row; curr_row > 2 && cont; curr_row--) {
      put_before = curr_row-1;
      var prev_date_str = sheet.getRange(curr_row-1, 1).getValue();
      cont = daysBetween(new_date_str, prev_date_str) < 0;
      out_of_order |= cont;
    }
    
    // put newest weight in its intended position
    if (out_of_order) {
      sheet.insertRowBefore(put_before);
      sheet.getRange(put_before, 1).setValue(sheet.getRange(processing_row+1, 1).getValue());
      sheet.getRange(put_before, 2).setValue(sheet.getRange(processing_row+1, 2).getValue());
      sheet.deleteRow(processing_row+1);
    }
    
    // initialize days since last reset
    sheet.getRange(2, 3).setValue(1);
    sheet.getRange(2, 4).setValue("Indeterminate");

    // keep only the most recent weight entry from this date
    if (processing_row > 1) {
      var prev_date_str = sheet.getRange(processing_row-1, 1).getValue();
      var curr_date_str = sheet.getRange(processing_row, 1).getValue();
      var diff = daysBetween(curr_date_str, prev_date_str);
      if (diff == 0) {
        sheet.deleteRow(processing_row-1);
        processing_row -= 1;
      }
      last_row = sheet.getLastRow();
    }
    // update days since last reset
    var days_since_reset_cell = sheet.getRange(processing_row, 3);
    if (diff > 1) days_since_reset_cell.setValue(1); // missed measuring weight, so reset!
    else if ((out_of_order && (processing_row == put_before || processing_row == put_before+1)) ||
      (days_since_reset_cell.isBlank() || days_since_reset_cell.getValue() != 0)) { // do not overwrite if someone reset days since last hospitalization
        var prev_days_since_reset = sheet.getRange(processing_row-1, 3).getValue();
        days_since_reset_cell.setValue(prev_days_since_reset+diff);
    }
    
    var days_since_reset = days_since_reset_cell.getValue();
    
    if (days_since_reset > 1) {
      var use_MACD = (days_since_reset > 17);
      var result = use_MACD ? MACD(sheet, processing_row) : RoT(sheet, processing_row);
      sheet.getRange(processing_row, 5).setValue(use_MACD ? "MACD" : "RoT");
      
      if (result == 2) {
      sheet.getRange(processing_row, 4).setValue("Unhealthy");
      if (processing_row == last_row) sheet.getRange(1,6).setValue(sheet.getRange(1,6).getValue() + 1); 
      } else if (result == 1) {
        sheet.getRange(processing_row, 4).setValue("Healthy");
      }
    } else {
      sheet.getRange(processing_row, 4).setValue("Indeterminate");
    }
  }
}

function MACD(sheet, row) {
  // parameters
  var NS = 1;
  var NL = 6;
  var alphS = 2/(NS+1);
  var alphL = 2/(NL+1);
  
  // short and long term sums
  var shortSum = 0, longSum = 0; 
  var days_since_reset = sheet.getRange(row, 3).getValues();
  
  var refFast = sheet.getRange(1,2, sheet.getLastRow(), 1).getValues();
  
  for(var x = 0; x < days_since_reset && row-x > 1; x++){    
    var val = refFast[row-x];
    shortSum += Math.pow((1-alphS),x) * val;
    longSum += Math.pow((1-alphL),x) * val;
  }
  
  if (alphS*shortSum - alphL*longSum > 0.4) return 2;
  return 1;
}

function RoT(sheet, row) {
  // raise flag if 1 day weight gain exceeds threshold amount
  // sources: 2017 paper by Zhang et. al
  var curr_date_str = sheet.getRange(row, 1).getValue();
  
  // parameters
  var threshold = 0.907185; //2 lbs = 0.907185 kg
  var curr_weight = sheet.getRange(row, 2).getValue();
  
  // check whether 1 day weight trend is healthy
  var prev_date_str = sheet.getRange(row-1, 1).getValue();
  if (daysBetween(curr_date_str, prev_date_str) > 1) return 0; // weight was not recorded 1 day ago 
  if (curr_weight >= sheet.getRange(row-1, 2).getValue() + threshold) return 2;
  
  // healthy only if data is recorded from 1 ago
  return 1;
}

function daysBetween(date2_str, date1_str) {
  var one_day = (24*60*60*1000);
  var prev_date = new Date(date1_str.substring(0, date1_str.indexOf(" at")));
  var curr_date = new Date(date2_str.substring(0, date2_str.indexOf(" at"))); 
  return Math.floor(curr_date.getTime() / one_day) - Math.floor(prev_date.getTime() / one_day);
}
