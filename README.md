# html-differ
[![Build Status](https://github.com/markedjs/html-differ/workflows/CI/badge.svg)](https://github.com/markedjs/html-differ/actions)
[![Install Size](https://packagephobia.now.sh/badge?p=@markedjs/html-differ)](https://packagephobia.now.sh/result?p=@markedjs/html-differ)

Compares two HTML strings.

<!-- TOC -->
- [The comparison algorithm](#the-comparison-algorithm)
- [Install](#install)
- [API](#api)
  - [HtmlDiffer](#htmldiffer)
    - [Options](#options)
      - [ignoreAttributes](#ignoreattributes-array)
      - [compareAttributesAsJSON](#compareattributesasjson-array)
      - [ignoreWhitespaces](#ignorewhitespaces-boolean)
      - [ignoreComments](#ignorecomments-boolean)
      - [ignoreEndTags](#ignoreendtags-boolean)
      - [ignoreSelfClosingSlash](#ignoreselfclosingslash-boolean)
    - [Presets](#presets)
      - [Usage](#usage)
    - [Methods](#methods)
      - [htmlDiffer.diffHtml](#htmldifferdiffhtml)
      - [htmlDiffer.isEqual](#htmldifferisequal)
  - [Logger](#logger)
    - [Methods](#methods-1)
      - [logger.getDiffText](#loggergetdifftext)
      - [logger.logDiffText](#loggerlogdifftext)
  - [Example](#example)
- [Usage as a program](#usage-as-a-program)
  - [Example](#example-1)
  - [Configuration file](#configuration-file)
- [Masks](#masks)
  - [Syntax](#syntax)
  - [Screening](#screening)

<!-- TOC END -->

## The comparison algorithm

**html-differ** compares HTML using the following criteria:

* `<!DOCTYPE>` declarations are case-insensitive, so the following two code samples will be considered to be equivalent:

```html
<!DOCTYPE HTML PUBLIC "_PUBLIC" "_SYSTEM">
```

```html
<!doctype html public "_PUBLIC" "_SYSTEM">
```

* Whitespaces (spaces, tabs, new lines etc.) inside start and end tags are ignored during the comparison.

For example, the following two code samples will be considered to be equivalent:

```html
<span id="1"></span>
```

```html
<span id=
    "1"    ></span   >
```

* Two respective lists of attributes are considered to be equivalent even if they are specified in different order.

For example, the following two code samples will be considered to be equivalent:

```html
<span id="blah" class="ololo" tabIndex="1">Text</span>
```

```html
<span tabIndex="1" id="blah" class="ololo">Text</span>
```

* Two respective attributes `class` are considered to be equivalent if they refer to the same groups of CSS styles.

For example, the following two code samples will be considered to be equivalent:

```html
<span class="ab bc cd">Text</span>
```

```html
<span class=" cd  ab bc bc">Text</span>
```

**CAUTION!**<br>
**html-differ** does not check the validity of HTML, but compares them using the above shown criteria and specified options (see the list of possible [options](https://github.com/markedjs/html-differ/tree/master#options)).

## Install

```bash
$ npm install @markedjs/html-differ
```

## API

### HtmlDiffer

```js
import { HtmlDiffer } from '@markedjs/html-differ';
const htmlDiffer = new HtmlDiffer(options);
```

where `options` is an object.

#### Options

<!-- TOC:display:ignoreAttributes -->
##### ignoreAttributes: [Array]

Sets what kind of respective attributes' content will be ignored during the comparison (default: `[]`).

**Example**: `['id', 'for']`<br>
The following two code samples will be considered to be equivalent:

```html
<label for="random">Text</label>
<input id="random">
```

```html
<label for="sfsdfksdf">Text</label>
<input id="sfsdfksdf">
```

<!-- TOC:display:compareAttributesAsJSON -->
##### compareAttributesAsJSON: [Array]

Sets what kind of respective attributes' content will be compared as JSON objects, but not as strings (default: `[]`).<br>
In cases when the value of the attribute is an invalid JSON or can not be wrapped into a function, it will be compared as `undefined`.

**Example**: `[{ name: 'data', isFunction: false }, { name: 'onclick', isFunction: true }]`<br>
The following two code samples will be considered to be equivalent:

```html
<div data='{"bla":{"first":"ololo","second":"trololo"}}'></div>
<span onclick='return {"aaa":"bbb","bbb":"aaa"}'></span>

<button data='REALLY BAD JSON'></button>
<button onclick='REALLY BAD FUNCTION'></button>
```

```html
<div data='{"bla":{"second":"trololo","first":"ololo"}}'></div>
<span onclick='return {"bbb":"aaa","aaa":"bbb"}'></span>

<button data='undefined'></button>
<button onclick='undefined'></button>
```

**REMARK!**<br>
The first element of the array could be written in a short form as string:<br>
`['data', { name: 'onclick', isFunction: true }]`.

<!-- TOC:display:ignoreWhitespaces -->
##### ignoreWhitespaces: Boolean

Makes **html-differ** ignore whitespaces (spaces, tabs, new lines etc.) during the comparison (default: `true`).

**Example**: `true`<br>
The following two code samples will be considered to be equivalent:

```html
<html>Text Text<head lang="en"><title></title></head><body>Text</body></html>
```

```html
 <html>
 Text   Text
<head lang="en">
    <title>               </title>


            </head>

<body>
     Text

    </body>




</html>

```

<!-- TOC:display:ignoreComments -->
##### ignoreComments: Boolean

Makes **html-differ** ignore HTML comments during the comparison (default: `true`).

**REMARK!**<br>
Does not ignore [conditional comments](http://en.wikipedia.org/wiki/Conditional_comment).


**Example**: `true`<br>
The following two code samples will be considered to be equivalent:

```html
<!DOCTYPE html>
<!-- comments1 -->
<html>
<head lang="en">
    <meta charset="UTF-8">
    <!--[if IE]>
        <link rel="stylesheet" type="text/css" href="all-ie-only.css" />
    <![endif]-->
    <!--[if !IE]><!-->
        <link href="non-ie.css" rel="stylesheet">
    <!--<![endif]-->
</head>
<body>
Text<!-- comments2 -->
</body>
</html>
```

```html
<!DOCTYPE html>

<html>
<head lang="en">
    <meta charset="UTF-8">
    <!--[if IE]>
        <link href="all-ie-only.css" type="text/css" rel="stylesheet"/>
    <![endif]-->
    <!--[if !IE]><!-->
        <link href="non-ie.css" rel="stylesheet">
    <!--<![endif]-->
</head>
<body>
Text
</body>
</html>
```

<!-- TOC:display:ignoreEndTags -->
##### ignoreEndTags: Boolean

Makes **html-differ** ignore end tags during the comparison (default: `false`).

**Example**: `true`<br>
The following two code samples will be considered to be equivalent:

```html
<span>Text</span>
```

```html
<span>Text</spane>
```

<!-- TOC:display:ignoreSelfClosingSlash -->
##### ignoreSelfClosingSlash: Boolean

Makes **html-differ** ignore tags' self closing slash during the comparison (default: `false`).

**Example**: `true`<br>
For example, the following two code samples will be considered to be equivalent:

```html
<img src="blah.jpg" />
```

```html
<img src="blah.jpg">
```

#### Presets

* [bem](https://github.com/markedjs/html-differ/blob/master/presets/bem.json) - sets predefined options for [BEM](http://bem.info/).


##### Usage

Passing of a preset via the constructor:

```js
import { HtmlDiffer } from '@markedjs/html-differ';
const htmlDiffer = new HtmlDiffer('bem');
```

Redefinition of a preset via the constructor:

```js
import { HtmlDiffer } from '@markedjs/html-differ';
const htmlDiffer = new HtmlDiffer({ preset: 'bem', ignoreAttributes: [] });
```

#### Methods

##### htmlDiffer.diffHtml

**@param** *{String}* - the 1-st HTML code<br>
**@param** *{String}* - the 2-nd HTML code<br>
**@returns** *Promise<{Array of objects}>* - [array with diffs](https://github.com/kpdecker/jsdiff#change-objects) between HTML

##### htmlDiffer.isEqual

**@param** *{String}* - the 1-st HTML code<br>
**@param** *{String}* - the 2-nd HTML code<br>
**@returns** *Promise<{Boolean}>*


### Logger

```js
import * as logger from '@markedjs/html-differ/lib/logger';
```

#### Methods

##### logger.getDiffText

**@param** *{Array of objects}* - the result of the work of the method [htmlDiffer.diffHtml](https://github.com/markedjs/html-differ/tree/master#htmldifferdiffhtml)<br>
**@param** *{Object}* - options:<br>

* **charsAroundDiff: Number** - the number of characters around the diff result between two HTML (default: `40`).

**@returns** *{String}*

##### logger.logDiffText
**@param** *{Array of objects}* - the result of the work of the method [htmlDiffer.diffHtml](https://github.com/markedjs/html-differ/tree/master#htmldifferdiffhtml)<br>
**@param** *{Object}* - options:<br>

* **charsAroundDiff: Number** - the number of characters around the diff result between two HTML (default: `40`).

**@returns** - pretty logging of diffs:

<img src='https://cloud.githubusercontent.com/assets/6376693/3648928/a6b9d48a-110d-11e4-8a07-d9b156145017.png'/>


### Example

```js
import fs from 'fs';
import { HtmlDiffer } from '@markedjs/html-differ';
import * as logger from '@markedjs/html-differ/lib/logger';

const html1 = fs.readFileSync('1.html', 'utf-8');
const html2 = fs.readFileSync('2.html', 'utf-8');

const options = {
  ignoreAttributes: [],
  compareAttributesAsJSON: [],
  ignoreWhitespaces: true,
  ignoreComments: true,
  ignoreEndTags: false
};

const htmlDiffer = new HtmlDiffer(options);

async function run() {
  const diff = await htmlDiffer.diffHtml(html1, html2);
  const isEqual = await htmlDiffer.isEqual(html1, html2);
  const res = logger.getDiffText(diff, { charsAroundDiff: 40 });

  logger.logDiffText(diff, { charsAroundDiff: 40 });
}

run();
```

## Usage as a program

```bash
$ html-differ --help
Compares two HTML

Usage:
  html-differ [OPTIONS] [ARGS]

Options:
  -h, --help : Help
  -v, --version : Shows the version number
  --config=CONFIG : Path to a configuration JSON file
  --bem : Uses predefined options for BEM (deprecated)
  -p PRESET, --preset=PRESET : Name of a preset
  --chars-around-diff=CHARSAROUNDDIFF : The number of characters around the diff (default: 40)

Arguments:
  PATH1 : Path to the 1-st HTML file (required)
  PATH2 : Path to the 2-nd HTML file (required)
```

### Example

```bash
$ html-differ path/to/html1 path/to/html2

$ html-differ --config=path/to/config --chars-around-diff=40 path/to/html1 path/to/html2

$ html-differ --preset=bem path/to/html1 path/to/html2
```

### Configuration file

Study the following file `config.json`:

```js
{
  "ignoreAttributes": [],
  "compareAttributesAsJSON": [],
  "ignoreWhitespaces": true,
  "ignoreComments": true,
  "ignoreEndTags": false
}
```

## Masks

**html-differ** supports handling of _masks_ in HTML.

For example, the following two code samples will be considered to be equivalent:

```html
<div id="{{[a-z]*\s\d+}}">
```

```html
<div id="text 12345">
```

### Syntax

_Masks_ in **html-differ** have the following syntax:

```js
{{RegExp}}
```

where:

* `{{` – opening identifier of the _mask_.

* `RegExp` – regular expression for matching with the corresponding value in another HTML. The syntax is similar to regular expressions in JavaScript written in a literal notation.

* `}}` – closing identifier of the _mask_.

### Screening

The rules of screening of symbols are similar to the rules which are used in regular expressions in JavaScript written in a literal notation.

For example, the following two code samples will be considered to be equivalent:

```html
<div id="{{\d\.\d}}">
```

```html
<div id="1.1">
```

If you want to use `{{` or `}}` inside a mask, you should screen both curly braces, i.e. `\{\}` or `\}\}`.

For example, the following two code samples will be considered to be equivalent:

```html
<div class="{{a\{\{b\}\}c}}">
```

```html
<div class="a{{b}}c">
```
