import * as core from '@actions/core';
import { exec } from '@actions/exec';
import semver from 'semver';
import getArgs from './getArgs';

const stdout = (data: Buffer) => {
  const version = data.toString().trim();

  const major = semver.major(version);
  const minor = semver.minor(version);
  const patch = semver.patch(version);
  const prerelease = (semver.prerelease(version) || []).join('.');

  core.setOutput('version', version);
  core.setOutput('major', major.toString());
  core.setOutput('minor', minor.toString());
  core.setOutput('patch', patch.toString());
  core.setOutput('prerelease', prerelease);
};

const minverPath = './minver';
const minver = `${minverPath}/minver`;

const run = async () => {
  const args = getArgs();

  await exec('dotnet', [
    'tool',
    'install',
    '--tool-path',
    minverPath,
    'minver-cli',
    '--version',
    '2.3.0',
  ]);

  try {
    await exec(minver, args, {
      listeners: {
        debug: (data: string) => core.debug(data),
        stdout,
      },
    });
  } catch (err) {
    core.setFailed(err);
  }
};

run();
