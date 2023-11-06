import { wearBind, breakRandomClothes } from "../utils/utilsCharacter";
import { getRandomInt } from "../utils/utils";

let eventInterval;
let level = 0;
const greenColor = "#56AB56";

export function initEvent() {
    console.log("AES: A plant invasion has started")
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
            break;
        case 2:
            wearBind(Player, "HempRope", "ItemArms", greenColor, 1);
            break;
        case 3:
            break;
        default:
            break;
    }
    if (level > 10) {
        breakRandomClothes(Player);
    }
    if (level > 250) {
        stopEvent();
    }

}
