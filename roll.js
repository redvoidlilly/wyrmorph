import { shell } from "./shell.js";
import { leg } from "./leg.js";
import { neck } from "./neck.js";
import { cheek } from "./cheek.js";
import { nose } from "./nose.js";
import { eye } from "./eye.js";
import { earhorn } from "./earhorn.js";
import { eyebrow } from "./eyebrow.js";
import { tail } from "./tail.js";
import { colors } from "./color.js";
import { primaryMarks } from "./primaryMarks.js";
import { secondaryMarks } from "./secondaryMarks.js";
import { tertiary } from "./tertiary.js";

function chooseRandom(items) {
  if (items.length === 0) {
    throw new Error("Cannot roll from an empty trait list.");
  }

  return items[Math.floor(Math.random() * items.length)];
}

export function rollTraits() {
  return {
    shell: chooseRandom(shell),
    leg: chooseRandom(leg),
    neck: chooseRandom(neck),
    cheek: chooseRandom(cheek),
    nose: chooseRandom(nose),
    eye: chooseRandom(eye),
    earhorn: chooseRandom(earhorn),
    eyebrow: chooseRandom(eyebrow),
    tail: chooseRandom(tail),
    primaryColor: chooseRandom(colors),
    secondaryColor: chooseRandom(colors),
    eyeColor: chooseRandom(colors),
    primaryMark: chooseRandom(primaryMarks),
    secondaryMark: chooseRandom(secondaryMarks),
    tertiary: chooseRandom(tertiary)
  };
}
