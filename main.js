import { shell } from "./spriteHandlers/shell.js";
import { leg, hindLegFiles } from "./spriteHandlers/leg.js";
import { neck } from "./spriteHandlers/neck.js";
import { cheek } from "./spriteHandlers/cheek.js";
import { nose } from "./spriteHandlers/nose.js";
import { eye } from "./spriteHandlers/eye.js";
import { earhorn } from "./spriteHandlers/earhorn.js";
import { eyebrow } from "./spriteHandlers/eyebrow.js";
import { tail } from "./spriteHandlers/tail.js";
import { colors, secondaryColor, primaryColor, eyeColor } from "./spriteHandlers/color.js";
import { primaryMarks } from "./spriteHandlers/primaryMarks.js";
import { secondaryMarks } from "./spriteHandlers/secondaryMarks.js";
import { tertiary } from "./spriteHandlers/tertiary.js";
import { spriteLayer } from "./spriteHandlers/layer.js";
import { rollLootbox, buildCSDropPost, buildFRDropPost, displayDropPreview, rollInfused } from "./roll.js";

// tab button functionality 
function showTab(event, tabName) {
  var i, tabContent, tabName;

  // hide all
  tabContent = document.getElementsByClassName("tabContent");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  // set inactive
  tabContent = document.getElementsByClassName("tabContent");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].className = tabContent[i].className.replace("active", "");
  }

  // set active
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.className += "active";
}
window.showTab = showTab;

// copy bbcode to clipboard buttons function
function copyText(elementId) {
  var postText = document.getElementById(elementId);
  // Select the text field
  postText.select();
  postText.setSelectionRange(0, 99999); 
   // Copy the text inside the text field
  navigator.clipboard.writeText(postText.value);
  // Alert the copied text
  alert("Copied the text: " + postText.value);
} 
window.copyText = copyText;

document.getElementById("CSdropRoller").addEventListener("click", function() { // generate drop results + build bbcode

    const chestType = document.querySelector(
        'input[name="chestType"]:checked'
    )?.value;

    if (!chestType) return;

    const results = rollLootbox(chestType);
    displayDropPreview(results);

    document.getElementById("dropPostBBCode").value =
        buildCSDropPost(results);
});

document.getElementById("FRdropRoller").addEventListener("click", function() { // same as above but for FR bbcode

    const chestType = document.querySelector(
        'input[name="chestType"]:checked'
    )?.value;

    if (!chestType) return;

    const results = rollLootbox(chestType);
    displayDropPreview(results);

    document.getElementById("dropPostBBCode").value =
        buildFRDropPost(results);
});

function getTrait(traitList, name) {
  for (let i = 0; i < traitList.length; i++) {
    if (traitList[i].name === name) {
      return traitList[i];
    }
  }
}

const defaultRoll = { //basic wyrm
  shell: getTrait(shell, "stars"),
  leg: getTrait(leg, "six"),
  neck: getTrait(neck, "tufty"),
  cheek: getTrait(cheek, "tuft"),
  nose: getTrait(nose, "basic"),
  eye: getTrait(eye, "wide"),
  earhorn: getTrait(earhorn, "pointy"),
  eyebrow: getTrait(eyebrow, "circle"),
  tail: getTrait(tail, "soft"),
  tertiary: getTrait(tertiary, "none")
};

function renderCreature(fullRoll, renderer) { //render the creature on specified renderer
  const sprites = [];

  const addTraitFiles = (trait) => {
    if (!trait || !trait.files) return;

    for (let i = 0; i < trait.files.length; i++) {
      const src = trait.files[i];

      sprites.push({ //pushes src and z to the sprites array
        src: src,
        zIndex: spriteLayer(src)
      });
    }
  };

  addTraitFiles(fullRoll.shell); // Main trait groups
  addTraitFiles(fullRoll.leg);
  addTraitFiles(fullRoll.neck);
  addTraitFiles(fullRoll.cheek);
  addTraitFiles(fullRoll.nose);
  addTraitFiles(fullRoll.eye);
  addTraitFiles(fullRoll.earhorn);
  addTraitFiles(fullRoll.eyebrow);
  addTraitFiles(fullRoll.tail);
  addTraitFiles(fullRoll.tertiary);

  if (fullRoll.leg.hindleg) { // hindlegs for certain traits
    addTraitFiles({ files: hindLegFiles });
  }

  sprites.sort((a, b) => a.zIndex - b.zIndex); 
  renderer.replaceChildren();

  for (let i = 0; i < sprites.length; i++) { //img element generation for each sprite
    const image = document.createElement("img");
    image.className = "layer";
    image.src = sprites[i].src;
    image.alt = "";
    image.style.zIndex = sprites[i].zIndex;
    renderer.appendChild(image);
  }
}
window.renderCreature = renderCreature;

function renderRandomCreature() { //for random button 
  renderCreature(rollInfused(), document.getElementById("morphRenderer"));
}

renderCreature(defaultRoll, document.getElementById("previewRenderer"));
renderCreature(defaultRoll, document.getElementById("dressupRenderer"));
renderCreature(defaultRoll, document.getElementById("morphRenderer"));
document.getElementById("rollRandomButton")?.addEventListener("click", renderRandomCreature);
