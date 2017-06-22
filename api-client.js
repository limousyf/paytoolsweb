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

function buildURL(field, parameter){
	var host = "api.paytools.info";
	var stage = "latest";
	var version = "v1";
	var returnURL = "https://" + host + "/" + stage + "/" + version + "/" + field + "?" + field + "=" + parameter
	return returnURL
}