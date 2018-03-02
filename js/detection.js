function detect(what) {
    for (var x = aedi.modules.detection.length - 1; x >= 0; x--) {
      aedi.modules.detection[x].action(what)
    }
    for (var i = aedi.modules.basic.length - 1; i >= 0; i--) {
      aedi.modules.basic[i].action(what)
    }
    if (what.type == null) {
      what.type = "error"
      what.result = "error"
      what.customcolor = "f2f2f2"
      what.order = [what.time, what.server, what.log]
    }
    switch(what.type) {
          case "info":
          aedi.modules.detect_info[0].action(what)
          for (var x = info.modules.length - 1; x >= 0; x--) {
            info.modules[x].action(what)
          }
          break;
          case "item":
          aedi.modules.detect_item[0].action(what)
          for (var x = item.modules.length - 1; x >= 0; x--) {
            item.modules[x].action(what)
          }
          break;
          case "others":
          aedi.modules.detect_others[0].action(what)
          for (var x = others.modules.length - 1; x >= 0; x--) {
            others.modules[x].action(what)
          }
          break;
          case "talk":
          aedi.modules.detect_talk[0].action(what)
          for (var x = talk.modules.length - 1; x >= 0; x--) {
            talk.modules[x].action(what)
          }
          break;
          case "error":
          break;
        }
  if (what.result.length == 0) {
          what.type = "error"
      what.result = "error"
      what.customcolor = "f2f2f2"
  }
  var checkarray = ["toTerType", "TerType", "Type"]
  var regexi = new RegExp(/\d{1,4}/g)
  for (var i = checkarray.length - 1; i >= 0; i--) {
    if (what.custom[checkarray[i]] != null) {
      if (Array.isArray(what.custom[checkarray[i]]) == true) {
        for (var x = what.custom[checkarray[i]].length - 1; x >= 0; x--) {
          if (what.ter == undefined) {
          what.ter = aedi.localdb.ter[aedi.localdb.terjap[what.custom[checkarray[i]][x]]]
        }
        }
      } else { if (what.ter == undefined) {
        what.ter = aedi.localdb.ter[aedi.localdb.terjap[what.custom[checkarray[i]]]]
      }}
     
    }
  }
  //for (var key in what.custom){
  //  if (what.custom.hasOwnProperty(key)) {
  //    for (var i = checkarray.length - 1; i >= 0; i--) {
  //      if (what.custom[checkarray[i]] != undefined) {
  //        if (Array.isArray(what.custom[key]) == true) {
  //          if (what.custom[key][0].match(regexi) != null && what.custom[key][0].match(regexi).length > 0) {what.ter = aedi.localdb.ter[aedi.localdb.terjap[what.//custom[key][0].match(regexi)[0]]]}} else {
  //           
  //           
  //           
  //        if (what.custom[key].match(regexi) != null && what.custom[key].match(regexi).length > 0) {what.ter = aedi.localdb.ter[aedi.localdb.terjap[what.custom[//key].match(regexi)[0]]]} }
  //      }
  //      
  //    }
  //  }
  //}
  for (var i = what.items.length - 1; i >= 0; i--) {

    if (aedi.localdb.item[what.items[i]] != undefined) {what.items[i] = aedi.localdb.item[what.items[i]]+ "#" +what.items[i]} else
    {
      if (aedi.localdb.item[what.items[i]] != undefined && aedi.localdb.item[what.items[i] - 10000] != undefined) {
        what.items[i] = aedi.localdb.item[what.items[i] - 10000] + "HQ#" +what.items[i]
      } else {
        if (aedi.localdb.item[what.items[i]] != undefined && aedi.localdb.item[what.items[i] - 100000] != undefined) {
        what.items[i] = aedi.localdb.item[what.items[i] - 100000] + "HQ#" +what.items[i]
      }
      }
    }
  }
  if (what.custom.Item != undefined) {
    for (var i = what.custom.Item.length - 1; i >= 0; i--) {
      if (aedi.localdb.item[what.custom.Item[i]] != undefined) {what.custom.Item[i] = aedi.localdb.item[what.custom.Item[i]].string}
    }
  }
  if (what.custom.CatalogID != undefined) {
      if (aedi.localdb.item[what.custom.CatalogID] != undefined) {what.custom.CatalogID = aedi.localdb.item[what.custom.CatalogID].string}
  }
}




