info = {
	modules: []
}
talk = {
	modules: []
}
others = {
	modules: []
}
item = {
	modules: []
}


aedi = {
	filtermode: false,
	uniquecounter: 0,
	id: {},
	info: {
		server: ["Computer1", "Computer2", "External Server1", "External Server2", "Internal Server1"]
	},
	modules: {
		basic: [],
		list: [],
		detection: [],
		detect_info: [],
		detect_item: [],
		detect_talk: [],
		detect_others: [],
	},
	database: {
		active: {},
		inactive: {},
		list: {},
	},
	localdb: {
		characters: {},
		items: [],
		ter: null,
		entity: {},
	},
	log: {
		index: 0,
		add: function(value) {
			value2 = value
			InputAreaText.value = ""
			itemhack = new RegExp(/(INFO|ERROR|DEBUG|WARNING)\W(item|comm)/g)
			createnewlog(value.split("\n"))
			this.create();
		},
		input: [],
		output: [],
		create: function() {
			this.reload();
			$("[id^=logid]").each(function(index){
				$(this).on("click", function(){
				if (this.checked == true) {
            		    for (var i = aedi.log.input.length - 1; i >= 0; i--) {
	            		   if (aedi.log.input[i].logid == this.id.substring(5)) {
	            		   	aedi.log.input[i].selected = true
	            		   }
            		    		
            		    }
            		 } else {
            		    for (var i = aedi.log.input.length - 1; i >= 0; i--) {
	            		   if (aedi.log.input[i].logid == this.id.substring(5)) {
	            		   	aedi.log.input[i].selected = false
	            		   }
            		    		
            		    }
            		 }
            		 refr();
						})
			})
		},
		reload: function() {
			LoadedLogAreaTable.value = ""
			var content = ""
			for (var i = this.input.length - 1; i >= 0; i--) {
				cut = this.input[i].name
				state = this.input[i].selected
				content += "<input id='logid"+this.input[i].logid+"' type='checkbox' checked="+state+"></input>" + cut + "<button onclick=\"customfilter = []\" id=\"deletelog"+ i +"\">X</button>" + "</br>";

			}
			LoadedLogAreaTable.innerHTML = content
			for (var i = this.input.length - 1; i >= 0; i--) {
			$("#deletelog" + i).on("click", function () {
					aedi.log.delete(this.id.substring(9))
					aedi.log.reload()
					refr()
				});
			}
			
		},
		delete: function(who){
			this.input.splice(who, 1)
			this.reload()
		},
	},
};
function call(){
	taketime = new Date
    console.log("Taking Text")
    aedi.log.add(InputAreaText.value)
    det();
   	refr();
    taketime2 = new Date
}

function refr(){
	var biglog = [] 
    console.log("Spitting out Text")
    for (var i = aedi.log.input.length - 1; i >= 0; i--) {
    	if (aedi.log.input[i].selected == true) {
    		biglog.push(aedi.log.input[i])
    	}
    }
    filtering(biglog)
    customfiltering(biglog)
    output(biglog)

}
bosskey = false
function det(){
	console.log("Detect everything which isn't detected")
	for (var i = aedi.log.input.length - 1; i >= 0; i--) {
		if (aedi.log.input[i].detected == false) {
			for (var x = aedi.log.input[i].log.length - 1; x >= 0; x--) {
				detect(aedi.log.input[i].log[x])
			}
			gather(aedi.log.input[i])
			aedi.log.input[i].detected = true
			gatherent(aedi.log.input[i])
		}
	}
}

function setcookie(){
	window.localStorage.firsttime = false
}

function deletecookie(){
	window.localStorage.removeItem("firsttime")
}
function hide(){
	if (bosskey == true) {
		blank.hidden ^= true
	}
}

function keydown(e){
	if (e.keyCode == 66) {
		bosskey = true
	}
}
function keyup(e){
	if (e.keyCode == 66) {
		bosskey = false
	}
}

function tutorial(state){
	if (state == 0) {
		tutstate -= 1
	} 
	if (state == 1) {
		tutstate += 1
	}
	tutorialstep(tutstate);
}

