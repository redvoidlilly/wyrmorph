function legSpriteFiles(leg) {
let own = leg.files.selectAll.map(f => f.evaluateItem);
if (String(leg.hindlegs.evaluateItem) === "true") {
  return own.concat(hindLegFiles.selectAll.map(f => f.evaluateItem));
}
return own;
}
// Secondary-mark filenames encode where they belong: b = base, m = middle, t = top.
function secondaryPosOffset(p) {
let s = String(p).toLowerCase();
if (s.includes("_bblend_")) return 1;
if (s.includes("_mblend_")) return 3;
if (s.includes("_tblend_")) return 5;
if (s.includes("_b_")) return 2;
if (s.includes("_m_")) return 4;
if (s.includes("_t_")) return 6;
return 2;
}
function secondaryBaseFromPath(path) {
let p = String(path).toLowerCase();
let file = p.split("/").pop();
let tok = (nm) => {
  nm = String(nm).toLowerCase();
  if (!nm || nm === "none") return false;
  return file.startsWith(nm + "_") || file.includes("_" + nm + "_") || file.includes("_" + nm + ".") || p.includes("/" + nm + "/") || p.includes("/" + nm + "_");
};
let hasWord = (w) => p.includes(w);
try {
  let maneNames = neck.selectAll.filter(n => neckHasTag(n, "mane")).map(n => String(n.name.evaluateItem).toLowerCase());
  for (let nm of maneNames) {
    if (tok(nm)) return 43;
  }
} catch (e) {}
try {
  let tailNames = tail.selectAll.map(t => String(t.name.evaluateItem).toLowerCase());
  for (let nm of tailNames) {
    if (tok(nm)) return 4;
  }
} catch (e) {}
try {
  let legNames = legs.selectAll.map(l => String(l.name.evaluateItem).toLowerCase());
  for (let nm of legNames) {
    if (tok(nm)) return 16;
  }
} catch (e) {}
try {
  let neckNames = neck.selectAll.map(n => String(n.name.evaluateItem).toLowerCase());
  for (let nm of neckNames) {
    if (tok(nm)) return 25;
  }
} catch (e) {}
try {
  let cheekNames = cheek.selectAll.map(c => String(c.name.evaluateItem).toLowerCase());
  for (let nm of cheekNames) {
    if (tok(nm)) return 52;
  }
} catch (e) {}
if (hasWord("cheek")) return 52;
if (hasWord("mane")) return 43;
if (hasWord("neck")) return 25;
if (hasWord("tail")) return 4;
if (hasWord("leg") || hasWord("hind") || hasWord("wyvern") || hasWord("floater") || hasWord("flipper")) return 16;
return 16;
}
function secondaryMarkLayer(path, leg, nk, ch, tl) {
let p = String(path).toLowerCase();
let file = p.split("/").pop();
if (file.startsWith("l_wyvern_")) return 76;
let off = secondaryPosOffset(p);
let matchNm = (o) => {
  try {
    if (!o) return null;
    let nm = String(o.name.evaluateItem).toLowerCase();
    if (!nm || nm === "none") return null;
    if (file.startsWith(nm + "_") || file.includes("_" + nm + "_") || file.includes("_" + nm + ".") || p.includes("/" + nm + "/") || p.includes("/" + nm + "_")) return nm;
    return null;
  } catch (e) {
    return null;
  }
};
try {
  if (matchNm(tl)) return 4 + off;
} catch (e) {}
try {
  if (matchNm(leg)) return 16 + off;
} catch (e) {}
try {
  if (matchNm(nk)) {
    try {
      if (neckHasTag(nk, "mane")) return 43 + off;
    } catch (e2) {}
    return 25 + off;
  }
} catch (e) {}
try {
  if (matchNm(ch)) return 52 + off;
} catch (e) {}
return secondaryBaseFromPath(path) + off;
}
function secondaryMarkSpriteFiles(m) {
try {
  if (!m.files) return [];
  return m.files.selectAll.map(f => f.evaluateItem);
} catch (e) {
  return [];
}
}
function secondaryLegFileOk(wymorph, legNm) {
let file = String(wymorph).toLowerCase().split("/").pop();
legNm = String(legNm || "").toLowerCase();
if (legNm === "wyvern") {
  return file.startsWith("l_wyvern_") || file.startsWith("r_wyvern_") || file.startsWith("hindl_");
}
if (legNm === "six" || legNm === "flipper") {
  return file.startsWith(legNm + "_") || file.startsWith("hindl_");
}
if (legNm === "floater") {
  return file.startsWith("floater_");
}
if (!legNm || legNm === "none") return false;
return file.startsWith(legNm + "_");
}
function secondaryMarkSprites(m, leg, nk, ch, tl) {
if (!m) return [];
try {
  if (String(m.name.evaluateItem).toLowerCase() === "none") return [];
} catch (e) {}
let legNm = "";
try {
  if (leg) legNm = String(leg.name.evaluateItem).toLowerCase();
} catch (e) {}
let rest = [];
try {
  rest = [nk, ch, tl].filter(x => x).map(x => String(x.name.evaluateItem).toLowerCase());
} catch (e) {
  rest = [];
}
let all = secondaryMarkSpriteFiles(m);
let files = all.filter(wymorph => secondaryLegFileOk(wymorph, legNm) || rest.includes(wymorph.toLowerCase().split("/").pop().split("_")[0]));
if (files.length === 0) {
  files = all;
}
let out = files.map(wymorph => ({ wymorph, layer: secondaryMarkLayer(wymorph, leg, nk, ch, tl) }));
out.sort((a, b) => a.layer - b.layer);
return out;
}
// Return the draw order for a sprite. Higher numbers are drawn later/on top.
function spriteLayer(path) {
let p = String(path).toLowerCase();
if (p.includes("watermark")) return 100;
if (p.includes("/marks/secondary/") || p.includes("genes/marks/secondary")) {
  if (p.split("/").pop().startsWith("l_wyvern_")) return 76;
  return secondaryBaseFromPath(path) + secondaryPosOffset(p);
}
if (p.includes("/marks/primary/") || p.includes("genes/marks/primary")) {
  let tok = p.split("/").pop().split("_")[0];
  if (tok === "nose" || tok === "basic" || tok === "bulbs" || tok === "horn" || tok === "whisker" || tok === "whiskers") {
    if (p.includes("_bblend_")) return 67;
    if (p.includes("_b_")) return 67;
    if (p.includes("_mblend_")) return 67;
    if (p.includes("_m_")) return 67;
    if (p.includes("_tblend_")) return 68;
    if (p.includes("_t_")) return 68;
    return 67;
  }
  if (tok === "earhorn" || tok === "earhorns" || tok === "pointy" || tok === "drooped" || tok === "drake" || tok === "fluffy" || tok === "innocent") {
    if (p.includes("_bblend_")) return 64;
    if (p.includes("_b_")) return 64;
    if (p.includes("_mblend_")) return 64;
    if (p.includes("_m_")) return 64;
    if (p.includes("_tblend_")) return 65;
    if (p.includes("_t_")) return 65;
    return 64;
  }
  if (p.includes("_bblend_")) return 35;
  if (p.includes("_b_")) return 36;
  if (p.includes("_mblend_")) return 37;
  if (p.includes("_m_")) return 38;
  if (p.includes("_tblend_")) return 39;
  if (p.includes("_t_")) return 40;
  return 35;
}
if (p.includes("l_wyvern_color")) return 75;
if (p.includes("l_wyvern_shade")) return 77;
if (p.includes("l_wyvern_line")) return 78;
if (p.includes("/shell/") || p.includes("genes/shell")) {
  if (p.includes("_color")) return 34;
  if (p.includes("_shade")) return 41;
  if (p.includes("_line")) return 42;
  return 34;
}
if (p.includes("/cheek/") || p.includes("genes/cheek")) {
  if (p.includes("_color")) return 52;
  if (p.includes("_shade")) return 59;
  if (p.includes("_line")) return 60;
  return 52;
}
if (p.includes("/nose/") || p.includes("genes/nose")) {
  if (p.includes("_color")) return 64;
  if (p.includes("_shade")) return 65;
  if (p.includes("_line")) return 66;
  return 64;
}
if (p.includes("/earhorns/") || p.includes("genes/earhorns")) {
  if (p.includes("_color")) return 61;
  if (p.includes("_shade")) return 62;
  if (p.includes("_line")) return 63;
  return 61;
}
if (p.includes("/eyebrow/") || p.includes("genes/eyebrow")) {
  if (p.includes("_color")) return 67;
  if (p.includes("_line")) return 68;
  return 67;
}
if (p.includes("/eyes/") || p.includes("genes/eyes")) {
  if (p.includes("sc_color")) return 69;
  if (p.includes("sc_shade")) return 70;
  if (p.includes("iris_color")) return 71;
  if (p.includes("iris_shade")) return 72;
  if (p.includes("_line")) return 73;
  if (p.includes("bright")) return 74;
  return 67;
}
if (p.includes("/neck/") || p.includes("genes/neck")) {
  if (p.includes("_color")) return 25;
  if (p.includes("_shade")) return 32;
  if (p.includes("_line")) return 33;
  return 25;
}
if (p.includes("/tail/") || p.includes("genes/tail")) {
  if (p.includes("_color")) return 4;
  if (p.includes("_shade")) return 11;
  if (p.includes("_line")) return 12;
  return 4;
}
if (p.includes("r_hind_color")) return 1;
if (p.includes("r_hind_shade")) return 2;
if (p.includes("r_hind_line")) return 3;
if (p.includes("l_hind_color")) return 13;
if (p.includes("l_hind_shade")) return 14;
if (p.includes("l_hind_line")) return 15;
if (p.includes("_color")) return 16;
if (p.includes("_shade")) return 23;
if (p.includes("_line")) return 24;
return 78;
}
function legSprites(leg) {
let files = legSpriteFiles(leg);
let out = files.map(wymorph => ({ wymorph, layer: spriteLayer(wymorph) }));
out.sort((a, b) => a.layer - b.layer);
return out;
}
// Pick a trait whose rarity matches the rarity roll.
// Several body parts use exactly this same rule, so we keep it in one helper.
function rollByRarity(list) {
  const wantedRarity = rarity.selectOne.evaluateItem;
  const matches = list.selectAll.filter(
    item => String(item.rarity.evaluateItem) === String(wantedRarity)
  );

  // If a category has no trait at that rarity, fall back to any trait.
  return matches.length > 0 ? matches[Math.floor(Math.random() * matches.length)] : list.selectOne;
}

