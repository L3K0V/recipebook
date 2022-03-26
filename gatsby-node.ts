import _ from "lodash";
import path from "path";
import { createFilePath } from "gatsby-source-filesystem";
import { Recipe } from "cooklang";

const recipesTemplate = path.resolve("./src/templates/recipes.jsx");
const tagTemplate = path.resolve("./src/templates/tag.jsx");

function unstable_shouldOnCreateNode({ node }) {
  return node.internal.type === `File` && node.extension === `cook`;
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\//g, " ")
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
    const data = new Recipe(content);

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

    const tags = data.metadata.find((m) => m.key === "tags");

    recipeNode.recipe = {
      title: node.name,
      totalTime: data.calculateTotalTime(),
      tags: tags ? tags.value?.split(",")?.map((it) => it.trim()) : [],
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

module.exports.createPages = async function createPages(
  { actions: { createPage }, graphql, reporter },
  { basePath = "/" }
) {

  // recipe pages
  const result = await graphql(`
    query {
      allCookRecipe {
        nodes {
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic("failed to create recipes", result.errors);
  }

  const recipes = result.data.allCookRecipe.nodes;

  const numPages = Math.ceil(recipes.length / 12);
  Array.from({ length: numPages }).forEach((_, i) => {
    const path = i === 0 ? basePath : `${basePath}${i + 1}`;
    createPage({
      path,
      component: recipesTemplate,
      context: {
        limit: 12,
        skip: i * 12,
        numPages,
        currentPage: i + 1,
      },
    });

    reporter.info(`Created recipes page ${i + 1} / ${numPages} - ${path}`);
  });

  // tags pages
  const tagsResult = await graphql(`
    query {
      allCookRecipe {
        group(field: recipe___tags) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `);

  if (tagsResult.errors) {
    reporter.panic("failed to create tags", tagsResult.errors);
  }

  const tags = tagsResult.data.allCookRecipe.group;

  tags.forEach((tag) => {
    const numPages = Math.ceil(tag.totalCount / 12);
    Array.from({ length: numPages }).forEach((_, i) => {
      const path =
        i === 0
          ? `${basePath}tags/${tag.tag}`
          : `${basePath}tags/${tag.tag}/${i + 1}`;
      createPage({
        path,
        component: tagTemplate,
        context: {
          tag: tag.tag,
          limit: 12,
          skip: i * 12,
          numPages,
          currentPage: i + 1,
        },
      });
      reporter.info(`Created recipes page ${i + 1} / ${numPages} - ${path}`);
    });
  });
};
