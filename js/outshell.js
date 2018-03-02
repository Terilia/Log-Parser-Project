function outshell() {
	console.log("Outshell start")
statistic = {
	characters: {},
	items: {},
	locations: {},
	server: {}
}
	for (var i = 0; i < aedi.log.input.length; i++) {
		for (var x = 0; x < aedi.log.input[i].log.length; x++) {
			y = aedi.log.input[i].log[x]
			if (y.display == true) {
				if (y.characters != null) {
				for (var c = 0; c < y.characters.length; c++) {
				 if (statistic.characters[y.characters[c]] == undefined) {statistic.characters[y.characters[c]] = new statchar_create(y.characters[c])}
				 	if (y.type == "talk") {
				 		statistic.characters[y.characters[c]].add("talk", y.result[0])
				 	}
				 	if (y.ter != undefined) {statistic.characters[y.characters[c]].add("locations", y.ter)} 
				 	statistic.characters[y.characters[c]].amount += 1
				}}

				if (y.aediresult == "isys_moveworld" || y.aediresult == "isys_moveworld2" ) {
					for (var c = 0; c < y.characters.length; c++) {
					 	if (statistic.server[y.zoneto] == undefined) {statistic.server[y.zoneto] = []; statistic.server[y.zoneto].push({char: y.characters[0], time: y.epoch})}else {
							statistic.server[y.zoneto].push({char: y.characters[0], time: y.epoch})
						}
					}	
				}
			}
		}			
	}

	var sorting = []
	for (var a in statistic.characters){
		if (statistic.characters.hasOwnProperty(a)) {
			sorting.push([statistic.characters[a].name, statistic.characters[a].amount])
		}
	}
	sorting = sorting.sort(function(a, b) {
				if (a[1] > b[1]) {return -1}
		if (a[1] < b[1]) {return 1}
		return 0
	}) 
	var html = ""
	for (var i = 0; i < sorting.length; i++) {
		var einschub = ""
		var einschub2 = ""
		if (customfilter.indexOf(sorting[i][0]) >= 0) {einschub = "color: blue;"; einschub2 = "[Filter] - "}
		html += "<div style=\""+einschub+"\" onclick=\"customfiltering_addremove(this.id);refr()\" id=\"" + sorting[i][0] + "\">"+einschub2+sorting[i][0] + "(" + sorting[i][1] + ")" + "</div>"


	}
	html += "<button style=\"bottom: 0px; position: absolute;\" id=\"reset\" onclick=\"customfilter=[];refr()\">Reset</button>"
	characterfilter.innerHTML = html

	//serverfinder
	var html = ""
	var same = []
	for (var key in statistic.server){
		if (statistic.server.hasOwnProperty(key)) {
			
			for (var i = 0; i < statistic.server[key].length; i++) {

				for (var x = statistic.server[key].length - 1; x >= 0; x--) {

					var check = statistic.server[key][i].time.getTime() / statistic.server[key][x].time.getTime()
					if (check > 0.9999999 && check < 1.0000001 && statistic.server[key][i].char != statistic.server[key][x].char ) {

						var epoch = new Date(statistic.server[key][i].time)
						if(statistic.server[key][i].time != null){var cachevalue = statistic.server[key][i].time.getHours();} else {var cachevalue = 0}
						epoch.setHours(cachevalue - timeselect.value)

						var timetopush = epoch.toLocaleDateString("en-gb", {day: "numeric", month: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"})
						var endproukt = timetopush+" " +key+" "+statistic.server[key][i].char + " " + statistic.server[key][x].char + " " 
						var endproukt2 = timetopush+" " +key+" "+statistic.server[key][x].char + " " + statistic.server[key][i].char + " " 
						if (same.indexOf(endproukt) < 0 && same.indexOf(endproukt2) < 0) {
							same.push(endproukt);}
					}
				}
			} 
		}

	}

	for (var i = same.length - 1; i >= 0; i--) {
		html += same[i] + "</br>"
	}
	ServerFinder.innerHTML = html
	statisticdisplay();
}


function statisticdisplay(){
	var itemhtml = ""
	var idhtml = ""
	var originaloghtml = ""
	for (var i = aedi.uniquecounter - 1; i >= 0; i--) {
		if (aedi.id[i].highlight == 1) {
			itemhtml += displayitems(aedi.id[i]);
			idhtml += displayids(aedi.id[i])
			originaloghtml += aedi.id[i].rawlog
		}
	}
	characterhtml = displaycharacters()
	ItemsOutershell.innerHTML = itemhtml
	CharactersOutershell.innerHTML = characterhtml
	IDsOutershell.innerHTML = idhtml
	OriginalLogOutershell.innerHTML = originaloghtml
	customfilterdisplay()
}

function displayids(input){
	var returnhtml = ""
	for (key in input.custom) {
		if (input.custom.hasOwnProperty(key)) {
			returnhtml += key + ": " + input.custom[key] + "</br>"
		}
	}
	var otherids = [ "output", "name", "characters", "fc", "retainer", "logid", "channel", "entity", "teri_id", "server", "zoneto", "zonefrom", "ter"]
	for (var i = 0; i < otherids.length; i++) {
		if (input[otherids[i]] != null) {
			returnhtml += otherids[i] + ": " + input[otherids[i]] + "</br>"
		}
	}
	return returnhtml
}

function displaycharacters(){
	var returnhtml = ""
	for (key in aedi.localdb.characters) {
		if (aedi.localdb.characters.hasOwnProperty(key)) {
			returnhtml += key + " " + aedi.localdb.characters[key] + "</br>"
		}
	}
	return returnhtml
}

function customfilterdisplay(){
	var html = ""
	for (var i = 0; i < customfilter2.length; i++) {
		html += customfilter2[i] +" <button style='top: 0px;left: 0;position: relative;'' id="+i+" onclick='customfiltering2_addremove(this.id);refr()''>-</button> </br>"
	}
	CustomFilterTable.innerHTML = html
}

function displayitems(input){
	var returnhtml = ""
	for (var i = input.items.length - 1; i >= 0; i--) {
		if (input.items[i] != undefined) {
		var checkregex = new RegExp(/\d+/g)
		var output = input.items[i].match(checkregex)
		returnhtml += "<a href='https://www.google.co.uk/search?q="+output[0]+"' target='_blank'>"+input.items[i]+"</a> </br>"}

	}
	return returnhtml
}

function statchar_create(char) {
	this.name = char
	this.talk = {}
	this.locations = {}
	this.to = {}
	this.amount = 0
}

statchar_create.prototype.add = function(where, what, who) {
	if (this[where] == undefined) {this[where] = where}
	if (this[where][what] == undefined) {this[where][what] = 0}
	if (where == "to") {
		if (this[where][who] != undefined) {this[where][who] += 1} else {this[where][who] = 1}
	} else {this[where][what] += 1}
	
};


statistic = {
	characters: {},
	items: {},
	locations: {},
	server: {}
}