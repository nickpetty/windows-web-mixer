// API Calls

var apiServer = "http://127.0.0.1:9191/api/"
var xmlhttp = new XMLHttpRequest();

function changeVolume(gainObject, value) {
	var xmlhttp = new XMLHttpRequest();
 	xmlhttp.open("GET", apiServer + 'setVol/' + gainObject + '/' + value, true);
 	xmlhttp.send();
};

function getVolume(gainObject, cb) {
	var xmlhttp = new XMLHttpRequest();
	var rep;
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState) {
			cb(xmlhttp.responseText);
		};
	};
	xmlhttp.open("GET", apiServer + 'getVol/' + gainObject);
	xmlhttp.send();
};

function muteVolume(gainObject, state) {
	var xmlhttp = new XMLHttpRequest();
 	xmlhttp.open("GET", apiServer + 'setMute/' + gainObject + '/' + state, true);
 	xmlhttp.send();
};

function dtv(ch) {
	var xmlhttp = new XMLHttpRequest();
 	xmlhttp.open("GET", apiServer + 'dtv/' + ch, true);
 	xmlhttp.send();
}
