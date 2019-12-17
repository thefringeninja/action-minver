import * as core from '@actions/core';
import decamelize from 'decamelize';

interface Options {
  autoIncrement?: string;
  buildMetadata?: string;
  defaultPreReleasePhase?: string;
  minimumMajorMinor?: string;
  tagPrefix?: string;
  verbosity?: string;
}

const dasherize = (x: string) => decamelize(x, '-');

const getOptions = (): Options => ({
  autoIncrement: core.getInput('auto-increment'),
  buildMetadata: core.getInput('build-metadata'),
  defaultPreReleasePhase: core.getInput('default-pre-release-phase'),
  minimumMajorMinor: core.getInput('minimum-major-minor'),
  tagPrefix: core.getInput('tag-prefix'),
  verbosity: core.getInput('verbosity'),
});

const getArgs = () =>
  Object.entries(getOptions())
    .filter(([_, value]) => !!value)
    .map(([key, value]) => [`--${dasherize(key)}`, value])
    .reduce((x, y) => x.concat(y), []);

export default getArgs;
