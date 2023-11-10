import { wearBind, breakRandomClothes } from "../utils/utilsCharacter";
import { getRandomInt } from "../utils/utils";
import { ChatRoomSendLocal, UpdateCharacters } from "../utils/utilsClub";
import { sendHiddenMessage } from "../modules/messaging";

let eventInterval;
let eventLevel = 0;
const greenColor = "#56AB56";
const stepsPerSecond = 3;

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
    pelvis: 0,
    torso: 0,
    torso2: 0,
    legs: 0,
    feet: 0,
    boots: 0,
};

export function initEvent() {
    console.log("AES: A plant invasion has started");
    ChatRoomSendLocal("A plant invasion has started");
    sendHiddenMessage("PlantEvent", "test", Player);
    sendHiddenMessage("PlantEvent", "test", Player);
    sendHiddenMessage("PlantEvent", "test", Player);
    eventInterval = setInterval(function () {
        stepEvent();
    }, stepsPerSecond*1000);
}

function stopEvent() {
    console.log("AES: A plant invasion has finished");
    ChatRoomSendLocal("A plant invasion has finished");
    clearInterval(eventInterval);
    for (var bind in playerBinds) {
        playerBinds[bind] = 0;
    }
    sendHiddenMessage("PlantEvent", "end", Player);
}

function stepEvent() {
    // fight against the bindings by user prompt
    var totalSum = 0;
    for (var bind in playerBinds) {
        totalSum += playerBinds[bind];
    }
    eventLevel++;
    let eventInt = getRandomInt(51) + eventLevel * 5 + totalSum;
      ChatRoomSendLocalAction("Some vines are approaching to you, do you want to fight back?", "#6e6eff54", null,
        () => {
            eventMove(eventInt, getRandomInt(101));
        },
        () => {
          // Acción de "Rendirse"
            eventMove(eventInt, 0);
            console.log("Rendirse");
        },
        stepsPerSecond*1000 // Eliminar automáticamente después de 5 segundos
      );
      sendHiddenMessage("PlantEvent", "test", Player);
}

function eventMove(eventInt, playerInt) {
    var actionString = "You fought against the plants: \n " + "You: " + playerInt + " - Vines: " + eventInt;
    if (eventInt > playerInt) {
        var eventActionInt = getRandomInt(2);
        if (eventActionInt == 0 && selectRandomBindForPlayer() != null || eventActionInt == 1  && selectRandomBindForPlayer() != null && CharacterIsNaked(Player)) {
            actionString += "\n Vines are looking to restrain your body."
            ChatRoomSendLocal(actionString, "#FFF2CC");
            process();
        } else if (eventActionInt == 1 && !CharacterIsNaked(Player) || eventActionInt == 0 && !CharacterIsNaked(Player) && selectRandomBindForPlayer() == null) {
            actionString += "\n Vines are tearing down your clothing."
            ChatRoomSendLocal(actionString, "#FFF2CC");
            breakClothesForPlayer();
        } else {
            actionString += "\n Vines stopped moving as they got you fully bound.";
            ChatRoomSendLocal(actionString, "#FFF2CC");
            stopEvent();
        }
        eventLevel = 0;
    } else {
        ChatRoomSendLocal(actionString, "#FFF2CC");
    }
    console.log("[AES] eventLevel up! - " + eventLevel);
    UpdateCharacters();
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
        case 'torso':
            wearBind(Player, "HempRopeHarness", "ItemTorso", greenColor, 1);
            ChatRoomSendLocal("The vines slithered up your arms, coiling and constricting as they entangled you."); // TODO
            break;
        case 'torso2':
            wearBind(Player, "HempRopeHarness", "ItemTorso2", greenColor, 1);
            ChatRoomSendLocal("The vines slithered up your arms, coiling and constricting as they entangled you."); // TODO
            break;
        case 'pelvis':
            wearBind(Player, "HempRope", "ItemPelvis", greenColor, 1);
            ChatRoomSendLocal("The vines slithered up your arms, coiling and constricting as they entangled you."); // TODO
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
}

function getRandomClothingBreakPrompt() {
    const randomIndex = Math.floor(Math.random() * clothingBreakPrompts.length);
    return clothingBreakPrompts[randomIndex];
  }

function breakClothesForPlayer() {
    const randomPrompt = getRandomClothingBreakPrompt();
    if (breakRandomClothes(Player)) {
        ChatRoomSendLocal(randomPrompt);
    }
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

function createBar() {
    const barPercentage = (eventLevel / 6) * 100;

    const eventLevelBar = document.createElement('div');
    eventLevelBar.classList.add('maxLevel-bar');
    eventLevelBar.style.width = "200px";
    eventLevelBar.style.height = "20px";

    const levelFill = document.createElement('div');
    levelFill.classList.add('eventLevel-fill');
    levelFill.style.width = `${barPercentage}%`;

    eventLevelBar.appendChild(levelFill);
    
    // div.appendChild(eventLevelBar);

    const styles = `
    .maxLevel-bar {
    width: 300px;
    background-color: #ccc;
    border: 1px solid #000;
    text-align: center;
    font-size: 18px;
    }
    .eventLevel-fill {
    background-color: #ea9999;
    color: #fff;
    height: 100%;
    }
    `;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
  
    return eventLevelBar;
}

export function ChatRoomSendLocalAction(msg, background = "#6e6eff54", sender, pelearAction, rendirseAction, autoDeleteTimeout = stepsPerSecond*1000) {
    // Adds the message and scrolls down unless the user has scrolled up
    const div = document.createElement("div");
    div.setAttribute("class", "ChatMessage ChatMessageLocalMessage");
    div.setAttribute("data-time", ChatRoomCurrentTime());
    div.setAttribute("data-sender", `${sender ?? Player.MemberNumber ?? 0}`);
    div.style.background = background;
    div.style.margin = "0.15em 0";
  
    const messageText = typeof msg === "string" ? msg : "[AES] " + msg;
  
    // Create a div for the message
    const messageDiv = document.createElement("div");
    messageDiv.innerText = messageText;
  
    // Append the message div before the buttons
    div.appendChild(messageDiv);
  
    eventLevelBar = createBar();
    div.appendChild(eventLevelBar);
  
    const pelearButton = document.createElement("button");
    pelearButton.classList.add("fancy-button");
    pelearButton.innerHTML = "&#10003;"; // Checkmark icon
    pelearButton.addEventListener("click", () => {
      if (pelearAction) {
        pelearAction();
        removeMessage();
      }
    });
  
    const rendirseButton = document.createElement("button");
    rendirseButton.classList.add("fancy-button");
    rendirseButton.innerHTML = "&#10007;"; // Cross icon
    rendirseButton.addEventListener("click", () => {
      if (rendirseAction) {
        rendirseAction();
        removeMessage();
      }
    });
  
    div.appendChild(pelearButton);
    div.appendChild(rendirseButton);
  
    // Schedule the removal of the message after the specified timeout
    setTimeout(() => {
        rendirseAction();
        removeMessage();
    }, autoDeleteTimeout);
  
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
  
    function removeMessage() {
      div.remove();
    }
  }

  