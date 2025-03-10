# eleventy-plugin-toc-util

[![npm](https://img.shields.io/npm/v/eleventy-plugin-toc-util?style=for-the-badge)](https://www.npmjs.com/package/eleventy-plugin-toc-util)

## Usage

eleventy.config.js:

```javascript
import * as toc from "eleventy-plugin-toc-util";

export default async function (config) {
  // Use https://www.11ty.dev/docs/plugins/id-attribute/ to add ids to
  // all headings in the site

  // Or create filter to add ids to individual tags
  config.addFilter("attachId", (html) =>
    toc.attachId(html, ".title,.sub-title,h2,h3,h4"),
  );

  // Create filter to add anchors to all html headings with IDs
  config.addFilter("attachAnchor", (html) => toc.attachIdAnchor(html));

  // Or if you want, only add anchors to specific tags
  config.addFilter("attachAnchor", (html) =>
    toc.attachIdAnchor(html, ".sub-title,h2,h3"),
  );

  // Create filter to generate table of contents from content. The order of
  // items in the toc is based on the selector parameter (see JSDoc)
  config.addFilter("toc", (html) => toc.createToc(html));
}
```

Template file:

```nunjucks
{% extends "base.njk" %}
{% block content %}
  <article>
    <!--Add ids and anchor to content-->
    {% set content = content | attachId | attachAnchor %}

    <aside>
      <!--Render table of content-->
      {{ content | toc | safe }}
    </aside>

    {{ content | safe }}
  </article>
{% endblock %}
```

See function JSDocs in [toc-util.js](https://github.com/carlbernal/eleventy-plugin-toc-util/blob/main/toc-util.js) for more information.

## Similar solutions

- [eleventy-plugin-toc](https://github.com/jdsteinbach/eleventy-plugin-toc)
- [eleventy-plugin-nesting-toc](https://github.com/JordanShurmer/eleventy-plugin-nesting-toc)
- [Adding a Table of Contents to dynamic content in 11ty](https://stevenwoodson.com/blog/adding-a-table-of-contents-to-dynamic-content-in-11ty/)

## Tasks

- [ ] TOC title is based on headings id, so special characters are excluded.
      Think of a way to create TOC without using heading ids