function rollLegs() { return rollByRarity(legs); }
function rollTail() { return rollByRarity(tail); }
function rollShell() { return rollByRarity(shell); }
function rollNeck() { return rollByRarity(neck); }
function rollCheek() { return rollByRarity(cheek); }
function rollNose() { return rollByRarity(nose); }
function rollEyes() { return rollByRarity(eyes); }
function rollEarhorns() { return rollByRarity(earhorns); }
function rollEyebrows() { return rollByRarity(eyebrows); }

function neckHasTag(n, tag) {
try {
  if (!n.tags) return false;
  return n.tags.selectAll.some(t => String(t.evaluateItem).toLowerCase() === String(tag).toLowerCase());
} catch (e) {
  return false;
}
}
function neckSpriteLayer(n, path) {
let p = String(path).toLowerCase();
if (neckHasTag(n, "mane")) {
  if (p.includes("_color")) return 43;
  if (p.includes("_shade")) return 50;
  if (p.includes("_line")) return 51;
}
return spriteLayer(path);
}
function neckSpriteFiles(n) {
try {
  if (!n.files) return [];
  return n.files.selectAll.map(f => f.evaluateItem);
} catch (e) {
  return [];
}
}
function neckSprites(n) {
let files = neckSpriteFiles(n);
let out = files.map(wymorph => ({ wymorph, layer: neckSpriteLayer(n, wymorph) }));
out.sort((a, b) => a.layer - b.layer);
return out;
}
function cheekSpriteFiles(c) {
try {
  if (!c.files) return [];
  return c.files.selectAll.map(f => f.evaluateItem);
} catch (e) {
  return [];
}
}
function cheekSprites(c) {
let files = cheekSpriteFiles(c);
let out = files.map(wymorph => ({ wymorph, layer: spriteLayer(wymorph) }));
out.sort((a, b) => a.layer - b.layer);
return out;
}
function noseSpriteFiles(n) {
let own = n.files.selectAll.map(f => f.evaluateItem);
return own.concat(["wymorph/genes/nose/blush_shade.webp"]);
}
function noseSprites(n) {
let files = noseSpriteFiles(n);
let out = files.map(wymorph => ({ wymorph, layer: spriteLayer(wymorph) }));
out.sort((a, b) => a.layer - b.layer);
return out;
}
function eyeSpriteFiles(e) {
return e.files.selectAll.map(f => f.evaluateItem);
}
function eyeSprites(e) {
let files = eyeSpriteFiles(e);
let out = files.map(wymorph => ({ wymorph, layer: spriteLayer(wymorph) }));
out.sort((a, b) => a.layer - b.layer);
return out;
}
function earhornSpriteFiles(e) {
return e.files.selectAll.map(f => f.evaluateItem);
}
function earhornSprites(e) {
let files = earhornSpriteFiles(e);
let out = files.map(wymorph => ({ wymorph, layer: spriteLayer(wymorph) }));
out.sort((a, b) => a.layer - b.layer);
return out;
}
function eyebrowSpriteFiles(e) {
return e.files.selectAll.map(f => f.evaluateItem);
}
function eyebrowSprites(e) {
let files = eyebrowSpriteFiles(e);
let out = files.map(wymorph => ({ wymorph, layer: spriteLayer(wymorph) }));
out.sort((a, b) => a.layer - b.layer);
return out;
}
// Secondary marks are restricted by the selected leg type.
function rollSecondaryMarks(leg) {
let legNm = "none";
try {
  if (leg) legNm = String(leg.name.evaluateItem).toLowerCase();
} catch (e) {}
let r = rarity.selectOne.evaluateItem;
let matches = secondaryMarks.selectAll.filter(m => String(m.rarity.evaluateItem) === String(r) && m.conds.selectAll.some(c => String(c.evaluateItem).toLowerCase() === legNm));
if (matches.length === 0) {
  let nones = secondaryMarks.selectAll.filter(m => String(m.name.evaluateItem).toLowerCase() === "none");
  if (nones.length > 0) return nones[0];
  return secondaryMarks.selectOne;
}
return matches[Math.floor(Math.random() * matches.length)];
}
function rollTertiary() {
return tertiary.selectOne;
}
function primaryMarkSpriteFiles(m) {
return m.files.selectAll.map(f => f.evaluateItem);
}
function primaryMarkSprites(m, sh, nk, ch, ns, ey, eh, eb, leg, tl) {
let nsNm = "";
try {
  if (ns) nsNm = String(ns.name.evaluateItem).toLowerCase();
} catch (e) {}
let nsGroup = [nsNm];
if (nsNm === "whisker") nsGroup.push("whiskers");
if (nsNm === "whiskers") nsGroup.push("whisker");
nsGroup.push("nose");
let names = [sh, nk, ch, ns, ey, eh, eb, leg, tl].map(x => String(x.name.evaluateItem).toLowerCase()).concat(nsGroup).concat(["earhorn", "earhorns"]);
// Prefer files that match the body parts this particular mark belongs to.
let files = m.files.selectAll
  .map(f => f.evaluateItem)
  .filter(wymorph => names.includes(wymorph.toLowerCase().split("/").pop().split("_")[0]));

// If the mark has no body-specific file, use its complete file list.
if (files.length === 0) {
  files = primaryMarkSpriteFiles(m);
}
let out = files.map(wymorph => ({ wymorph, layer: spriteLayer(wymorph) }));
out.sort((a, b) => a.layer - b.layer);
return out;
}
// Primary marks are restricted by their `conds` list, so a mark only rolls
// when at least one of its compatible body parts is present.
function rollPrimaryMark(sh, nk, ch, ns, ey, eh, eb, leg, tl) {
let parts = [sh, nk, ch, ns, ey, eh, eb, leg, tl];
let r = rarity.selectOne.evaluateItem;
let matches = primaryMarks.selectAll.filter(m => String(m.rarity.evaluateItem) === String(r) && m.conds.selectAll.some(c => parts.some(x => String(x.name.evaluateItem).toLowerCase() === String(c.evaluateItem).toLowerCase())));
if (String(r) === "common") {
  matches = matches.concat([null]);
}
if (matches.length === 0) return null;
return matches[Math.floor(Math.random() * matches.length)];
}

