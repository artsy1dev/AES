import bcModSDK from "bondage-club-mod-sdk";
import { isObject } from "../utils/utils";

const modApi = bcModSDK.registerMod({
	name: 'AES',
	fullName: 'Ainaras Event Mod',
	version: '0.01',
	// Optional - Link to the source code of the mod
	repository: 'https://github.com/Ainaradev7/AES',
});

export function hookFunction(target, priority, hook, module = null) {
    return hookFunctionSpecific(target, priority, hook, module);
}

export function hookFunctionSpecific(target, priority, hook, module = null) {
    /*
    const data = initPatchableFunction(target);

    if (data.hooks.some(h => h.hook === hook)) {
        console.error(`BCX: Duplicate hook for "${target}"`, hook);
        return;
    }
    */

    const removeCallback = modApi.hookFunction(target, priority, hook);
    /*
    data.hooks.push({
        hook,
        priority,
        module,
        removeCallback,
    });

    data.hooks.sort((a, b) => b.priority - a.priority);
    */
}

export function sendHiddenMessage(type, message, Target = null) {
    //if (!ServerPlayerIsInChatRoom() || firstTimeInit)
    //    return;
    /*
    ServerSend("ChatRoomChat", {
        Content: "AESMsg",
        Type: "Hidden",
        Target,
        Dictionary: { type, message },
    });
    */
    const Dictionary = new DictionaryBuilder()
        .sourceCharacter(Player)
        .destinationCharacterName(Target)
        .build();

    ServerSend("ChatRoomChat", {
        Content: "AESMsg",
        Type: "Hidden",
        Dictionary
    });
}
	

hookFunction("ChatRoomMessage", 10, (args, next) => {
    const data = args[0];
    if (data?.Type === "Hidden" && data.Content === "AESMsg" && typeof data.Sender === "number") {
        console.log("OWN MESSAGE ${data.sender} and ${message} from " + data.Sender)
        if (data.Sender === Player.MemberNumber)
            return;
        /*
        if (!isObject(data.Dictionary)) {
            console.warn("AES: Hidden message no Dictionary", data);
            return;
        }*/

        const { type, message } = data.Dictionary;

        if (typeof type === "string") {
            console.log("`${data.sender} and ${message} from " + data.Sender)
            /*
            const handler = hiddenMessageHandlers.get(type);
            if (handler === undefined) {
                console.warn("BCX: Hidden message no handler", data.Sender, type, message);
            } else {
                
                handler(data.Sender, message);
            
            }
            */
        }

        return;
    }
    return next(args);
});