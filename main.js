/*import { shell } from "./spriteHandlers/shell.js";
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
import { spriteLayer } from "./spriteHandlers/layer.js"; */
import { rollLootbox, buildCSDropPost, buildFRDropPost, displayDropPreview } from "./roll.js";

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

//export {shell, leg, neck, cheek, nose, eye, earhorn, eyebrow, tail, hindLegFiles, colors, primaryMarks, secondaryMarks, tertiary, secondaryColor, primaryColor, eyeColor, spriteLayer, rollLootbox };
