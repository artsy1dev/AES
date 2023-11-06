
export function InfoBeep(msg, timer = 3000) {
	ServerBeep = {
		Timer: CommonTime() + timer,
		Message: msg,
	};
}

export function ChatRoomActionMessage(msg, target = null, dictionary = []) {
	if (!msg) return;
	ServerSend("ChatRoomChat", {
		Content: "BCX_PLAYER_CUSTOM_DIALOG",
		Type: "Action",
		Target: target ?? undefined,
		Dictionary: [
			{ Tag: "MISSING PLAYER DIALOG: BCX_PLAYER_CUSTOM_DIALOG", Text: msg },
			...dictionary,
		],
	});
}

export function ChatRoomSendLocal(msg, timeout, sender) {
	// Adds the message and scrolls down unless the user has scrolled up
	const div = document.createElement("div");
	div.setAttribute("class", "ChatMessage ChatMessageLocalMessage");
	div.setAttribute("data-time", ChatRoomCurrentTime());
	div.setAttribute("data-sender", `${sender ?? Player.MemberNumber ?? 0}`);
	div.style.background = "#6e6eff54";
	div.style.margin = "0.15em 0";

	if (typeof msg === "string")
		div.innerText = "[AES] " + msg;
	else
		div.appendChild("[AES] " + msg);

	//if (timeout) BCX_setTimeout(() => div.remove(), timeout);

	// Returns the focus on the chat box
	const Refocus = document.activeElement?.id === "InputChat";
	const ShouldScrollDown = ElementIsScrolledToEnd("TextAreaChatLog");
	const ChatLog = document.getElementById("TextAreaChatLog");
	if (ChatLog != null) {
		ChatLog.appendChild(div);
		if (ShouldScrollDown) ElementScrollToEnd("TextAreaChatLog");
		if (Refocus) ElementFocus("InputChat");
		return div;
	}
	return null;
}