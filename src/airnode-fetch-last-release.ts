import shell from 'shelljs';
// import { AirnodeClone, AirnodeReleaseTag } from './types';
import * as gitAirnode from '../config/airnode-git.json';
import * as gitAirnodeLastRelease from '../config/airnode-last-release-tag.json';

const gitClone = gitAirnode.url_clone;
const lastRelease = gitAirnodeLastRelease.tag;
const path = 'fetches/';
const cloneCmd = `git clone --depth 1 --branch ${lastRelease} ${gitClone} airnode-${lastRelease}`;

shell.echo(
  `Fetching airnode release ${lastRelease} into ${path}airnode-${lastRelease}`
);
shell.echo(`Executing ${cloneCmd}`);
shell.cd(path);
shell.exec(cloneCmd);

// git clone --depth 1 --branch v0.6.2 git@github.com:api3dao/airnode.git
