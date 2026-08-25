import { execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const repositoryRoot = process.cwd();
const safeDirectory = repositoryRoot.replaceAll('\\', '/');
const legacyRevision = process.env.HUYGENSOFT_LEGACY_REVISION || '379c580';
const outputDirectory = path.join(repositoryRoot, 'src', 'data');
const outputFile = path.join(outputDirectory, 'legacy-site.json');

function git(...args) {
  return execFileSync('git', ['-c', `safe.directory=${safeDirectory}`, ...args], {
    cwd: repositoryRoot,
    encoding: 'utf8',
  });
}

function gitShow(file) {
  return git('show', `${legacyRevision}:${file}`);
}

function decodeHtml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&#8209;', '‑')
    .replaceAll('&ndash;', '–')
    .replaceAll('&mdash;', '—');
}

function stripMarkup(value) {
  return decodeHtml(value
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim());
}

function firstMatch(value, pattern) {
  return pattern.exec(value)?.[1] ?? '';
}

function parseSections(main) {
  return [...main.matchAll(/<section\b[^>]*>([\s\S]*?)<\/section\s*>/gi)]
    .map((match) => {
      const section = match[1];
      const heading = stripMarkup(firstMatch(section, /<h2[^>]*>([\s\S]*?)<\/h2>/i));
      const blocks = [...section.matchAll(/<(p|ul|ol)\b[^>]*>([\s\S]*?)<\/\1\s*>/gi)]
        .map((block) => {
          const tag = block[1].toLowerCase();
          if (tag === 'p') return { type: 'paragraph', content: stripMarkup(block[2]) };
          return {
            type: 'list',
            ordered: tag === 'ol',
            items: [...block[2].matchAll(/<li\b[^>]*>([\s\S]*?)<\/li\s*>/gi)]
              .map((item) => stripMarkup(item[1]))
              .filter(Boolean),
          };
        })
        .filter((block) => block.type === 'paragraph' ? block.content : block.items.length > 0);

      return {
        heading,
        blocks,
      };
    })
    .filter((section) => section.heading || section.blocks.length);
}

function sourceContentText(main) {
  return [...main.matchAll(/<(h1|h2|p|li)\b[^>]*>([\s\S]*?)<\/\1\s*>/gi)]
    .map((match) => stripMarkup(match[2]));
}

function importedContentText(main, service) {
  const heading = stripMarkup(firstMatch(main, /<h1\b[^>]*>([\s\S]*?)<\/h1\s*>/i));
  return [
    heading,
    service.intro,
    ...service.sections.flatMap((section) => [
      section.heading,
      ...section.blocks.flatMap((block) => block.type === 'paragraph' ? [block.content] : block.items),
    ]),
  ].filter(Boolean);
}

const categories = [
  {
    id: '3cx',
    title: '3CX & Communication Solutions',
    summary: 'We build tailored API middleware that connects 3CX PBX systems with enterprise CRMs, automated call flows, predictive dialers and AI-powered agents.',
  },
  {
    id: 'locker',
    title: 'Smart Locker & Custom Hardware Solutions',
    summary: 'Complete software platforms for managing smart locker hardware, kiosks and custom embedded systems, from desktop controllers and cloud APIs to mobile apps.',
  },
  {
    id: 'enterprise',
    title: 'Enterprise Software & Cloud Backend',
    summary: 'Scalable APIs, secure backend infrastructure and high-performance desktop applications for finance, healthcare and enterprise environments.',
  },
  {
    id: 'modernization',
    title: 'Legacy Software Modernization',
    summary: 'Practical upgrades for older applications: supported .NET platforms, modern desktop interfaces, profiling and modular service architectures.',
  },
  {
    id: 'specialized',
    title: 'Specialized Engineering Services',
    summary: 'Targeted solutions for distinctive technical problems, including integration work, Windows utilities, deployment packaging and data synchronisation.',
  },
];

const categoryByDirectory = {
  '3cx': '3cx',
  locker: 'locker',
  enterprise: 'enterprise',
  modernization: 'modernization',
  specialized: 'specialized',
};

