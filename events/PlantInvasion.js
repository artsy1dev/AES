import { wearBind, breakRandomClothes } from "../utils/utilsCharacter";
import { getRandomInt } from "../utils/utils";
import { ChatRoomSendLocal, ChatRoomActionMessage } from "../utils/utilsClub";

let eventInterval;
let level = 0;
const greenColor = "#56AB56";

export function initEvent() {
    console.log("AES: A plant invasion has started");
    ChatRoomSendLocal("A plant invasion has started");
    eventInterval = setInterval(function () {
        stepEvent();
    }, 1*1000);
}

function stopEvent() {
    clearInterval(eventInterval);
}

function stepEvent() {
    // fight against the bindings by user prompt
    let eventInt = getRandomInt(51);
    //let playerInt = getRandomInt(101);
    let playerInt = 0;
    if (eventInt > playerInt) {
        process();
        level++;
        console.log("[AES] level up!");
    }
}

function process() {
// Expected output: 0, 1 or 2
    switch (level) {
        case 0:
            break;
        case 1:
            wearBind(Player, "HempRope", "ItemLegs", greenColor, 1);
            ChatRoomSendLocal("The plant wraps around your legs, twisting and tightening its grip.");
            break;
        case 2:
            wearBind(Player, "HempRope", "ItemArms", greenColor, 1);
            ChatRoomSendLocal("The vines slithered up your arms, coiling and constricting as they entangled you.");
            break;
        case 3:
            ChatRoomSendLocal("The plant's sinuous tendrils coiled around your thighs, slowly constricting and pulling you deeper into their verdant embrace.");
            break;
        default:
            break;
    }
    if (level > 10) {
        let clothesString = getRandomInt(5);
        switch (clothesString) {
            case 0:
                ChatRoomSendLocal("With a relentless determination, the voracious plants worked their way through your clothing, tearing and ripping as they sought a path to ensnare your vulnerable flesh.");
                break;
            case 1:
                ChatRoomSendLocal("The plant's tendrils, like miniature saws, sliced through your attire, leaving tattered shreds in their wake as they made their way towards your skin.");
                break;
            case 2:
                ChatRoomSendLocal("As the plant invasion intensified, your clothes became a casualty, shredded by the relentless force of nature's encroachment.");
                break;
            case 3:
                ChatRoomSendLocal("The invasive plants, fueled by an insatiable hunger, tore at your garments, exposing your skin to their invasive advance.");
                break;
            case 4:
                ChatRoomSendLocal("Inexorably, the plant's tendrils shredded your clothing, revealing the helplessness of your situation as they reached for you with unyielding determination.");
                break;
            default:
                break;
        }
        if (!CharacterIsNaked(Player)) {
            breakRandomClothes(Player);
        } else {

        }
    }
    if (level > 250) {
        stopEvent();
    }

}
