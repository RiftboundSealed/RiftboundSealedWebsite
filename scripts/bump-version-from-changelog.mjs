// scripts/bump-version-from-changelog.mjs
import fs from 'node:fs';
import { execSync } from 'node:child_process';

// 0) Constants
const CHANGELOG_PATH = 'CHANGELOG.md';
const BREAKING_CHANGE = 'Breaking Change';
const ADD = 'Add';
const REMOVE = 'Remove';
const INTERNAL = 'Internal';
const file = fs.readFileSync(CHANGELOG_PATH, 'utf8');

// 1) Split into template block + rest (version history)
const versionHeaderRegex = /^# (\d+\.\d+\.\d+)/m;
const versionMatch = versionHeaderRegex.exec(file);

if (!versionMatch || versionMatch.index === undefined) {
  console.error(
    'Could not find a version header like "# 1.0.0" in CHANGELOG.md',
  );
  process.exit(1);
}

const templateBlock = file.slice(0, versionMatch.index);
const historyBlock = file.slice(versionMatch.index).trimStart();

// Helper to get bullets from one of the template subsections
function extractBullets(template, heading) {
  const header = `## ${heading}`;
  const start = template.indexOf(header);
  if (start === -1) return [];

  // Find the end of the header line
  const headerLineEnd = template.indexOf('\n', start);
  if (headerLineEnd === -1) return [];

  // Find the start of the next "## " section, or end of the template block
  const nextHeaderPos = template.indexOf('\n## ', headerLineEnd);
  const end = nextHeaderPos === -1 ? template.length : nextHeaderPos;
  console.log(start, end);
  console.log(JSON.stringify(templateBlock.slice(headerLineEnd)));

  const body = template.slice(headerLineEnd + 1, end);

  return body.split(/\r?\n/).filter((line) => line.trim().startsWith('- '));
}

const breakingBullets = extractBullets(templateBlock, BREAKING_CHANGE);
const addBullets = extractBullets(templateBlock, ADD);
const removeBullets = extractBullets(templateBlock, REMOVE);
const internalBullets = extractBullets(templateBlock, INTERNAL);

// 2) Decide bump level
let bump = null; // 'major' | 'minor' | 'patch' | null

if (breakingBullets.length > 0) {
  bump = 'major';
} else if (addBullets.length > 0) {
  bump = 'minor';
} else if (removeBullets.length > 0 || internalBullets.length > 0) {
  bump = 'patch';
}

if (!bump) {
  // No bullets in Template → nothing to do
  console.log('');
  process.exit(0);
}

// 3) Parse current version from first "# x.y.z" header
const [majorStr, minorStr, patchStr] = versionMatch[1].split('.');
let major = Number(majorStr);
let minor = Number(minorStr);
let patch = Number(patchStr);

if (isNaN(major) || isNaN(minor) || isNaN(patch)) {
  console.error(`Invalid version format in CHANGELOG.md: ${versionMatch[1]}`);
  process.exit(1);
}
if (bump === 'major') {
  major += 1;
  minor = 0;
  patch = 0;
} else if (bump === 'minor') {
  minor += 1;
  patch = 0;
} else if (bump === 'patch') {
  patch += 1;
}

const newVersion = `${major}.${minor}.${patch}`;

// 4) Bump package.json + package-lock.json via npm
// NOTE: we do this BEFORE touching CHANGELOG so git is clean for `npm version`.
try {
  execSync(`npm version ${newVersion} --no-git-tag-version`, {
    stdio: 'inherit',
  });
} catch (err) {
  console.error('Failed to run "npm version".', err);
  process.exit(1);
}

// 5) New empty template
const newTemplateBlock = [
  '# Template',
  `## ${BREAKING_CHANGE}`,
  `## ${ADD}`,
  `## ${REMOVE}`,
  `## ${INTERNAL}`,
].join('\n');

// 6) New version block built from bullets (newest at top)
let newVersionBlock = `# ${newVersion}\n`;

if (breakingBullets.length > 0) {
  newVersionBlock += `## ${BREAKING_CHANGE}\n`;
  newVersionBlock += breakingBullets.join('\n') + '\n';
}
if (addBullets.length > 0) {
  newVersionBlock += `## ${ADD}\n`;
  newVersionBlock += addBullets.join('\n') + '\n';
}
if (removeBullets.length > 0) {
  newVersionBlock += `## ${REMOVE}\n`;
  newVersionBlock += removeBullets.join('\n') + '\n';
}
if (internalBullets.length > 0) {
  newVersionBlock += `## ${INTERNAL}\n`;
  newVersionBlock += internalBullets.join('\n') + '\n';
}

const newFileContents = [
  newTemplateBlock,
  '',
  newVersionBlock.trimEnd(), // new version first
  '',
  historyBlock.trimEnd(), // then previous versions
  '',
].join('\n');

fs.writeFileSync(CHANGELOG_PATH, newFileContents, 'utf8');

// Just for logs
console.log(`Bumped to ${newVersion}`);
