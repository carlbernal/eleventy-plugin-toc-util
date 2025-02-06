import * as toc from "./toc-util.js";

const input = `
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

const input_with_id = `
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

const input_with_anchor = `
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

const input_toc = `
<ul><li><a href="#carbonara-recipe">Carbonara Recipe</a><ul><li><a href="#ingredients">Ingredients</a><ul><li><a href="#pasta">Pasta</a></li><li><a href="#bacon">Bacon</a></li><li><a href="#eggs">Eggs</a></li><li><a href="#cheese">Cheese</a></li></ul><li><a href="#instructions">Instructions</a><ul><li><a href="#prepare-pasta">Prepare pasta</a></li><li><a href="#prepare-eggs-and-cheese">Prepare eggs and cheese</a></li><li><a href="#cook-bacon">Cook bacon</a></li><li><a href="#mix-all">Mix all</a></li></ul></li></li></ul></li></ul>`;

// attachId function happy path
console.assert(toc.attachId(input).trim() == input_with_id.trim());

// attachIdAnchor happy path
console.assert(
  toc.attachIdAnchor(input_with_id).trim() == input_with_anchor.trim(),
);

// creatToc happy path
console.assert(toc.createToc(input_with_id).trim() == input_toc.trim());

// Make sure creatToc output is the same w/ and w/o extra elements inside headings
console.assert(
  toc.createToc(input_with_anchor).trim() ===
    toc.createToc(input_with_id).trim(),
);
