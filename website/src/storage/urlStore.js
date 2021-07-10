import React from 'react';
import json_url from "json-url";

const codec = json_url('lzw');

function getIDAndRevisionFromHash() {
    let match = global.location.hash.match(/^#\/snippet\/([^/]+)/);
    if (match) {
        return {
            hash: match[1]
        };
    }
    return null;
}

async function fetchSnippet(hash) {
    const data = await codec.decompress(hash);
    return new Revision({ data, hash });
}

export function owns(snippet) {
    return snippet instanceof Revision;
}

export function matchesURL() {
    return getIDAndRevisionFromHash() !== null;
}

export function fetchFromURL() {
    const data = getIDAndRevisionFromHash();
    if (!data) {
        return Promise.resolve(null);
    }
    return fetchSnippet(data.hash);
}

/**
 * Create a new snippet.
 */
export async function create(data) {
    const hash = await codec.compress(data);
    return new Revision({ data, hash });
}

/**
 * Update an existing snippet.
 */
export async function update(revision, data) {
    // Fetch latest version of snippet
    const hash = await codec.compress(data);
    return new Revision({ data, hash });
}

/**
 * Fork existing snippet.
 */
export function fork(revision, data) {
    return Promise.resolve(null);
}

class Revision {
    constructor({ data, hash }) {
        console.log({data, hash})
        this.data = data;
        this.hash = hash;
    }
    
    canSave() {
        return true;
    }
    
    getPath() {
        return `/snippet/${this.hash}}`;
    }
    
    getSnippetID() {
        return this.hash;
    }
    
    getRevisionID() {
        return null;
    }
    
    getTransformerID() {
        return this.data.toolID;
    }
    
    getTransformCode() {
        return "";
    }
    
    getParserID() {
        return this.data.parserID;
    }
    
    getCode() {
        if (this.data.code == null) {
            return '';
        }
        return this.data.code;
    }
    
    getParserSettings() {
        return this.data.settings[this.data.parserID];
    }
    
    getShareInfo() {
        const snippetID = this.getSnippetID();
        const revisionID = this.getRevisionID();
        return (
            <div className="shareInfo">
                <dl>
                    <dt>Share</dt>
                    <dd>
                        <input
                            readOnly={true}
                            onFocus={e => e.target.select()}
                            value={`https://textlint.github.io/astexplorer/#/snippet/${snippetID}`}
                        />
                    </dd>
                </dl>
            </div>
        );
    }
}