const slugByLegacyPath = {
  '/services/3cx/c3x-api.html': 'custom-3cx-api-development',
  '/services/3cx/c3x-cfd.html': '3cx-call-flow-designer',
  '/services/3cx/c3x-dialer.html': 'predictive-power-dialers',
  '/services/3cx/c3x-ai.html': 'ai-agents-automation',
  '/services/3cx/c3x-crm.html': 'custom-crm-applications',
  '/services/locker/locker-desktop.html': 'locker-desktop-application',
  '/services/locker/locker-api.html': 'locker-api-services',
  '/services/locker/locker-mobile.html': 'locker-mobile-application',
  '/services/locker/locker-dashboard.html': 'locker-admin-dashboard',
  '/services/enterprise/secure-apis.html': 'secure-financial-apis',
  '/services/enterprise/cloud-devops.html': 'azure-cloud-devops',
  '/services/enterprise/high-performance.html': 'high-performance-desktop-apps',
  '/services/enterprise/database-optimization.html': 'database-optimization',
  '/services/modernization/framework-upgrades.html': 'dotnet-framework-upgrades',
  '/services/modernization/winforms-wpf.html': 'winforms-to-wpf-transitions',
  '/services/modernization/performance-tuning.html': 'memory-performance-tuning',
  '/services/modernization/microservices.html': 'monolith-to-microservices',
  '/services/specialized/packaging.html': 'application-packaging',
  '/services/specialized/cpp-porting.html': 'cpp-to-csharp-porting',
  '/services/specialized/windows-utilities.html': 'windows-desktop-utilities',
  '/services/specialized/data-sync.html': 'data-synchronization-agents',
};

const serviceFiles = git('ls-tree', '-r', '--name-only', legacyRevision, '--', 'public/services')
  .split(/\r?\n/)
  .filter((file) => file.endsWith('.html'));

const services = serviceFiles.map((file) => {
  const legacyPath = `/${file.replace(/^public\//, '')}`;
  const html = gitShow(file);
  const main = firstMatch(html, /<main(?=[\s>])[^>]*>([\s\S]*?)<\/main\s*>/i);
  const categoryDirectory = file.split('/')[2];
  const intro = [...main.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((paragraph) => stripMarkup(paragraph[1]))
    .find(Boolean) ?? '';

  const service = {
    category: categoryByDirectory[categoryDirectory],
    legacyPath,
    slug: slugByLegacyPath[legacyPath],
    title: stripMarkup(firstMatch(html, /<title>([\s\S]*?)<\/title>/i)).replace(/\s*\|\s*Huygensoft$/i, ''),
    description: decodeHtml(firstMatch(html, /<meta\s+name="description"\s+content="([\s\S]*?)"/i)),
    intro,
    sections: parseSections(main),
  };

  if (JSON.stringify(sourceContentText(main)) !== JSON.stringify(importedContentText(main, service))) {
    throw new Error(`Legacy service content was not fully preserved for ${legacyPath}.`);
  }

  return service;
});

const testimonialsSource = firstMatch(gitShow('public/src/js/app.js'), /const testimonials\s*=\s*\[([\s\S]*?)\n\];/i);
const testimonialPattern = /\{\s*client:\s*"([\s\S]*?)",\s*project:\s*"([\s\S]*?)",\s*date:\s*"([\s\S]*?)",\s*rating:\s*([\d.]+),\s*location:\s*"([\s\S]*?)",\s*feedback:\s*"([\s\S]*?)"\s*\}/g;
const testimonials = [...testimonialsSource.matchAll(testimonialPattern)].map((match) => ({
  client: match[1].replace(/\\u([0-9a-fA-F]{4})/g, (_, code) => String.fromCharCode(Number.parseInt(code, 16))),
  project: match[2].replace(/\\u([0-9a-fA-F]{4})/g, (_, code) => String.fromCharCode(Number.parseInt(code, 16))),
  date: match[3],
  rating: Number(match[4]),
  location: match[5],
  feedback: match[6].replace(/\\u([0-9a-fA-F]{4})/g, (_, code) => String.fromCharCode(Number.parseInt(code, 16))),
}));

if (services.length !== 21 || testimonials.length !== 16 || services.some((service) => !service.slug || !service.category)) {
  throw new Error(`Legacy import is incomplete: ${services.length} services and ${testimonials.length} testimonials.`);
}

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputFile, `${JSON.stringify({ categories, services, testimonials }, null, 2)}\n`, 'utf8');
console.log(`Imported ${services.length} service pages and ${testimonials.length} testimonials to ${path.relative(repositoryRoot, outputFile)}.`);
