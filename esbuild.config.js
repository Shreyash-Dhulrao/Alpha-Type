const { build } = require('esbuild');
const urlPlugin = require('esbuild-plugin-url');

build({
  entryPoints: ['./src/index.js'], // or your entry file
  bundle: true,
  outdir: 'dist',
  plugins: [
    urlPlugin({
      // Define which files to process as URL-encoded
      filter: /\.(png|jpe?g|gif|svg)$/i,
      // Limit file size to inline files as base64 URLs
      limit: 10 * 1024, // 10 KB
    }),
  ],
}).catch(() => process.exit(1));
