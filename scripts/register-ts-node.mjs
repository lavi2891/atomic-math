import { register } from "node:module";
import { pathToFileURL } from "node:url";

process.env.TS_NODE_COMPILER_OPTIONS = JSON.stringify({
  target: "ES2022",
  module: "nodenext",
  allowImportingTsExtensions: true,
});
process.env.TS_NODE_EXPERIMENTAL_SPECIFIER_RESOLUTION = "node";

register("ts-node/esm", pathToFileURL("./"));
