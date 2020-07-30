/**
 * Copyright 2018-2020 Flavio Garcia
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let stealTools = require("steal-tools");

stealTools.build({
    main: [
        "faz/faz",
        "faz/index",
        "faz/app/alert",
        "faz/app/form",
        "faz/app/nav",
        "faz/app/navbar",
        "faz/app/pagination"
    ],
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
