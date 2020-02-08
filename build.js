var stealTools = require("steal-tools");

stealTools.build({
    main: ["faz/index", "faz/app/alert", "faz/app/nav", "faz/app/navbar"],
    bundleAssets: true,
    bundleSteal: true
});

stealTools.export({
    steal: {
        main: "faz"
    },
    options: {
        verbose: true
    },
    outputs: {
        amd: {
            format: "amd",
            graphs: ["faz"],
            dest: __dirname + "/dist/amd"
        },
        standalone: {
            format: "global",
            modules: ["faz"],
            dest: __dirname + "/dist/standalone.js",
            minify: true
        }
    }
});
