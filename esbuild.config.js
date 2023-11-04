const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['index.js'], // Ruta al punto de entrada de tu addon
    bundle: true,
    platform: "browser",
    outfile: './dist/bundle.js', // Ruta donde se generará el archivo de salida
    minify: true, // Minificar el código
}).catch(() => process.exit(1));