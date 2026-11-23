//pulls file from genes 
function getFile(path) {
  return path.split("/").pop();
}

//the actual layerer 
export function spriteLayer(path) {
  const file = getFile(path);

  if (file.startsWith("watermark_p")) return 136;
  if (file.startsWith("watermark_b")) return 135;
  if (file.startsWith("watermark_s")) return 134;

  if (file.startsWith("cosmetic_top_line")) return 133; //upper cosmetics
  if (file.startsWith("cosmetic_top_shade")) return 132;
  if (file.startsWith("cosmetic_top_ex1")) return 131;
  if (file.startsWith("cosmetic_top_ex2")) return 130;
  if (file.startsWith("cosmetic_top_color")) return 129;

  if (file.startsWith("legs_top_line")) return 128; //foreground legs for layered legs
  if (file.startsWith("legs_top_shade")) return 127;
  //markable!
  if (file.startsWith("secondary_legs_top_blend")) return 126;
  if (file.startsWith("secondary_legs_top")) return 125;
  if (file.startsWith("legs_top_ex1")) return 124;
  if (file.startsWith("legs_top_ex2")) return 123;
  if (file.startsWith("legs_top_color")) return 122;
  if (file.startsWith("legs_top_blend")) return 121;
  
  if (file.startsWith("tertiary_top_line")) return 120; //upper tertiary
  if (file.startsWith("tertiary_top_shade")) return 119;
  if (file.startsWith("tertiary_top_ex1")) return 118;
  if (file.startsWith("tertiary_top_ex2")) return 117;
  if (file.startsWith("tertiary_top_color")) return 116;
  if (file.startsWith("tertiary_top_blend")) return 115;
  
  if (file.startsWith("eyes_bright")) return 114; //eyes O_O
  if (file.startsWith("eyes_line")) return 113;
  if (file.startsWith("eyes_iris_shade")) return 112;
  if (file.startsWith("eyes_iris_color")) return 111;
  if (file.startsWith("eyes_sc_shade")) return 110;
  if (file.startsWith("eyes_sc_color")) return 109;

  if (file.startsWith("eyebrow_line")) return 108; //eyebrows
  if (file.startsWith("eyebrow_shade")) return 107;
  if (file.startsWith("eyebrow_ex1")) return 106;
  if (file.startsWith("eyebrow_ex2")) return 105;
  if (file.startsWith("eyebrow_color")) return 104;
  if (file.startsWith("eyebrow_blend")) return 103;
  
  if (file.startsWith("nose_line")) return 102; //nose
  if (file.startsWith("nose_shade")) return 101;
  //markable!
  if (file.startsWith("primary_nose_blend")) return 99;
  if (file.startsWith("primary_nose")) return 100;
  if (file.startsWith("nose_ex1")) return 98;
  if (file.startsWith("nose_ex2")) return 97;
  if (file.startsWith("nose_color")) return 96;
  if (file.startsWith("nose_blend")) return 95;

  if (file.startsWith("earhorns_line")) return 94; //earhorns
  if (file.startsWith("earhorns_shade")) return 93;
  //markable!
  if (file.startsWith("primary_earhorns_blend")) return 91;
  if (file.startsWith("primary_earhorns")) return 92;
  if (file.startsWith("earhorns_ex1")) return 90; 
  if (file.startsWith("earhorns_ex2")) return 89;
  if (file.startsWith("earhorns_color")) return 88;
  if (file.startsWith("earhorns_blend")) return 87;
  
  if (file.startsWith("cheek_line")) return 86; //cheeks
  if (file.startsWith("cheek_shade")) return 85;
  //markable!
  if (file.startsWith("secondary_cheek_blend")) return 83;
  if (file.startsWith("secondary_cheek")) return 84;
  if (file.startsWith("cheek_ex1")) return 82;
  if (file.startsWith("cheek_ex2")) return 81;
  if (file.startsWith("cheek_color")) return 80;
  if (file.startsWith("cheek_blend")) return 79;
  
  if (file.startsWith("tertiary_mid_line")) return 82; //middle tertiary
  if (file.startsWith("tertiary_mid_shade")) return 81;
  if (file.startsWith("tertiary_mid_ex1")) return 80;
  if (file.startsWith("tertiary_mid_ex2")) return 79;
  if (file.startsWith("tertiary_mid_color")) return 78;
  if (file.startsWith("tertiary_mid_blend")) return 77;

  if (file.startsWith("cosmetic_mid_line")) return 68; //neck cosmetics?
  if (file.startsWith("cosmetic_mid_shade")) return 67;
  if (file.startsWith("cosmetic_mid_ex1")) return 68;
  if (file.startsWith("cosmetic_mid_ex2")) return 67;
  if (file.startsWith("cosmetic_mid_color")) return 66;

  if (file.startsWith("neck_mane_line")) return 65; //necks, but manes (above shell)
  if (file.startsWith("neck_mane_shade")) return 64;
  //markable!
  if (file.startsWith("secondary_neck_mane_blend")) return 62;
  if (file.startsWith("secondary_neck_mane")) return 63;
  if (file.startsWith("neck_mane_ex1")) return 61;
  if (file.startsWith("neck_mane_ex2")) return 60;
  if (file.startsWith("neck_mane_color")) return 59;
  if (file.startsWith("neck_mane_blend")) return 58;

  //shell
  if (file.startsWith("shell_line")) return 57;
  if (file.startsWith("shell_shade")) return 56;
  //markable!
  if (file.startsWith("primary_shell_blend")) return 54;
  if (file.startsWith("primary_shell")) return 55;
  if (file.startsWith("shell_ex1")) return 53;
  if (file.startsWith("shell_ex2")) return 52;
  if (file.startsWith("shell_color")) return 51;
  if (file.startsWith("shell_blend")) return 50;

  //neck
  if (file.startsWith("neck_line")) return 49;
  if (file.startsWith("neck_shade")) return 48;
  //markable!
  if (file.startsWith("secondary_neck_blend")) return 46;
  if (file.startsWith("secondary_neck")) return 47;
  if (file.startsWith("neck_ex1")) return 45;
  if (file.startsWith("neck_ex2")) return 44;
  if (file.startsWith("neck_color")) return 43;
  if (file.startsWith("neck_blend")) return 42;

  //tail
  if (file.startsWith("tail_line")) return 41;
  if (file.startsWith("tail_shade")) return 40;
  //markable!
  if (file.startsWith("secondary_tail_blend")) return 38;
  if (file.startsWith("secondary_tail")) return 39;
  if (file.startsWith("tail_ex1")) return 37;
  if (file.startsWith("tail_ex2")) return 36;
  if (file.startsWith("tail_color")) return 35;
  if (file.startsWith("tail_blend")) return 34;

  //hindlegs
  if (file.startsWith("legs_line_hind")) return 25;
  if (file.startsWith("legs_shade_hind")) return 24;
  //markable!
  if (file.startsWith("secondary_legs_hind_blend")) return 22;
  if (file.startsWith("secondary_legs_hind")) return 23;
  if (file.startsWith("legs_ex1_hind")) return 21;
  if (file.startsWith("legs_ex2_hind")) return 20;
  if (file.startsWith("legs_color_hind")) return 19;

  //legs
  if (file.startsWith("legs_line")) return 33;
  if (file.startsWith("legs_shade")) return 32;
  //markable!
  if (file.startsWith("secondary_legs_blend")) return 30;
  if (file.startsWith("secondary_legs")) return 31;
  if (file.startsWith("legs_ex1")) return 29;
  if (file.startsWith("legs_ex2")) return 28;
  if (file.startsWith("legs_color")) return 27;
  if (file.startsWith("legs_blend")) return 26;

  //bottom tertiary
  if (file.startsWith("tertiary_bottom_line")) return 18;
  if (file.startsWith("tertiary_bottom_shade")) return 17;
  if (file.startsWith("tertiary_bottom_ex1")) return 16;
  if (file.startsWith("tertiary_bottom_ex2")) return 15;
  if (file.startsWith("tertiary_bottom_color")) return 14;
  if (file.startsWith("tertiary_bottom_blend")) return 13;

  if (file.startsWith("cosmetic_bottom_line")) return 12; //background cosmetics
  if (file.startsWith("cosmetic_bottom_shade")) return 11;
  if (file.startsWith("cosmetic_bottom_ex1")) return 10;
  if (file.startsWith("cosmetic_bottom_ex2")) return 9;
  if (file.startsWith("cosmetic_bottom_color")) return 8;
}