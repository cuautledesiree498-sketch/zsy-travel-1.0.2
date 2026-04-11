const {execFileSync} = require('node:child_process');
const path = require('node:path');

const query = '*[_type == "destination"][0...1]{_id,_type,name,slug}';
const cliPath = path.join(process.cwd(), 'node_modules', 'sanity', 'bin', 'sanity');
const args = [
  cliPath,
  'documents',
  'query',
  '--project-id', 'j7fa6cf0',
  '--dataset', 'production',
  '--api-version', '2026-04-03',
  query,
];

const out = execFileSync(process.execPath, args, {encoding: 'utf8'});
process.stdout.write(out);
