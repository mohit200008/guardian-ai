import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const dataDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../data');

function loadJson(filename) {
  return JSON.parse(readFileSync(path.join(dataDir, filename), 'utf8'));
}

let cache = null;

export function getThreatData() {
  if (!cache) {
    cache = {
      demoThreats: loadJson('demoThreats.json'),
      manipulationPatterns: loadJson('manipulationPatterns.json'),
      urlThreatPatterns: loadJson('urlThreatPatterns.json'),
    };
  }
  return cache;
}
