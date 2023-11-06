const modVersion = "0.0.1"
const modUrl = 'https://ainaradev.github.io/AES/AES.js'
const modRepository = 'https://github.com/ainaradev7/ainaradev7.github.ios'

export function InfoBeep(msg, timer = 3000) {
	ServerBeep = {
		Timer: CommonTime() + timer,
		Message: msg,
	};
}