// ============================================================
// SAVED PET DATA
// ============================================================
// localStorage acts as this generator's small built-in database.
// The data stays in the user's browser unless they export it.
const petdata = {
_k(k) { return "wymo777:petdata:" + k; },
async get(k) { return localStorage.getItem(this._k(k)); },
async set(k, v) { localStorage.setItem(this._k(k), String(v)); },
async setMany(pairs) { for (const pair of pairs) localStorage.setItem(this._k(pair[0]), String(pair[1])); },
async keys() { const out = []; for (let n = 0; n < localStorage.length; n++) { const k = localStorage.key(n); if (k && k.indexOf("wymo777:petdata:") === 0) out.push(k.slice("wymo777:petdata:".length)); } return out; },
async deleteMany(ks) { for (const k of ks) localStorage.removeItem(this._k(k)); },
async entries() { const ks = await this.keys(); return ks.map(k => [k, localStorage.getItem(this._k(k))]); }
};

// ============================================================
// APP STATE + ACCESS CODE
// ============================================================
// The access code is only a convenience gate, not real security.
// Anyone with the source can see it.
window._unlocked = false;
function showTab(which) {
  if (!window._unlocked && (which === "drops" || which === "morphs")) return;
  homeTabEl.hidden = which !== "home";
  dropsTabEl.hidden = which !== "drops";
  morphsTabEl.hidden = which !== "morphs";
}
function tryUnlock() {
  if (String(accessCodeInput.value) === "777") {
    window._unlocked = true;
    dropsTabBtn.disabled = false;
    morphsTabBtn.disabled = false;
    accessErrorEl.hidden = true;
    showTab("morphs");
  } else {
    accessErrorEl.hidden = false;
    clearTimeout(window._accessErrorT);
    window._accessErrorT = setTimeout(() => { accessErrorEl.hidden = true; }, 1500);
  }
}
function loadImage(wymorph) {
  return new Promise((resolve, reject) => {
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.onload = () => resolve(im);
    im.onerror = reject;
    im.wymorph = wymorph;
  });
}
function darken(hex, f) {
  const n = hex.replace("#", "");
  const v = (i) => Math.round(parseInt(n.substr(i, 2), 16) * f);
  return "rgb(" + v(0) + "," + v(2) + "," + v(4) + ")";
}
function shadeColor(hex) {
  const n = hex.replace("#", "");
  let r = parseInt(n.substr(0, 2), 16) / 255;
  let g = parseInt(n.substr(2, 2), 16) / 255;
  let b = parseInt(n.substr(4, 2), 16) / 255;
  const mx = Math.max(r, g, b);
  const mn = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (mx + mn) / 2;
  if (mx !== mn) {
    const d = mx - mn;
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    if (mx === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (mx === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  s = s < 0.08 ? 0 : Math.min(1, s + 0.10);
  let rr, gg, bb;
  if (s === 0) {
    rr = gg = bb = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const tc = (t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    rr = tc(h + 1/3);
    gg = tc(h);
    bb = tc(h - 1/3);
  }
  const v = (x) => Math.round(x * 255 * 0.25);
  return "rgb(" + v(rr) + "," + v(gg) + "," + v(bb) + ")";
}
function hexToHsl(hex) {
  const n = hex.replace("#", "");
  let r = parseInt(n.substr(0, 2), 16) / 255;
  let g = parseInt(n.substr(2, 2), 16) / 255;
  let b = parseInt(n.substr(4, 2), 16) / 255;
  const mx = Math.max(r, g, b);
  const mn = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (mx + mn) / 2;
  if (mx !== mn) {
    const d = mx - mn;
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    if (mx === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (mx === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return [h, s, l];
}
function hslToRgb(h, s, l) {
  let rr, gg, bb;
  if (s === 0) {
    rr = gg = bb = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const tc = (t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    rr = tc(h + 1/3);
    gg = tc(h);
    bb = tc(h - 1/3);
  }
  return [rr, gg, bb];
}
function lineColor(hex) {
  const c = hexToHsl(hex);
  const s = c[1] < 0.08 ? 0 : 0.70;
  const rgb = hslToRgb(c[0], s, c[2]);
  const v = (x) => Math.round(x * 255 * 0.30);
  return "rgb(" + v(rgb[0]) + "," + v(rgb[1]) + "," + v(rgb[2]) + ")";
}
function brighten(hex, f) {
  const n = hex.replace("#", "");
  const v = (i) => Math.min(255, Math.round(parseInt(n.substr(i, 2), 16) * f));
  return "rgb(" + v(0) + "," + v(2) + "," + v(4) + ")";
}
function markColor(hex, wymorph) {
  const low = String(wymorph).toLowerCase();
  if (low.includes("_dark_")) return darken(hex, 0.6);
  if (low.includes("_light_")) return brighten(hex, 1.5);
  return hex;
}
// Turn one sprite definition into a DOM layer and add it to the creature.
// CSS masks tint grayscale artwork without needing a separate image per color.
function addSprite(s, hex) {
  const low = s.wymorph.toLowerCase();
  const isEyes = low.includes("/eyes/");
  const isColor = low.includes("color");
  const isShade = low.includes("shade");
  const isLine = low.includes("line");
  let el;
  if (isEyes) {
    const isDarkSc = low.includes("sc_color") && window._parts && window._parts.ey && String(window._parts.ey.name.evaluateItem) === "darkwide";
    if (isDarkSc) {
      el = document.createElement("div");
      el.className = "tintEl";
      el.style.backgroundColor = "#000000";
      el.style.maskImage = "url(" + s.wymorph + ")";
      el.style.webkitMaskImage = "url(" + s.wymorph + ")";
    } else if (low.includes("iris_color")) {
      el = document.createElement("div");
      el.className = "tintEl";
      el.style.backgroundColor = hex;
      el.style.maskImage = "url(" + s.wymorph + ")";
      el.style.webkitMaskImage = "url(" + s.wymorph + ")";
    } else if (low.includes("iris_shade")) {
      el = document.createElement("div");
      el.className = "tintEl";
      el.style.backgroundColor = darken(hex, 0.5);
      el.style.maskImage = "url(" + s.wymorph + ")";
      el.style.webkitMaskImage = "url(" + s.wymorph + ")";
    } else {
      el = document.createElement("img");
      el.wymorph = s.wymorph;
    }
  } else if (isColor || isShade || isLine) {
    el = document.createElement("div");
    el.className = "tintEl";
    el.style.backgroundColor = isShade ? shadeColor(hex) : isLine ? lineColor(hex) : hex;
    el.style.maskImage = "url(" + s.wymorph + ")";
    el.style.webkitMaskImage = "url(" + s.wymorph + ")";
  } else if (low.includes("/marks/")) {
    el = document.createElement("div");
    el.className = "tintEl";
    el.style.backgroundColor = markColor(hex, s.wymorph);
    el.style.maskImage = "url(" + s.wymorph + ")";
    el.style.webkitMaskImage = "url(" + s.wymorph + ")";
    if (low.includes("blend")) el.style.opacity = "0.5";
  } else {
    el = document.createElement("img");
    el.wymorph = s.wymorph;
  }
  el.style.zIndex = s.layer;
  if (isShade && !low.includes("iris_shade")) el.style.opacity = "0.25";
  stageEl.appendChild(el);
}
// Find a trait by its human-readable name, such as `wide` or `stars`.
function findByName(list, want) {
  want = String(want).trim().toLowerCase();
  const all = list.selectAll;
  for (const item of all) {
    if (String(item.name.evaluateItem).toLowerCase() === want) return item;
  }
  return null;
}
function syncCustomBox(leg, sh, nk, ch, ns, ey, eh, eb, tl, pm, sm, ter, pri, sec, eyc) {
  customInput.value = "PrimaryColor= " + pri.name.evaluateItem + " SecondaryColor= " + sec.name.evaluateItem + " EyeColor= " + eyc.name.evaluateItem + " PrimaryMarks= " + (pm ? pm.name.evaluateItem : "none") + " SecondaryMarks= " + sm.name.evaluateItem + " Eyes= " + ey.name.evaluateItem + " Shell= " + sh.name.evaluateItem + " Legs= " + leg.name.evaluateItem + " Earhorns= " + eh.name.evaluateItem + " Eyebrows= " + eb.name.evaluateItem + " Nose= " + ns.name.evaluateItem + " Neck= " + nk.name.evaluateItem + " Cheek= " + ch.name.evaluateItem + " Tail= " + tl.name.evaluateItem + " Tertiary= " + ter.name.evaluateItem;
}
// ============================================================
// CREATURE GENERATION + RENDERING
// ============================================================
// A creature is a bundle of selected traits. Rendering turns that bundle
// into image layers sorted by their draw order.
function renderCreature(leg, sh, nk, ch, ns, ey, eh, eb, tl, pm, sm, ter, pri, sec, eyc) {
  const secHex = sec.hex.evaluateItem;
  const priHex = pri.hex.evaluateItem;
  const eyeHex = eyc.hex.evaluateItem;
  window._parts = { leg, sh, nk, ch, ns, ey, eh, eb, tl, pm, sm, ter, pri, sec, eyc };
  stageEl.innerHTML = "";
  const sprites = legSprites(leg).concat(shellSprites(sh)).concat(neckSprites(nk)).concat(cheekSprites(ch)).concat(noseSprites(ns)).concat(eyeSprites(ey)).concat(earhornSprites(eh)).concat(eyebrowSprites(eb)).concat(tailSprites(tl)).concat(pm ? primaryMarkSprites(pm, sh, nk, ch, ns, ey, eh, eb, leg, tl) : []).concat(sm ? secondaryMarkSprites(sm, leg, nk, ch, tl) : []).concat([{ wymorph: "wymorph/genes/watermark.png", layer: spriteLayer("wymorph/genes/watermark.png") }]);
  sprites.sort((a, b) => a.layer - b.layer);
  window._lastSprites = sprites;
  window._lastSecHex = secHex;
  window._lastPriHex = priHex;
  window._lastEyeHex = eyeHex;
  window._lastEyeName = String(ey.name.evaluateItem);
  for (const s of sprites) {
    const low = s.wymorph.toLowerCase();
    const isPrimary = low.includes("/shell/") || low.includes("/nose/") || low.includes("/earhorns/") || low.includes("/marks/primary/");
    let hex;
    if (low.includes("/eyes/") && (low.includes("iris_color") || low.includes("iris_shade"))) hex = eyeHex;
    else hex = isPrimary ? priHex : secHex;
    addSprite(s, hex);
  }
  syncCustomBox(leg, sh, nk, ch, ns, ey, eh, eb, tl, pm, sm, ter, pri, sec, eyc);
}
function rollCreature() {
  const leg = rollLegs(), sh = rollShell(), nk = rollNeck(), ch = rollCheek(), ns = rollNose(), ey = rollEyes(), eh = rollEarhorns(), eb = rollEyebrows(), tl = rollTail();
  renderCreature(leg, sh, nk, ch, ns, ey, eh, eb, tl, rollPrimaryMark(sh, nk, ch, ns, ey, eh, eb, leg, tl), rollSecondaryMarks(leg), rollTertiary(), primaryColor.selectOne, secondaryColor.selectOne, eyeColor.selectOne);
}
function rollNewborn() {
  const leg = findByName(legs, "six"), sh = findByName(shell, "stars"), nk = findByName(neck, "tufty"), ch = findByName(cheek, "tuft"), ns = findByName(nose, "basic"), ey = findByName(eyes, "wide"), eh = findByName(earhorns, "pointy"), eb = findByName(eyebrows, "circle"), tl = findByName(tail, "soft");
  renderCreature(leg, sh, nk, ch, ns, ey, eh, eb, tl, null, rollSecondaryMarks(leg), rollTertiary(), primaryColor.selectOne, secondaryColor.selectOne, eyeColor.selectOne);
}
function rollCustom() {
  const want = {};
  for (const m of customInput.value.matchAll(/([A-Za-z]+)\s*=\s*([^\s=]+)/g)) {
    want[m[1].trim().toLowerCase()] = m[2].trim();
  }
  const leg = (want["legs"] && findByName(legs, want["legs"])) || rollLegs();
  const sh = (want["shell"] && findByName(shell, want["shell"])) || rollShell();
  const nk = (want["neck"] && findByName(neck, want["neck"])) || rollNeck();
  const ch = (want["cheek"] && findByName(cheek, want["cheek"])) || rollCheek();
  const ns = (want["nose"] && findByName(nose, want["nose"])) || rollNose();
  const ey = (want["eyes"] && findByName(eyes, want["eyes"])) || rollEyes();
  const eh = (want["earhorns"] && findByName(earhorns, want["earhorns"])) || rollEarhorns();
  const eb = (want["eyebrows"] && findByName(eyebrows, want["eyebrows"])) || rollEyebrows();
  const tl = (want["tail"] && findByName(tail, want["tail"])) || rollTail();
  const pmWant = want["primarymarks"];
  const pm = pmWant ? (pmWant.trim().toLowerCase() === "none" ? null : (findByName(primaryMarks, pmWant) || rollPrimaryMark(sh, nk, ch, ns, ey, eh, eb, leg, tl))) : rollPrimaryMark(sh, nk, ch, ns, ey, eh, eb, leg, tl);
  const sm = (want["secondarymarks"] && findByName(secondaryMarks, want["secondarymarks"])) || rollSecondaryMarks(leg);
  const ter = (want["tertiary"] && findByName(tertiary, want["tertiary"])) || rollTertiary();
  const pri = (want["primarycolor"] && findByName(primaryColor, want["primarycolor"])) || primaryColor.selectOne;
  const sec = (want["secondarycolor"] && findByName(secondaryColor, want["secondarycolor"])) || secondaryColor.selectOne;
  const eyc = (want["eyecolor"] && findByName(eyeColor, want["eyecolor"])) || eyeColor.selectOne;
  renderCreature(leg, sh, nk, ch, ns, ey, eh, eb, tl, pm, sm, ter, pri, sec, eyc);
}
function spriteHex(s) {
  const low = s.wymorph.toLowerCase();
  if (low.includes("/marks/primary/")) return markColor(window._lastPriHex, s.wymorph);
  if (low.includes("/marks/secondary/")) return markColor(window._lastSecHex, s.wymorph);
  if (low.includes("/eyes/") && low.includes("iris_color")) return window._lastEyeHex;
  if (low.includes("/eyes/") && low.includes("iris_shade")) return darken(window._lastEyeHex, 0.5);
  const isPrimary = low.includes("/shell/") || low.includes("/nose/") || low.includes("/earhorns/");
  return isPrimary ? window._lastPriHex : window._lastSecHex;
}
// Draw the current creature into a canvas and download it as PNG.
async function downloadImage() {
  const sprites = window._lastSprites;
  if (!sprites) return;
  const scale = 1;
  const loaded = await Promise.all(sprites.map(s => loadImage(s.wymorph)));
  const w = Math.max(...loaded.map(im => im.naturalWidth));
  const h = Math.max(...loaded.map(im => im.naturalHeight));
  const c = document.createElement("canvas");
  c.width = w * scale;
  c.height = h * scale;
  const ctx = c.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  for (let i = 0; i < sprites.length; i++) {
    const s = sprites[i];
    const im = loaded[i];
    const low = s.wymorph.toLowerCase();
    if (low.includes("/eyes/")) {
      const isDarkSc = low.includes("sc_color") && window._lastEyeName === "darkwide";
      if (isDarkSc || low.includes("iris_color") || low.includes("iris_shade")) {
        const t = document.createElement("canvas");
        t.width = w;
        t.height = h;
        const tctx = t.getContext("2d");
        tctx.imageSmoothingEnabled = false;
        tctx.drawImage(im, 0, 0);
        tctx.globalCompositeOperation = "source-in";
        tctx.fillStyle = isDarkSc ? "#000000" : spriteHex(s);
        tctx.fillRect(0, 0, w, h);
        ctx.globalAlpha = (low.includes("shade") && !low.includes("iris_shade")) ? 0.25 : 1;
        ctx.drawImage(t, 0, 0, c.width, c.height);
        continue;
      }
      ctx.globalAlpha = low.includes("shade") ? 0.25 : 1;
      ctx.drawImage(im, 0, 0, c.width, c.height);
      continue;
    }
    const hex = spriteHex(s);
    const isMarks = s.wymorph.toLowerCase().includes("/marks/");
    const isColor = s.wymorph.toLowerCase().includes("color");
    const isShade = s.wymorph.toLowerCase().includes("shade");
    const isLine = s.wymorph.toLowerCase().includes("line");
    ctx.globalAlpha = isShade ? 0.25 : 1;
    if (isMarks) {
      const t = document.createElement("canvas");
      t.width = w;
      t.height = h;
      const tctx = t.getContext("2d");
      tctx.imageSmoothingEnabled = false;
      tctx.drawImage(im, 0, 0);
      tctx.globalCompositeOperation = "source-in";
      tctx.fillStyle = spriteHex(s);
      tctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = low.includes("blend") ? 0.5 : ctx.globalAlpha;
      ctx.drawImage(t, 0, 0, c.width, c.height);
    } else if (isColor || isShade || isLine) {
      const t = document.createElement("canvas");
      t.width = w;
      t.height = h;
      const tctx = t.getContext("2d");
      tctx.imageSmoothingEnabled = false;
      tctx.drawImage(im, 0, 0);
      tctx.globalCompositeOperation = "source-in";
      tctx.fillStyle = isShade ? shadeColor(hex) : isLine ? lineColor(hex) : hex;
      tctx.fillRect(0, 0, w, h);
      ctx.drawImage(t, 0, 0, c.width, c.height);
    } else {
      ctx.drawImage(im, 0, 0, c.width, c.height);
    }
  }
  ctx.globalAlpha = 1;
  c.toBlob((blob) => {
    if (!blob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    let name = String(idInput.value || "").trim() || "creature";
    name = name.replace(/[\/\\?%*:|"<>]/g, "_").replace(/\.png$/i, "");
    a.download = name + ".png";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  });
}
async // Apply mutagem effects. Each named mutagem rerolls one part while
// leaving unrelated traits alone.
function morphCreature() {
  if (!window._parts) return;
  const txt = String(itemInput.value).toLowerCase();
  const has = (n) => txt.includes(n);
  const p = window._parts;
  // Re-roll excluding the currently applied trait, so morphs always change the trait.
  // Falls back to the current value if no alternative exists (e.g. tertiary).
  const morphRoll = (rollFn, cur) => {
    const curNm = cur ? String(cur.name.evaluateItem).toLowerCase() : "none";
    let v = rollFn();
    for (let i = 0; i < 25; i++) {
      const vNm = v ? String(v.name.evaluateItem).toLowerCase() : "none";
      if (vNm !== curNm) break;
      v = rollFn();
    }
    return v;
  };
  let leg = p.leg, sh = p.sh, nk = p.nk, ch = p.ch, ns = p.ns, ey = p.ey, eh = p.eh, eb = p.eb, tl = p.tl, pm = p.pm, sm = p.sm, ter = p.ter, pri = p.pri, sec = p.sec, eyc = p.eyc;
  let changed = false;
  if (has("pawscale")) { leg = morphRoll(() => rollLegs(), leg); changed = true; }
  if (has("shellcluster")) { sh = morphRoll(() => rollShell(), sh); changed = true; }
  if (has("collamoon")) { nk = morphRoll(() => rollNeck(), nk); changed = true; }
  if (has("chespike")) { ch = morphRoll(() => rollCheek(), ch); changed = true; }
  if (has("snootooth")) { ns = morphRoll(() => rollNose(), ns); changed = true; }
  if (has("oculaorb")) { ey = morphRoll(() => rollEyes(), ey); changed = true; }
  if (has("crowncrystal")) { eh = morphRoll(() => rollEarhorns(), eh); changed = true; }
  if (has("antepetal")) { eb = morphRoll(() => rollEyebrows(), eb); changed = true; }
  if (has("tailfig")) { tl = morphRoll(() => rollTail(), tl); changed = true; }
  if (has("tristar")) { ter = morphRoll(() => rollTertiary(), ter); changed = true; }
  if (has("primaswirl")) { pri = morphRoll(() => primaryColor.selectOne, pri); changed = true; }
  if (has("auxswirl")) { sec = morphRoll(() => secondaryColor.selectOne, sec); changed = true; }
  if (has("oculaswirl")) { eyc = morphRoll(() => eyeColor.selectOne, eyc); changed = true; }
  if (!changed) return;
  if (has("shellcluster")) pm = morphRoll(() => rollPrimaryMark(sh, nk, ch, ns, ey, eh, eb, leg, tl), pm);
  renderCreature(leg, sh, nk, ch, ns, ey, eh, eb, tl, pm, sm, ter, pri, sec, eyc);
}
// ============================================================
// FORUM POST GENERATION
// ============================================================
// The generator outputs BBCode. This function makes a rough HTML preview.
function bbcodeToHtml(bb) {
  let s = String(bb).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const codes = [];
  s = s.replace(/\[code\]([\s\S]*?)\[\/code\]/g, (m, p1) => { codes.push(p1); return "\u0000CODE" + (codes.length - 1) + "\u0000"; });
  s = s.replace(/\[img\]([\s\S]*?)\[\/img\]/g, (m, p1) => '<img wymorph="' + p1.trim() + '" style="max-width:100%">');
  s = s.replace(/\[url=([^\]]+)\]([\s\S]*?)\[\/url\]/g, '<a href="$1" target="_blank">$2</a>');
  s = s.replace(/\[url\]([\s\S]*?)\[\/url\]/g, '<a href="$1" target="_blank">$1</a>');
  s = s.replace(/\[b\]([\s\S]*?)\[\/b\]/g, "<b>$1</b>");
  s = s.replace(/\[u\]([\s\S]*?)\[\/u\]/g, "<u>$1</u>");
  s = s.replace(/\[i\]([\s\S]*?)\[\/i\]/g, "<i>$1</i>");
  s = s.replace(/\[center\]([\s\S]*?)\[\/center\]/g, '<div style="text-align:center">$1</div>');
  s = s.replace(/\[quote\]([\s\S]*?)\[\/quote\]/g, '<blockquote style="border:1px solid #999;padding:8px;background:#f9f9f9">$1</blockquote>');
  s = s.replace(/\[size=([^\]]+)\]([\s\S]*?)\[\/size\]/g, '<span style="font-size:$1%">$2</span>');
  s = s.replace(/\n/g, "<br>");
  s = s.replace(/\u0000CODE(\d+)\u0000/g, (m, n) => "<pre style=\"background:#eee;padding:8px;white-space:pre-wrap\">" + codes[Number(n)] + "</pre>");
  return s;
}
function buildPost(head) {
  const p = window._parts;
  if (!p) return "";
  const un = usernameInput.value;
  const uid = useridInput.value;
  const id = idInput.value.trim();
  const nm = (x) => String(x.name.evaluateItem);
  const pri = nm(p.pri), sec = nm(p.sec), eyc = nm(p.eyc);
  const pm = p.pm ? nm(p.pm) : "none";
  const sm = nm(p.sm), ey = nm(p.ey), sh = nm(p.sh), leg = nm(p.leg), eh = nm(p.eh), eb = nm(p.eb), ns = nm(p.ns), nk = nm(p.nk), ch = nm(p.ch), tl = nm(p.tl), ter = nm(p.ter);
  return "[quote]\n[b][u]" + head + "[/u][/b]\n[b]Owner:[/b] " + un + " ✦ " + uid + "\n[center]⊰═══꩜═══꩜═══꩜═══ [b]#" + id + "[/b] ═══꩜═══꩜═══꩜═══⊱\n[img]https://raw.githubusercontent.com/redvoidlilly/wyrmorph/refs/heads/main/id/" + id + ".png[/img]\n[b]PrimaryColor=[/b] " + pri + "︱[b]SecondaryColor=[/b] " + sec + "︱[b]EyeColor=[/b] " + eyc + "\n[b]PrimaryMarks=[/b] " + pm + "︱[b]SecondaryMarks=[/b] " + sm + "︱[b]Eyes=[/b] " + ey + "\n[b]Shell=[/b] " + sh + "︱[b]Legs=[/b] " + leg + "︱[b]Earhorns=[/b] " + eh + "︱[b]Eyebrows=[/b] " + eb + "\n[b]Nose=[/b] " + ns + "︱[b]Neck=[/b] " + nk + "︱[b]Cheek=[/b] " + ch + "︱[b]Tail=[/b] " + tl + "︱[b]Tertiary=[/b] " + ter + "\n\n[code][url=https://www.chickensmoothie.com/Forum/viewtopic.php?f=58&t=5147582][img]https://raw.githubusercontent.com/redvoidlilly/wyrmorph/refs/heads/main/id/00000.png[/img][/url][/code]\n⊰═══꩜═══꩜═══꩜═══꩜═══꩜═══꩜═══꩜═══⊱\n[/center]\n[/quote]";
}
function buildBirthpost() {
  return buildPost("꩜ A Wyrmorph is Born!◝(ᵔᗜᵔ)◜꩜");
}
function buildMorphpost() {
  return buildPost("꩜ Your Wyrmorph has been transformed! (˶ᵔ ᵕ ᵔ˶) ꩜");
}
// Export all saved creature records as a ZIP file.
// JSZip is stored locally, so this does not depend on a CDN.
async function downloadPetdataZip() {
  const JSZip = window.JSZip;
  if (!JSZip) throw new Error("Local JSZip library was not loaded.");
  const zip = new JSZip();
  const entries = await petdata.entries();
  for (const [k, v] of entries) zip.file(String(k) + ".txt", String(v));
  const blob = await zip.generateAsync({ type: "blob" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "petdata.zip";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}
// Replace saved creature records with records from a ZIP file.
async function importPetdataZip(file) {
  if (!file) return;
  const JSZip = window.JSZip;
  if (!JSZip) throw new Error("Local JSZip library was not loaded.");
  const zip = await JSZip.loadAsync(file);
  const pairs = [];
  for (const [path, entry] of Object.entries(zip.files)) {
    if (entry.dir) continue;
    const base = path.split("/").pop();
    if (!base.toLowerCase().endsWith(".txt")) continue;
    const id = base.slice(0, -4);
    if (!id) continue;
    pairs.push([id, await entry.async("string")]);
  }
  const oldKeys = await petdata.keys();
  if (oldKeys.length) await petdata.deleteMany(oldKeys);
  if (pairs.length) await petdata.setMany(pairs);
}
async function loadId() {
  const id = String(idInput.value || "").trim();
  if (!id) return;
  const txt = await petdata.get(id);
  if (txt == null) {
    loadErrorEl.hidden = false;
    clearTimeout(window._loadErrorT);
    window._loadErrorT = setTimeout(() => { loadErrorEl.hidden = true; }, 1500);
    return;
  }
  customInput.value = String(txt);
  await rollCustom();
  // Old saves may predate newer traits (e.g. Cheek) and lack those keys.
  // rollCustom fills gaps with a fresh roll, so persist the completed record
  // to keep every load stable instead of re-randomizing the missing trait.
  const raw = String(txt);
  const needsBackfill = ["primarycolor", "secondarycolor", "eyecolor", "primarymarks", "secondarymarks", "eyes", "shell", "legs", "earhorns", "eyebrows", "nose", "neck", "cheek", "tail", "tertiary"].some((k) => !(new RegExp(k + "\\s*=", "i").test(raw)));
  if (needsBackfill) await petdata.set(id, String(customInput.value));
}
async function saveData() {
  const id = String(idInput.value || "").trim();
  if (!id) return;
  await petdata.set(id, String(customInput.value));
  savePopupEl.hidden = false;
  clearTimeout(window._savePopupT);
  window._savePopupT = setTimeout(() => { savePopupEl.hidden = true; }, 1500);
}
function showBirthpost() {
  postCodeEl.value = buildBirthpost();
  postPreviewEl.innerHTML = bbcodeToHtml(postCodeEl.value);
  postOutEl.hidden = false;
}
function showMorphpost() {
  postCodeEl.value = buildMorphpost();
  postPreviewEl.innerHTML = bbcodeToHtml(postCodeEl.value);
  postOutEl.hidden = false;
}
function buildDropPost() {
  const d = window._lastDrop;
  if (!d) return "";
  const un = dropUsernameInput.value;
  const uid = dropUseridInput.value;
  const mimic = String(d.mimic || window.mimic || window._mimic || "").toLowerCase();
  const base = "https://raw.githubusercontent.com/redvoidlilly/wyrmorph/refs/heads/main";
  const mimicImg = mimic ? "[img]" + base + "/mimics/" + mimic + ".png[/img]" : "";
  let lootLine = "";
  if (d.pearlegg > 0) lootLine += "︱[img]" + base + "/items/pearlegg.png[/img][b]Pearleggs[/b]=x" + d.pearlegg + "︱";
  if (d.catalystcoin > 0) lootLine += "︱[img]" + base + "/items/catalystcoin.png[/img][b]Catalystcoins[/b]=x" + d.catalystcoin + "︱";
  let mutLine = "";
  for (const k of Object.keys(d.mutagems || {}).sort()) {
    const c = d.mutagems[k];
    if (!c) continue;
    mutLine += "︱[img]" + base + "/items/mutagems/" + k + ".png[/img][b]" + k + "[/b]=x" + c + "︱";
  }
  let middle = mimicImg;
  if (lootLine) middle += "\n" + lootLine;
  if (mutLine) middle += (lootLine ? "\n\n" : "\n") + mutLine;
  return "[quote]\n[b][u]꩜ Aquired Mimic Loot! ٩(^ᗜ^ )و ꩜[/u][/b]\n[b]Owner:[/b] " + un + " ✦ " + uid + "\n[center]⊰═══꩜═══꩜═══꩜═══꩜═══꩜═══꩜═══꩜═══⊱\n" + middle + "\n⊰═══꩜═══꩜═══꩜═══꩜═══꩜═══꩜═══꩜═══⊱\n[/center]\n[/quote]";
}
function showDropPost() {
  if (!window._lastDrop) return;
  dropPostCodeEl.value = buildDropPost();
  dropPostPreviewEl.innerHTML = bbcodeToHtml(dropPostCodeEl.value);
  dropPostOutEl.hidden = false;
}
// ============================================================
// BUTTONS / INPUT EVENTS
// ============================================================
// Everything below connects HTML controls to the functions above.
homeTabBtn.onclick = () => showTab("home");
dropsTabBtn.onclick = () => showTab("drops");
morphsTabBtn.onclick = () => showTab("morphs");
accessCodeBtn.onclick = tryUnlock;
accessCodeInput.onkeydown = (e) => { if (e.key === "Enter") tryUnlock(); };
showTab("home");
versBtn.onclick = () => {
  const mobile = document.body.classList.toggle("mobile-vers");
  versBtn.textContent = mobile ? "desktop version" : "mobile version";
};
window._userid = "";
window._username = "";
window._id = "";
window._dropUserid = "";
window._dropUsername = "";
window._dropStandard = "iron";
window._dropFestivals = "spooky";
window._dropSeasonal = "winter";
window._mimic = "";
window.mimic = "";
window.CC_STATS = { iron: { max: 3, avg: 2 }, gold: { max: 5, avg: 3 }, prismatic: { max: 10, avg: 7 }, platinum: { max: 10, avg: 7 }, spooky: { max: 7, avg: 4 }, gifted: { max: 7, avg: 4 }, lovely: { max: 7, avg: 4 }, reborn: { max: 7, avg: 4 }, silly: { max: 7, avg: 4 }, winter: { max: 5, avg: 3 }, spring: { max: 5, avg: 3 }, summer: { max: 5, avg: 3 }, fall: { max: 5, avg: 3 }, custom: { max: 2, avg: 2 } };
window.R_STATS = { iron: { max: 5, avg: 4 }, gold: { max: 7, avg: 5 }, prismatic: { max: 15, avg: 15 }, platinum: { max: 15, avg: 15 }, spooky: { max: 12, avg: 10 }, gifted: { max: 12, avg: 10 }, lovely: { max: 12, avg: 10 }, reborn: { max: 12, avg: 10 }, silly: { max: 12, avg: 10 }, winter: { max: 10, avg: 7 }, spring: { max: 10, avg: 7 }, summer: { max: 10, avg: 7 }, fall: { max: 10, avg: 7 }, custom: { max: 3, avg: 3 } };
function updateMimic(changed) {
  const boxes = [dropStandardCheck, dropFestivalsCheck, dropSeasonalCheck, dropChancesCheck];
  if (changed && changed.checked) {
    for (const b of boxes) if (b !== changed) b.checked = false;
  }
  let v = "";
  if (dropStandardCheck.checked) v = dropStandardSelect.value;
  else if (dropFestivalsCheck.checked) v = dropFestivalsSelect.value;
  else if (dropSeasonalCheck.checked) v = dropSeasonalSelect.value;
  else if (dropChancesCheck.checked) v = "custom";
  window._mimic = v;
  window.mimic = v;
}
dropStandardCheck.onchange = () => updateMimic(dropStandardCheck);
dropFestivalsCheck.onchange = () => updateMimic(dropFestivalsCheck);
dropSeasonalCheck.onchange = () => updateMimic(dropSeasonalCheck);
dropChancesCheck.onchange = () => updateMimic(dropChancesCheck);
dropUseridInput.oninput = () => { window._dropUserid = dropUseridInput.value; };
dropUsernameInput.oninput = () => { window._dropUsername = dropUsernameInput.value; };
dropStandardSelect.onchange = () => { window._dropStandard = dropStandardSelect.value; updateMimic(); };
dropFestivalsSelect.onchange = () => { window._dropFestivals = dropFestivalsSelect.value; updateMimic(); };
dropSeasonalSelect.onchange = () => { window._dropSeasonal = dropSeasonalSelect.value; updateMimic(); };
// ============================================================
// DROP / LOOT RNG
// ============================================================
// These tables are the main balancing knobs for loot drops.
function pearleggChance(m) {
  m = String(m || window.mimic || "").toLowerCase();
  if (m === "gold" || m === "prismatic" || m === "platinum" || m === "winter" || m === "spring" || m === "summer" || m === "fall") return 1;
  if (m === "spooky" || m === "gifted" || m === "lovely" || m === "reborn" || m === "silly") return 0.5;
  if (m === "iron") return 0.25;
  return 0;
}
function rollPearleggs(m) {
  m = String(m || window.mimic || "").toLowerCase();
  if (m === "prismatic" || m === "platinum") {
    const r = Math.random();
    if (r < 0.05) return 3;
    if (r < 0.25) return 2;
    return 1;
  }
  return Math.random() < pearleggChance(m) ? 1 : 0;
}
function rollCatalystcoins(m) {
  m = String(m || window.mimic || "").toLowerCase();
  const st = (window.CC_STATS && window.CC_STATS[m]) || { max: 2, avg: 2 };
  const min = (m === "prismatic" || m === "platinum") ? 5 : 2;
  const max = Math.max(min, st.max);
  let avg = Math.min(max, Math.max(min, st.avg));
  if (max <= min) return min;
  let sigma = (max - min) / 4;
  if (avg !== min && avg !== max) sigma = Math.min(sigma, (max - avg) / 2, (avg - min) / 2);
  sigma = Math.max(sigma, 0.5);
  let u1 = 0, u2 = 0;
  do { u1 = Math.random(); } while (u1 <= 1e-9);
  u2 = Math.random();
  const g = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  let v = Math.round(avg + sigma * g);
  if (v < min) v = min;
  if (v > max) v = max;
  return v;
}
function rollMutagems(m) {
  m = String(m || window.mimic || "").toLowerCase();
  const st = (window.R_STATS && window.R_STATS[m]) || { max: 3, avg: 3 };
  const min = (m === "prismatic" || m === "platinum") ? 7 : 3;
  const max = Math.max(min, st.max);
  let avg = Math.min(max, Math.max(min, st.avg));
  if (max <= min) return min;
  let sigma = (max - min) / 4;
  if (avg !== min && avg !== max) sigma = Math.min(sigma, (max - avg) / 2, (avg - min) / 2);
  sigma = Math.max(sigma, 0.5);
  let u1 = 0, u2 = 0;
  do { u1 = Math.random(); } while (u1 <= 1e-9);
  u2 = Math.random();
  const g = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  let v = Math.round(avg + sigma * g);
  if (v < min) v = min;
  if (v > max) v = max;
  return v;
}
window.MUTAGEM_WEIGHTS = { antepetal: 30, auxswirl: 50, chespike: 30, collamoon: 0, crowncrystal: 50, oculaorb: 50, oculaswirl: 50, pawscale: 30, primaswirl: 50, shellcluster: 30, snootooth: 30, tailfig: 30, tristar: 15 };
function pickMutagemType() {
  const entries = Object.entries(window.MUTAGEM_WEIGHTS).filter((kv) => kv[1] > 0);
  let total = 0;
  for (const kv of entries) total += kv[1];
  let r = Math.random() * total;
  for (const kv of entries) {
    r -= kv[1];
    if (r < 0) return kv[0];
  }
  return entries[entries.length - 1][0];
}
function rollMutagemDrops(m) {
  const n = rollMutagems(m);
  const counts = {};
  for (let i = 0; i < n; i++) {
    const t = pickMutagemType();
    counts[t] = (counts[t] || 0) + 1;
  }
  return counts;
}
function rollDrops() {
  const m = String(window.mimic || window._mimic || "").toLowerCase();
  const n = rollPearleggs();
  const cc = rollCatalystcoins();
  const rg = rollMutagemDrops();
  window._lastDrop = { pearlegg: n, catalystcoin: cc, mutagems: rg, mimic: m };
  dropLootEl.innerHTML = "";
  const addRow = (wymorph, txt) => {
    const row = document.createElement("div");
    const im = document.createElement("img");
    im.wymorph = wymorph;
    im.style.imageRendering = "pixelated";
    im.style.verticalAlign = "middle";
    row.appendChild(im);
    const sp = document.createElement("span");
    sp.textContent = " " + txt;
    row.appendChild(sp);
    dropLootEl.appendChild(row);
  };
  if (n > 0) addRow("wymorph/items/pearlegg.png", "pearlegg x" + n);
  if (cc > 0) addRow("wymorph/items/catalystcoin.png", "catalystcoin x" + cc);
  for (const k of Object.keys(rg).sort()) addRow("wymorph/items/mutagems/" + k + ".png", k + " x" + rg[k]);
  if (!dropLootEl.hasChildNodes()) dropLootEl.textContent = "no loot";
}
dropRollBtn.onclick = rollDrops;
dropPostBtn.onclick = showDropPost;
copyDropPostBtn.onclick = () => { dropPostCodeEl.select(); document.execCommand("copy"); navigator.clipboard && navigator.clipboard.writeText(dropPostCodeEl.value); };
useridInput.oninput = () => { window._userid = useridInput.value; };
usernameInput.oninput = () => { window._username = usernameInput.value; };
idInput.oninput = () => { window._id = idInput.value; };
generateBtn.onclick = rollCreature;
newbornBtn.onclick = rollNewborn;
customBtn.onclick = rollCustom;
morphBtn.onclick = morphCreature;
downloadBtn.onclick = downloadImage;
birthpostBtn.onclick = showBirthpost;
morphpostBtn.onclick = showMorphpost;
copyPostBtn.onclick = () => { postCodeEl.select(); document.execCommand("copy"); navigator.clipboard && navigator.clipboard.writeText(postCodeEl.value); };
saveDataBtn.onclick = saveData;
loadIdBtn.onclick = loadId;
downloadPetdataBtn.onclick = downloadPetdataZip;
importPetdataBtn.onclick = () => importPetdataInput.click();
importPetdataInput.onchange = async () => { await importPetdataZip(importPetdataInput.files[0]); importPetdataInput.value = ""; };
rollCreature();

