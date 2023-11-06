import bcModSDK from "bondage-club-mod-sdk";
import { InfoBeep } from "./utils/utilsClub";
import { initEvent } from "./events/PlantInvasion";

const modApi = bcModSDK.registerMod({
	name: 'AES',
	fullName: 'Ainaras Event Mod',
	version: '0.01',
	// Optional - Link to the source code of the mod
	repository: 'https://github.com/Ainaradev7/AES',
});

function initAES() {
	console.log("AES: Initiated");
	InfoBeep("AES: Initiated");
	initEvent();
}

initAES();