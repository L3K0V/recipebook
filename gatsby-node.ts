const _ = require(`lodash`);
const path = require("path");
const cooklang = require(`cooklang`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const recipeTemplate = path.resolve("./src/templates/recipe.js");

function unstable_shouldOnCreateNode({ node }) {
  return node.internal.type === `File` && node.extension === `cook`;
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

module.exports.onCreateNode = async function onCreateNode({
  node,
  getNode,
  loadNodeContent,
  actions,
  createNodeId,
  reporter,
  createContentDigest,
}) {
  if (!unstable_shouldOnCreateNode({ node })) {
    return {};
  }

  const { createNode, createParentChildLink } = actions;

  const content = await loadNodeContent(node);

  const relativePath = createFilePath({
    node,
    getNode,
  });

  try {
    const data = new cooklang.Recipe(content);

    const recipeNode: any = {
      id: createNodeId(`${node.id} >>> CookRecipe`),
      slug: slugify(relativePath),
      children: [],
      parent: node.id,
      internal: {
        content,
        type: `CookRecipe`,
      },
    };

    recipeNode.recipe = {
      title: node.name,
      totalTime: data.calculateTotalTime(),
    };

    // Add path to the markdown file path
    if (node.internal.type === `File`) {
      recipeNode.fileAbsolutePath = node.absolutePath;
    }

    recipeNode.internal.contentDigest = createContentDigest(recipeNode);

    createNode(recipeNode);
    createParentChildLink({ parent: node, child: recipeNode });

    reporter.info(`Created ${recipeNode.slug}`);

    return recipeNode;
  } catch (err) {
    reporter.panicOnBuild(
      `Error processing Cooklang ${
        node.absolutePath ? `file ${node.absolutePath}` : `in node ${node.id}`
      }:\n
      ${err.message}`
    );

    return {};
  }
};