function tutorialstep(step){
	var blinking = []
	blinking = document.getElementsByClassName("flash");
	while (blinking.length > 0){
		blinking[0].classList.remove("flash")
		blinking = document.getElementsByClassName("flash");
	}
	blinking2 = []
	 switch(step) {
	 	  case 0:
          tutorialtext.innerHTML = "Welcome to the AEDI tutorial!</br></br>I am a Moogle and I am here to help you with AEDI.</br>This tutorial is designed to provide explanation on each UI-Element."
          tutorialprevious.disabled = true
          break;
          case 1:
          tutorialprevious.disabled = false
          tutorialtext.innerHTML = "<i> Filters</i></br>Show or hide specific logs."
          blinking2.push(Talkoutside)
          blinking2.push(Itemoutside)
          blinking2.push(Infooutside)
          blinking2.push(Othersoutside)
          break;
          case 2:
          tutorialtext.innerHTML = "<i>Custom Filters</i></br>Displays only logs that contain the set word, ID or number.</br>Click + and - buttons to add or remove custom filters."
          blinking2.push(Outercustomfilter)
          break;
          case 3:
          tutorialtext.innerHTML = "<i>Loaded Logs</i></br>You can show or hide Logs by clicking on the checkbox, or outright delete them with the X button."
          blinking2.push(Outerloadedlogs)
          break;
          case 4:
          tutorialtext.innerHTML = "<i>Time</i></br>You can easily change between GMT/BST, JST or PDT/PST. </br>By default, the time is set to GMT/BST, but you can also change the Time easily back to the Japan Time. All Time will update automatically."
          blinking2.push(Outertime)
          break;
          case 5:
          tutorialtext.innerHTML = "<i>Debug Options</i></br>Clicking on Reset Storage also allows you to do the Tutorial again - if you ever need a refresher."
          blinking2.push(Outedebug)
          break;
          case 6:
          tutorialtext.innerHTML = "<i>Log Input</i></br>This is where you will paste your logs.</br>It does not matter if you copy the whole page or if you just select the Log Area. As long as you paste the logs and press on the 'Send' button, AEDI should be able to parse your logs."
          blinking2.push(Outerloginput)
          break;
		  case 7:
          tutorialtext.innerHTML = "<i>User Filter</i></br>This area allows you to filter for a specific User. </br>If you click on a User, only their actions or actions affecting them are shown."
          blinking2.push(Outercharacterfilter)
          break;
          case 8:
          tutorialtext.innerHTML = "<i>Log Output</i></br>This Area will show the parsed logs and allows you to highlight them by clicking on them.</br>A highlighted log will display extra information in the Programs, More Information and Original Log field. All of them will be explained later."
          blinking2.push(document.body)
          break;
          case 9:
          tutorialtext.innerHTML = "<i>Userlist</i></br>This area displays all User names and IDs which have been converted since you opened AEDI. Please keep in mind that this list will be cleared if you close the tab, reload AEDI or click on the Reset Chara's button."
          blinking2.push(Outercharacterlist)
          break;
          case 10:
          tutorialtext.innerHTML = "<i>Programs</i></br>This area only works when a log is highlighted and shows items that appeared in this log. The shown items are hyperlinks which bring you to external websites in a new tab."
          blinking2.push(Outeritemlist)
          break;      
		  case 11:
          tutorialtext.innerHTML = "<i>More Information</i></br>This area only works when a log is highlighted and shows all information and IDs which the log provides.</br>This is useful if you need a certain ID or further information."
          blinking2.push(Outermoreinformation)
          break;       
          case 12:
          tutorialtext.innerHTML = "<i>Computer Finder</i></br>The Computer Finder only works if at least 2 info logs from different users are loaded.</br>This will quickly show if two users were in the same shell, when and on which computer. The time also adjusts according to the time selected in the Time Tool."
          blinking2.push(Outerserverfinder)
		  tutorialnext.innerHTML = "Next"
          break;            
          case 13:
          tutorialtext.innerHTML = "<i>Original Log</i></br>The Original Log only displays information if a log is highlighted and shows the original log without any change. This concludes our tutorial. Happy Parsing and bye bye, Kupo!"
          blinking2.push(Outeroriginallog)
          tutorialnext.innerHTML = "End"
          break;             
          case 14:
          FirstTimeUse.hidden = true; 
          tutorial2.hidden = true
          window.localStorage.firsttime = "finished"
          break;            
        }

    for (var i = 0; i < blinking2.length; i++) {
    	blinking2[i].classList.add("flash")
    }
}

tutstate = 0

$(document).ready(function() {
if (window.localStorage.firsttime != "finished") {tutorialstep(0)} else {FirstTimeUse.hidden = true;tutorial2.hidden = true}
document.addEventListener("keydown",keydown,false);
document.addEventListener("keyup",keyup,false);
console.log("Loaded");
createmoduleslist();
createdetectionlist();
createdetect();

createparsermodules_info();
createparsermodules_others();
createparsermodules_talk();
createparsermodules_item();
for (var i = talk.modules.length - 1; i >= 0; i--) {
	filter[talk.modules[i].result] = true
}
for (var i = item.modules.length - 1; i >= 0; i--) {
	filter[item.modules[i].result] = true
}
for (var i = others.modules.length - 1; i >= 0; i--) {
	filter[others.modules[i].result] = true
}
for (var i = info.modules.length - 1; i >= 0; i--) {
	filter[info.modules[i].result] = true
}
createfilterui();
})