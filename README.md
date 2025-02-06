# eleventy-plugin-toc-util

## Usage

eleventy.config.js:

```javascript
import * as toc from "eleventy-plugin-toc-util";

export default async function (config) {
  // Use https://www.11ty.dev/docs/plugins/id-attribute/ to add ids to
  // all headings in the site

  // Or create filter to add ids and anchors to individual contents
  config.addFilter("attachId", (html) => toc.attachId(html));

  // Only add anchors to h2 and h3
  config.addFilter("attachAnchor", (html) => toc.attachIdAnchor(html, "h2,h3"));

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

See function JSDocs in [eleventy-plugin-toc-util](https://github.com/carlbernal/eleventy-plugin-toc-util/blob/main/toc-util.js) for more information.

## Similar solutions

- [eleventy-plugin-toc](https://github.com/jdsteinbach/eleventy-plugin-toc)
- [eleventy-plugin-nesting-toc](https://github.com/JordanShurmer/eleventy-plugin-nesting-toc)
- [Adding a Table of Contents to dynamic content in 11ty](https://stevenwoodson.com/blog/adding-a-table-of-contents-to-dynamic-content-in-11ty/)

## Tasks

- [ ] Add more tests using node.js test runner
