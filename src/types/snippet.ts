export type Language = 'TypeScript' | 'Python' | 'SQL' | 'React' | 'Docker';

export interface Snippet {
  id: string;
  title: string;
  language: Language;
  code: string;
  description: string;
  tags: string[];
  createdAt: string;
}