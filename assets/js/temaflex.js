//OSNOVNOE BEZ NEGO NE KAK A TI IDI V PEN
//by TemaFlux.tk
function muteCheck() {
	new YouTubeToHtml5({
		attribute: 'youtube',
		selector: 'video[youtube]',
		withAudio: true // Filter streams to those with audio channels
	});
    if ($["session"]["get"]("mute") !== "false") {
		if (typeof audio != "undefined")
			audio["volume"] = 0;
		if (typeof video != "undefined")
			video["volume"] = 0;
    } else {
		awvolume(false);
        // $("pre")["removeClass"]("fa-volume-off")["addClass"]("fa-volume-up")
    }
}
function mute() {
	/*if (typeof audio != "undefined") {
		if (audio["volume"] >= 0.9) {
			awvolume(true);
			// $("pre")["removeClass"]("fa-volume-up")["addClass"]("fa-volume-off");
			for (var sound = 0.9; sound > 0; sound = sound - 0.1) {
				sleep(39);
				console.log("Volume: " + sound);
				audio["volume"] = sound;
			};
			$["session"]["set"]("mute", "true")
		} else {
			awvolume(false);
			// $("pre")["removeClass"]("fa-volume-off")["addClass"]("fa-volume-up");
			for (var sound = 0; sound < 1; sound = sound + 0.1) {
				console.log("Volume: " + sound);
				audio["volume"] = sound;
				sleep(39);
			};
			$["session"]["set"]("mute", "false")
		};
	}*/
	if (typeof video != "undefined") {
		if (video["volume"] >= 0.9) {
			awvolume(true);
			// $("pre")["removeClass"]("fa-volume-up")["addClass"]("fa-volume-off");
			for (var sound = 0.9; sound > 0; sound = sound - 0.1) {
				sleep(39);
				video["volume"] = sound;
			};
			$["session"]["set"]("mute", "true")
		} else {
			awvolume(false);
			// $("pre")["removeClass"]("fa-volume-off")["addClass"]("fa-volume-up");
			for (var sound = 0; sound < 1; sound = sound + 0.1) {
				video["volume"] = sound;
				sleep(39);
			};
			$["session"]["set"]("mute", "false")
		};
	}
    delete sound
}

function sleep(time) {
    time += new Date()["getTime"]();
    while (new Date() < time) {}
}

function awvolume(mute = false) {
	if (mute) {
		document.getElementById("mute").classList.remove("fa-volume-up");
		document.getElementById("mute").classList.add("fa-volume-off");
	}
	else {
		document.getElementById("mute").classList.remove("fa-volume-off");
		document.getElementById("mute").classList.add("fa-volume-up");
	}
}

function rand(muted = false, rand = 0, opacity = false) {
    if (statusBut) {
        if (muted == false) {
            $["session"]["set"]("mute", "false");
			awvolume(false);
            // $("pre")["removeClass"]("fa-volume-off")["addClass"]("fa-volume-up")
		}
		else {
			$["session"]["set"]("mute", "true");
			awvolume(true);
			// $("pre")["removeClass"]("fa-volume-up")["addClass"]("fa-volume-off");
		}
        scrollOne["scrollAmount"] = 500;
        scrollTwo["scrollAmount"] = 500;
        /*if (rand == 0)
            rand = randCashe
        if (opacity)
            rand = video["src"]["split"]("y/")[1]["split"](".")[0]
		$["session"]["set"]("id", rand);
		
        var src_video = "https://google.temaflex.tk/beauty/" + rand + ".mp4";
        var src_audio = "https://google.temaflex.tk/beauty/" + rand + ".mp3";
		video["src"] = src_video;
		if (typeof audio != "undefined") {
			for (var sound = 0.9; sound > 0; sound = sound - 0.1) {
				sleep(39);
				audio["volume"] = sound
			};
			
			audio["volume"] = 1;
			audio["src"] = src_audio;
		}*/

		httpGetAsync("/beauty.php?r="+document.getElementById("video")["youtube"], function(url) {
			if (typeof video != "undefined") {
				for (var sound = 0.9; sound > 0; sound = sound - 0.1) {
					sleep(39);
					video["volume"] = sound;
				};
			}
			video["src"] = "";
			video["youtube"] = url;
			document.getElementById("video").setAttribute("src", "");
			document.getElementById("video").setAttribute("youtube", url);
			new YouTubeToHtml5({
				attribute: 'youtube',
				selector: 'video[youtube]',
				withAudio: true // Filter streams to those with audio channels
			});
			video["volume"] = 1;

			video["oncanplay"] = function() {
				if (typeof audio != "undefined") audio["play"]();
				scrollOne["scrollAmount"] = 100;
				scrollTwo["scrollAmount"] = 100;
				/*randCashe = randomInt(1, max, rand);
				preLoadVideo["src"] = "https://google.temaflex.tk/beauty/" + randCashe + ".mp4";
				preLoadVideo["oncanplay"] = function() {
					stop()
				};
				preLoadAudio["src"] = "https://google.temaflex.tk/beauty/" + randCashe + ".mp3";*/
			};
	
			if (!opacity) {
				document["getElementById"]("rand")["style"]["opacity"] = 0.1;
				document["getElementById"]("rand")["style"]["cursor"] = "no-drop";
				statusBut = false;
				setTimeout(function() {
					document["getElementById"]("rand")["style"]["cursor"] = "";
					document["getElementById"]("rand")["style"]["opacity"] = 1;
					statusBut = true
				}, 3000)
			}
		});
    }
}
statusBut = true;

function randomInt(min, max, n_repeat = rand) {
    var number;
    while (true) {
        if ((number = Math["floor"](Math["random"]() * (max - min + 1)) + min) != n_repeat) {
            return number;
        }
    }
}
randCashe = randomInt(1, max)

function clock() {
	//Save the times in variables
	var meridiem = "";
	var today = new Date();
	var hours = today.getHours();
	var minutes = today.getMinutes();
	var seconds = today.getSeconds();
	var month = today.getMonth();
	var day = today.getDate();
	var year = today.getFullYear();
	var monthNames = ["JAN.", "FEB.", "MAR.", "APR.", "MAY.", "JUN.", "JUL.", "AUG.", "SEP.", "OCT.", "NOV.", "DEC."];
	//Set the AM or PM time
	if (hours >= 12) meridiem = "PM";
	else meridiem = "AM";
	//convert hours to 12 hour format and put 0 in front
	if (hours > 12) hours = hours - 12;
	else if (hours === 0) hours = 12;
	//Put 0 in front of single digit minutes and seconds
	if (minutes < 10) minutes = "0" + minutes;
	else minutes = minutes;
	if (seconds < 10) seconds = "0" + seconds;
	else seconds = seconds;
	if (document.getElementById("clock") != null)
		document.getElementById("clock").innerHTML = (meridiem  + " " + hours + ":" + minutes);
	if (document.getElementById("date") != null)
		document.getElementById("date").innerHTML = (monthNames[month] + " " + day + " " + year);
}
setInterval('clock()', 1);

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
