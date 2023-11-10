const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['index.js'], // Ruta al punto de entrada de tu addon
    bundle: true,
    platform: "browser",
    outfile: '../ainaradev7.github.io/AES/AES.js', // Ruta donde se generar� el archivo de salida
    minify: true, // Minificar el c�digo
}).catch(() => process.exit(1));