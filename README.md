# MinVer for GitHub Actions

_[![Build status](https://github.com/thefringeninja/action-minver/workflows/Build/badge.svg)](https://github.com/thefringeninja/action-minver/actions)_

This repository contains a GitHub Action to run [MinVer](https://github.com/adamralph/minver/). This is intended to be used for projects written in languages other than dotnet. See https://github.com/adamralph/minver/#usage for more information about MinVer.

## Configuration

```yaml
- uses thefringeninja/action-minver
  with:
    # Optional. Specifies which part of the version to auto-increment.
    auto-increment: patch
    # Optional. Sets custom build metadata for your semantic version.
    build-metadata: ${{ github.sha }}
    # Optional. Specifies the default pre-release phase.
    default-pre-release-phase: preview
    # Optional. Specifies the minimum version to use when no tags exist.
    minimum-major-minor: 2.0.0
    # Optional. Specifies the prefix of the tags
    tag-prefix: v
    # Optional. Specifies the log level.
    verbosity: trace
```

## Prerequisites

You must run the following actions first:
- `actions/checkout`: in addition, set `fetch-depth` to 0 to fetch the entire repository, including tags. Without this, the correct version may not get calculated.
- `actions/setup-dotnet`: `minver-cli` is a dotnet tool and requires the dotnet sdk (at least 2.1) to run.
