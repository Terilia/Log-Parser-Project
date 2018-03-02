function createparsermodules_talk() {
	talk.modules.push(new parser_talk_say)
	talk.modules.push(new parser_talk_tell)
	talk.modules.push(new parser_talk_party)
}

parser_talk_say.prototype = Object.create(parser_info_blacklist_add.prototype)

function parser_talk_say(){
		parser_info_blacklist_add.call(this)
	this.name = "Say Chat"
	this.subtype = ["sys", "pc"]
	this.regex = new RegExp(/type: 10/g)
	this.result = "say"
	this.customcolor = null
	this.order = ["time", "server", "characters", "says:", "message"]
}

parser_talk_tell.prototype = Object.create(parser_info_blacklist_add.prototype)

function parser_talk_tell(){
		parser_info_blacklist_add.call(this)
	this.name = "tell Chat"
	this.subtype = ["talk", "tell"]
	this.regex = new RegExp(/\[talk\]\[tell\]CharName/g)
	this.result = "tell"
	this.customcolor = "fff1f8"
	this.order = ["time", "server", "characters", "whispers to:", "characters" , "message"]
	this.advance = function(what) {
		aedi.localdb.characters[what.characters[1]] = what.characters[0]
		aedi.localdb.characters[what.characters[3]] = what.characters[2]
	}
}

parser_talk_party.prototype = Object.create(parser_info_blacklist_add.prototype)

function parser_talk_party(){
		parser_info_blacklist_add.call(this)
	this.name = "party Chat"
	this.subtype = ["talk", "tell"]
	this.regex = new RegExp(/ChannelType#PT/g)
	this.result = "party"
	this.customcolor = "e0faff"
	this.order = ["time", "server", "characters", "Party:", "message"]
}