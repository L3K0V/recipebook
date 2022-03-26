import { graphql, Link } from "gatsby";
import * as React from "react";

const range = (start, end, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

export default function RecipesPageTempalte({
  data: {
    allCookRecipe: { nodes: recipes = [] },
    tags,
  },
  pageContext: { currentPage, numPages },
}) {
  return (
    <>
      <main className="pt-2">
        <div class="masonry sm:masonry-sm md:masonry-md">
          {recipes.map((item) => {
            return (
              <Link to={"/recipes/" + item.slug}>
                <div class="p-6 m-3 rounded-lg bg-slate-100 break-inside">
                  {item.recipe.title}
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <footer>
        <Link to={"/" + (currentPage <= 2 ? "" : currentPage - 1)}>Previous</Link>
        {currentPage} / {numPages}
        <Link to={"/" + (currentPage === numPages ? currentPage : currentPage + 1)}>Next</Link>
      </footer>
    </>
  );
}

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allCookRecipe(limit: $limit, skip: $skip) {
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
