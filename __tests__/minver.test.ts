import getArgs from "../src/getArgs";
import each from "jest-each";
import * as process from "process";
import * as cp from "child_process";
import * as path from "path";

const testData = [
  ["verbosity", "--verbosity", "debug"],
  ["auto-increment", "--auto-increment", "minor"],
  ["build-metadata", "--build-metadata", "pr-123"],
  ["default-pre-release-phase", "--default-pre-release-phase", "alpha"],
  ["minimum-major-minor", "--minimum-major-minor", "1.2"],
  ["tag-prefix", "--tag-prefix", "v"]
];
const getEnvKey = (key: string) => `INPUT_${key.toUpperCase()}`;

describe("minver", () => {
  describe("getArgs", () => {
    each(testData).test(
      "transforms the input of %s to %s=%s",
      async (input: string, argument: string, value: string) => {
        const key = getEnvKey(input);
        try {
          process.env[key] = value;

          const args = getArgs();

          await expect(args).toStrictEqual([argument, value]);
        } finally {
          delete process.env[key];
        }
      }
    );
    each(testData).test(
      "does not set %s to %s when it is empty",
      async (input: string, _: string) => {
        const key = getEnvKey(input);
        try {
          process.env[key] = "";

          const args = getArgs();

          await expect(args).toStrictEqual([]);
        } finally {
          delete process.env[key];
        }
      }
    );
  });

  test("run", (done) => {
    const env = testData.reduce((x, [input, _, value]) => ({ [getEnvKey(input)]: value, ...x }), {
      ...process.env
    });

    const main = path.join(__dirname, "..", "dist", "main.js");

    const spawn = cp.spawn("node", [main], {
      env
    });

    if (spawn.stdout) {
      spawn.stdout.on("data", data => console.log(data.toString()));
    }

    if (spawn.stderr) {
      spawn.stderr.on("data", data => console.log(data.toString()));
    }

    spawn.on("close", (code) => {
      try {
        expect(code).toBe(0);
      } finally {
        done();
      }
    });
  });
});