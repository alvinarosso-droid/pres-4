export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  points: string[];
  image?: string;
  layout: 'intro' | 'content' | 'split';
}
