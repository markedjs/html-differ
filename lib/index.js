import { HtmlDiff } from './HtmlDiff.js';
import modifyHtmlAccordingToOptions from './utils/modify.js';
import { defaults } from './defaults.js';
import handleMasks from './utils/mask.js';

async function getModifiedTokens(html, options) {
  const tokens = await modifyHtmlAccordingToOptions(html, options);
  return tokens.split(/({{.+?}}(?!})|[{}\(\)\[\]#\*`=:;,.<>"'\/]|\s+)/).filter(i => i);
}

/**
 * @class HtmlDiffer
 * @constructor
 * @param {Object}   [options]
 * @param {String[]} [options.ignoreAttributes]
 * @param {String[]} [options.compareAttributesAsJSON]
 * @param {Boolean}  [options.ignoreWhitespaces=true]
 * @param {Boolean}  [options.ignoreComments=true]
 * @param {Boolean}  [options.ignoreEndTags=false]
 * @param {Boolean}  [options.ignoreSelfClosingSlash=false]
 */
export class HtmlDiffer {
  constructor(options) {
    this.options = defaults(options);
  }

  /**
   * Returns the diff between two given chunks of HTML
   * @class HtmlDiffer
   * @method
   * @param {String} html1
   * @param {String} html2
   * @returns {Diff}
   */
  async diffHtml(html1, html2) {
    // precompute the tokenized html here, since it can't do it in `Diff.tokenize()` because
    // the sax parser is async
    const tokens = {
      html1: await getModifiedTokens(html1, this.options),
      html2: await getModifiedTokens(html2, this.options),
    };

    const htmlDiffer = new HtmlDiff(this.options, tokens);

    // just pass in keys for the left and right html, the original strings are no longer used
    // after tokenize()
    const diff = htmlDiffer.diff('html1', 'html2');

    return handleMasks(diff);
  }

  /**
   * Compares two given chunks of HTML
   * @class HtmlDiffer
   * @method
   * @param {String} html1
   * @param {String} html2
   * @returns {Boolean}
   */
  async isEqual(html1, html2) {
    if (html1 === html2) {
      return true;
    }

    const diff = await this.diffHtml(html1, html2);

    return (diff.length === 1 && !diff[0].added && !diff[0].removed);
  }
}

const htmlDiffer = new HtmlDiffer();

export const diffHtml = htmlDiffer.diffHtml.bind(htmlDiffer);
export const isEqual = htmlDiffer.isEqual.bind(htmlDiffer);
