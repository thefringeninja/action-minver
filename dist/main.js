"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec_1 = require("@actions/exec");
const semver_1 = __importDefault(require("semver"));
const getArgs_1 = __importDefault(require("./getArgs"));
const stdout = (data) => {
    const version = data.toString().trim();
    const major = semver_1.default.major(version);
    const minor = semver_1.default.minor(version);
    const patch = semver_1.default.patch(version);
    const prerelease = (semver_1.default.prerelease(version) || []).join('.');
    core.setOutput('version', version);
    core.setOutput('major', major.toString());
    core.setOutput('minor', minor.toString());
    core.setOutput('patch', patch.toString());
    core.setOutput('prerelease', prerelease);
};
const minverPath = './minver';
const minver = `${minverPath}/minver`;
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const args = getArgs_1.default();
    yield exec_1.exec('dotnet', [
        'tool',
        'install',
        '--tool-path',
        minverPath,
        'minver-cli',
        '--version',
        '2.3.0',
    ]);
    try {
        yield exec_1.exec(minver, args, {
            listeners: {
                debug: (data) => core.debug(data),
                stdout,
            },
        });
    }
    catch (err) {
        core.setFailed(err);
    }
});
run();
