import type {GloveColor, GloveSize, WeightLevel} from '../types';

export const COLORS: {id: GloveColor; label: string; swatch: string}[] = [
  {id: 'navy', label: 'Navy Blue', swatch: '#10294A'},
  {id: 'black', label: 'Black', swatch: '#1A1E24'},
  {id: 'white', label: 'White', swatch: '#F1F5F9'},
];

export const SIZES: GloveSize[] = ['XS', 'S', 'M', 'L', 'XL'];

// PROTOTYPE CONFIGURATION VALUES — confirm with the product team before launch.
export const WEIGHTS: {
  id: WeightLevel;
  label: string;
  total: string;
  modules: string;
  blurb: string;
}[] = [
  {id: 'light', label: 'Light', total: '≈ 100 g', modules: '4 × ≈25 g', blurb: 'Lowest added mass. A gentle starting point for those new to weighted wear.'},
  {id: 'medium', label: 'Medium', total: '≈ 180 g', modules: '4 × ≈45 g', blurb: 'Balanced mass across the knuckle line for everyday wear.'},
  {id: 'heavy', label: 'Heavy', total: '≈ 260 g', modules: '4 × ≈65 g', blurb: 'Highest added mass of the prototype range.'},
];

export const colorLabel = (c: GloveColor) => COLORS.find((x) => x.id === c)!.label;
export const weightLabel = (w: WeightLevel) => WEIGHTS.find((x) => x.id === w)!.label;

export const NAV = [
  {label: 'Home', href: '#home'},
  {label: 'About', href: '#about'},
  {label: 'Product', href: '#product'},
  {label: 'How It Works', href: '#how-it-works'},
  {label: 'Technology', href: '#technology'},
  {label: 'Stories', href: '#stories'},
  {label: 'FAQ', href: '#faq'},
  {label: 'Contact', href: '#contact'},
];
