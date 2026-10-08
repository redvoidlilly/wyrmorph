/*
 * WYRMORPH CREATURE GENERATOR - TRAIT DATA
 * -----------------------------------------
 * This file is intentionally mostly "data": it describes which traits exist,
 * what rarity they have, and which image files belong to them.
 *
 * If you want to ADD A NEW GENE, this is usually the first place to look.
 * Each `new Trait({...})` is one possible gene.
 *
 * The small PVal/PList/Trait classes at the top are compatibility helpers
 * carried over from the Perchance version. They make the converted code
 * behave similarly to Perchance's `.evaluateItem` / `.selectOne` / `.selectAll`
 * behavior. They are not required by the browser itself.
 */

class PVal {
constructor(value) { this._v = value; }
get evaluateItem() { return String(this._v); }
}
class PList {
constructor(items, weights) {
  this._items = items;
  if (weights) {
    this._total = 0;
    this._cum = weights.map(w => (this._total += w));
  }
}
get selectAll() { return this._items.slice(); }
get selectOne() {
  if (!this._cum) return this._items[Math.floor(Math.random() * this._items.length)];
  const r = Math.random() * this._total;
  for (let n = 0; n < this._cum.length; n++) if (r < this._cum[n]) return this._items[n];
  return this._items[this._items.length - 1];
}
get getLength() { return this._items.length; }
}
class Trait {
constructor(def) {
  if (def.name !== undefined) this.name = new PVal(def.name);
  if (def.rarity !== undefined) this.rarity = new PVal(def.rarity);
  if (def.hex !== undefined) this.hex = new PVal(def.hex);
  if (def.hindlegs !== undefined) this.hindlegs = new PVal(def.hindlegs);
  if (def.brightness !== undefined) this.brightness = new PVal(def.brightness);
  if (def.files !== undefined) this.files = new PList(def.files.map(f => new PVal(f)));
  if (def.tags !== undefined) this.tags = new PList(def.tags.map(t => new PVal(t)));
  if (def.conds !== undefined) this.conds = new PList(def.conds.map(c => new PVal(c)));
}
}

