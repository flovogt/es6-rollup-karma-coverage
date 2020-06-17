import nodeResolve from "rollup-plugin-node-resolve";

export default {
  input: "src/MyModule.js",
  output: [
    {
      file: "pkg/MyModule.js",
      name: "MyModule",
      format: "iife"
    },
    {
      file: "pkg/MyModule-esm.js",
      format: "esm"
    }
  ],
  plugins: [nodeResolve()]
};