// Volume Control Objects

function VolumeControl(divID, header, volCallback, muteCallback) {
	this.name = divID;
	var control, upBtn, downBtn, muteBtn, progressBar, title, timer, muteState, val;

	this.place = function(x, y, position) {
		// Control Container
		position = position || "absolute";
		control = document.getElementById(this.name);
		control.style.position = "absolute";
		control.style.top = x+'px';
		control.style.left = y+'px';
		control.style.width = "90px";
		control.style.height = "160px";
		// control.style.backgroundColor = "#ffefb3";
		control.style.backgroundColor = "white";
		control.style.border = "thick solid #000000";
		control.style.borderRadius = "9px";
		control.style.zoom = "1.5";

		// UP Button
		upBtn = document.createElement("img");
		upBtn.setAttribute("id", divID+"UP");
		upBtn.src = "/static/img/up.png";
		upBtn.style.position = "relative";
		upBtn.style.width = "50px";
		upBtn.style.top = "25px";
		upBtn.style.left = "5px";
		control.appendChild(upBtn);

		// DOWN Button
		downBtn = document.createElement("img");
		downBtn.setAttribute("id", divID+"DOWN");
		downBtn.src = "/static/img/down.png";
		downBtn.style.position = "relative";
		downBtn.style.width = "50px";
		downBtn.style.top = "23px";
		downBtn.style.left = "5px";
		control.appendChild(downBtn);

		// MUTE Button
		muteBtn = document.createElement("img");
		muteBtn.setAttribute("id", divID+"MUTE");
		muteBtn.src = "/static/img/unmute.png";
		muteBtn.style.position = "relative";
		muteBtn.style.top = "52px";
		muteBtn.style.left = "-20px";
		muteBtn.style.width = "30px";
		control.appendChild(muteBtn);

		// PROGRESS Bar
		progressBar = document.createElement("PROGRESS");
		progressBar.setAttribute("id", divID+"Bar");
		progressBar.setAttribute("value", "0");
		progressBar.setAttribute("min", "0");
		progressBar.setAttribute("max", "100");	
		progressBar.style.cssText = "position: relative; top: -44px; left: 22px; width:100px; height:14px; border:1; border-radius:9px; -webkit-transform: rotate(-90deg);";
		control.appendChild(progressBar);

		// TITLE
		title = document.createElement("LABEL");
		title.setAttribute("id", divID+"TITLE");
		var text = document.createTextNode(header);
		title.appendChild(text);
		title.style.position = "relative";
		title.style.top = "3px";
		title.style.fontWeight = "bold";		
		title.style.cssText = "margin-left: auto; margin-right: auto;"

		center = document.createElement("center");
		center.appendChild(title)

		titleBox = document.createElement("div");
		titleBox.setAttribute("id", divID+"TITLEBOX");
		titleBox.style.position = "absolute";
		titleBox.style.top = "-4px";
		titleBox.style.left = "-4px";
		titleBox.style.width = "100%";
		titleBox.style.border = "thick solid rgba(0,0,0,0)"
		titleBox.style.borderRadius = "9px";
		titleBox.appendChild(center);

		control.appendChild(titleBox);

		listen();
	};

	this.set = function (value, mute) {
		val = value;
		console.log("Set " + divID + " to: " + val);
		progressBar.value = val;
		if (mute == 1) {
			muteState = 1;
			progressBar.value = 0;
			muteBtn.src = "/static/img/mute.png";
		} else {
			muteState = 0;
		};
	};

	var hold = function (btn) {
		timer = setInterval(function () {
			if (btn == 'up') {
				if (val+1 <= 100) { // If value to be set is less than or equal to 100
					if (muteState == 1) {muteCallback(0); muteBtn.click(); muteState = 0;};
					muteBtn.src = "/static/img/unmute.png";
					progressBar.value = val+=1;
					volCallback(divID, val);					
				};
			};
			if (btn == 'down') {
				if (val-1 >= 0){ // If value to be set is greater than or equal to 0
					if (muteState == 1) {muteCallback(0); muteBtn.click(); muteState = 0;};
					muteBtn.src = "/static/img/unmute.png";
					progressBar.value = val-=1;
					volCallback(divID, val);					
				};
			};
			if (val-1 < 0 || val+1 > 100) { // If value to be set is less than zero or greater than 100, stop.
 				console.log('limit hit: ' + val);
				clearInterval(timer);
			};
		}, 100);
	};

	// EVENT LISTENERS
	var listen = function () {
		// UP
		upBtn.addEventListener("mousedown", function () {
			upBtn.src = "../static/img/upPressed.png";
			//console.log("up pressed");
			hold('up');
		});
		upBtn.addEventListener("mouseup", function () {
			//console.log("up released");
			upBtn.src = "../static/img/up.png";
			clearInterval(timer);
		});
		upBtn.addEventListener("dragstart", function(e) {
    		var img = document.createElement("img");
    		img.src = "../static/blank.png";
    		e.dataTransfer.setDragImage(img, 0, 0);
		}, false);
		upBtn.addEventListener("dragend", function () {
			upBtn.src = "../static/img/up.png";
			clearInterval(timer);
		});

		// DOWN
		downBtn.addEventListener("mousedown", function () {
			//console.log("down pressed");
			downBtn.src = "../static/img/downPressed.png";
			hold('down');
		});
		downBtn.addEventListener("mouseup", function () {
			//console.log("down released");
			downBtn.src = "../static/img/down.png";
			clearInterval(timer);
		});
		downBtn.addEventListener("dragstart", function(e) {
    		var img = document.createElement("img");
    		img.src = "../static/blank.png";
    		e.dataTransfer.setDragImage(img, 0, 0);
		}, false);
		downBtn.addEventListener("dragend", function () {
			downBtn.src = "../static/img/down.png";
			clearInterval(timer);
		});

		// MUTE
		muteBtn.addEventListener("click", function () {
			if (muteState == 1) { // Unmuting
				progressBar.value = val;
				muteBtn.src = "/static/img/unmute.png";
				muteCallback(divID, 0);
				muteState = 0;
				//console.log(divID + ': unmuted');
			} else if (muteState == 0) { // Muting
				progressBar.value = 0;
				muteBtn.src = "/static/img/mute.png";
				muteCallback(divID, 1);
				muteState = 1;
				//console.log(divID + ': muted');
			};
		});

		muteBtn.addEventListener("dragstart", function(e) {
    		var img = document.createElement("img");
    		img.src = "../static/blank.png";
    		e.dataTransfer.setDragImage(img, 0, 0);
		}, false);

		muteBtn.addEventListener("dragend", function () {
			if (muteState == 1) { // Unmuting
				progressBar.value = val;
				muteBtn.src = "/static/img/unmute.png";
				muteCallback(divID, 0);
				muteState = 0;
				//console.log(divID + ': unmuted');
			} else if (muteState == 0) { // Muting
				progressBar.value = 0;
				muteBtn.src = "/static/img/mute.png";
				muteCallback(divID, 1);
				muteState = 1;
				//console.log(divID + ': muted');
			};
		});		
	};

};