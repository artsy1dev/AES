import { wearBind, breakRandomClothes } from "../utils/utilsCharacter";
import { getRandomInt } from "../utils/utils";
import { ChatRoomSendLocal, ChatRoomActionMessage } from "../utils/utilsClub";

let eventInterval;
let level = 0;
const greenColor = "#56AB56";

const clothingBreakPrompts = [
    "The relentless vines tore through my clothing as if they were ravenous for flesh.",
    "With a ruthless determination, the sinewy vines shredded my attire into tatters.",
    "The invasive vines left me exposed, ripping my clothes to shreds with their tenacious grip.",
    "As the voracious vines ensnared me, my clothes fell victim to their insatiable appetite.",
    "My garments were no match for the relentless onslaught of the entangling vines.",
    "The vines didn't discriminate, mercilessly tearing apart both fabric and dignity.",
    "In their unyielding grasp, the vines left my clothing in tatters, exposing my vulnerability.",
    "The tenacious vines stripped away my defenses, leaving me exposed and helpless.",
    "As the plant's grip tightened, my clothes succumbed to the relentless force of nature.",
    "My attire disintegrated under the relentless assault of the encroaching vines, leaving me vulnerable to their relentless advance."
  ];

var playerBinds = {
    //hood: 0,
    head: 0,
    mouth: 0,
    mouth2: 0,
    mouth3: 0,
    neck: 0,
    arms: 0,
    legs: 0,
    feet: 0,
    boots: 0,
};

export function initEvent() {
    console.log("AES: A plant invasion has started");
    ChatRoomSendLocal("A plant invasion has started");
    eventInterval = setInterval(function () {
        stepEvent();
    }, 1*1000);
}

function stopEvent() {
    console.log("AES: A plant invasion has finished");
    ChatRoomSendLocal("A plant invasion has finished");
    clearInterval(eventInterval);
    for (var bind in playerBinds) {
        playerBinds[bind] = 0;
    }
}

function stepEvent() {
    // fight against the bindings by user prompt
    var totalSum = 0;
    for (var bind in playerBinds) {
        totalSum += playerBinds[bind];
    }
    var eventInt = getRandomInt(51) + level + totalSum;
    var playerInt = getRandomInt(101);
    if (eventInt > playerInt) {
        process();
        level++;
        console.log("[AES] level up!");
    }
    var eventInt = getRandomInt(51) + level + totalSum;
    var playerInt = getRandomInt(101);
    if (eventInt > playerInt && !CharacterIsNaked(Player)) {
        breakClothesForPlayer();
    }
}

function process() {
    var bind = selectRandomBindForPlayer();
    playerBinds[bind.bind]++;
    switch (bind.bind) {
        case 'head':
            wearBind(Player, "RopeBlindfold", "ItemHead", greenColor, 1);
            ChatRoomSendLocal("The vines, like stealthy intruders, approached your face. With a swift and deliberate move, they placed a leafy blindfold over your eyes, shrouding you in impenetrable darkness.");
            break;
        case 'mouth':
            wearBind(Player, "ClothStuffing", "ItemMouth", greenColor, 1);
            ChatRoomSendLocal("The vines swiftly moved towards your mouth, coiling tightly with a sinister intent.");
            break;
        case 'mouth2':
            wearBind(Player, "HempRope", "ItemMouth2", greenColor, 1);
            ChatRoomSendLocal("The menacing vines lunged at your mouth, their aggressive coils silencing your protests with a brutal grip.");
            break;
        case 'mouth3':
            wearBind(Player, "ClothGag", "ItemMouth3", "#357035", 1);
            ChatRoomSendLocal("The voracious vines lunged at your gaping mouth, their snakelike coils wrapping your throat in a strangling grip, rendering you speechless and breathless.");
            break;
        case 'neck':
            wearBind(Player, "NeckRope", "ItemNeck", greenColor, 1);
            ChatRoomSendLocal("The relentless vines closed in on your neck, their grip unyielding, constricting like a tightening noose.");
            break;
        case 'arms':
            wearBind(Player, "HempRope", "ItemArms", greenColor, 1);
            ChatRoomSendLocal("The vines slithered up your arms, coiling and constricting as they entangled you.");
            break;
        case 'legs':
            wearBind(Player, "HempRope", "ItemLegs", greenColor, 1);
            ChatRoomSendLocal("The plant's sinuous tendrils coiled around your thighs, slowly constricting and pulling you deeper into their verdant embrace.");
            break;
        case 'feet':
            wearBind(Player, "HempRope", "ItemFeet", greenColor, 1);
            ChatRoomSendLocal("The plant wraps around your legs, twisting and tightening its grip.");
            break;
        case 'boots':
            wearBind(Player, "ToeTie", "ItemBoots", greenColor, 1);
            ChatRoomSendLocal("The massive, sinewy vines slithered around your fingers like living ropes, binding them together with an unbreakable, natural restraint.");
            break;
        default:
            break;
    }
    /*
    switch (level) {
        case 0:
            break;
        case 1:
            wearBind(Player, "HempRope", "ItemFeet", greenColor, 1);
            ChatRoomSendLocal("The plant wraps around your legs, twisting and tightening its grip.");
            break;
        case 2:
            wearBind(Player, "HempRope", "ItemArms", greenColor, 1);
            wearBind(Player, "RopeBlindfold", "ItemHead", greenColor, 1);
            wearBind(Player, "HempRope", "ItemHands", greenColor, 1);
            wearBind(Player, "HempRope", "ToeTie", greenColor, 1);
            wearBind(Player, "HempRope", "ItemNeck", greenColor, 1);
            wearBind(Player, "HempRope", "ItemPelvis", greenColor, 1);
            wearBind(Player, "HempRope", "ItemMouth", greenColor, 1);
            wearBind(Player, "ToeTie", "ItemBoots", greenColor, 1);
            ChatRoomSendLocal("The vines slithered up your arms, coiling and constricting as they entangled you.");
            break;
        case 3:
            wearBind(Player, "HempRope", "ItemLegs", greenColor, 1);
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
    */
}

function getRandomClothingBreakPrompt() {
    const randomIndex = Math.floor(Math.random() * clothingBreakPrompts.length);
    return clothingBreakPrompts[randomIndex];
  }

function breakClothesForPlayer() {
    const randomPrompt = getRandomClothingBreakPrompt();
    ChatRoomSendLocal(randomPrompt);
    breakRandomClothes(Player);
}

function selectRandomBindForPlayer() {
    var zeroElements = [];

    // Encuentra todas las propiedades que no tienen el valor 0
    for (var bind in playerBinds) {
        if (playerBinds[bind] == 0) {
            zeroElements.push(bind);
        }
    }

    if (zeroElements.length > 0) {
        // Selecciona un elemento aleatorio de los que no tienen el valor 0
        var randomIndex = Math.floor(Math.random() * zeroElements.length);
        var randomBind = zeroElements[randomIndex];
        return { bind: randomBind, value: playerBinds[randomBind] };
    } else {
        return null; // No hay elementos que no tengan el valor 0
    }
}