function gather(whatbig) {
  console.log("Starting to Gather")
  gather2 = {}
  for (var i = whatbig.log.length - 1; i >= 0; i--) {  
    if (whatbig.log[i].characters != null) {
      for (var x = whatbig.log[i].characters.length - 1; x >= 0; x--) {
        if (isNaN(whatbig.log[i].characters[x]) != false) {
          if (gather2[whatbig.log[i].characters[x]] == undefined) {
            gather2[whatbig.log[i].characters[x]] = [];}
          for (var y = whatbig.log[i].characters.length - 1; y >= 0; y--) {
            if (isNaN(whatbig.log[i].characters[y]) != true) {
              if (gather2[whatbig.log[i].characters[x]][whatbig.log[i].characters[y]] == undefined) {
                gather2[whatbig.log[i].characters[x]][whatbig.log[i].characters[y]] = 0}
              gather2[whatbig.log[i].characters[x]][whatbig.log[i].characters[y]] += 1
            }
          }
        }
      }
    }
    
  }
  var test = null
  for (var key in gather2) {
    if (gather2.hasOwnProperty(key)) {
      for (var key2 in gather2[key]) {
        if (gather2[key].hasOwnProperty(key2)) {
          for (var key3 in gather2) {
            if (gather2.hasOwnProperty(key3)) {
              for (var key4 in gather2[key3]) {
                if (gather2[key3].hasOwnProperty(key4)) {
                  if (key2 == key4) {
                    if (gather2[key][key2] > gather2[key3][key4]) {delete gather2[key3][key4]}
                  }
                }
              }
            }
          }
          for (var last in gather2[key]){
            if (test > gather2[key][last]) {delete gather2[key][last]}
            test = gather2[key][last]
          }
          test = null
        }
      }
    }
  }
  for (var key in gather2){
    var testi = null
    if (gather2.hasOwnProperty(key)) {
      for (var kex in gather2[key]){
        if (gather2[key].hasOwnProperty(kex)) {
          if (gather2[key][kex] > testi) {
            testi = gather2[key][kex]}
          for (var ket in gather2[key]){
            if (gather2[key].hasOwnProperty(kex)) {
              if (gather2[key][ket] < testi) {
            delete gather2[key][ket]}
            }
          }
        }
      }
    }
  }
  for (var key in gather2){
    if (gather2.hasOwnProperty(key)) {
      for (var key2 in gather2[key]) {
        if (aedi.localdb.characters[key2] == undefined) {aedi.localdb.characters[key2] = key }
        
      }
    }
  }
}



function gatherent(whatbig) {
  console.log("Starting to Gather Entities")
  gather2 = {}
    for (var i = whatbig.log.length - 1; i >= 0; i--) {  
      if (whatbig.log[i].characters != null && whatbig.log[i].entity != null) {
        for (var x = whatbig.log[i].characters.length - 1; x >= 0; x--) {
          if (isNaN(whatbig.log[i].characters[x]) != true) {
            if (gather2[whatbig.log[i].characters[x]] == undefined) {
              gather2[whatbig.log[i].characters[x]] = [];}
            for (var y = whatbig.log[i].entity.length - 1; y >= 0; y--) {
              if (isNaN(whatbig.log[i].entity[y]) == false) {
                if (gather2[whatbig.log[i].characters[x]][whatbig.log[i].entity[y]] == undefined) {
                  gather2[whatbig.log[i].characters[x]][whatbig.log[i].entity[y]] = 0}
                gather2[whatbig.log[i].characters[x]][whatbig.log[i].entity[y]] += 1
              }
            }
          }
        }
      }
    }
    var test = null
    for (var key in gather2) {
      if (gather2.hasOwnProperty(key)) {
        for (var key2 in gather2[key]) {
          if (gather2[key].hasOwnProperty(key2)) {
            for (var key3 in gather2) {
              if (gather2.hasOwnProperty(key3)) {
                for (var key4 in gather2[key3]) {
                  if (gather2[key3].hasOwnProperty(key4)) {
                    if (key2 == key4) {
                      if (gather2[key][key2] > gather2[key3][key4]) {delete gather2[key3][key4]}
                    }
                  }
                }
              }
            }
            for (var last in gather2[key]){
              if (test > gather2[key][last]) {delete gather2[key][last]}
              test = gather2[key][last]
            }
            test = null
          }
        }
      }
    }
    for (var key in gather2){
      var testi = null
      if (gather2.hasOwnProperty(key)) {
        for (var kex in gather2[key]){
          if (gather2[key].hasOwnProperty(kex)) {
            if (gather2[key][kex] > testi) {
              testi = gather2[key][kex]}
            for (var ket in gather2[key]){
              if (gather2[key].hasOwnProperty(kex)) {
                if (gather2[key][ket] < testi) {
              delete gather2[key][ket]}
              }
            }
          }
        }
      }
    }
    for (var key in gather2){
      if (gather2.hasOwnProperty(key)) {
        for (var key2 in gather2[key]) {
          if (aedi.localdb.entity[key2] == undefined) {aedi.localdb.entity[key2] = key }
          
        }
      }
    }
}


