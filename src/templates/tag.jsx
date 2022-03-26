import { graphql, Link } from "gatsby";
import * as React from "react";

export default function TaggedRecipesPage({
  data: {
    allCookRecipe: { nodes: recipes = [] },
    tags,
  },
  pageContext: { currentPage, numPages, tag },
}) {
  return (
    <div>
      <h1>{tag}</h1>
      {JSON.stringify(recipes)}
      {currentPage} / {numPages}
    </div>
  );
}

export const query = graphql`
  query ($tag: String!, $skip: Int!, $limit: Int!) {
    allCookRecipe(
      filter: { recipe: { tags: { eq: $tag } } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        slug
        recipe {
          title
          totalTime
        }
      }
    }
    tags: allCookRecipe {
      group(field: recipe___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`;
