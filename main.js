import { shell } from "./shell.js";
import { leg, hindLegFiles } from "./leg.js";
import { neck } from "./neck.js";
import { cheek } from "./cheek.js";
import { nose } from "./nose.js";
import { eye } from "./eye.js";
import { earhorn } from "./earhorn.js";
import { eyebrow } from "./eyebrow.js";
import { tail } from "./tail.js";
import { colors, secondaryColor, primaryColor, eyeColor } from "./color.js";
import { primaryMarks } from "./primaryMarks.js";
import { secondaryMarks } from "./secondaryMarks.js";
import { tertiary } from "./tertiary.js";
import { spriteLayer } from "./layer.js";
import { rollTraits } from "./roll.js"; //doesnt exist yet

const rarityWeights = {
	limited: 1,
  unusual: 5,
  rare: 15,
  uncommon: 30,
  common: 50,
	charmed: 75
};


export { rarityWeights, shell, leg, neck, cheek, nose, eye, earhorn, eyebrow, tail, hindLegFiles, colors, primaryMarks, secondaryMarks, tertiary, secondaryColor, primaryColor, eyeColor, spriteLayer, rollTraits };
