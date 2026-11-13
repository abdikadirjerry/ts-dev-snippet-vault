import type { Snippet } from '../types/snippet';

export const INITIAL_SNIPPETS: Snippet[] = [
  {
    id: 'snp-1',
    title: 'Prisma Client Singleton Instance',
    language: 'TypeScript',
    code: `import { PrismaClient } from '@prisma/client';\n\nconst globalForPrisma = global as unknown as { prisma: PrismaClient };\n\nexport const prisma = globalForPrisma.prisma || new PrismaClient();\n\nif (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;`,
    description: 'Prevents multiple Prisma Client instances from being spawned during Next.js hot reloads in development.',
    tags: ['Database', 'Prisma', 'Next.js'],
    createdAt: '2026-06-01',
  },
  {
    id: 'snp-2',
    title: 'Python Access Log Regex Parser',
    language: 'Python',
    code: `import re\n\nLOG_PATTERN = re.compile(\n    r'(?P<ip>\\d{1,3}(?:\\.\\d{1,3}){3}) - - \\[(?P<date>[^\\]]+)\\] "(?P<method>[A-Z]+) (?P<path>[^\\s]+) [^"]+" (?P<status>\\d{3}) (?P<size>\\d+)'\n)`,
    description: 'Regular expression to extract IP addresses, timestamps, methods, and status codes from server access logs.',
    tags: ['Security', 'Regex', 'Parsing'],
    createdAt: '2026-06-05',
  },
  {
    id: 'snp-3',
    title: 'Tailwind CSS Glassmorphism Card',
    language: 'React',
    code: `<div className="bg-slate-900/60 border border-slate-800 backdrop-blur-md p-6 rounded-2xl shadow-xl">\n  <h3 className="text-sm font-bold text-slate-100">Glass Panel</h3>\n</div>`,
    description: 'Reusable container layout featuring dark-mode translucency and backdrop blurring.',
    tags: ['UI', 'Tailwind', 'CSS'],
    createdAt: '2026-06-10',
  },
];