const shell = new PList([
new Trait({"name":"stars","rarity":"common","files":["src/genes/shell/stars_color.webp","src/genes/shell/stars_line.webp","src/genes/shell/stars_shade.webp"]}),
new Trait({"name":"clovers","rarity":"common","files":["src/genes/shell/clover_color.webp","src/genes/shell/clover_line.webp","src/genes/shell/clover_shade.webp"]}),
new Trait({"name":"isopod","rarity":"uncommon","files":["src/genes/shell/isopod_color.webp","src/genes/shell/isopod_line.webp","src/genes/shell/isopod_shade.webp"]}),
new Trait({"name":"mossy","rarity":"rare","files":["src/genes/shell/mossy_color.webp","src/genes/shell/mossy_line.webp","src/genes/shell/mossy_shade.webp"]}),
]);
const neck = new PList([
new Trait({"name":"floofy","rarity":"uncommon","files":["src/genes/neck/floofy_color.webp","src/genes/neck/floofy_shade.webp","src/genes/neck/floofy_line.webp"]}),
new Trait({"name":"mothruff","rarity":"unusual","files":["src/genes/neck/mothruff_color.webp","src/genes/neck/mothruff_shade.webp","src/genes/neck/mothruff_line.webp"],"tags":["mane"]}),
new Trait({"name":"smooth","rarity":"uncommon","files":["src/genes/neck/smooth_color.webp","src/genes/neck/smooth_shade.webp","src/genes/neck/smooth_line.webp"]}),
new Trait({"name":"tufty","rarity":"common","files":["src/genes/neck/tufty_color.webp","src/genes/neck/tufty_shade.webp","src/genes/neck/tufty_line.webp"]}),
]);
const cheek = new PList([
new Trait({"name":"axolotl","rarity":"rare","files":["src/genes/cheek/axolotl_color.webp","src/genes/cheek/axolotl_shade.webp","src/genes/cheek/axolotl_line.webp"]}),
new Trait({"name":"squishy","rarity":"common","files":["src/genes/cheek/squishy_color.webp","src/genes/cheek/squishy_line.webp"]}),
new Trait({"name":"tuft","rarity":"common","files":["src/genes/cheek/tuft_color.webp","src/genes/cheek/tuft_shade.webp","src/genes/cheek/tuft_line.webp"]}),
]);
const nose = new PList([
new Trait({"name":"basic","rarity":"common","files":["src/genes/nose/basic_color.webp","src/genes/nose/basic_line.webp"]}),
new Trait({"name":"whisker","rarity":"common","files":["src/genes/nose/basic_color.webp","src/genes/nose/whisker_line.webp"]}),
new Trait({"name":"horn","rarity":"uncommon","files":["src/genes/nose/horn_color.webp","src/genes/nose/horn_line.webp"]}),
new Trait({"name":"bulbs","rarity":"uncommon","files":["src/genes/nose/bulbs_color.webp","src/genes/nose/bulbs_line.webp","src/genes/nose/bulbs_shade.webp"]}),
]);
const eyes = new PList([
new Trait({"name":"wide","rarity":"common","files":["src/genes/eyes/wide_sc_color.webp","src/genes/eyes/wide_sc_shade.webp","src/genes/eyes/wide_iris_color.webp","src/genes/eyes/wide_iris_shade.webp","src/genes/eyes/wide_line.webp"]}),
new Trait({"name":"brightwide","rarity":"common","files":["src/genes/eyes/wide_sc_color.webp","src/genes/eyes/wide_sc_shade.webp","src/genes/eyes/wide_iris_color.webp","src/genes/eyes/wide_iris_shade.webp","src/genes/eyes/wide_line.webp","src/genes/eyes/wide_bright.webp"]}),
new Trait({"name":"darkwide","rarity":"rare","files":["src/genes/eyes/wide_sc_color.webp","src/genes/eyes/wide_sc_shade.webp","src/genes/eyes/wide_iris_color.webp","src/genes/eyes/wide_iris_shade.webp","src/genes/eyes/wide_line.webp"]}),
]);
const earhorns = new PList([
new Trait({"name":"pointy","rarity":"common","files":["src/genes/earhorns/pointy_color.webp","src/genes/earhorns/pointy_line.webp","src/genes/earhorns/pointy_shade.webp"]}),
new Trait({"name":"drooped","rarity":"common","files":["src/genes/earhorns/drooped_color.webp","src/genes/earhorns/drooped_line.webp","src/genes/earhorns/drooped_shade.webp"]}),
new Trait({"name":"drake","rarity":"common","files":["src/genes/earhorns/drake_color.webp","src/genes/earhorns/drake_line.webp","src/genes/earhorns/drake_shade.webp"]}),
new Trait({"name":"fluffy","rarity":"uncommon","files":["src/genes/earhorns/fluffy_color.webp","src/genes/earhorns/fluffy_line.webp","src/genes/earhorns/fluffy_shade.webp"]}),
new Trait({"name":"innocent","rarity":"uncommon","files":["src/genes/earhorns/innocent_color.webp","src/genes/earhorns/innocent_line.webp","src/genes/earhorns/innocent_shade.webp"]}),
]);
const eyebrows = new PList([
new Trait({"name":"circle","rarity":"common","files":["src/genes/eyebrow/circle_color.webp","src/genes/eyebrow/circle_line.webp"]}),
new Trait({"name":"v","rarity":"rare","files":["src/genes/eyebrow/v_color.webp","src/genes/eyebrow/v_line.webp"]}),
new Trait({"name":"alien","rarity":"uncommon","files":["src/genes/eyebrow/alien_color.webp","src/genes/eyebrow/alien_line.webp"]}),
new Trait({"name":"mothy","rarity":"uncommon","files":["src/genes/eyebrow/mothy_color.webp","src/genes/eyebrow/mothy_line.webp"]}),
new Trait({"name":"wing","rarity":"unusual","files":["src/genes/eyebrow/wing_color.webp","src/genes/eyebrow/wing_line.webp"]}),
]);
const legs = new PList([
new Trait({"name":"six","rarity":"common","hindlegs":"true","files":["src/genes/legs/six_color.webp","src/genes/legs/six_line.webp","src/genes/legs/six_shade.webp"]}),
new Trait({"name":"wyvern","rarity":"unusual","hindlegs":"true","files":["src/genes/legs/l_wyvern_color.webp","src/genes/legs/l_wyvern_line.webp","src/genes/legs/r_wyvern_color.webp","src/genes/legs/r_wyvern_line.webp","src/genes/legs/r_wyvern_shade.webp"]}),
new Trait({"name":"floater","rarity":"rare","hindlegs":"false","files":["src/genes/legs/floater_color.webp","src/genes/legs/floater_line.webp","src/genes/legs/floater_shade.webp"]}),
new Trait({"name":"flipper","rarity":"uncommon","hindlegs":"true","files":["src/genes/legs/flipper_color.webp","src/genes/legs/flipper_line.webp","src/genes/legs/flipper_shade.webp"]}),
]);
const tail = new PList([
new Trait({"name":"soft","rarity":"common","files":["src/genes/tail/soft_color.webp","src/genes/tail/soft_line.webp","src/genes/tail/tail_shade.webp"]}),
new Trait({"name":"devil","rarity":"rare","files":["src/genes/tail/devil_color.webp","src/genes/tail/devil_line.webp","src/genes/tail/tail_shade.webp"]}),
new Trait({"name":"fuzzed","rarity":"common","files":["src/genes/tail/fuzzed_color.webp","src/genes/tail/fuzzed_line.webp","src/genes/tail/tail_shade.webp"]}),
new Trait({"name":"stinger","rarity":"rare","files":["src/genes/tail/stinger_color.webp","src/genes/tail/stinger_line.webp","src/genes/tail/tail_shade.webp"]}),
new Trait({"name":"tassel","rarity":"uncommon","files":["src/genes/tail/tassel_color.webp","src/genes/tail/tassel_line.webp","src/genes/tail/tail_shade.webp"]}),
new Trait({"name":"whirl","rarity":"unusual","files":["src/genes/tail/whirl_color.webp","src/genes/tail/whirl_line.webp","src/genes/tail/whirl_shade.webp"]}),
new Trait({"name":"fishy","rarity":"rare","files":["src/genes/tail/fishy_color.webp","src/genes/tail/fishy_line.webp","src/genes/tail/tail_shade.webp"]}),
]);
const primaryMarks = new PList([
new Trait({"name":"core","rarity":"common","brightness":"dark","files":["src/genes/marks/primary/stars_dark_b_core.webp","src/genes/marks/primary/clovers_dark_b_core.webp","src/genes/marks/primary/nose_dark_b_core.webp","src/genes/marks/primary/earhorns_dark_b_core.webp","src/genes/marks/primary/isopod_dark_b_core.webp","src/genes/marks/primary/mossy_dark_b_core.webp"],"conds":["stars","clovers","isopod","mossy"]}),
new Trait({"name":"alternating","rarity":"common","brightness":"dark","files":["src/genes/marks/primary/stars_dark_b_alternating.webp","src/genes/marks/primary/clovers_dark_b_alternating.webp","src/genes/marks/primary/isopod_dark_b_alternating.webp","src/genes/marks/primary/mossy_dark_b_alternating.webp"],"conds":["stars","clovers","isopod","mossy"]}),
new Trait({"name":"drip","rarity":"rare","brightness":"dark","files":["src/genes/marks/primary/stars_dark_b_drip.png","src/genes/marks/primary/clovers_dark_b_drip.png","src/genes/marks/primary/stars_dark_bblend_drip.png","src/genes/marks/primary/clovers_dark_bblend_drip.png","src/genes/marks/primary/pointy_dark_b_drip.webp","src/genes/marks/primary/pointy_dark_bblend_drip.webp","src/genes/marks/primary/drooped_dark_b_drip.webp","src/genes/marks/primary/drooped_dark_bblend_drip.webp","src/genes/marks/primary/drake_dark_b_drip.webp","src/genes/marks/primary/drake_dark_bblend_drip.webp","src/genes/marks/primary/fluffy_dark_b_drip.webp","src/genes/marks/primary/fluffy_dark_bblend_drip.webp","src/genes/marks/primary/innocent_dark_b_drip.webp","src/genes/marks/primary/innocent_dark_bblend_drip.webp","src/genes/marks/primary/isopod_dark_b_drip.webp","src/genes/marks/primary/isopod_dark_bblend_drip.webp","src/genes/marks/primary/mossy_dark_b_drip.webp","src/genes/marks/primary/mossy_dark_bblend_drip.webp"],"conds":["stars","clovers","isopod","mossy"]}),
new Trait({"name":"highstripe","rarity":"common","brightness":"dark","files":["src/genes/marks/primary/stars_dark_b_highstripe.webp","src/genes/marks/primary/pointy_dark_b_highstripe.webp","src/genes/marks/primary/drooped_dark_b_highstripe.webp","src/genes/marks/primary/drake_dark_b_highstripe.webp","src/genes/marks/primary/fluffy_dark_b_highstripe.webp","src/genes/marks/primary/innocent_dark_b_highstripe.webp","src/genes/marks/primary/isopod_dark_b_highstripe.webp","src/genes/marks/primary/mossy_dark_b_highstripe.webp"],"conds":["stars","isopod","mossy"]}),
new Trait({"name":"ripple","rarity":"uncommon","brightness":"dark","files":["src/genes/marks/primary/stars_dark_m_ripple.webp","src/genes/marks/primary/clovers_dark_m_ripple.webp","src/genes/marks/primary/basic_dark_m_ripple.webp","src/genes/marks/primary/bulbs_dark_m_ripple.webp","src/genes/marks/primary/horn_dark_m_ripple.webp","src/genes/marks/primary/whiskers_dark_m_ripple.webp","src/genes/marks/primary/pointy_dark_m_ripple.webp","src/genes/marks/primary/drooped_dark_m_ripple.webp","src/genes/marks/primary/drake_dark_m_ripple.webp","src/genes/marks/primary/fluffy_dark_m_ripple.webp","src/genes/marks/primary/innocent_dark_m_ripple.webp","src/genes/marks/primary/isopod_dark_m_ripple.webp","src/genes/marks/primary/mossy_dark_m_ripple.webp"],"conds":["stars","clovers","isopod","mossy"]}),
new Trait({"name":"stripes","rarity":"common","brightness":"dark","files":["src/genes/marks/primary/stars_dark_m_stripes.webp","src/genes/marks/primary/clovers_dark_m_stripes.webp","src/genes/marks/primary/pointy_dark_m_stripes.webp","src/genes/marks/primary/drooped_dark_m_stripes.webp","src/genes/marks/primary/drake_dark_m_stripes.webp","src/genes/marks/primary/fluffy_dark_m_stripes.webp","src/genes/marks/primary/innocent_dark_m_stripes.webp","src/genes/marks/primary/isopod_dark_m_stripes.webp","src/genes/marks/primary/mossy_dark_m_stripes.webp"],"conds":["stars","clovers","isopod","mossy"]}),
new Trait({"name":"lowstripe","rarity":"common","brightness":"light","files":["src/genes/marks/primary/stars_light_b_lowstripe.webp","src/genes/marks/primary/clovers_light_b_lowstripe.webp","src/genes/marks/primary/pointy_light_b_lowstripe.webp","src/genes/marks/primary/drooped_light_b_lowstripe.webp","src/genes/marks/primary/drake_light_b_lowstripe.webp","src/genes/marks/primary/fluffy_light_b_lowstripe.webp","src/genes/marks/primary/innocent_light_b_lowstripe.webp","src/genes/marks/primary/isopod_light_b_lowstripe.webp","src/genes/marks/primary/mossy_light_b_lowstripe.webp"],"conds":["stars","clovers","isopod","mossy"]}),
new Trait({"name":"flowers","rarity":"rare","brightness":"light","files":["src/genes/marks/primary/stars_light_t_flowers.webp","src/genes/marks/primary/clovers_light_t_flowers.webp","src/genes/marks/primary/nose_light_t_flowers.webp","src/genes/marks/primary/pointy_light_t_flowers.webp","src/genes/marks/primary/drooped_light_t_flowers.webp","src/genes/marks/primary/drake_light_t_flowers.webp","src/genes/marks/primary/fluffy_light_t_flowers.webp","src/genes/marks/primary/innocent_light_t_flowers.webp","src/genes/marks/primary/isopod_light_t_flowers.webp","src/genes/marks/primary/mossy_light_t_flowers.webp"],"conds":["stars","clovers","isopod","mossy"]}),
new Trait({"name":"powder","rarity":"rare","brightness":"light","files":["src/genes/marks/primary/stars_light_t_powder.webp","src/genes/marks/primary/clovers_light_t_powder.webp","src/genes/marks/primary/nose_light_t_powder.webp","src/genes/marks/primary/pointy_light_t_powder.webp","src/genes/marks/primary/drooped_light_t_powder.webp","src/genes/marks/primary/drake_light_t_powder.webp","src/genes/marks/primary/fluffy_light_t_powder.webp","src/genes/marks/primary/innocent_light_t_powder.webp","src/genes/marks/primary/isopod_light_t_powder.webp","src/genes/marks/primary/mossy_light_t_powder.webp"],"conds":["stars","clovers","isopod","mossy"]}),
new Trait({"name":"tips","rarity":"common","brightness":"light","files":["src/genes/marks/primary/stars_light_t_tips.webp","src/genes/marks/primary/clovers_light_t_tips.webp","src/genes/marks/primary/pointy_light_t_tips.webp","src/genes/marks/primary/drooped_light_t_tips.webp","src/genes/marks/primary/drake_light_t_tips.webp","src/genes/marks/primary/fluffy_light_t_tips.webp","src/genes/marks/primary/innocent_light_t_tips.webp","src/genes/marks/primary/isopod_light_t_tips.webp","src/genes/marks/primary/mossy_light_t_tips.webp"],"conds":["stars","clovers","isopod","mossy"]}),
]);
const secondaryMarks = new PList([
new Trait({"name":"none","rarity":"common","conds":["six","flipper","floater","wyvern"]}),
new Trait({"name":"socks","rarity":"common","brightness":"dark","files":["src/genes/marks/secondary/six_dark_b_socks.webp","src/genes/marks/secondary/flipper_dark_b_socks.webp","src/genes/marks/secondary/floater_dark_b_socks.webp","src/genes/marks/secondary/hindl_dark_b_socks.webp","src/genes/marks/secondary/l_wyvern_dark_b_socks.webp","src/genes/marks/secondary/r_wyvern_dark_b_socks.webp","src/genes/marks/secondary/soft_dark_b_socks.webp","src/genes/marks/secondary/devil_dark_b_socks.webp","src/genes/marks/secondary/fuzzed_dark_b_socks.webp","src/genes/marks/secondary/stinger_dark_b_socks.webp","src/genes/marks/secondary/tassel_dark_b_socks.webp","src/genes/marks/secondary/whirl_dark_b_socks.webp","src/genes/marks/secondary/fishy_dark_b_socks.webp","src/genes/marks/secondary/floofy_dark_b_socks.webp","src/genes/marks/secondary/mothruff_dark_b_socks.webp","src/genes/marks/secondary/smooth_dark_b_socks.webp","src/genes/marks/secondary/tufty_dark_b_socks.webp"],"conds":["six","flipper","floater","wyvern"]}),
new Trait({"name":"cuffs","rarity":"uncommon","brightness":"dark","files":["src/genes/marks/secondary/six_dark_m_cuffs.webp","src/genes/marks/secondary/flipper_dark_m_cuffs.webp","src/genes/marks/secondary/floater_dark_m_cuffs.webp","src/genes/marks/secondary/hindl_dark_m_cuffs.webp","src/genes/marks/secondary/r_wyvern_dark_m_cuffs.webp","src/genes/marks/secondary/soft_dark_m_cuffs.webp","src/genes/marks/secondary/devil_dark_m_cuffs.webp","src/genes/marks/secondary/fuzzed_dark_m_cuffs.webp","src/genes/marks/secondary/stinger_dark_m_cuffs.webp","src/genes/marks/secondary/tassel_dark_m_cuffs.webp","src/genes/marks/secondary/whirl_dark_m_cuffs.webp","src/genes/marks/secondary/fishy_dark_m_cuffs.webp","src/genes/marks/secondary/floofy_dark_m_cuffs.webp","src/genes/marks/secondary/mothruff_dark_m_cuffs.webp","src/genes/marks/secondary/smooth_dark_m_cuffs.webp","src/genes/marks/secondary/tufty_dark_m_cuffs.webp"],"conds":["six","flipper","floater","wyvern"]}),
new Trait({"name":"underbelly","rarity":"common","brightness":"light","files":["src/genes/marks/secondary/six_light_m_underbelly.webp","src/genes/marks/secondary/flipper_light_m_underbelly.webp","src/genes/marks/secondary/floater_light_m_underbelly.webp","src/genes/marks/secondary/hindl_light_m_underbelly.webp","src/genes/marks/secondary/l_wyvern_light_m_underbelly.webp","src/genes/marks/secondary/r_wyvern_light_m_underbelly.webp","src/genes/marks/secondary/soft_light_m_underbelly.webp","src/genes/marks/secondary/devil_light_m_underbelly.webp","src/genes/marks/secondary/fuzzed_light_m_underbelly.webp","src/genes/marks/secondary/stinger_light_m_underbelly.webp","src/genes/marks/secondary/tassel_light_m_underbelly.webp","src/genes/marks/secondary/whirl_light_m_underbelly.webp","src/genes/marks/secondary/fishy_light_m_underbelly.webp","src/genes/marks/secondary/floofy_light_m_underbelly.webp","src/genes/marks/secondary/mothruff_light_m_underbelly.webp","src/genes/marks/secondary/smooth_light_m_underbelly.webp","src/genes/marks/secondary/tufty_light_m_underbelly.webp"],"conds":["six","flipper","floater","wyvern"]}),
new Trait({"name":"mittens","rarity":"uncommon","brightness":"light","files":["src/genes/marks/secondary/six_light_t_mittens.webp","src/genes/marks/secondary/flipper_light_t_mittens.webp","src/genes/marks/secondary/floater_light_t_mittens.webp","src/genes/marks/secondary/hindl_light_t_mittens.webp","src/genes/marks/secondary/r_wyvern_light_t_mittens.webp","src/genes/marks/secondary/axolotl_light_t_mittens.webp","src/genes/marks/secondary/squishy_light_t_mittens.webp","src/genes/marks/secondary/tuft_light_t_mittens.webp","src/genes/marks/secondary/soft_light_t_mittens.webp","src/genes/marks/secondary/devil_light_t_mittens.webp","src/genes/marks/secondary/fuzzed_light_t_mittens.webp","src/genes/marks/secondary/stinger_light_t_mittens.webp","src/genes/marks/secondary/tassel_light_t_mittens.webp","src/genes/marks/secondary/whirl_light_t_mittens.webp","src/genes/marks/secondary/fishy_light_t_mittens.webp","src/genes/marks/secondary/floofy_light_t_mittens.webp","src/genes/marks/secondary/mothruff_light_t_mittens.webp","src/genes/marks/secondary/smooth_light_t_mittens.webp","src/genes/marks/secondary/tufty_light_t_mittens.webp"],"conds":["six","flipper","floater","wyvern"]}),
new Trait({"name":"points","rarity":"rare","brightness":"light","files":["src/genes/marks/secondary/six_light_t_points.webp","src/genes/marks/secondary/six_light_tblend_points.webp","src/genes/marks/secondary/flipper_light_t_points.webp","src/genes/marks/secondary/flipper_light_tblend_points.webp","src/genes/marks/secondary/floater_light_t_points.webp","src/genes/marks/secondary/floater_light_tblend_points.webp","src/genes/marks/secondary/hindl_light_t_points.webp","src/genes/marks/secondary/hindl_light_tblend_points.webp","src/genes/marks/secondary/hindl_light_bblend_points.webp","src/genes/marks/secondary/r_wyvern_light_t_points.webp","src/genes/marks/secondary/r_wyvern_light_tblend_points.webp","src/genes/marks/secondary/axolotl_light_t_points.webp","src/genes/marks/secondary/axolotl_light_tblend_points.webp","src/genes/marks/secondary/squishy_light_t_points.webp","src/genes/marks/secondary/squishy_light_tblend_points.webp","src/genes/marks/secondary/tuft_light_t_points.webp","src/genes/marks/secondary/tuft_light_tblend_points.webp","src/genes/marks/secondary/soft_light_t_points.webp","src/genes/marks/secondary/soft_light_tblend_points.webp","src/genes/marks/secondary/devil_light_t_points.webp","src/genes/marks/secondary/devil_light_tblend_points.webp","src/genes/marks/secondary/fuzzed_light_t_points.webp","src/genes/marks/secondary/fuzzed_light_tblend_points.webp","src/genes/marks/secondary/stinger_light_t_points.webp","src/genes/marks/secondary/stinger_light_tblend_points.webp","src/genes/marks/secondary/tassel_light_t_points.webp","src/genes/marks/secondary/tassel_light_tblend_points.webp","src/genes/marks/secondary/whirl_light_t_points.webp","src/genes/marks/secondary/whirl_light_tblend_points.webp","src/genes/marks/secondary/fishy_light_t_points.webp","src/genes/marks/secondary/fishy_light_tblend_points.webp","src/genes/marks/secondary/mothruff_light_t_points.webp","src/genes/marks/secondary/mothruff_light_tblend_points.webp"],"conds":["six","flipper","floater","wyvern"]}),
]);
const tertiary = new PList([
new Trait({"name":"none","rarity":"common"}),
]);
const secondaryColor = new PList([
new Trait({"name":"darkgrey","rarity":"common","hex":"#4B4B4B"}),
new Trait({"name":"white","rarity":"common","hex":"#FFFFFF"}),
new Trait({"name":"cream","rarity":"common","hex":"#FFDFA0"}),
new Trait({"name":"plum","rarity":"common","hex":"#8E4585"}),
new Trait({"name":"red","rarity":"common","hex":"#E53935"}),
new Trait({"name":"blue","rarity":"common","hex":"#3B82F6"}),
new Trait({"name":"cyan","rarity":"common","hex":"#22D3EE"}),
new Trait({"name":"brown","rarity":"common","hex":"#8B5A2B"}),
new Trait({"name":"yellow","rarity":"common","hex":"#FACC15"}),
new Trait({"name":"black","rarity":"common","hex":"#1A1A1A"}),
new Trait({"name":"green","rarity":"common","hex":"#22C55E"}),
new Trait({"name":"orange","rarity":"common","hex":"#FB923C"}),
new Trait({"name":"pink","rarity":"common","hex":"#F9A8D4"}),
new Trait({"name":"purple","rarity":"common","hex":"#8B5CF6"}),
new Trait({"name":"lightgrey","rarity":"common","hex":"#D3D3D3"}),
new Trait({"name":"grey","rarity":"common","hex":"#808080"}),
new Trait({"name":"charcoal","rarity":"common","hex":"#36454F"}),
new Trait({"name":"beige","rarity":"common","hex":"#E4CDA1"}),
new Trait({"name":"ivory","rarity":"common","hex":"#F0EBDD"}),
new Trait({"name":"tan","rarity":"common","hex":"#D2B48C"}),
new Trait({"name":"olive","rarity":"common","hex":"#808000"}),
new Trait({"name":"lime","rarity":"common","hex":"#A3E635"}),
new Trait({"name":"teal","rarity":"common","hex":"#14B8A6"}),
new Trait({"name":"navy","rarity":"common","hex":"#1E3A8A"}),
new Trait({"name":"skyblue","rarity":"common","hex":"#87CEEB"}),
new Trait({"name":"violet","rarity":"common","hex":"#7C3AED"}),
new Trait({"name":"magenta","rarity":"common","hex":"#D946EF"}),
new Trait({"name":"maroon","rarity":"common","hex":"#800000"}),
new Trait({"name":"coral","rarity":"common","hex":"#FF7F50"}),
new Trait({"name":"gold","rarity":"common","hex":"#D4AF37"}),
]);
const primaryColor = new PList([
new Trait({"name":"darkgrey","rarity":"common","hex":"#4B4B4B"}),
new Trait({"name":"white","rarity":"common","hex":"#FFFFFF"}),
new Trait({"name":"cream","rarity":"common","hex":"#FFDFA0"}),
new Trait({"name":"plum","rarity":"common","hex":"#8E4585"}),
new Trait({"name":"red","rarity":"common","hex":"#E53935"}),
new Trait({"name":"blue","rarity":"common","hex":"#3B82F6"}),
new Trait({"name":"cyan","rarity":"common","hex":"#22D3EE"}),
new Trait({"name":"brown","rarity":"common","hex":"#8B5A2B"}),
new Trait({"name":"yellow","rarity":"common","hex":"#FACC15"}),
new Trait({"name":"black","rarity":"common","hex":"#1A1A1A"}),
new Trait({"name":"green","rarity":"common","hex":"#22C55E"}),
new Trait({"name":"orange","rarity":"common","hex":"#FB923C"}),
new Trait({"name":"pink","rarity":"common","hex":"#F9A8D4"}),
new Trait({"name":"purple","rarity":"common","hex":"#8B5CF6"}),
new Trait({"name":"lightgrey","rarity":"common","hex":"#D3D3D3"}),
new Trait({"name":"grey","rarity":"common","hex":"#808080"}),
new Trait({"name":"charcoal","rarity":"common","hex":"#36454F"}),
new Trait({"name":"beige","rarity":"common","hex":"#E4CDA1"}),
new Trait({"name":"ivory","rarity":"common","hex":"#F0EBDD"}),
new Trait({"name":"tan","rarity":"common","hex":"#D2B48C"}),
new Trait({"name":"olive","rarity":"common","hex":"#808000"}),
new Trait({"name":"lime","rarity":"common","hex":"#A3E635"}),
new Trait({"name":"teal","rarity":"common","hex":"#14B8A6"}),
new Trait({"name":"navy","rarity":"common","hex":"#1E3A8A"}),
new Trait({"name":"skyblue","rarity":"common","hex":"#87CEEB"}),
new Trait({"name":"violet","rarity":"common","hex":"#7C3AED"}),
new Trait({"name":"magenta","rarity":"common","hex":"#D946EF"}),
new Trait({"name":"maroon","rarity":"common","hex":"#800000"}),
new Trait({"name":"coral","rarity":"common","hex":"#FF7F50"}),
new Trait({"name":"gold","rarity":"common","hex":"#D4AF37"}),
]);
const eyeColor = new PList([
new Trait({"name":"darkgrey","rarity":"common","hex":"#4B4B4B"}),
new Trait({"name":"white","rarity":"common","hex":"#FFFFFF"}),
new Trait({"name":"cream","rarity":"common","hex":"#FFDFA0"}),
new Trait({"name":"plum","rarity":"common","hex":"#8E4585"}),
new Trait({"name":"red","rarity":"common","hex":"#E53935"}),
new Trait({"name":"blue","rarity":"common","hex":"#3B82F6"}),
new Trait({"name":"cyan","rarity":"common","hex":"#22D3EE"}),
new Trait({"name":"brown","rarity":"common","hex":"#8B5A2B"}),
new Trait({"name":"yellow","rarity":"common","hex":"#FACC15"}),
new Trait({"name":"black","rarity":"common","hex":"#1A1A1A"}),
new Trait({"name":"green","rarity":"common","hex":"#22C55E"}),
new Trait({"name":"orange","rarity":"common","hex":"#FB923C"}),
new Trait({"name":"pink","rarity":"common","hex":"#F9A8D4"}),
new Trait({"name":"purple","rarity":"common","hex":"#8B5CF6"}),
new Trait({"name":"lightgrey","rarity":"common","hex":"#D3D3D3"}),
new Trait({"name":"grey","rarity":"common","hex":"#808080"}),
new Trait({"name":"charcoal","rarity":"common","hex":"#36454F"}),
new Trait({"name":"beige","rarity":"common","hex":"#E4CDA1"}),
new Trait({"name":"ivory","rarity":"common","hex":"#F0EBDD"}),
new Trait({"name":"tan","rarity":"common","hex":"#D2B48C"}),
new Trait({"name":"olive","rarity":"common","hex":"#808000"}),
new Trait({"name":"lime","rarity":"common","hex":"#A3E635"}),
new Trait({"name":"teal","rarity":"common","hex":"#14B8A6"}),
new Trait({"name":"navy","rarity":"common","hex":"#1E3A8A"}),
new Trait({"name":"skyblue","rarity":"common","hex":"#87CEEB"}),
new Trait({"name":"violet","rarity":"common","hex":"#7C3AED"}),
new Trait({"name":"magenta","rarity":"common","hex":"#D946EF"}),
new Trait({"name":"maroon","rarity":"common","hex":"#800000"}),
new Trait({"name":"coral","rarity":"common","hex":"#FF7F50"}),
new Trait({"name":"gold","rarity":"common","hex":"#D4AF37"}),
]);
const rarity = new PList([new PVal("unusual"), new PVal("rare"), new PVal("uncommon"), new PVal("common")], [5, 15, 30, 50]);
const hindLegFiles = new PList(["src/genes/legs/l_hind_color.webp","src/genes/legs/l_hind_line.webp","src/genes/legs/l_hind_shade.webp","src/genes/legs/r_hind_color.webp","src/genes/legs/r_hind_line.webp","src/genes/legs/r_hind_shade.webp"].map(s => new PVal(s)));
const items = new PList([
new Trait({"name":"shellcluster"}),
new Trait({"name":"antepetal"}),
new Trait({"name":"auxswirl"}),
new Trait({"name":"chespike"}),
new Trait({"name":"collamoon"}),
new Trait({"name":"crowncrystal"}),
new Trait({"name":"oculaorb"}),
new Trait({"name":"oculaswirl"}),
new Trait({"name":"pawscale"}),
new Trait({"name":"primaswirl"}),
new Trait({"name":"snootooth"}),
new Trait({"name":"tailfig"}),
new Trait({"name":"tristar"}),
]);

