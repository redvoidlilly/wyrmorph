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
import { rollLootbox, buildCSDropPost, buildFRDropPost, displayDropPreview, rollInfused, rollSelectedTraits, rollMarks } from "./roll.js";

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

const basicTraits = {
  shell: "stars",
  leg: "six",
  neck: "tufty",
  cheek: "tuft",
  nose: "basic",
  eye: "wide",
  earhorn: "pointy",
  eyebrow: "circle",
  tail: "soft",
  tertiary: "none",
  primaryMark: "none",
  secondaryMark: "none"
};
const defaultRoll = rollSelectedTraits(basicTraits);

const previewTraitLists = {
  shell,
  leg,
  neck,
  cheek,
  nose,
  eye,
  earhorn,
  eyebrow,
  tail,
  tertiary,
  primaryMark: primaryMarks,
  secondaryMark: secondaryMarks
};

const previewTraitLabels = {
  shell: "Shell",
  leg: "Legs",
  neck: "Neck",
  cheek: "Cheek",
  nose: "Nose",
  eye: "Eyes",
  earhorn: "Earhorns",
  eyebrow: "Eyebrows",
  tail: "Tail",
  tertiary: "Tertiary",
  primaryMark: "Primary Mark",
  secondaryMark: "Secondary Mark"
};

function createPreviewControls() {
  const controls = document.getElementById("previewControls");
  const traitNames = Object.keys(previewTraitLists);

  for (let i = 0; i < traitNames.length; i++) {
    const traitName = traitNames[i];
    const traitList = previewTraitLists[traitName];
    const label = document.createElement("label");
    const select = document.createElement("select");

    label.htmlFor = `preview-${traitName}`;
    label.textContent = previewTraitLabels[traitName];
    select.id = `preview-${traitName}`; 

    for (let j = 0; j < traitList.length; j++) {
      const option = document.createElement("option");
      option.value = traitList[j].name;
      option.textContent = traitList[j].name;
      select.appendChild(option); //automatically generates dropdowns options for each trait
    }

    select.value = basicTraits[traitName];
    select.addEventListener("change", function() { // updates preview when dropdown option selected
      basicTraits[traitName] = select.value;
      const selectedTraits = rollSelectedTraits(basicTraits);
      renderCreature(selectedTraits, document.getElementById("previewRenderer"));
    }); 

    label.appendChild(select);
    controls.appendChild(label);
  }
}

function renderCreature(Roll, renderer) { //render the creature on specified renderer
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

  addTraitFiles(Roll.shell); // Main trait groups
  addTraitFiles(Roll.leg);
  addTraitFiles(Roll.neck);
  addTraitFiles(Roll.cheek);
  addTraitFiles(Roll.nose);
  addTraitFiles(Roll.eye);
  addTraitFiles(Roll.earhorn);
  addTraitFiles(Roll.eyebrow);
  addTraitFiles(Roll.tail);
  addTraitFiles(Roll.tertiary);
  addTraitFiles({ files: rollMarks(Roll.primaryMark, Roll) });
  addTraitFiles({ files: rollMarks(Roll.secondaryMark, Roll) });

  if (Roll.leg.hindleg) { // hindlegs for certain traits
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
createPreviewControls();
document.getElementById("rollRandomButton")?.addEventListener("click", renderRandomCreature);
