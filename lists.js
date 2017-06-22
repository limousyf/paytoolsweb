
/**
 * Takes in input a JSON object formatted as a list of AIDs
 * and translate the content as human readable
 * 
 */
function processAIDList(aidListObject){
    var interpretedAidList = ""
    //console.log("Translating " + aidListObject)
    if(aidListObject){
		
		//creating table
		interpretedAidList += "<table style=\"width:100%\"><tr><th>AID</th><th>Vendor</th><th>Country</th><th>Name</th><th>Description</th></tr>"
		
        for(var i=0;i<aidListObject.length;i++){
			interpretedAidList += "<tr>"
			interpretedAidList += "<td>" + aidListObject[i].aid + "</td><td>" + aidListObject[i].vendor + "</td><td>" + aidListObject[i].country + "</td><td>" + aidListObject[i].name + "</td><td>" + aidListObject[i].description + "</td>"
			interpretedAidList += "</tr>"
        }
		
		interpretedAidList += "</table>"
    }

    return interpretedAidList
}

/**
 * Takes in input a JSON object formatted as a list of IIN
 * and translate the content as human readable
 * 
 */
function processIINList(iinListObject){
    var interpretedIINList = ""
    //console.log("Translating " + iinListObject)
    if(iinListObject){
		
		interpretedIINList += "<table style=\"width:100%\"><tr><th>Scheme</th><th>Brand</th><th>Country</th><th>Product</th><th>Issuer</th><th>Range start</th><th>Range end</th></tr>"
		
        for(var i=0;i<iinListObject.length;i++){
			interpretedIINList += "<tr>"
			interpretedIINList += "<td>" + iinListObject[i].scheme + "</td><td>" + iinListObject[i].brand + "</td><td>" + iinListObject[i].country + "</td><td>" + iinListObject[i].type + "</td><td>" + iinListObject[i].issuerName + "</td><td>" + iinListObject[i].iinStart + "</td><td>" + iinListObject[i].iinEnd + "</td>"
			interpretedIINList += "</tr>"
        }
		
		interpretedIINList += "</table>"
    }

    return interpretedIINList
}