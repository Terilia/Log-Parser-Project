itemlookup = function(item) {
    if (aedi.localdb.item[item] != undefined) {
    	return aedi.localdb.item[item]+ "#" +item
    } else
    {
      if (aedi.localdb.item[item] == undefined && aedi.localdb.item[item - 10000] != undefined) {
        return aedi.localdb.item[item - 10000] + "HQ#" +(item - 10000)
      } else {
      	if (aedi.localdb.item[item] == undefined && aedi.localdb.item[item - 100000] != undefined) {
        	return aedi.localdb.item[item - 100000] + "HQ#" +(item - 100000)
    		}
    	if (aedi.localdb.item[item] == undefined && aedi.localdb.item[item - 1000000] != undefined) {
        	return aedi.localdb.item[item - 1000000] + "HQ#" +(item - 1000000)
    		}
      	}
    }
    return item
}

questlookup = function(item) {
  return aedi.localdb.quest[item]
}