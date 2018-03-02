function filtering(biglog) {
	for (var i = biglog.length - 1; i >= 0; i--) {
		for (var x = biglog[i].log.length - 1; x >= 0; x--) {
			if (filter[biglog[i].log[x].result] != undefined) {biglog[i].log[x].display = filter[biglog[i].log[x].result]}
			
		}
	}
}

function customfiltering(biglog) {
	for (var i = biglog.length - 1; i >= 0; i--) {
		for (var x = biglog[i].log.length - 1; x >= 0; x--) {
			if (biglog[i].log[x].display != undefined && aedi.filtermode == false) {
				var stringify = JSON.stringify(biglog[i].log[x])
				var stringify2 = JSON.stringify(biglog[i].log[x].characters)
				var value = 0
				for (var c = customfilter.length - 1; c >= 0; c--) {
				 if (stringify2.match(new RegExp(customfilter[c])) != undefined) {value += 1}
				}
				for (var c = customfilter2.length - 1; c >= 0; c--) {
				 if (stringify.match(new RegExp(customfilter2[c])) != undefined) {value += 1}
				}
				if (value != (customfilter.length + customfilter2.length)) {biglog[i].log[x].display = undefined}
			}

			if (biglog[i].log[x].display != undefined && aedi.filtermode == true) {
				var stringify = JSON.stringify(biglog[i].log[x])
				var stringify2 = JSON.stringify(biglog[i].log[x].characters)
				var value = 0
				for (var c = customfilter.length - 1; c >= 0; c--) {
				 if (stringify2.match(new RegExp(customfilter[c])) != undefined) {value += 1}
				}
				for (var c = customfilter2.length - 1; c >= 0; c--) {
				 if (stringify.match(new RegExp(customfilter2[c])) != undefined) {value += 1}
				}
				if (value <= 0) {biglog[i].log[x].display = undefined}
			}
		}
	}
}

function changefiltermode() {
	aedi.filtermode = !aedi.filtermode
	if (aedi.filtermode == false) {Filtermodechanger.innerText = "Filtermode: AND"} else {
		Filtermodechanger.innerText = "Filtermode: OR"
	}
}

function customfiltering_addremove(query) {
	var filt = customfilter.indexOf(query)

	if (filt >= 0) {
		customfilter.splice(filt, 1)
	} else {customfilter.push(query)}
}

function customfiltering2_addremove(query) {
	var filt = customfilter2.indexOf(customfilter2[query])

	if (filt >= 0) {
		customfilter2.splice(filt, 1)
	} else {customfilter2.push(query)}
}

filter = {
	error: false
}

customfilter = []
customfilter2 = []

filterarray = {
	Talk: {say: {class: "say", name: "Test Option 1", type: ["say"]}},
	Item: {itemobtained: {class: "itemobtained", name: "Test Option 2", type: ["npc_buy", "npc_buyback_item", "npc_buyback_itemstack", "system_item_add"]}},
	Info: {worldmove: {class: "worldmove", name: "Test Option 3", type: ["isys_moveworld", "isys_moveworld_complete"]}},
	Others: {battle:{class: "battle", name: "Test Option 4", type: ["dead", "battle_start", "battle_end", "action"]}, testoption5:{class: "Test Option 5", name: "Test Option 5", type: ["dead", "battle_start", "battle_end", "action"]}}
}