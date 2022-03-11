import { Diff } from 'diff';
import { defaults } from './defaults.js';

/**
 * @class HtmlDiff
 * @constructor
 * @augments Diff
 * @param {Object|String} [options] options or preset name
 * @param {String}   [options.preset]
 * @param {String[]} [options.ignoreAttributes]
 * @param {String[]} [options.compareAttributesAsJSON]
 * @param {Boolean}  [options.ignoreWhitespaces=true]
 * @param {Boolean}  [options.ignoreComments=true]
 * @param {Boolean}  [options.ignoreEndTags=false]
 * @param {Boolean}  [options.ignoreSelfClosingSlash=false]
 */
export class HtmlDiff extends Diff {
  constructor(options, tokens) {
    super(options);
    this.options = defaults(options);
    this._tokenOverride = tokens;
  }

  /**
     * Tokenizes the given HTML
     *
     * This overrides the default tokenizer from the `diff`
     * @param {String} html
     * @returns {Array}
     */
  tokenize(html) {
    return this._tokenOverride[html];
  }
}
