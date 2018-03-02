 // INFO
customarray = ["This Text will be looked for in every log", "And can also be more than one entry", "And supports regex", "\\d{1,2}", "And will appear in more information", ",key=+.?", ",log=+.?", ",tg=Chara#\\d{17}"]

function createparsermodules_info() {
	//Every Module listed here will be loaded. 
	info.modules.push(new parser_info_blacklist_add())
}

function parser_info_blacklist_add(){
	//Name of a Module
	this.name = "Testlog Module"
	//Sub Type of the Log (To quickly determine if this module applies)
	this.subtype = ["comm", "bl"]
	//Regex to look further if the subtype fits
	this.regex = new RegExp(/Blacklist::Add\(\): success(?=, Chara#)/g)
	//Internal Result Name
	this.result = "blacklist_add"
	//If the Log should have a color
	this.customcolor = false
	//This will decide what will displayed and how. Variables can be named, such as time and server. But also normal words. If its not a variable, it will be displayed full
	this.order = ["time", "server", "characters", "did something to user", "characters", "succesfully"]
	//Allows you to insert some code that will be executed if a Log needs some special treatment. (Such as calculating something, or a simple hack without disrupting the other modules)
	this.advance = null
}

parser_info_blacklist_add.prototype.action = function(what){
	var checkregex = what.log.match(this.regex)
		if (checkregex != null) {
			what.aediresult = this.result
			if (this.customcolor != null) {what.customcolor = this.customcolor}
			if (this.order.length != 0) {
				for (var i = 0; i < this.order.length; i++) {
					what.order.push(this.order[i])
				}
			}
			what.result.push(this.result)
			for (var i = 0; i < customarray.length; i++) {
				var zwischenspeicher = null
				var regex = new RegExp(customarray[i], "g")
				var checkregex = what.log.match(regex)
				if (checkregex != null) {
					var zwischenspeicher = customarray[i].match(/\w{1,20}/g)[0]
					if (zwischenspeicher == "result") {zwischenspeicher = "resultlog"}
					if (what.custom[zwischenspeicher] != undefined) {
						if (Array.isArray(what.custom[zwischenspeicher]) == true) {what.custom[zwischenspeicher].push(checkregex[0].match(/[^#|=]+?(?=,|\n|$)/g)[0])} 	else {
						var cash = null
						cash = what.custom[zwischenspeicher]
						what.custom[zwischenspeicher] = []
						what.custom[zwischenspeicher].push(cash)
						what.custom[zwischenspeicher].push(checkregex[0].match(/[^#|=><]+?(?=,|\n|$)/g)[0].toString())}
					} else {
					if (checkregex[0].match(/[^#|=><]+?(?=,|\n|$)/g) != undefined ) {
					what.custom[zwischenspeicher] = checkregex[0].match(/[^#|=><]+?(?=,|\n|$)/g)[0].toString()}}
				}
			}	
			if (this.advance != null) {this.advance(what);}
		}
}