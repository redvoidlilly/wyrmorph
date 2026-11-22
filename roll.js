import { shell } from "./spriteHandlers/shell.js";
import { leg } from "./spriteHandlers/leg.js";
import { neck } from "./spriteHandlers/neck.js";
import { cheek } from "./spriteHandlers/cheek.js";
import { nose } from "./spriteHandlers/nose.js";
import { eye } from "./spriteHandlers/eye.js";
import { earhorn } from "./spriteHandlers/earhorn.js";
import { eyebrow } from "./spriteHandlers/eyebrow.js";
import { tail } from "./spriteHandlers/tail.js";
import { colors } from "./spriteHandlers/color.js";
import { primaryMarks } from "./spriteHandlers/primaryMarks.js";
import { secondaryMarks } from "./spriteHandlers/secondaryMarks.js";
import { tertiary } from "./spriteHandlers/tertiary.js";

//mutagem sprites
export const mutagem = [ //new mutagems go here
  {
    name: "primaswirl",
    tags: ["standard"],
    files: [
      "items/mutagems/primaswirl.png",
    ]
  },
    {
    name: "primaloop",
    tags: ["standard"],
    files: [
      "items/mutagems/primaloop.png",
    ]
  },
    {
    name: "auxswirl",
    tags: ["standard"],
    files: [
      "items/mutagems/auxswirl.png",
    ]
  },
    {
    name: "auxswirl",
    tags: ["standard"],
    files: [
      "items/mutagems/auxswirl.png",
    ]
  },
  {
    name: "oculaswirl",
    tags: ["scarce"],
    files: [
      "items/mutagems/oculaswirl.png",
    ]
  },
  {
    name: "oculaorb",
    tags: ["scarce"],
    files: [
      "items/mutagems/oculaorb.png",
    ]
  },
  {
    name: "antepetal",
    tags: ["standard"],
    files: [
      "items/mutagems/antepetal.png",
    ]
  },
  {
    name: "chespike",
    tags: ["standard"],
    files: [
      "items/mutagems/chespike.png",
    ]
  },
  {
    name: "collamoon",
    tags: ["standard"],
    files: [
      "items/mutagems/collamoon.png",
    ]
  },
  {
    name: "crowncrystal",
    tags: ["standard"],
    files: [
      "items/mutagems/crowncrystal.png",
    ]
  },
  {
    name: "pawscale",
    tags: ["standard"],
    files: [
      "items/mutagems/pawscale.png",
    ]
  },
  {
    name: "shellcluster",
    tags: ["standard"],
    files: [
      "items/mutagems/shellcluster.png",
    ]
  },
  {
    name: "snootooth",
    tags: ["standard"],
    files: [
      "items/mutagems/snootooth.png",
    ]
  },
  {
    name: "tailfig",
    tags: ["standard"],
    files: [
      "items/mutagems/tailfig.png",
    ]
  },
  {
    name: "tristar",
    tags: ["scarce"],
    files: [
      "items/mutagems/tristar.png",
    ]
  },
  {
    name: "ectoplasm", //HOLIDAY
    tags: ["limited"],
    files: [
      "items/mutagems/ectoplasm.png",
    ]
  }
];

const catalyst = [ //new catalysts go here
  {
    name: "catalystCoin",
    tags: ["standard"],
    files: [
      "items/catalystcoin.png",
    ]
  }
];

const egg = [ //new eggs go here
  {
    name: "pearlegg", //wyrm
    tags: ["standard"],
    files: [
      "items/pearlegg.png",
    ]
  }
];

