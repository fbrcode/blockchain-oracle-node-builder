import fetch from 'node-fetch';
import { GithubLatestRelease } from './types';

const main = async () => {
  const url = 'https://api.github.com/repos/api3dao/airnode/releases/latest';
  const response = await fetch(url);
  const api3LastRelease: GithubLatestRelease = await response.json();
  console.log(`Latest API3 airnode release: ${api3LastRelease.tag_name}`);
};

main();
