function createfilterui(){
	FilterArea.innerHTML = null
	fill = ""
	for (var key in filterarray) {
		if (filterarray.hasOwnProperty(key)) {
			fill += "<fieldset id='"+key+"outside' style='float: left;'><legend>"+key+"</legend> <div style='float: left; height: 150px' id=\"" + key+ "i\">"
			for (var secondkey in filterarray[key]) {
				if (filterarray[key].hasOwnProperty(secondkey)) {
					var checked = "checked=true"
					if (filterarray[key][secondkey].class == "error") {checked = null}
					fill += "<div id='"+key+"'><input onclick='filterswitch(this)' type='checkbox' class='"+key+"' id='"+filterarray[key][secondkey].class+"' "+checked+">" + filterarray[key][secondkey].name + "</div>"
				}
			}
			fill += "</div></fieldset>"
		}
	}
	FilterArea.innerHTML += fill
}

function filterswitch(who){
	for (var i = filterarray[who.className][who.id].type.length - 1; i >= 0; i--) {
		filter[filterarray[who.className][who.id].type[i]] ^= true
	}
	refr()
}