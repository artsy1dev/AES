export const mo_hookToChat = () => {
    TTSChatRoomMessageHandlers.forEach((h) => ChatRoomRegisterMessageHandler(h));

    const modSdk = getMoSDK();

    modSdk.hookFunction("ChatRoomMessage", 0, (args: any[], next) => {
        const newArgs = processHooks([mo_hookFuncs.ChatRoomMsgMorse], args);
        return next(newArgs);
    });

    modSdk.hookFunction("ServerAccountBeep", 0, (args: any[], next) => {
        const newArgs = processHooks([mo_hookFuncs.BeepMorse, beepVoiceToySync], args);
        return next(newArgs);
    });

    //Toy updates by others
    modSdk.hookFunction("ChatRoomSyncItem", 0, (args: [{ Source: number; Item: ItemUpdated }], next) => {
        const newArgs = processHooks([mo_hookFuncs.RoomItemSync], args);
        return next(newArgs);
    });
    //ATM only needed for self toggled
    modSdk.hookFunction("ServerSend", 0, (args: [string, ItemUpdated | ServerAccountBeepRequest], next) => {
        const newArgs = processHooks([mo_hookFuncs.SelfItemSync], args);
        return next(newArgs);
    });

    //used only for the TTS-ICON ('-') drawing
    modSdk.hookFunction("ChatRoomDrawCharacterOverlay", HOOK_PRIORITIES.AddBehaviour, (args, next) => {
        const ret = next(args);
        if (getConfigValue(CONF_PROPS.SHOW_TTS_ICON)) {
            iconHook(args);
        }
        return ret;
    });
    uniRemoteMenuOverrides(modSdk);
};
