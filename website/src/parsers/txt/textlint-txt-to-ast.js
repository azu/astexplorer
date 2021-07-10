import defaultParserInterface from '../utils/defaultParserInterface';

import pkg from '@textlint/text-to-ast/package.json';

const ID = 'textlint:txt-to-ast';

export default {
    ...defaultParserInterface,
    id: ID,
    displayName: "textlint",
    version: pkg.version,
    homepage: pkg.homepage,
    locationProps: new Set(['loc', 'range']),

    loadParser(callback) {
        require(['@textlint/text-to-ast'], callback);
    },

    parse(parser, text) {
        return parser.parse(text);
    },

    opensByDefault(node, key) {
        return key === 'rules';
    },

    _ignoredProperties: new Set(['location'])
};
