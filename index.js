import bcModSDK from "bondage-club-mod-sdk"; 

const modApi = bcModSDK.registerMod({
	name: 'MyExMod',
	fullName: 'My example mod',
	version: '1.0.0',
	// Optional - Link to the source code of the mod
	repository: 'https://github.com/Jomshir98/bondage-club-mod-sdk',
});


function initWait() {
	console.debug("AES: Init");
	/*
	if (CurrentScreen == null || CurrentScreen === "Login") {
		hookFunction("LoginResponse", 0, (args, next) => {
			console.debug("BCX: Init LoginResponse caught", args);
			next(args);
			const response = args[0];
			if (isObject(response) && typeof response.Name === "string" && typeof response.AccountName === "string") {
				loginInit(args[0]);
			}
		});
		InfoBeep(`BCX Ready!`);
		console.log(`BCX Ready!`);
	} else {
		console.debug("BCX: Already logged in, init");
		init();
	}
	*/
}

initWait()