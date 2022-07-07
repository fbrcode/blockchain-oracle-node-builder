import fetch from 'node-fetch';
import fs from 'fs';
import { GithubLatestRelease } from './types';

const main = async () => {
  const filePath = 'config/airnode-last-release-tag.json';
  const url = 'https://api.github.com/repos/api3dao/airnode/releases/latest';
  const response = await fetch(url);
  const api3LastRelease: GithubLatestRelease = await response.json();
  console.log(`Latest airnode release: ${api3LastRelease.tag_name}`);
  fs.writeFileSync(
    filePath,
    JSON.stringify(
      {
        tag: api3LastRelease.tag_name,
        url: api3LastRelease.html_url,
        created_at: api3LastRelease.created_at,
      },
      null,
      2
    )
  );
};

main();
