import hljs from "highlight.js/lib/highlight";
import "highlightjs-line-numbers.js";
import xml from "highlight.js/lib/languages/xml";

import "highlight.js/styles/a11y-dark.css";
import "./highlight-line-numbers.css";


hljs.registerLanguage("xml", xml);

$(function () {
    document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightBlock(block);
        hljs.lineNumbersBlock(block);
    });
});
