//Every Module here will be applied to ALL logs parsed. 

function createmoduleslist() {
	aedi.modules.basic.push(new module_maincharacter())
  aedi.modules.basic.push(new module_time())
  aedi.modules.basic.push(new module_world())
  aedi.modules.basic.push(new module_item())
  aedi.modules.basic.push(new module_channel())
  aedi.modules.basic.push(new module_message())
}

function module_time(){
    this.name = "Time Modules"
    this.regex = "((\\d{4}-\\d{2}-\\d{2}\\W\\d{2}:\\d{2}:\\d{2}))"
    this.regexflag = "g"
    this.store = "time"
}

module_time.prototype.action = function(what){
  var checkregex = new RegExp(this.regex, this.regexflag)
  var result = what.log.match(checkregex)
  if (result !== null) {
    what.log = what.log.replace(checkregex, "")
    var returnvalue = new Date(result)
    what.epoch = returnvalue
  }
}

module_maincharacter.prototype = Object.create(module_time.prototype)

function module_maincharacter(){
  this.name = "Character Module"
  this.store = "who"
  this.checkregex = new RegExp(/(([A-Z a-z'-]{2,30})\S\1)(?=(\]\(Chara)|,x=)|\d{17}(?!(Entity)|(, ChannelType#LS))|(([A-Z][A-Z a-z'-]{1,30})\S\1)(?=],)/g)
}

module_maincharacter.prototype.action = function(what){

  charactercache = what.log.substring(0,200).match(this.checkregex)
  if (charactercache != null) {
    if (((isNaN(charactercache[0]) == true && isNaN(charactercache[1]) == false) || isNaN(charactercache[1]) == true && isNaN(charactercache[0]) == false) && charactercache. length > 1 ) {
          if (isNaN(charactercache[0]) == true && isNaN(charactercache[1]) == false) {
            aedi.localdb.characters[charactercache[1]] = charactercache[0]
          } else {
            aedi.localdb.characters[charactercache[0]] = charactercache[1]
          }
    }
  }
  what.characters = charactercache 
}

module_retainer2.prototype = Object.create(module_time.prototype)

function module_retainer2(){
  this.name = "retainer2 Module"
  this.store = "retainer"
  this.checkregex = new RegExp(/337\d{14}|(([A-Z a-z']{2,30})\S\1)(?=],)/g)
}

module_retainer2.prototype.action = function(what){
  what.retainer = what.log.match(this.checkregex)
}

module_world.prototype = Object.create(module_time.prototype)

function module_world(){
    this.name = "BasicWorld"
    this.store = "world"
}

module_world.prototype.action = function(what){
  for (var i = aedi.info.server.length - 1; i >= 0; i--) {
    if (what.log.substring(0,80).indexOf(aedi.info.server[i]) > 0) {
      what.server = aedi.info.server[i]
      return true
    }
  }
}

module_item.prototype = Object.create(module_time.prototype)

function module_item(){
    this.name = "BasicItem"
    this.store = "items"
    this.checkregex = new RegExp(/((?:catalog=)|(?:catalog_id=))\d{1,6}/g)
}

module_item.prototype.action = function(what){
  var result = what.log.match(this.checkregex)
  if (result != null) {
  for (var i = 0; i < result.length; i++) {
    if (result[i].indexOf("catalog_id=") !== -1) {
      what[this.store].push(itemlookup(result[i].substring(11)))      
    } 
    if (result[i].indexOf("catalog=") !== -1) {
      what[this.store].push(itemlookup(result[i].substring(8)))  
    } 
    }
  }
}


module_channel.prototype = Object.create(module_time.prototype)

function module_channel(){
  this.name = "channel module"
  this.store = "channel"
  this.checkregex = new RegExp(/(\d{1,2}(?= message:))|ChannelType#\w{2}/g)
}

module_channel.prototype.action = function(what){
  var result = what.log.match(this.checkregex)
  if (result != null) {
  what[this.store] = result[0]
  }
}

module_message.prototype = Object.create(module_time.prototype)

function module_message(){
  this.name = "message module"
  this.store = "message"
  this.checkregex = new RegExp(/\d{1,2} message:(.{1,5000})|ChannelType#\w{2},(.{1,5000})|\(Chara#\d{17}\),(.{1,5000})/g)
}

module_message.prototype.action = function(what){
  var result = what.log.match(this.checkregex)
  if (result != null) {

  if (result[0].substring(10,2).indexOf("messa") != -1) {
    what[this.store] = result[0].replace(/(\d{1,2} message: )/g, "")
  }
  if (result[0].substring(6,0).indexOf("Chann") != -1) {
    what[this.store] = result[0].substring(16)
  }
  if (result[0].substring(6,1).indexOf("Chara") != -1) {
    what[this.store] = result[0].substring(27)
  }
  }
}