function createdetect() {
  aedi.modules.detect_info.push(new detect_info())
  aedi.modules.detect_item.push(new detect_item())
  aedi.modules.detect_others.push(new detect_others())
  aedi.modules.detect_talk.push(new detect_talk())
}

function detect_info(what) {
  this.detectionarray = ["comm", "game", "bl", "fc", "fl", "hous", "isch", "isys", "lett", "ls", "party", "item", "cns", "housinglog", "autoremovebuddy", "autoremovefchouse", "autoremovephouse", "forceremovefchouse", "forceremoveproom", "forceremoveworkshop", "housemate", "fcrename", "gsys"]
}
detect_info.prototype.action = function(what){  
  var cache = ""
  var checkregex = new RegExp(cache+"\\[", "g")
  var subtypetoadd = ""
  while (what.log.match(checkregex) != null){
    for (var i = 0; i < this.detectionarray.length; i++) {
      cache = " "
      for (var x = 0; x < what.subtypes.length; x++) {
        cache += "\\[" +  what.subtypes[x] + "\\]"
      }
      cache += "\\[" + this.detectionarray[i] + "\\]"
      var checkregex = new RegExp(cache, "g")
      if (what.log.match(checkregex) != null) {
        what.subtypes.push(this.detectionarray[i])
        detect_info(what);
        break;
      }
    }
  }
}
detect_item.prototype = Object.create(detect_info.prototype)

function detect_item(what) {
  this.detectionarray = ["item", "game", "fc", "evnt", "gs", "gsys", "insc", "ptct", "hous", "stat"]
}


detect_others.prototype = Object.create(detect_info.prototype)

function detect_others(what) {
  this.detectionarray = ["comm", "isys", "game", "gsys", "item", "house", "hous", "stat", "dc", "evnt", "insc", "ptct", "pubc", "pc", "teri", "zone", "job", "wtsys"]
}

detect_talk.prototype = Object.create(detect_info.prototype)

function detect_talk(what) {
  this.detectionarray = ["sys", "pc", "talk", "chnl", "tell"]
}






function createdetectionlist() {
	aedi.modules.detection.push(new detection_talk())
  aedi.modules.detection.push(new detection_item())
  aedi.modules.detection.push(new detection_info())
  aedi.modules.detection.push(new detection_other())
}

function detection_talk(){
    this.name = "Talk Detect"
    this.checkregex = new RegExp(/(INFO|ERROR|DEBUG|WARNING)\Wtalk(?= - \[)/g)
    this.type = "talk"
    this.store = "type"
}

detection_talk.prototype.action = function(what){
  var result = what.log.match(this.checkregex)
  if (result != null) {
    what[this.store] = this.type
  }
}

detection_item.prototype = Object.create(detection_talk.prototype)

function detection_item(){
    this.name = "Item Detect"
    this.checkregex = new RegExp(/(INFO|ERROR|DEBUG|WARNING)\Witem(?= - \[)/g)
    this.type = "item"
    this.store = "type"
}

detection_info.prototype = Object.create(detection_talk.prototype)

function detection_info(){
    this.name = "Info Detect"
    this.checkregex = new RegExp(/(INFO|ERROR|DEBUG|WARNING)\Wcomm(?= - \[)/g)
    this.type = "info"
    this.store = "type"
}

detection_other.prototype = Object.create(detection_talk.prototype)

function detection_other(){
    this.name = "Other Detect"
    this.checkregex = new RegExp(/(INFO|ERROR|DEBUG|WARNING)\Wstats(?= - \[)/g)
    this.type = "others"
    this.store = "type"
}
