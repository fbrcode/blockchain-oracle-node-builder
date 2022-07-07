import fetch from 'node-fetch';
import fs from 'fs';
import { GithubLatestRelease } from './types';

const main = async () => {
  const url = 'https://api.github.com/repos/api3dao/airnode/releases/latest';
  const response = await fetch(url);
  const api3LastRelease: GithubLatestRelease = await response.json();
  console.log(`Latest API3 airnode release: ${api3LastRelease.tag_name}`);
  fs.writeFileSync(
    './config/api3-last-release.json',
    `{ "tag": "${api3LastRelease.tag_name}" }`
  );
};

main();
