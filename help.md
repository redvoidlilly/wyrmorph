# Wyrmorph standalone generator

## File map

- `index.html` - the actual page layout: buttons, inputs, tabs, and the creature display area.
- `style.css` - appearance and responsive/mobile styling.
- `data.js` - **gene/item data**. This is the main file to edit when adding traits, colors, rarities, or sprite files.
- `app.js` - the generator's behavior: RNG, trait compatibility, sprite layering, morphs, loot, image downloads, saved pet data, and forum-post generation.
- `vendor/jszip.min.js` - a local copy of JSZip used for exporting/importing saved pet data
- `wymorph/genes/` - creature gene artwork.
- `wymorph/items/` - drop/mutagem artwork.

### Add a gene

Open `data.js` and find the appropriate category, such as:

```js
const tail = new PList([
    // ...
]);
```

A trait generally looks like:

```js
new Trait({
    name: "traitname",
    rarity: "common",
    files: [
        "wymorph/genes/tail/traitname_color.webp",
		"wymorph/genes/tail/traitname_shade.webp",
        "wymorph/genes/tail/traitname_line.webp"
    ]
})
```

### Change rarity

```js
rarity: "rare"
```

RNG first rolls a rarity -> chooses a trait matching that rarity.

rarity distribution:

```js
const rarity = new PList(
    [new PVal("unusual"), new PVal("rare"), new PVal("uncommon"), new PVal("common")],
    [5, 15, 30, 50]
);
```

### Change loot balance

Look in `app.js` for:

- `CC_STATS` = catalyst coin amount ranges/averages
- `R_STATS` = mutagem amount ranges/averages
- `pearleggChance()` = pearlegg chance by drop tier
- `MUTAGEM_WEIGHTS` = relative chance of each mutagem type

## Important concept: sprite layers

The creature is not one image. It is assembled from many transparent image layers.

`renderCreature()` collects the selected gene sprites, then `spriteLayer()` gives each image a draw-order number. Lower numbers are drawn first, higher numbers are drawn on top.

## Important concept: colors

Most gene artwork is grayscale. The browser uses CSS masks to recolor it.

The functions near the color-helper section of `app.js` handle:

- primary/secondary colors
- shade colors
- line colors
- eye colors
- dark/light marking variants

## Saved pet data

Saved IDs use the browser's `localStorage`.
- the data belongs to that browser/device;
- clearing site data can erase it;
- it is not automatically shared with another device;
- use **download petdata** to make a backup;
- use **import petdata** to restore a backup.

## security note

The access-code screen is a convenience gate, not authentication. Do not use it to protect anything genuinely private or sensitive.
