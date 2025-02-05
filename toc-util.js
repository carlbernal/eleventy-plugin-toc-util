import * as jsdom from "jsdom";

/**
 * Attach transformed ID to target elements
 *
 * @param {string} htmlstring - HTML string passed by template engine
 * @param {string} selector - CSS selector for the target element
 * @param {boolean} skipEmpty - Option to skip heading if it's textContent is empty
 * @param {function(string): string} idTransformer - The function to create ID based on textContent
 *
 * @returns {string} - the transformed htmlstring w/ ids
 *
 * @throws If selector string is falsey
 */
export function attachId(
  htmlstring,
  selector = "h1,h2,h3,h4,h5,h6",
  skipEmpty = true,
  idTransformer = _textToId,
) {
  if (!selector) {
    throw new Error("selector should not be empty");
  }

  const dom = new jsdom.JSDOM(htmlstring);
  const document = dom.window.document;
  const targets = document.querySelectorAll(selector);

  /**
   * The function assumes every element contains a textContent. Refactor once
   * other use cases are found.
   */
  targets.forEach((element) => {
    if (!skipEmpty && !element.textContent) {
      return;
    }
    element.setAttribute("id", idTransformer(element.textContent));
  });

  return document.querySelector("body").innerHTML;
}

/**
 * Default algorithm for generating html id based on text content
 * @param {string} text - the text content
 */
function _textToId(text) {
  const id = text
    .toLowerCase()
    // Replace whitespace with "-"
    .replace(/\s+/g, "-")
    // Remove anyting that is not a \w or "-"
    .replace(/[^\w-]/g, "");
  return id;
}

/**
 * Attach ID anchor to target elements
 *
 * @param {string} htmlstring - HTML string passed by template engine
 * @param {string} selector - CSS selector for the target element
 * @param {string} textContent - Anchor inner text content
 * @param [string] anchorClasses - List of class to add to anchor tag
 *
 * @returns {string} - the transformed htmlstring w/ anchor
 *
 * @throws If selector string is falsey
 */
export function attachIdAnchor(
  htmlstring,
  selector = "h1,h2,h3,h4,h5,h6",
  textContent = " #",
  anchorClasses = [""],
) {
  if (!htmlstring || !selector) {
    throw new Error("selector should not be empty");
  }

  const dom = new jsdom.JSDOM(htmlstring);
  const document = dom.window.document;
  const targets = document.querySelectorAll(selector);

  /**
   * The function assumes every element contains a textContent. Refactor once
   * other use cases are found.
   */
  targets.forEach((element) => {
    if (!element.id) {
      return;
    }
    const a = document.createElement("a");
    a.href = "#" + element.id;
    a.textContent = textContent;
    if (anchorClasses > 0) {
      a.classList.add(...anchorClasses);
    }

    element.appendChild(a);
  });

  return document.querySelector("body").innerHTML;
}

/**
 * Create table of contents based on target elements
 *
 * Function assumes that target elements have an id attribute
 *
 * @param {string} htmlstring - html string passed by template engine
 * @param {string} selector - css selector for the target element
 * @param {string} listTag - html tag to be used as list container
 * @param {string} listItemTag - html tag to be used as list item
 * @param [string] listTagClasses - List of class to add to list tag
 * @param [string] listItemTagClasses - List of class to add to list item tag
 * @param [string] anchorClasses - List of class to add to anchor tag
 *
 * @returns {string} - the table of contents html string
 *
 * @throws If htmlstring, selector, listTag and listItemTag is falsey
 * @throws If any target element has no id
 */
export function createToc(
  htmlstring,
  selector = "h1,h2,h3,h4,h5,h6",
  listTag = "ul",
  listItemTag = "li",
  listTagClasses = [""],
  listItemTagClasses = [""],
  anchorClasses = [""],
) {
  if (!htmlstring || !selector || !listTag || !listItemTag) {
    throw new Error("selector, listTag, or listItemTag should not be empty");
  }

  const dom = new jsdom.JSDOM(htmlstring);
  const document = dom.window.document;
  const targets = document.querySelectorAll(selector);

  // Use order of the css selector as order of items in table of contents
  const levels = {};
  selector
    .trim()
    .toUpperCase()
    .split(",")
    .forEach((tag, index) => {
      levels[tag] = index;
    });

  const toc = document.createElement("div");

  // Create root of table of contents
  let currentLevel = 0;
  let currentNode = document.createElement(listTag);
  toc.appendChild(currentNode);

  // Populate table of contents based on content of targets
  targets.forEach((element, index) => {
    const elementLevel = levels[element.tagName];

    if (!element.id) {
      throw new Error(
        `${element.outerHTML} + has no id! make sure target elements has id before passing them through createToc function.`,
      );
    }

    if (index === 0) {
      currentLevel = elementLevel;
    }

    // Create new list node
    if (elementLevel > currentLevel) {
      const listItem = document.createElement(listItemTag);
      if (listTagClasses > 0) {
        newList.classList.add(...listTagClasses);
      }

      const newList = document.createElement(listTag);

      listItem.appendChild(newList);
      currentNode.appendChild(listItem);
      currentNode = newList;
    }
    // Go back to previous list node
    else if (elementLevel < currentLevel) {
      // https://www.w3.org/WAI/tutorials/page-structure/content/#nested-lists
      let stepsUp = currentLevel - elementLevel;
      while (stepsUp-- > 0 && currentNode.parentElement) {
        currentNode = currentNode.parentElement;
      }
    }

    // Update pointer after checking selector level
    currentLevel = elementLevel;

    // Create list item node and append it to list node
    const listItem = document.createElement(listItemTag);
    if (listItemTagClasses > 0) {
      listItem.classList.add(...listItemTagClasses);
    }

    const a = document.createElement("a");
    a.href = "#" + element.id;
    a.textContent = element.textContent.replace(/[^\w\s]/g, "").trim();
    if (anchorClasses > 0) {
      listItem.classList.add(...anchorClasses);
    }

    listItem.appendChild(a);
    currentNode.appendChild(listItem);
  });

  return toc.innerHTML;
}
