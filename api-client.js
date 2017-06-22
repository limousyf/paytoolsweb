function UserAction() {
	var value_to_decode = document.forms["input_details"]["value_to_decode"].value;
	var field_to_decode = document.getElementById("field_to_decode").value;
    var req_url= buildURL(field_to_decode,value_to_decode)
    var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
	  if (this.status == 500) {
		var response = JSON.parse(this.responseText);
		var errorMessage = "<p class=\"error\">" + response.errorMessage + "</p>"
		document.getElementById("decoded").innerHTML = errorMessage;
	  }
	  else if (this.status == 400) {
		var response = JSON.parse(this.responseText);
		var errorMessage = "<p class=\"error\">" + response.errorMessage + "</p>"
		document.getElementById("decoded").innerHTML = errorMessage;
	  }
	  else if (this.status == 200) {
		var response = JSON.parse(this.responseText);
		
		var parsedResponse
		
		//specific processing
		if(field_to_decode == 'arc'){
			parsedResponse = translateSingleValue("ARC",response)
		}
		else if (field_to_decode == 'cid'){
			parsedResponse = translateCID(response)
		}
		else if (field_to_decode == 'cvm'){
			parsedResponse = translateCVM(response)
		}
		else if (field_to_decode == 'cvr'){
			parsedResponse = translateCVR(response)
		}
		else if (field_to_decode == 'dol'){
			parsedResponse = decodeDOL(response)
		}
		else if (field_to_decode == 'termtype'){
			parsedResponse = decodeTerminalType(response)
		}
		else{ //bitfield
			parsedResponse = translateByteList(response)
		}
		document.getElementById("decoded").innerHTML = parsedResponse;
	  }
  };
    xhttp.open("GET", req_url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function searchAction() {
	//console.log("Search action")
	var value_to_search = document.forms["search_details"]["value_to_search"].value;
	var field_to_search = document.getElementById("field_to_search").value;
    var req_url= buildURL(field_to_search,value_to_search)
    var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
	  if ((this.status == 500) || (this.status == 400)){
		var response = JSON.parse(this.responseText);
		var errorMessage = "<p class=\"error\">" + response.errorMessage + "</p>"
		document.getElementById("matches").innerHTML = errorMessage;
	  }
	  else if (this.status == 200) {
		var response = JSON.parse(this.responseText);
		
		var parsedResponse
		
		if((response) && (response.length >0)){
		
			//specific processing
			if(field_to_search == 'aid'){
				parsedResponse = processAIDList(response)
			}
			else if (field_to_search == 'iin'){
				parsedResponse = processIINList(response)
			}
			else if (field_to_search == 'tag'){
				parsedResponse = processTagList(response)
			}			
		}
		else{
			parsedResponse = "No matches found"
		}
		document.getElementById("matches").innerHTML = parsedResponse;
	  }
  };
    xhttp.open("GET", req_url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function mod10Action() {
	var mod10_value = document.forms["utils_details"]["mod10_input"].value;
	var mod10_mode = document.getElementById("mod10_mode").value;
    
	var req_url
	var checkDigit
	if(mod10_mode == "mod10compute"){
		req_url = buildmod10URL(mod10_mode,mod10_value)
	}
	else{
	//mod10_check
		//parse checkdigit (get last digit of mod10_value
		var trim_value = mod10_value.substring(0, mod10_value.length - 1);
		checkDigit = mod10_value.slice(-1);
		req_url = buildmod10URL(mod10_mode,trim_value, checkDigit)
	}    
	var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
	  if ((this.status == 500) || (this.status == 400)){
		var response = JSON.parse(this.responseText);
		var errorMessage = "<p class=\"error\">" + response.errorMessage + "</p>"
		document.getElementById("utilsResp").innerHTML = errorMessage;
	  }
	  else if (this.status == 200) {
		var response = JSON.parse(this.responseText);
		
		console.log("response: " + response)
		
		var parsedResponse
		
		if(response){
			//specific processing
			if(mod10_mode == 'mod10compute'){
				parsedResponse = "Mod10 check digit: <b>" + response.checkDigit + "</b>"
			}
			else if (mod10_mode == 'mod10check'){
				if(response.result){
					parsedResponse = "Check digit <b>" + checkDigit + "</b> is valid"
				}
				else{
					//wrong check digit
					parsedResponse = "Check digit <b class=\"error\">" + checkDigit + "</b> is incorrect<br/>"
					parsedResponse += "Expected value is <b>" + response.expectedCheckDigit + "</b>"
				}
			}		
		}
		document.getElementById("utilsResp").innerHTML = parsedResponse;
	  }
  };
    xhttp.open("GET", req_url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function buildURL(field, parameter){
	var host = "api.paytools.info";
	var stage = "latest";
	var version = "v1";
	var returnURL = "https://" + host + "/" + stage + "/" + version + "/" + field + "?" + field + "=" + parameter
	return returnURL
}

function buildmod10URL(mod10_mode, value, checkDigit){
	var host = "api.paytools.info";
	var stage = "latest";
	var version = "v1";
	var returnURL = "https://" + host + "/" + stage + "/" + version + "/" + mod10_mode + "?numvalue=" + value
	if(checkDigit){
		returnURL += "&checkdigit=" + checkDigit
	}
	return returnURL
}