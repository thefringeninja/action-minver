import * as core from '@actions/core';
import { exec } from '@actions/exec';
import getArgs from './getArgs';

const stdout = (data: Buffer) =>
  core.setOutput('version', data.toString().trim());

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
    '2.0.0',
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
