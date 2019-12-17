import * as core from '@actions/core';
import { exec } from '@actions/exec';
import getArgs from './getArgs';

const stdout = (data: Buffer) => core.setOutput('version', data.toString());
const stderr = (data: Buffer) => core.error(data.toString());

const minver = '/root/.dotnet/tools/minver';

const run = async () => {
  const args = getArgs();

  await exec('dotnet', [
    'tool',
    'install',
    '--global',
    'minver-cli',
    '--version',
    '2.0.0',
  ]);

  try {
    await exec(minver, args, {
      listeners: {
        debug: (data: string) => core.debug(data),
        stderr,
        stdout,
      },
    });
  } catch (err) {
    core.setFailed(err);
  }
};

run();
