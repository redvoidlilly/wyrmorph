//pulls file from genes 
function getFile(path) {
  return path.split("/").pop();
}

//the actual layerer 
export function spriteLayer(path) {
  const file = getFile(path);

  if (file.startsWith("watermark")) return 126;

  //upper tertiary
  if (file.startsWith("tertiary_top_line")) return 125;
  if (file.startsWith("tertiary_top_shade")) return 124;
  if (file.startsWith("tertiary_top_ex1")) return 123;
  if (file.startsWith("tertiary_top_ex2")) return 122;
  if (file.startsWith("tertiary_top_color")) return 121;
  if (file.startsWith("tertiary_top_blend")) return 120;

  //eyes O_O
  if (file.startsWith("eyes_bright")) return 119;
  if (file.startsWith("eyes_line")) return 118;
  if (file.startsWith("eyes_iris_shade")) return 117;
  if (file.startsWith("eyes_iris_color")) return 116;
  if (file.startsWith("eyes_sc_shade")) return 115;
  if (file.startsWith("eyes_sc_color")) return 114;

  //eyebrows
  if (file.startsWith("eyebrow_line")) return 113;
  if (file.startsWith("eyebrow_shade")) return 112;
  if (file.startsWith("eyebrow_ex1")) return 111;
  if (file.startsWith("eyebrow_ex2")) return 110;
  if (file.startsWith("eyebrow_color")) return 109;
  if (file.startsWith("eyebrow_blend")) return 108;

  //nose
  if (file.startsWith("nose_line")) return 107;
  if (file.startsWith("nose_shade")) return 106;
  //markable!
  if (file.startsWith("primary_nose")) return 105;
  if (file.startsWith("primary_nose_blend")) return 104;
  if (file.startsWith("nose_ex1")) return 103;
  if (file.startsWith("nose_ex2")) return 102;
  if (file.startsWith("nose_color")) return 101;
  if (file.startsWith("nose_blend")) return 100;

  //earhorns
  if (file.startsWith("earhorns_line")) return 99;
  if (file.startsWith("earhorns_shade")) return 98;
  //markable!
  if (file.startsWith("primary_earhorns")) return 97;
  if (file.startsWith("primary_earhorns_blend")) return 96;
  if (file.startsWith("earhorns_ex1")) return 95; 
  if (file.startsWith("earhorns_ex2")) return 94;
  if (file.startsWith("earhorns_color")) return 93;
  if (file.startsWith("earhorns_blend")) return 92;

  //cheeks
  if (file.startsWith("cheek_line")) return 91;
  if (file.startsWith("cheek_shade")) return 90;
  //markable!
  if (file.startsWith("secondary_cheek")) return 89;
  if (file.startsWith("secondary_cheek_blend")) return 88;
  if (file.startsWith("cheek_ex1")) return 87;
  if (file.startsWith("cheek_ex2")) return 86;
  if (file.startsWith("cheek_color")) return 85;
  if (file.startsWith("cheek_blend")) return 84;

  //middle tertiary
  if (file.startsWith("tertiary_mid_line")) return 83;
  if (file.startsWith("tertiary_mid_shade")) return 82;
  if (file.startsWith("tertiary_mid_ex1")) return 81;
  if (file.startsWith("tertiary_mid_ex2")) return 80;
  if (file.startsWith("tertiary_mid_color")) return 79;
  if (file.startsWith("tertiary_mid_blend")) return 78;

  //foreground legs for layered legs
  if (file.startsWith("legs_top_line")) return 77;
  if (file.startsWith("legs_top_shade")) return 76;
  //markable!
  if (file.startsWith("secondary_legs_top")) return 75;
  if (file.startsWith("secondary_legs_top_blend")) return 74;
  if (file.startsWith("legs_top_ex1")) return 73;
  if (file.startsWith("legs_top_ex2")) return 72;
  if (file.startsWith("legs_top_color")) return 71;
  if (file.startsWith("legs_top_blend")) return 70;

  //necks, but manes!
  if (file.startsWith("neck_mane_line")) return 69;
  if (file.startsWith("neck_mane_shade")) return 68;
  //markable!
  if (file.startsWith("secondary_neck_mane")) return 67;
  if (file.startsWith("secondary_neck_mane_blend")) return 66;
  if (file.startsWith("neck_mane_ex1")) return 65;
  if (file.startsWith("neck_mane_ex2")) return 64;
  if (file.startsWith("neck_mane_color")) return 63;
  if (file.startsWith("neck_mane_blend")) return 62;

  //shell
  if (file.startsWith("shell_line")) return 61;
  if (file.startsWith("shell_shade")) return 60;
  //markable!
  if (file.startsWith("primary_shell")) return 59;
  if (file.startsWith("primary_shell_blend")) return 58;
  if (file.startsWith("shell_ex1")) return 57;
  if (file.startsWith("shell_ex2")) return 56;
  if (file.startsWith("shell_color")) return 55;
  if (file.startsWith("shell_blend")) return 54;

  //neck
  if (file.startsWith("neck_line")) return 53;
  if (file.startsWith("neck_shade")) return 52;
  //markable!
  if (file.startsWith("secondary_neck")) return 51;
  if (file.startsWith("secondary_neck_blend")) return 50;
  if (file.startsWith("neck_ex1")) return 49;
  if (file.startsWith("neck_ex2")) return 48;
  if (file.startsWith("neck_color")) return 47;
  if (file.startsWith("neck_blend")) return 46;

  //tail
  if (file.startsWith("tail_line")) return 45;
  if (file.startsWith("tail_shade")) return 44;
  //markable!
  if (file.startsWith("secondary_tail")) return 43;
  if (file.startsWith("secondary_tail_blend")) return 42;
  if (file.startsWith("tail_ex1")) return 41;
  if (file.startsWith("tail_ex2")) return 40;
  if (file.startsWith("tail_color")) return 39;
  if (file.startsWith("tail_blend")) return 38;

  //legs
  if (file.startsWith("legs_line")) return 37;
  if (file.startsWith("legs_shade")) return 36;
  //markable!
  if (file.startsWith("secondary_legs")) return 35;
  if (file.startsWith("secondary_legs_blend")) return 34;
  if (file.startsWith("legs_ex1")) return 33;
  if (file.startsWith("legs_ex2")) return 32;
  if (file.startsWith("legs_color")) return 31;
  if (file.startsWith("legs_blend")) return 30;

  //hindlegs
  if (file.startsWith("legs_line_hind")) return 29;
  if (file.startsWith("legs_shade_hind")) return 28;
  //markable!
  if (file.startsWith("secondary_legs_hind")) return 27;
  if (file.startsWith("secondary_legs_hind_blend")) return 26;
  if (file.startsWith("legs_ex1_hind")) return 25;
  if (file.startsWith("legs_ex2_hind")) return 24;
  if (file.startsWith("legs_color_hind")) return 23;

  //bottom tertiary
  if (file.startsWith("tertiary_bottom_line")) return 22;
  if (file.startsWith("tertiary_bottom_shade")) return 21;
  if (file.startsWith("tertiary_bottom_ex1")) return 20;
  if (file.startsWith("tertiary_bottom_ex2")) return 19;
  if (file.startsWith("tertiary_bottom_color")) return 18;
  if (file.startsWith("tertiary_bottom_blend")) return 17;
}