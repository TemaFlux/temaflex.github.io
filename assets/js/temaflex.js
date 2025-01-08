function muteCheck() {
	new YouTubeToHtml5({
		attribute: 'youtube',
		selector: 'video[youtube]',
		withAudio: true // Filter streams to those with audio channels
	});

	mute(false);
}

async function mute(smoothly = true) {
	await changeVolume(video.volume > 0 ? 0 : 0.2, smoothly);
}

async function changeVolume(value, smoothly = true) {
	if (typeof video != "undefined") {
		var currentlyVolume = video.volume;
		var isMute = currentlyVolume > value;
		var classList = document.getElementById("mute").classList;

		if (smoothly) {
			if (isMute) {
				while (typeof video != "undefined" && video.volume != value) {
					await sleep(50);
					var nVolume = toFixed(video.volume - 0.01);
					var precent = (video.volume = nVolume > value ? nVolume : value) / currentlyVolume;

					if (precent <= 0) {
						classList.remove("fa-volume-down");
						classList.add("fa-volume-off");
					} else if (precent < 0.5) {
						classList.remove("fa-volume-up");
						classList.add("fa-volume-down");
					}
				}
			} else {
				while (typeof video != "undefined" && video.volume != value) {
					await sleep(50);
					var nVolume = toFixed(video.volume + 0.01);
					var precent = (video.volume = nVolume > value ? value : nVolume) / value;

					if (precent > 0.5) {
						classList.remove("fa-volume-down");
						classList.add("fa-volume-up");
					} else if (precent > 0) {
						classList.remove("fa-volume-off");
						classList.add("fa-volume-down");
					}
				}
			}
		} else video.volume = value;

		classList.remove("fa-volume-" + (isMute ? "up" : "down"));
		classList.add("fa-volume-" + (isMute ? "down" : "up"));
	}
}

function toFixed(value) { return value === +value && value !== (value|0) ? value : parseFloat(value.toFixed(1)); }
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function rand(opacity = false) {
    if (statusBut) {
      scrollOne["scrollAmount"] = 500;
      scrollTwo["scrollAmount"] = 500;

			httpGetAsync("/beauty.php?r="+document.getElementById("video")["youtube"], function(url) {
				video["src"] = "";
				video["youtube"] = url;
				document.getElementById("video").setAttribute("src", "");
				document.getElementById("video").setAttribute("youtube", url);
				new YouTubeToHtml5({
					attribute: 'youtube',
					selector: 'video[youtube]',
					withAudio: true // Filter streams to those with audio channels
				});

				video["oncanplay"] = function() {
					if (typeof audio != "undefined") audio["play"]();
					scrollOne["scrollAmount"] = 100;
					scrollTwo["scrollAmount"] = 100;
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
} statusBut = true;

function randomInt(min, max, n_repeat = rand) {
    var number;
    while (true) {
        if ((number = Math["floor"](Math["random"]() * (max - min + 1)) + min) != n_repeat) {
            return number;
        }
    }
} randCashe = randomInt(1, max)

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
	if (document.getElementById("clock") != null)	document.getElementById("clock").innerHTML = (meridiem  + " " + hours + ":" + minutes);
	if (document.getElementById("date") != null) document.getElementById("date").innerHTML = (monthNames[month] + " " + day + " " + year);
} setInterval('clock()', 1);

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