//////////////loot tables + weighted ranges
  const ironTable = { //iron table
      egg: ["pearlegg"],
      mutagem: [
        { name: "primaswirl", weight: 2 },
        { name: "primaloop", weight: 2 },
        { name: "auxswirl", weight: 2 },
        { name: "oculaswirl", weight: 2 },
        { name: "oculaorb", weight: 1 },
        { name: "antepetal", weight: 1 },
        { name: "chespike", weight: 1 },
        { name: "collamoon", weight: 1 },
        { name: "crowncrystal", weight: 2 },
        { name: "pawscale", weight: 2 },
        { name: "shellcluster", weight: 2 },
        { name: "snootooth", weight: 1 },
        { name: "tailfig", weight: 2 },
        { name: "tristar", weight: 1 }
      ],
      catalyst: ["catalystCoin"],

      quantity: {
        egg: [
            { min: 1, max: 10, outcome: [1] },
            { min: 11, max: 1000, outcome: [0] }
        ],

        catalyst: [
            { min: 1, max: 250, outcome: [3] },
            { min: 251, max: 1000, outcome: [1, 2] }
        ],

        mutagem: [
            { min: 1, max: 10, outcome: [5] },
            { min: 11, max: 100, outcome: [4] },
            { min: 101, max: 1000, outcome: [3] }
        ]
      }
    }
  const goldTable = { //gold table
      egg: ["pearlegg"],
      mutagem: [
        { name: "primaswirl", weight: 2 },
        { name: "primaloop", weight: 2 },
        { name: "auxswirl", weight: 2 },
        { name: "oculaswirl", weight: 2 },
        { name: "oculaorb", weight: 1 },
        { name: "antepetal", weight: 1 },
        { name: "chespike", weight: 1 },
        { name: "collamoon", weight: 1 },
        { name: "crowncrystal", weight: 2 },
        { name: "pawscale", weight: 2 },
        { name: "shellcluster", weight: 2 },
        { name: "snootooth", weight: 1 },
        { name: "tailfig", weight: 2 },
        { name: "tristar", weight: 1 }
      ],
      catalyst: ["catalystCoin"],
      quantity: {
        egg: [
            { min: 1, max: 1000, outcome: [1] }
        ],
        catalyst: [
            { min: 1, max: 50, outcome: [5] },
            { min: 51, max: 300, outcome: [4] },
            { min: 301, max: 1000, outcome: [3] }
        ],
        mutagem: [
            { min: 1, max: 100, outcome: [7] },
            { min: 101, max: 1000, outcome: [5, 6] }
        ]
      }
    }
  const prismTable = { //prismatic table
      egg: ["pearlegg"],
      mutagem: [
        { name: "primaswirl", weight: 2 },
        { name: "primaloop", weight: 2 },
        { name: "auxswirl", weight: 2 },
        { name: "oculaswirl", weight: 2 },
        { name: "oculaorb", weight: 1 },
        { name: "antepetal", weight: 1 },
        { name: "chespike", weight: 1 },
        { name: "collamoon", weight: 1 },
        { name: "crowncrystal", weight: 2 },
        { name: "pawscale", weight: 2 },
        { name: "shellcluster", weight: 2 },
        { name: "snootooth", weight: 1 },
        { name: "tailfig", weight: 2 },
        { name: "tristar", weight: 1 }
      ],
      catalyst: ["catalystCoin"],
      quantity: {
        egg: [
            { min: 1, max: 10, outcome: [3] },
            { min: 11, max: 100, outcome: [2] },
            { min: 101, max: 1000, outcome: [1] }
        ],
        catalyst: [
            { min: 1, max: 250, outcome: [7] },
            { min: 251, max: 1000, outcome: [5, 6] }
        ],
        mutagem: [
            { min: 1, max: 10, outcome: [10] },
            { min: 11, max: 100, outcome: [9] },
            { min: 101, max: 1000, outcome: [7, 8] }
        ]
      }
    }
  const spookyTable = { //spooky table
      egg: ["pearlegg"],
      mutagem: [
        { name: "primaswirl", weight: 2 },
        { name: "primaloop", weight: 2 },
        { name: "auxswirl", weight: 2 },
        { name: "oculaswirl", weight: 2 },
        { name: "oculaorb", weight: 1 },
        { name: "antepetal", weight: 1 },
        { name: "chespike", weight: 1 },
        { name: "collamoon", weight: 1 },
        { name: "crowncrystal", weight: 2 },
        { name: "pawscale", weight: 2 },
        { name: "shellcluster", weight: 2 },
        { name: "snootooth", weight: 1 },
        { name: "tailfig", weight: 2 },
        { name: "tristar", weight: 1 }
      ],
      catalyst: ["catalystCoin"],
      holiday: [
        { name: "ectoplasm", weight: 1 }
      ],
      quantity: {
        egg: [
            { min: 1, max: 1000, outcome: [1] }
        ],
        catalyst: [
            { min: 1, max: 50, outcome: [5] },
            { min: 51, max: 300, outcome: [4] },
            { min: 301, max: 1000, outcome: [3] }
        ],
        mutagem: [
            { min: 1, max: 100, outcome: [7] },
            { min: 101, max: 1000, outcome: [5, 6] }
        ],
        holiday: [
            { min: 1, max: 100, outcome: [5, 6] },
            { min: 11, max: 1000, outcome: [3, 4] }
        ]
      }
    }
//NEW CHEST TYPES GO HERE

const lootTables = { //master
    iron: ironTable,
    gold: goldTable,
    prism: prismTable,
    spooky: spookyTable
    //NEW CHEST TYPES GO HERE
};


function chooseRandom(object) { //rng
  return object[Math.floor(Math.random() * object.length)];
}

function weightedRandom(chestType, rewardType) { //weighted rng
    //pull ranges for chest type
    const ranges = lootTables[chestType].quantity[rewardType]; 
    //roll BIG number 1-1000
    const bigRoll = Math.floor(Math.random() * 1000) + 1;

    for (const range of ranges) {
      //check if bigRoll is within specified range for chest -> return a quantity outcome from that range
        if (bigRoll >= range.min && bigRoll <= range.max) {
            return chooseRandom(range.outcome);
        }
    }
}

export function rollLootbox() { //rolling the entire mimic

  const chestType = document.querySelector( //pull checked chest type
      'input[name="chestType"]:checked'
  )?.value;

  if (!chestType) return;

  const eggRolled = weightedRandom(chestType, "egg");
  const catalystRolled = weightedRandom(chestType, "catalyst");
  const gemsRolled = weightedRandom(chestType, "mutagem");

  const mutagemRolled = {}; // count how many of each mutagem was rolled

    for (let i = 0; i < gemsRolled; i++) {

        const item = chooseRandom(lootTables[chestType].mutagem);

        mutagemRolled[item] = (mutagemRolled[item] || 0) + 1;
    }

    return {
        pearlegg: eggRolled,
        catalystcoin: catalystRolled,
        mutagems: mutagemRolled
    };
}

export function buildDropPost(results) {

    const baseUrl = "https://raw.githubusercontent.com/redvoidlilly/wyrmorph/refs/heads/main";

    let dropPostBBCode = "";

    if (results.pearlegg > 0) {
        dropPostBBCode += "[img]" + baseUrl + "/items/pearlegg.png[/img]";
        dropPostBBCode += "[b]Pearleggs[/b]=x" + results.pearlegg;
    }

    return dropPostBBCode;
}






export function rollInfused() {
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
