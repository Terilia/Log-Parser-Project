function createparsermodules_item() {
		item.modules.push(new parser_item_testmodule())

}
///Item

parser_item_testmodule.prototype = Object.create(parser_info_blacklist_add.prototype)

function parser_item_testmodule(){
		parser_info_blacklist_add.call(this)
	this.name = "Turned off Program"
	this.subtype = ["game", "item"]
	this.regex = new RegExp(/ShutdownProgram,actor/g)
	this.result = "discard"
	this.order = ["time", "server", "characters", "discarded","stack", "items", "item_id"]

}