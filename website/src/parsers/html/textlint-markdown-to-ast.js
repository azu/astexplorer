import defaultParserInterface from '../utils/defaultParserInterface';

import pkg from 'textlint-plugin-html/package.json';

const ID = 'textlint:html';

export default {
    ...defaultParserInterface,
    id: ID,
    displayName: "textlint",
    version: pkg.version,
    homepage: pkg.homepage,
    locationProps: new Set(['loc', 'range']),

    loadParser(callback) {
        require(['textlint-plugin-html/lib/html-to-ast'], callback);
    },

    parse(parser, text) {
        console.log("parser", parser);
        return parser.parse(text);
    },

    opensByDefault(node, key) {
        return key === 'rules';
    },

    _ignoredProperties: new Set(['location'])
};
