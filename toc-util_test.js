const { test, describe } = await import("node:test");
const assert = await import("node:assert/strict");
const toc = await import("./toc-util.js");

// Utility function to normalize expected/actual values before asserting
function normalizeHTML(html) {
  return html
    .replace(/\s*(<[^>]+>)\s*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

const rawHeaders = `
<h1>Carbonara Recipe</h1>
<h2>Ingredients</h2>
<h3>Pasta</h3>
<h3>Bacon</h3>
<h3>Eggs</h3>
<h3>Cheese</h3>
<h2>Instructions</h2>
<h3>Prepare pasta</h3>
<h3>Prepare eggs and cheese</h3>
<h3>Cook bacon</h3>
<h3>Mix all</h3>
`;

const headersWithId = `
<h1 id="carbonara-recipe">Carbonara Recipe</h1>
<h2 id="ingredients">Ingredients</h2>
<h3 id="pasta">Pasta</h3>
<h3 id="bacon">Bacon</h3>
<h3 id="eggs">Eggs</h3>
<h3 id="cheese">Cheese</h3>
<h2 id="instructions">Instructions</h2>
<h3 id="prepare-pasta">Prepare pasta</h3>
<h3 id="prepare-eggs-and-cheese">Prepare eggs and cheese</h3>
<h3 id="cook-bacon">Cook bacon</h3>
<h3 id="mix-all">Mix all</h3>
`;

const headersWithIdAndAnchor = `
<h1 id="carbonara-recipe">Carbonara Recipe<a href="#carbonara-recipe"> #</a></h1>
<h2 id="ingredients">Ingredients<a href="#ingredients"> #</a></h2>
<h3 id="pasta">Pasta<a href="#pasta"> #</a></h3>
<h3 id="bacon">Bacon<a href="#bacon"> #</a></h3>
<h3 id="eggs">Eggs<a href="#eggs"> #</a></h3>
<h3 id="cheese">Cheese<a href="#cheese"> #</a></h3>
<h2 id="instructions">Instructions<a href="#instructions"> #</a></h2>
<h3 id="prepare-pasta">Prepare pasta<a href="#prepare-pasta"> #</a></h3>
<h3 id="prepare-eggs-and-cheese">Prepare eggs and cheese<a href="#prepare-eggs-and-cheese"> #</a></h3>
<h3 id="cook-bacon">Cook bacon<a href="#cook-bacon"> #</a></h3>
<h3 id="mix-all">Mix all<a href="#mix-all"> #</a></h3>
`;

const tocOutput = `
<ul>
  <li>
    <a href="#carbonara-recipe">Carbonara Recipe</a>
    <ul>
      <li>
        <a href="#ingredients">Ingredients</a>
        <ul>
          <li><a href="#pasta">Pasta</a></li>
          <li><a href="#bacon">Bacon</a></li>
          <li><a href="#eggs">Eggs</a></li>
          <li><a href="#cheese">Cheese</a></li>
        </ul>
      </li>
      <li>
        <a href="#instructions">Instructions</a>
        <ul>
          <li><a href="#prepare-pasta">Prepare pasta</a></li>
          <li>
            <a href="#prepare-eggs-and-cheese">Prepare eggs and cheese</a>
          </li>
          <li><a href="#cook-bacon">Cook bacon</a></li>
          <li><a href="#mix-all">Mix all</a></li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
`;

describe("TOC util happy paths", () => {
  test("attachId() should add unique IDs to headings", () => {
    const result = normalizeHTML(toc.attachId(rawHeaders));
    const expected = normalizeHTML(headersWithId);
    assert.strictEqual(result, expected);
  });

  test("attachIdAnchor() should add anchors to headings with IDs", () => {
    const result = normalizeHTML(toc.attachIdAnchor(headersWithId));
    const expected = normalizeHTML(headersWithIdAndAnchor);
    assert.strictEqual(result, expected);
  });

  test("createToc() should generate a correct table of contents from headersWithId", () => {
    const result = normalizeHTML(toc.createToc(headersWithId));
    const expected = normalizeHTML(tocOutput);
    assert.equal(result, expected);
  });

  test("createToc() should generate a correct table of contents from headersWithIdAndAnchor", () => {
    const result = normalizeHTML(toc.createToc(headersWithIdAndAnchor));
    const expected = normalizeHTML(tocOutput);
    assert.strictEqual(result, expected);
  });
});

const headersWithId2 = `
<h1 id="main-title">Main Title</h1>
<h2 id="introduction">Introduction</h2>
<h3 id="background">Background</h3>
<h3 id="purpose">Purpose</h3>
<h2 id="chapter-1-getting-started">Chapter 1: Getting Started</h2>
<h3 id="installation">Installation</h3>
<h4 id="windows">Windows</h4>
<h4 id="mac">Mac</h4>
<h4 id="linux">Linux</h4>
<h3 id="setup">Setup</h3>
<h4 id="configuration">Configuration</h4>
<h4 id="environment-variables">Environment Variables</h4>
<h2 id="chapter-2-advanced-topics">Chapter 2: Advanced Topics</h2>
<h3 id="deep-dive-into-components">Deep Dive into Components</h3>
<h4 id="component-a">Component A</h4>
<h5 id="sub-component-a1">Sub-component A1</h5>
<h5 id="sub-component-a2">Sub-component A2</h5>
<h4 id="component-b">Component B</h4>
<h5 id="sub-component-b1">Sub-component B1</h5>
<h5 id="sub-component-b2">Sub-component B2</h5>
<h3 id="optimization-techniques">Optimization Techniques</h3>
<h4 id="caching">Caching</h4>
<h4 id="lazy-loading">Lazy Loading</h4>
<h4 id="code-splitting">Code Splitting</h4>
<h2 id="chapter-3-deployment">Chapter 3: Deployment</h2>
<h3 id="preparing-for-production">Preparing for Production</h3>
<h3 id="cicd-pipelines">CI/CD Pipelines</h3>
<h4 id="github-actions">GitHub Actions</h4>
<h4 id="jenkins">Jenkins</h4>
<h4 id="gitlab-ci">GitLab CI</h4>
<h3 id="monitoring--maintenance">Monitoring &amp; Maintenance</h3>
<h2 id="appendix">Appendix</h2>
<h3 id="glossary">Glossary</h3>
<h3 id="references">References</h3>
`;

const tocOutput2 = `
<ul>
  <li>
    <a href="#main-title">Main Title</a>
    <ul>
      <li>
        <a href="#introduction">Introduction</a>
        <ul>
          <li><a href="#background">Background</a></li>
          <li><a href="#purpose">Purpose</a></li>
        </ul>
      </li>
      <li>
        <a href="#chapter-1-getting-started">Chapter 1 Getting Started</a>
        <ul>
          <li>
            <a href="#installation">Installation</a>
            <ul>
              <li><a href="#windows">Windows</a></li>
              <li><a href="#mac">Mac</a></li>
              <li><a href="#linux">Linux</a></li>
            </ul>
          </li>
          <li>
            <a href="#setup">Setup</a>
            <ul>
              <li><a href="#configuration">Configuration</a></li>
              <li>
                <a href="#environment-variables">Environment Variables</a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <a href="#chapter-2-advanced-topics">Chapter 2 Advanced Topics</a>
        <ul>
          <li>
            <a href="#deep-dive-into-components">Deep Dive into Components</a>
            <ul>
              <li>
                <a href="#component-a">Component A</a>
                <ul>
                  <li><a href="#sub-component-a1">Subcomponent A1</a></li>
                  <li><a href="#sub-component-a2">Subcomponent A2</a></li>
                </ul>
              </li>
              <li>
                <a href="#component-b">Component B</a>
                <ul>
                  <li><a href="#sub-component-b1">Subcomponent B1</a></li>
                  <li><a href="#sub-component-b2">Subcomponent B2</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a href="#optimization-techniques">Optimization Techniques</a>
            <ul>
              <li><a href="#caching">Caching</a></li>
              <li><a href="#lazy-loading">Lazy Loading</a></li>
              <li><a href="#code-splitting">Code Splitting</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <a href="#chapter-3-deployment">Chapter 3 Deployment</a>
        <ul>
          <li>
            <a href="#preparing-for-production">Preparing for Production</a>
          </li>
          <li>
            <a href="#cicd-pipelines">CICD Pipelines</a>
            <ul>
              <li><a href="#github-actions">GitHub Actions</a></li>
              <li><a href="#jenkins">Jenkins</a></li>
              <li><a href="#gitlab-ci">GitLab CI</a></li>
            </ul>
          </li>
          <li><a href="#monitoring--maintenance">Monitoring Maintenance</a></li>
        </ul>
      </li>
      <li>
        <a href="#appendix">Appendix</a>
        <ul>
          <li><a href="#glossary">Glossary</a></li>
          <li><a href="#references">References</a></li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
`;

describe("createToc() additional test", () => {
  test("createToc() should generate a correct table of contents from headersWithId2", () => {
    const result = normalizeHTML(toc.createToc(headersWithId2));
    const expected = normalizeHTML(tocOutput2);
    assert.equal(result, expected);
  });
});
