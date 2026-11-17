export type GloveColor = 'navy' | 'black' | 'white';
export type GloveSize = 'XS' | 'S' | 'M' | 'L' | 'XL';
export type WeightLevel = 'light' | 'medium' | 'heavy';
export type GloveView = 'dorsal' | 'palmar' | 'lateral' | 'knuckle_macro';

export interface GloveConfig {
  color: GloveColor;
  size: GloveSize;
  weight: WeightLevel;
}
