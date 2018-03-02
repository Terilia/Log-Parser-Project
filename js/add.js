function createnewlog(rawinput) {
	var log = new upper_log_new()
	for (var i = 0; i <= rawinput.length - 1; i++) {
		var underlog = new under_log_new
		underlog.log = rawinput[i]
        underlog.rawlog = rawinput[i]
        aedi.id[aedi.uniquecounter] = underlog
        aedi.uniquecounter += 1
		if (rawinput[i] != "") {
		log.log.push(underlog)}
	}
	log.name = "Log=" + aedi.log.index
	log.logid = aedi.log.index
	aedi.log.index += 1
	aedi.log.input.push(log)
}

function under_log_new(){
    this.log = null
    this.aediresult = null
    this.output = null
    this.name = null
    this.characters = []
    this.items = []
    this.rawlog
    this.time = null
    this.fc = null
    this.retainer = []
    this.logid = null
    this.type = null
    this.subtypes = []
    this.channel = null
    this.entity = []
    this.teri_id = null
    this.server = null
    this.who = []
    this.zoneto = null
    this.zonefrom = null
    this.result = [] 
    this.message = null
    this.custom = {}
    this.output
    this.display = true
    this.customcolor = null
    this.order = []
    this.order2 = []
    this.ter = null
    this.highlight = 0
    this.unique = aedi.uniquecounter
    this.group = this.characters
}

function upper_log_new(){
	this.log = []
	this.name = null
	this.order = []
	this.characters = null
	this.items = null
	this.server = null
	this.teri_id = []
    this.selected = true
    this.detected = false
}