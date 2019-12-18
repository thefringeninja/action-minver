"use strict";
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
const decamelize_1 = __importDefault(require("decamelize"));
const dasherize = (x) => decamelize_1.default(x, '-');
const getOptions = () => ({
    autoIncrement: core.getInput('auto-increment'),
    buildMetadata: core.getInput('build-metadata'),
    defaultPreReleasePhase: core.getInput('default-pre-release-phase'),
    minimumMajorMinor: core.getInput('minimum-major-minor'),
    tagPrefix: core.getInput('tag-prefix'),
    verbosity: core.getInput('verbosity'),
});
const getArgs = () => Object.entries(getOptions())
    .filter(([_, value]) => !!value)
    .map(([key, value]) => [`--${dasherize(key)}`, value])
    .reduce((x, y) => x.concat(y), []);
exports.default = getArgs;
