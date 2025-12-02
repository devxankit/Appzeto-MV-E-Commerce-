#!/usr/bin/env node

/**
 * Simple script to check for common Tailwind CSS class issues
 * This helps identify deprecated or non-standard class patterns
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = join(__dirname, '..');
const srcDir = join(projectRoot, 'src');

// Common patterns to check
const patterns = [
  {
    name: 'flex-shrink-0 should be shrink-0',
    pattern: /flex-shrink-0/g,
    replacement: 'shrink-0',
    severity: 'warning'
  },
  {
    name: 'flex-grow-0 should be grow-0',
    pattern: /flex-grow-0/g,
    replacement: 'grow-0',
    severity: 'warning'
  },
  {
    name: 'aspect-[280/200] should be aspect-280/200',
    pattern: /aspect-\[280\/200\]/g,
    replacement: 'aspect-280/200',
    severity: 'warning'
  },
  {
    name: 'min-h-[2.5rem] should be min-h-10',
    pattern: /min-h-\[2\.5rem\]/g,
    replacement: 'min-h-10',
    severity: 'warning'
  },
  {
    name: 'bg-gradient-to-* should be bg-linear-to-*',
    pattern: /bg-gradient-to-([rtblxy])/g,
    replacement: 'bg-linear-to-$1',
    severity: 'warning'
  }
];

function getAllFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and dist
      if (!file.includes('node_modules') && !file.includes('dist')) {
        getAllFiles(filePath, fileList);
      }
    } else if (extname(file) === '.jsx' || extname(file) === '.js') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function checkFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const relativePath = filePath.replace(projectRoot + '\\', '').replace(projectRoot + '/', '');
  const issues = [];
  
  patterns.forEach(({ name, pattern, replacement, severity }) => {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const lineNumber = content.substring(0, match.index).split('\n').length;
      issues.push({
        file: relativePath,
        line: lineNumber,
        message: `${name}`,
        suggestion: `Use "${replacement}" instead`,
        severity
      });
    }
  });
  
  return issues;
}

function main() {
  console.log('🔍 Checking Tailwind CSS classes...\n');
  
  const files = getAllFiles(srcDir);
  const allIssues = [];
  
  files.forEach(file => {
    const issues = checkFile(file);
    allIssues.push(...issues);
  });
  
  if (allIssues.length === 0) {
    console.log('✅ No Tailwind CSS class issues found!\n');
    process.exit(0);
  }
  
  // Group by file
  const issuesByFile = {};
  allIssues.forEach(issue => {
    if (!issuesByFile[issue.file]) {
      issuesByFile[issue.file] = [];
    }
    issuesByFile[issue.file].push(issue);
  });
  
  // Print issues
  Object.keys(issuesByFile).forEach(file => {
    console.log(`\n📄 ${file}`);
    issuesByFile[file].forEach(issue => {
      const icon = issue.severity === 'error' ? '❌' : '⚠️';
      console.log(`  ${icon} Line ${issue.line}: ${issue.message}`);
      console.log(`     💡 Suggestion: ${issue.suggestion}`);
    });
  });
  
  console.log(`\n\n📊 Summary: ${allIssues.length} issue(s) found across ${Object.keys(issuesByFile).length} file(s)\n`);
  process.exit(allIssues.length > 0 ? 1 : 0);
}

main();

