import { isObject } from "./utils/utils";
import { InfoBeep } from "./utils/utilsClub";
import { createButton } from "./utils/utilsWeb"
import { hookFunction } from "./modules/messaging";
import { initEvent } from "./events/PlantInvasion";


function initAES() {
	console.log("AES: Initiated");
	if (CurrentScreen == null || CurrentScreen === "Login") {
		hookFunction("LoginResponse", 0, (args, next) => {
			console.debug("AES: Init LoginResponse caught", args);
			next(args);
			const response = args[0];
			if (isObject(response) && typeof response.Name === "string" && typeof response.AccountName === "string") {
				// loginInit(args[0]);
			}
		});
		InfoBeep("AES Ready!");
		console.log("[AES] initiated");
		createButton(
			() => {
				initEvent();
		})
	} else {
		console.debug("BCX: Already logged in, init");
		//init();
	}
}

initAES();