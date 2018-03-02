function createparsermodules_others() {
	others.modules.push(new parser_others_program())
}
///Stats!!!
parser_others_program.prototype = Object.create(parser_info_blacklist_add.prototype)

function parser_others_program(){
		parser_info_blacklist_add.call(this)
	this.name = "Handing Certificate"
	this.subtype = ["game", "gsys"]
	this.regex = new RegExp(/Cert,key/g)
	this.result = "emote"
	this.order = ["time", "server", "characters", "assigns the certificate", "key", "on", "characters", "shown in log:", "log2"]
	this.advance = function(what) {
		if (what.custom.key != null) {
			what.custom.key = aedi.localdb.emote[what.custom.key]
		}
		if (what.custom.log == 1) {
			what.custom.log2 = "yes";
		} else {what.custom.log2 = "no"}
	}
}
