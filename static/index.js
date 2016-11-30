var processes;

function getVolumes(){
	var xmlhttp = new XMLHttpRequest();
	var rep;
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState) {
			processes = xmlhttp.responseText;
		};
	};
	xmlhttp.open("GET", '/get');
	xmlhttp.send();
}

function changeVolume(processName, value){
	var data = "process=" + processName + ".exe&value=" + value;
	var xmlhttp = new XMLHttpRequest();
	var url = "/setVolume?" + data
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function muteVolume(processName, state){
	var data = "process=" + processName + ".exe&state=" + state;
	var xmlhttp = new XMLHttpRequest();
	var url = "/setMute?" + data
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

// for (var i = processes.length - 1; i >= 0; i--) {
// 	processes[i]
// }


