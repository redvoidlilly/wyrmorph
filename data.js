/*
 * WYRMORPH CREATURE GENERATOR - TRAIT DATA
 * -----------------------------------------
 * This file is intentionally mostly "data": it describes which traits exist,
 * what rarity they have, and which image files belong to them.
 *
 * Each `new Trait({...})` is one possible gene.
 *
 * The small PVal/PList/Trait -> `.evaluateItem` / `.selectOne` / `.selectAll`
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
new Trait({"name":"stars","rarity":"common","files":["wymorph/genes/shell/stars_color.webp","wymorph/genes/shell/stars_line.webp","wymorph/genes/shell/stars_shade.webp"]}),
new Trait({"name":"clovers","rarity":"common","files":["wymorph/genes/shell/clover_color.webp","wymorph/genes/shell/clover_line.webp","wymorph/genes/shell/clover_shade.webp"]}),
new Trait({"name":"isopod","rarity":"uncommon","files":["wymorph/genes/shell/isopod_color.webp","wymorph/genes/shell/isopod_line.webp","wymorph/genes/shell/isopod_shade.webp"]}),
new Trait({"name":"mossy","rarity":"rare","files":["wymorph/genes/shell/mossy_color.webp","wymorph/genes/shell/mossy_line.webp","wymorph/genes/shell/mossy_shade.webp"]}),
]);
const neck = new PList([
new Trait({"name":"floofy","rarity":"uncommon","files":["wymorph/genes/neck/floofy_color.webp","wymorph/genes/neck/floofy_shade.webp","wymorph/genes/neck/floofy_line.webp"]}),
new Trait({"name":"mothruff","rarity":"unusual","files":["wymorph/genes/neck/mothruff_color.webp","wymorph/genes/neck/mothruff_shade.webp","wymorph/genes/neck/mothruff_line.webp"],"tags":["mane"]}),
new Trait({"name":"smooth","rarity":"uncommon","files":["wymorph/genes/neck/smooth_color.webp","wymorph/genes/neck/smooth_shade.webp","wymorph/genes/neck/smooth_line.webp"]}),
new Trait({"name":"tufty","rarity":"common","files":["wymorph/genes/neck/tufty_color.webp","wymorph/genes/neck/tufty_shade.webp","wymorph/genes/neck/tufty_line.webp"]}),
]);
const cheek = new PList([
new Trait({"name":"axolotl","rarity":"rare","files":["wymorph/genes/cheek/axolotl_color.webp","wymorph/genes/cheek/axolotl_shade.webp","wymorph/genes/cheek/axolotl_line.webp"]}),
new Trait({"name":"squishy","rarity":"common","files":["wymorph/genes/cheek/squishy_color.webp","wymorph/genes/cheek/squishy_line.webp"]}),
new Trait({"name":"tuft","rarity":"common","files":["wymorph/genes/cheek/tuft_color.webp","wymorph/genes/cheek/tuft_shade.webp","wymorph/genes/cheek/tuft_line.webp"]}),
]);
const nose = new PList([
new Trait({"name":"basic","rarity":"common","files":["wymorph/genes/nose/basic_color.webp","wymorph/genes/nose/basic_line.webp"]}),
new Trait({"name":"whisker","rarity":"common","files":["wymorph/genes/nose/basic_color.webp","wymorph/genes/nose/whisker_line.webp"]}),
new Trait({"name":"horn","rarity":"uncommon","files":["wymorph/genes/nose/horn_color.webp","wymorph/genes/nose/horn_line.webp"]}),
new Trait({"name":"bulbs","rarity":"uncommon","files":["wymorph/genes/nose/bulbs_color.webp","wymorph/genes/nose/bulbs_line.webp","wymorph/genes/nose/bulbs_shade.webp"]}),
]);
const eyes = new PList([
new Trait({"name":"wide","rarity":"common","files":["wymorph/genes/eyes/wide_sc_color.webp","wymorph/genes/eyes/wide_sc_shade.webp","wymorph/genes/eyes/wide_iris_color.webp","wymorph/genes/eyes/wide_iris_shade.webp","wymorph/genes/eyes/wide_line.webp"]}),
new Trait({"name":"brightwide","rarity":"common","files":["wymorph/genes/eyes/wide_sc_color.webp","wymorph/genes/eyes/wide_sc_shade.webp","wymorph/genes/eyes/wide_iris_color.webp","wymorph/genes/eyes/wide_iris_shade.webp","wymorph/genes/eyes/wide_line.webp","wymorph/genes/eyes/wide_bright.webp"]}),
new Trait({"name":"darkwide","rarity":"rare","files":["wymorph/genes/eyes/wide_sc_color.webp","wymorph/genes/eyes/wide_sc_shade.webp","wymorph/genes/eyes/wide_iris_color.webp","wymorph/genes/eyes/wide_iris_shade.webp","wymorph/genes/eyes/wide_line.webp"]}),
]);
const earhorns = new PList([
new Trait({"name":"pointy","rarity":"common","files":["wymorph/genes/earhorns/pointy_color.webp","wymorph/genes/earhorns/pointy_line.webp","wymorph/genes/earhorns/pointy_shade.webp"]}),
new Trait({"name":"drooped","rarity":"common","files":["wymorph/genes/earhorns/drooped_color.webp","wymorph/genes/earhorns/drooped_line.webp","wymorph/genes/earhorns/drooped_shade.webp"]}),
new Trait({"name":"drake","rarity":"common","files":["wymorph/genes/earhorns/drake_color.webp","wymorph/genes/earhorns/drake_line.webp","wymorph/genes/earhorns/drake_shade.webp"]}),
new Trait({"name":"fluffy","rarity":"uncommon","files":["wymorph/genes/earhorns/fluffy_color.webp","wymorph/genes/earhorns/fluffy_line.webp","wymorph/genes/earhorns/fluffy_shade.webp"]}),
new Trait({"name":"innocent","rarity":"uncommon","files":["wymorph/genes/earhorns/innocent_color.webp","wymorph/genes/earhorns/innocent_line.webp","wymorph/genes/earhorns/innocent_shade.webp"]}),
]);
const eyebrows = new PList([
new Trait({"name":"circle","rarity":"common","files":["wymorph/genes/eyebrow/circle_color.webp","wymorph/genes/eyebrow/circle_line.webp"]}),
new Trait({"name":"v","rarity":"rare","files":["wymorph/genes/eyebrow/v_color.webp","wymorph/genes/eyebrow/v_line.webp"]}),
new Trait({"name":"alien","rarity":"uncommon","files":["wymorph/genes/eyebrow/alien_color.webp","wymorph/genes/eyebrow/alien_line.webp"]}),
new Trait({"name":"mothy","rarity":"uncommon","files":["wymorph/genes/eyebrow/mothy_color.webp","wymorph/genes/eyebrow/mothy_line.webp"]}),
new Trait({"name":"wing","rarity":"unusual","files":["wymorph/genes/eyebrow/wing_color.webp","wymorph/genes/eyebrow/wing_line.webp"]}),
]);
const legs = new PList([
new Trait({"name":"six","rarity":"common","hindlegs":"true","files":["wymorph/genes/legs/six_color.webp","wymorph/genes/legs/six_line.webp","wymorph/genes/legs/six_shade.webp"]}),
new Trait({"name":"wyvern","rarity":"unusual","hindlegs":"true","files":["wymorph/genes/legs/l_wyvern_color.webp","wymorph/genes/legs/l_wyvern_line.webp","wymorph/genes/legs/r_wyvern_color.webp","wymorph/genes/legs/r_wyvern_line.webp","wymorph/genes/legs/r_wyvern_shade.webp"]}),
new Trait({"name":"floater","rarity":"rare","hindlegs":"false","files":["wymorph/genes/legs/floater_color.webp","wymorph/genes/legs/floater_line.webp","wymorph/genes/legs/floater_shade.webp"]}),
new Trait({"name":"flipper","rarity":"uncommon","hindlegs":"true","files":["wymorph/genes/legs/flipper_color.webp","wymorph/genes/legs/flipper_line.webp","wymorph/genes/legs/flipper_shade.webp"]}),
]);
const tail = new PList([
new Trait({"name":"soft","rarity":"common","files":["wymorph/genes/tail/soft_color.webp","wymorph/genes/tail/soft_line.webp","wymorph/genes/tail/tail_shade.webp"]}),
new Trait({"name":"devil","rarity":"rare","files":["wymorph/genes/tail/devil_color.webp","wymorph/genes/tail/devil_line.webp","wymorph/genes/tail/tail_shade.webp"]}),
new Trait({"name":"fuzzed","rarity":"common","files":["wymorph/genes/tail/fuzzed_color.webp","wymorph/genes/tail/fuzzed_line.webp","wymorph/genes/tail/tail_shade.webp"]}),
new Trait({"name":"stinger","rarity":"rare","files":["wymorph/genes/tail/stinger_color.webp","wymorph/genes/tail/stinger_line.webp","wymorph/genes/tail/tail_shade.webp"]}),
new Trait({"name":"tassel","rarity":"uncommon","files":["wymorph/genes/tail/tassel_color.webp","wymorph/genes/tail/tassel_line.webp","wymorph/genes/tail/tail_shade.webp"]}),
new Trait({"name":"whirl","rarity":"unusual","files":["wymorph/genes/tail/whirl_color.webp","wymorph/genes/tail/whirl_line.webp","wymorph/genes/tail/whirl_shade.webp"]}),
new Trait({"name":"fishy","rarity":"rare","files":["wymorph/genes/tail/fishy_color.webp","wymorph/genes/tail/fishy_line.webp","wymorph/genes/tail/tail_shade.webp"]}),
]);
const primaryMarks = new PList([
new Trait({"name":"core","rarity":"common","brightness":"dark","files":["wymorph/genes/marks/primary/stars_dark_b_core.webp","wymorph/genes/marks/primary/clovers_dark_b_core.webp","wymorph/genes/marks/primary/nose_dark_b_core.webp","wymorph/genes/marks/primary/earhorns_dark_b_core.webp","wymorph/genes/marks/primary/isopod_dark_b_core.webp","wymorph/genes/marks/primary/mossy_dark_b_core.webp"],"conds":["stars","clovers","isopod","mossy"]}),
new Trait({"name":"alternating","rarity":"common","brightness":"dark","files":["wymorph/genes/marks/primary/stars_dark_b_alternating.webp","wymorph/genes/marks/primary/clovers_dark_b_alternating.webp","wymorph/genes/marks/primary/isopod_dark_b_alternating.webp","wymorph/genes/marks/primary/mossy_dark_b_alternating.webp"],"conds":["stars","clovers","isopod","mossy"]}),
new Trait({"name":"drip","rarity":"rare","brightness":"dark","files":["wymorph/genes/marks/primary/stars_dark_b_drip.png","wymorph/genes/marks/primary/clovers_dark_b_drip.png","wymorph/genes/marks/primary/stars_dark_bblend_drip.png","wymorph/genes/marks/primary/clovers_dark_bblend_drip.png","wymorph/genes/marks/primary/pointy_dark_b_drip.webp","wymorph/genes/marks/primary/pointy_dark_bblend_drip.webp","wymorph/genes/marks/primary/drooped_dark_b_drip.webp","wymorph/genes/marks/primary/drooped_dark_bblend_drip.webp","wymorph/genes/marks/primary/drake_dark_b_drip.webp","wymorph/genes/marks/primary/drake_dark_bblend_drip.webp","wymorph/genes/marks/primary/fluffy_dark_b_drip.webp","wymorph/genes/marks/primary/fluffy_dark_bblend_drip.webp","wymorph/genes/marks/primary/innocent_dark_b_drip.webp","wymorph/genes/marks/primary/innocent_dark_bblend_drip.webp","wymorph/genes/marks/primary/isopod_dark_b_drip.webp","wymorph/genes/marks/primary/isopod_dark_bblend_drip.webp","wymorph/genes/marks/primary/mossy_dark_b_drip.webp","wymorph/genes/marks/primary/mossy_dark_bblend_drip.webp"],"conds":["stars","clovers","isopod","mossy"]}),
new Trait({"name":"highstripe","rarity":"common","brightness":"dark","files":["wymorph/genes/marks/primary/stars_dark_b_highstripe.webp","wymorph/genes/marks/primary/pointy_dark_b_highstripe.webp","wymorph/genes/marks/primary/drooped_dark_b_highstripe.webp","wymorph/genes/marks/primary/drake_dark_b_highstripe.webp","wymorph/genes/marks/primary/fluffy_dark_b_highstripe.webp","wymorph/genes/marks/primary/innocent_dark_b_highstripe.webp","wymorph/genes/marks/primary/isopod_dark_b_highstripe.webp","wymorph/genes/marks/primary/mossy_dark_b_highstripe.webp"],"conds":["stars","isopod","mossy"]}),
new Trait({"name":"ripple","rarity":"uncommon","brightness":"dark","files":["wymorph/genes/marks/primary/stars_dark_m_ripple.webp","wymorph/genes/marks/primary/clovers_dark_m_ripple.webp","wymorph/genes/marks/primary/basic_dark_m_ripple.webp","wymorph/genes/marks/primary/bulbs_dark_m_ripple.webp","wymorph/genes/marks/primary/horn_dark_m_ripple.webp","wymorph/genes/marks/primary/whiskers_dark_m_ripple.webp","wymorph/genes/marks/primary/pointy_dark_m_ripple.webp","wymorph/genes/marks/primary/drooped_dark_m_ripple.webp","wymorph/genes/marks/primary/drake_dark_m_ripple.webp","wymorph/genes/marks/primary/fluffy_dark_m_ripple.webp","wymorph/genes/marks/primary/innocent_dark_m_ripple.webp","wymorph/genes/marks/primary/isopod_dark_m_ripple.webp","wymorph/genes/marks/primary/mossy_dark_m_ripple.webp"],"conds":["stars","clovers","isopod","mossy"]}),
new Trait({"name":"stripes","rarity":"common","brightness":"dark","files":["wymorph/genes/marks/primary/stars_dark_m_stripes.webp","wymorph/genes/marks/primary/clovers_dark_m_stripes.webp","wymorph/genes/marks/primary/pointy_dark_m_stripes.webp","wymorph/genes/marks/primary/drooped_dark_m_stripes.webp","wymorph/genes/marks/primary/drake_dark_m_stripes.webp","wymorph/genes/marks/primary/fluffy_dark_m_stripes.webp","wymorph/genes/marks/primary/innocent_dark_m_stripes.webp","wymorph/genes/marks/primary/isopod_dark_m_stripes.webp","wymorph/genes/marks/primary/mossy_dark_m_stripes.webp"],"conds":["stars","clovers","isopod","mossy"]}),
new Trait({"name":"lowstripe","rarity":"common","brightness":"light","files":["wymorph/genes/marks/primary/stars_light_b_lowstripe.webp","wymorph/genes/marks/primary/clovers_light_b_lowstripe.webp","wymorph/genes/marks/primary/pointy_light_b_lowstripe.webp","wymorph/genes/marks/primary/drooped_light_b_lowstripe.webp","wymorph/genes/marks/primary/drake_light_b_lowstripe.webp","wymorph/genes/marks/primary/fluffy_light_b_lowstripe.webp","wymorph/genes/marks/primary/innocent_light_b_lowstripe.webp","wymorph/genes/marks/primary/isopod_light_b_lowstripe.webp","wymorph/genes/marks/primary/mossy_light_b_lowstripe.webp"],"conds":["stars","clovers","isopod","mossy"]}),
new Trait({"name":"flowers","rarity":"rare","brightness":"light","files":["wymorph/genes/marks/primary/stars_light_t_flowers.webp","wymorph/genes/marks/primary/clovers_light_t_flowers.webp","wymorph/genes/marks/primary/nose_light_t_flowers.webp","wymorph/genes/marks/primary/pointy_light_t_flowers.webp","wymorph/genes/marks/primary/drooped_light_t_flowers.webp","wymorph/genes/marks/primary/drake_light_t_flowers.webp","wymorph/genes/marks/primary/fluffy_light_t_flowers.webp","wymorph/genes/marks/primary/innocent_light_t_flowers.webp","wymorph/genes/marks/primary/isopod_light_t_flowers.webp","wymorph/genes/marks/primary/mossy_light_t_flowers.webp"],"conds":["stars","clovers","isopod","mossy"]}),
new Trait({"name":"powder","rarity":"rare","brightness":"light","files":["wymorph/genes/marks/primary/stars_light_t_powder.webp","wymorph/genes/marks/primary/clovers_light_t_powder.webp","wymorph/genes/marks/primary/nose_light_t_powder.webp","wymorph/genes/marks/primary/pointy_light_t_powder.webp","wymorph/genes/marks/primary/drooped_light_t_powder.webp","wymorph/genes/marks/primary/drake_light_t_powder.webp","wymorph/genes/marks/primary/fluffy_light_t_powder.webp","wymorph/genes/marks/primary/innocent_light_t_powder.webp","wymorph/genes/marks/primary/isopod_light_t_powder.webp","wymorph/genes/marks/primary/mossy_light_t_powder.webp"],"conds":["stars","clovers","isopod","mossy"]}),
new Trait({"name":"tips","rarity":"common","brightness":"light","files":["wymorph/genes/marks/primary/stars_light_t_tips.webp","wymorph/genes/marks/primary/clovers_light_t_tips.webp","wymorph/genes/marks/primary/pointy_light_t_tips.webp","wymorph/genes/marks/primary/drooped_light_t_tips.webp","wymorph/genes/marks/primary/drake_light_t_tips.webp","wymorph/genes/marks/primary/fluffy_light_t_tips.webp","wymorph/genes/marks/primary/innocent_light_t_tips.webp","wymorph/genes/marks/primary/isopod_light_t_tips.webp","wymorph/genes/marks/primary/mossy_light_t_tips.webp"],"conds":["stars","clovers","isopod","mossy"]}),
]);
const secondaryMarks = new PList([
new Trait({"name":"none","rarity":"common","conds":["six","flipper","floater","wyvern"]}),
new Trait({"name":"socks","rarity":"common","brightness":"dark","files":["wymorph/genes/marks/secondary/six_dark_b_socks.webp","wymorph/genes/marks/secondary/flipper_dark_b_socks.webp","wymorph/genes/marks/secondary/floater_dark_b_socks.webp","wymorph/genes/marks/secondary/hindl_dark_b_socks.webp","wymorph/genes/marks/secondary/l_wyvern_dark_b_socks.webp","wymorph/genes/marks/secondary/r_wyvern_dark_b_socks.webp","wymorph/genes/marks/secondary/soft_dark_b_socks.webp","wymorph/genes/marks/secondary/devil_dark_b_socks.webp","wymorph/genes/marks/secondary/fuzzed_dark_b_socks.webp","wymorph/genes/marks/secondary/stinger_dark_b_socks.webp","wymorph/genes/marks/secondary/tassel_dark_b_socks.webp","wymorph/genes/marks/secondary/whirl_dark_b_socks.webp","wymorph/genes/marks/secondary/fishy_dark_b_socks.webp","wymorph/genes/marks/secondary/floofy_dark_b_socks.webp","wymorph/genes/marks/secondary/mothruff_dark_b_socks.webp","wymorph/genes/marks/secondary/smooth_dark_b_socks.webp","wymorph/genes/marks/secondary/tufty_dark_b_socks.webp"],"conds":["six","flipper","floater","wyvern"]}),
new Trait({"name":"cuffs","rarity":"uncommon","brightness":"dark","files":["wymorph/genes/marks/secondary/six_dark_m_cuffs.webp","wymorph/genes/marks/secondary/flipper_dark_m_cuffs.webp","wymorph/genes/marks/secondary/floater_dark_m_cuffs.webp","wymorph/genes/marks/secondary/hindl_dark_m_cuffs.webp","wymorph/genes/marks/secondary/r_wyvern_dark_m_cuffs.webp","wymorph/genes/marks/secondary/soft_dark_m_cuffs.webp","wymorph/genes/marks/secondary/devil_dark_m_cuffs.webp","wymorph/genes/marks/secondary/fuzzed_dark_m_cuffs.webp","wymorph/genes/marks/secondary/stinger_dark_m_cuffs.webp","wymorph/genes/marks/secondary/tassel_dark_m_cuffs.webp","wymorph/genes/marks/secondary/whirl_dark_m_cuffs.webp","wymorph/genes/marks/secondary/fishy_dark_m_cuffs.webp","wymorph/genes/marks/secondary/floofy_dark_m_cuffs.webp","wymorph/genes/marks/secondary/mothruff_dark_m_cuffs.webp","wymorph/genes/marks/secondary/smooth_dark_m_cuffs.webp","wymorph/genes/marks/secondary/tufty_dark_m_cuffs.webp"],"conds":["six","flipper","floater","wyvern"]}),
new Trait({"name":"underbelly","rarity":"common","brightness":"light","files":["wymorph/genes/marks/secondary/six_light_m_underbelly.webp","wymorph/genes/marks/secondary/flipper_light_m_underbelly.webp","wymorph/genes/marks/secondary/floater_light_m_underbelly.webp","wymorph/genes/marks/secondary/hindl_light_m_underbelly.webp","wymorph/genes/marks/secondary/l_wyvern_light_m_underbelly.webp","wymorph/genes/marks/secondary/r_wyvern_light_m_underbelly.webp","wymorph/genes/marks/secondary/soft_light_m_underbelly.webp","wymorph/genes/marks/secondary/devil_light_m_underbelly.webp","wymorph/genes/marks/secondary/fuzzed_light_m_underbelly.webp","wymorph/genes/marks/secondary/stinger_light_m_underbelly.webp","wymorph/genes/marks/secondary/tassel_light_m_underbelly.webp","wymorph/genes/marks/secondary/whirl_light_m_underbelly.webp","wymorph/genes/marks/secondary/fishy_light_m_underbelly.webp","wymorph/genes/marks/secondary/floofy_light_m_underbelly.webp","wymorph/genes/marks/secondary/mothruff_light_m_underbelly.webp","wymorph/genes/marks/secondary/smooth_light_m_underbelly.webp","wymorph/genes/marks/secondary/tufty_light_m_underbelly.webp"],"conds":["six","flipper","floater","wyvern"]}),
new Trait({"name":"mittens","rarity":"uncommon","brightness":"light","files":["wymorph/genes/marks/secondary/six_light_t_mittens.webp","wymorph/genes/marks/secondary/flipper_light_t_mittens.webp","wymorph/genes/marks/secondary/floater_light_t_mittens.webp","wymorph/genes/marks/secondary/hindl_light_t_mittens.webp","wymorph/genes/marks/secondary/r_wyvern_light_t_mittens.webp","wymorph/genes/marks/secondary/axolotl_light_t_mittens.webp","wymorph/genes/marks/secondary/squishy_light_t_mittens.webp","wymorph/genes/marks/secondary/tuft_light_t_mittens.webp","wymorph/genes/marks/secondary/soft_light_t_mittens.webp","wymorph/genes/marks/secondary/devil_light_t_mittens.webp","wymorph/genes/marks/secondary/fuzzed_light_t_mittens.webp","wymorph/genes/marks/secondary/stinger_light_t_mittens.webp","wymorph/genes/marks/secondary/tassel_light_t_mittens.webp","wymorph/genes/marks/secondary/whirl_light_t_mittens.webp","wymorph/genes/marks/secondary/fishy_light_t_mittens.webp","wymorph/genes/marks/secondary/floofy_light_t_mittens.webp","wymorph/genes/marks/secondary/mothruff_light_t_mittens.webp","wymorph/genes/marks/secondary/smooth_light_t_mittens.webp","wymorph/genes/marks/secondary/tufty_light_t_mittens.webp"],"conds":["six","flipper","floater","wyvern"]}),
new Trait({"name":"points","rarity":"rare","brightness":"light","files":["wymorph/genes/marks/secondary/six_light_t_points.webp","wymorph/genes/marks/secondary/six_light_tblend_points.webp","wymorph/genes/marks/secondary/flipper_light_t_points.webp","wymorph/genes/marks/secondary/flipper_light_tblend_points.webp","wymorph/genes/marks/secondary/floater_light_t_points.webp","wymorph/genes/marks/secondary/floater_light_tblend_points.webp","wymorph/genes/marks/secondary/hindl_light_t_points.webp","wymorph/genes/marks/secondary/hindl_light_tblend_points.webp","wymorph/genes/marks/secondary/hindl_light_bblend_points.webp","wymorph/genes/marks/secondary/r_wyvern_light_t_points.webp","wymorph/genes/marks/secondary/r_wyvern_light_tblend_points.webp","wymorph/genes/marks/secondary/axolotl_light_t_points.webp","wymorph/genes/marks/secondary/axolotl_light_tblend_points.webp","wymorph/genes/marks/secondary/squishy_light_t_points.webp","wymorph/genes/marks/secondary/squishy_light_tblend_points.webp","wymorph/genes/marks/secondary/tuft_light_t_points.webp","wymorph/genes/marks/secondary/tuft_light_tblend_points.webp","wymorph/genes/marks/secondary/soft_light_t_points.webp","wymorph/genes/marks/secondary/soft_light_tblend_points.webp","wymorph/genes/marks/secondary/devil_light_t_points.webp","wymorph/genes/marks/secondary/devil_light_tblend_points.webp","wymorph/genes/marks/secondary/fuzzed_light_t_points.webp","wymorph/genes/marks/secondary/fuzzed_light_tblend_points.webp","wymorph/genes/marks/secondary/stinger_light_t_points.webp","wymorph/genes/marks/secondary/stinger_light_tblend_points.webp","wymorph/genes/marks/secondary/tassel_light_t_points.webp","wymorph/genes/marks/secondary/tassel_light_tblend_points.webp","wymorph/genes/marks/secondary/whirl_light_t_points.webp","wymorph/genes/marks/secondary/whirl_light_tblend_points.webp","wymorph/genes/marks/secondary/fishy_light_t_points.webp","wymorph/genes/marks/secondary/fishy_light_tblend_points.webp","wymorph/genes/marks/secondary/mothruff_light_t_points.webp","wymorph/genes/marks/secondary/mothruff_light_tblend_points.webp"],"conds":["six","flipper","floater","wyvern"]}),
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
const hindLegFiles = new PList(["wymorph/genes/legs/l_hind_color.webp","wymorph/genes/legs/l_hind_line.webp","wymorph/genes/legs/l_hind_shade.webp","wymorph/genes/legs/r_hind_color.webp","wymorph/genes/legs/r_hind_line.webp","wymorph/genes/legs/r_hind_shade.webp"].map(s => new PVal(s)));
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

