
/**
 * Takes in input a JSON object formatted a number of bytes as follow
 * {
 * byte1 : [],
 * byte2 : [],
 * ...
 * bytenbBytes : []
 * }
 * and translate the content as human readable
 * 
 */
function translateByteList(byteListObject){
    var interpretedByteList = ""
    console.log("Translating " + byteListObject)
    if(byteListObject){
        for(var i=1;i<(Object.keys(byteListObject).length+1);i++){
			interpretedByteList += "<b>Byte " + i + "</b><br/>"
            interpretedByteList += translateBitField(i,byteListObject['byte' + i])
        }
    }

    return interpretedByteList
}

/** Takes a table of interpreted bits in parameter; format:
 * Table of objects
*     - bit 
*     - Value
* and a byte Number for display
* returns a readable string
*/
function translateBitField(byteNumber, interpretedTable){
    var interpretedByte = ""

    if(interpretedTable){
        for(var j=0;j<interpretedTable.length;j++){
                interpretedByte += "bit " + interpretedTable[j].bit + " : " + interpretedTable[j].value + "<br/>"
            }
    }

    return interpretedByte
}

function translateSingleValue(valueName, response){
    var interpretedValue = valueName + ": " + response.value
    return interpretedValue
}

function translateCID(response){
    var interpretedValue = ""
	interpretedValue += "Cryptogram Type: " + response.type + "<br>"
	interpretedValue += "Payment specific: " + response.paymentSpecific + "<br>"
	interpretedValue += "Advice: " + response.advice + "<br>"
	interpretedValue += "Reason: " + response.reason + "<br>"
    return interpretedValue
}

function translateCVM(response){
    var interpretedValue = ""
	interpretedValue += "Byte 1: " + response.byte1 + "<br>"
	interpretedValue += "Byte 2: " + response.byte2 + "<br>"
	interpretedValue += "Byte 3: " + response.byte3 + "<br>"
    return interpretedValue
}

function translateCVR(response){
    var interpretedValue = ""
	
	//byte 1 processing
	if(response.byte1.type == 'Length'){		
		interpretedValue += "Byte1 (CVR Length): " + response.byte1.value
	}
	else{
		//Other
		//bitfield
		interpretedValue += "<b>Byte1</b>"
		interpretedValue += "<br>"
		interpretedValue += translateBitField(1,response.byte1.value)
	}
	
	interpretedValue += "<br>"
	
	//byte2 processing
	//Left nibble
	interpretedValue += "<b>Byte2</b>"
	interpretedValue += "<br>"
	interpretedValue += "Cryptogram in 1st Generate AC: " + response.byte2.leftNibble.firstCryptogram
	interpretedValue += "<br>"
	interpretedValue += "Cryptogram in 2nd Generate AC: " + response.byte2.leftNibble.secondCryptogram
	interpretedValue += "<br>"
	
	//right nibble
	interpretedValue += "Right Nibble<br>"
	interpretedValue += translateBitField(2,response.byte2.rightNibble)
	
	interpretedValue += "<b>Byte3</b>"
	interpretedValue += "<br>"
	
	//byte 3 processing
	interpretedValue += translateBitField(3,response.byte3)
	
	interpretedValue += "<b>Byte4</b>"
	interpretedValue += "<br>"
	
	//byte 4 processing
	//left nibble
	interpretedValue += "Number of issuer scripts: " + response.byte4.nbOfIssuerScripts

	interpretedValue += "<br>"
	
	//right nibble
	interpretedValue += "Right Nibble<br>"	
	interpretedValue += translateBitField(4,response.byte4.rightNibble)
	
	interpretedValue += "<b>Byte5</b>"
	interpretedValue += "<br>"
	
	//byte 5 processing
	interpretedValue += translateBitField(5,response.byte5)
	
    return interpretedValue
}

function decodeDOL(response){
	var interpretedValue = ""
		
	for(var i=0;i<response.length;i++){
		interpretedValue += decodeTL(response[i]) + "<br>";
	}
	
	return interpretedValue
}

function decodeTL(entry){
	var interpretedValue = ""
	
	interpretedValue += "Tag " + entry.tag.tag + " - " + entry.tag.name
	interpretedValue += " - Length: " + entry.length

	return interpretedValue
}

function decodeTerminalType(response){
	var interpretedValue = ""
	
	interpretedValue += "Control: " + response.control + "<br>"
	interpretedValue += "Environment: " + response.environment + "<br>"
	interpretedValue += "Capabilities: " + response.capabilities + "<br>"

	return interpretedValue
}