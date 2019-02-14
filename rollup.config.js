import typescript from 'typescript'
import nodeResolve from 'rollup-plugin-node-resolve'
import typescriptPlugin from 'rollup-plugin-typescript'

const extensions = [".ts", ".tsx"];

// treat as externals not relative and not absolute paths
const external = id => !id.startsWith(".") && !id.startsWith("/");

export default [
  {
    external,
    input: `src/index.tsx`,
    output: {
      file: `build/index.esm.js`,
      format: "esm"
    },
    plugins: [nodeResolve({ extensions }), typescriptPlugin({ typescript })]
  },
  {
    external,
    input: `src/index.tsx`,
    output: {
      file: `build/index.js`,
      format: "cjs"
    },
    plugins: [nodeResolve({ extensions }), typescriptPlugin({ typescript })]
  }
];
