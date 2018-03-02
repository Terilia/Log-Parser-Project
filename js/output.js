function output(biglog) {
	LogAreaText.innerHTML = null
	aedi.log.output = []
	for (var i = biglog.length - 1; i >= 0; i--) {
		for (var x = biglog[i].log.length - 1; x >= 0; x--) {
			if (biglog[i].log[x].display == true) {
				if (biglog[i].log[x].epoch != undefined) {
					aedi.log.output.push({log: prepareoutput(biglog[i].log[x]), time: biglog[i].log[x].epoch.getTime()})
				} else {
					aedi.log.output.push({log: prepareoutput(biglog[i].log[x]), time: null})}
				
			}
		}
	}
	aedi.log.output.sort(function(a,b){
		  	if (a.time < b.time) return 1;
  			if (a.time > b.time) return -1;
  			return 0;
	})
	var test = ""
	for (var i = aedi.log.output.length - 1; i >= 0; i--) {
		test += aedi.log.output[i].log
	}

	LogAreaText.innerHTML = test
	outshell()
}

function removeduplicates(what){
  for (var i = what.characters.length - 1; i >= 0; i--) {
  	for (var x = what.characters.length - 1; x >= 0; x--) {
  		if (what.characters[i] == what.characters[x] && i != x) {what.characters.splice(x, 1); return true}
  	}
	}
}

function prepareoutput(what) {
	if (what.message != null) {
		what.message = what.message.replace(/</g, "&#60;")
		what.message = what.message.replace(/>/g, "&#62;")
	}
	if (what.characters != null) {what.characters = namefind(what.characters);
		for (var i = 0 ; i > what.characters.length; i++) {
			if (aedi.localdb.characters[what.characters[i]] != undefined) {what.characters[i] = aedi.localdb.characters[what.characters[i]]}
		}
		while (removeduplicates(what) == true) {}


	} 
	if (what.entity != null) {
		entityfind(what)
	}
	//time adjust
	var epoch = new Date(what.epoch)
	if(what.epoch != null){var cachevalue = what.epoch.getHours();} else {var cachevalue = 0}
	epoch.setHours(cachevalue - timeselect.value)
	what.time = epoch.toLocaleDateString("en-gb", {day: "numeric", month: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"})
	//
	var order = [what.time, what.server, what.characters, what.result, what.message]
	if (what.type == "error") {order.push(what.log)}
	if (what.order.length != 0) { 
		var count = 0
		for (var i = 0; i < what.order.length; i++) {
			if (what[what.order[i]] != undefined) {
				if (Array.isArray(what[what.order[i]]) == true) 
					{
						if (what.order[i] == "items" || what.order[i] == "retainer" || what.order[i] == "group") {
							if (what.order[i] == "group") {what.group = what.characters}
							what.order2[i] = what[what.order[i]]

						} else {
						what.order2[i] = what[what.order[i]][count]; 
						count += 1} 
					}
				else {what.order2[i] = what[what.order[i]]}
				
			} 
			else {
				if (what.custom[what.order[i]] != undefined) {
					what.order2[i] = what.custom[what.order[i]]
				}
				else {what.order2[i] = what.order[i]}}
		}
		order = what.order2
	}
	var highlighting = ""
	if (what.highlight == 1) {highlighting = "background-color: #ffa6a6;"}
	var answer = "<div id="+what.unique+" onclick=highlight("+what.unique+") style=';background-color:"+what.customcolor+";"+highlighting+"'>"
	for (var i = 0; i < order.length; i++) {
		if (order[i] != undefined && order[i] != what.message) 
			{answer += "["+order[i]+ "]" + " "}	
		else {if (order[i] != undefined) 
			{answer += order[i] + " "}}
	}
	answer += "</div>"
	return answer
}


function namefind(input){
	var returnish = []
	for (var i = 0; i < input.length; i++) {
		if (aedi.localdb.characters[input[i]] != undefined) {returnish.push(aedi.localdb.characters[input[i]])} else {returnish.push(input[i])}
	}
    if (returnish.length >= 1) {return returnish} else {
    return input}
}


function entityfind(input){
	for (var i = 0; i < input.entity.length; i++) {
		for (var key in input.custom) {
			if (input.custom.hasOwnProperty(key)) {
				if (input.custom[key] == input.entity[i]) {
					if (aedi.localdb.characters[aedi.localdb.entity[input.entity[i]]] != undefined) {input.custom[key] = aedi.localdb.characters[aedi.localdb.entity[input.entity[i]]]} else {
						if (aedi.localdb.entity[input.entity[i]] != undefined) {input.custom[key] = aedi.localdb.entity[input.entity[i]]}
					}
				}
			}
		}
	}
}


function highlight(input){
	if (aedi.id[input].highlight != 0) {aedi.id[input].highlight = 0} else {
		for (var i = aedi.uniquecounter - 1; i >= 0; i--) {
			aedi.id[i].highlight = 0}
		aedi.id[input].highlight = 1}
	refr()
}