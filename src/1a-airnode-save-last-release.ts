import fetch from 'node-fetch';
import fs from 'fs';
import { GithubLatestRelease, AirnodeLatestRelease } from './types';

export const fetchLatestAirnodeRelease =
  async (): Promise<AirnodeLatestRelease> => {
    const filePath = 'config/airnode-last-release-tag.json';
    const url = 'https://api.github.com/repos/api3dao/airnode/releases/latest';
    const response = await fetch(url);
    const ghLatestRelease: GithubLatestRelease = await response.json();
    const airnodeLatestRelease: AirnodeLatestRelease = {
      tag: ghLatestRelease.tag_name,
      url: ghLatestRelease.html_url,
      created_at: ghLatestRelease.created_at.toString(),
    };
    console.log(`Latest airnode release: ${airnodeLatestRelease.tag}`);
    fs.writeFileSync(filePath, JSON.stringify(airnodeLatestRelease, null, 2));
    return airnodeLatestRelease;
  };

// fetchLatestAirnodeRelease()
//   .then(() => {
//     console.log('Done fetching airnode last release ' + '\u2705');
//   })
//   .catch((err) => {
//     console.log(err);
//   });
