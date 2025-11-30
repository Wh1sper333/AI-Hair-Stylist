
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female'
}

export type BangStyle = 'None' | 'Curtain' | 'Full' | 'Wispy' | 'Side-swept' | 'Micro';
export type HairVolume = 'Natural' | 'Thick/Full' | 'Light/Thin';
export type RootLift = 'Flat' | 'Natural' | 'Voluminous';
export type HairQuality = 'Soft/Fine' | 'Normal' | 'Coarse/Hard';

export type HairLength = 'Short' | 'Medium' | 'Long';
export type HairTexture = 'Straight' | 'Wavy' | 'Curly';

export interface RefinementOptions {
  bangs: BangStyle;
  volume: HairVolume;
  rootLift: RootLift;
  quality: HairQuality;
}

export interface HairStyleDefinition {
  id: string;
  label: string;
  prompt: string;
  gender: Gender;
  category?: 'haircut' | 'perm'; // Specifically for Men's split
  length: HairLength;
  texture: HairTexture;
  previewUrl: string;
}

export interface StylistOptions {
  gender: Gender;
  styleId: string; // The ID of the selected style from the library
  color: string; // Hex code or named color
  refinements: RefinementOptions;
}

export interface GenerationResult {
  imageUrl: string | null;
  textAnalysis: string | null;
}
