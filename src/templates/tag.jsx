import { graphql, Link } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import * as React from "react";

const range = (start, end, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

export default function TaggedRecipesPage({
  data: {
    allCookRecipe: { nodes: recipes = [] },
    tags,
  },
  pageContext: { currentPage, numPages, tag },
}) {
  return (
    <PageLayout>
      <div className="container px-6 py-3 mx-auto">
        <div class="py-3 mt-3 -mx-3 overflow-y-auto whitespace-nowrap scroll-hidden">
          {tags.group.map((tag) => {
            return (
              <Link
                to={"/tags/" + tag.tag}
                class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0"
              >
                {tag.tag.toUpperCase()}
              </Link>
            );
          })}
        </div>
      </div>
      <div class="container mx-auto grid grid-cols-4 gap-4">
        {recipes.map((item) => {
          const divStyle = {
            backgroundImage:
              "url(https://unsplash.com/photos/uQs1802D0CQ/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8cmVjaXBlfGVufDB8fHx8MTY0ODMxMTI2MA&force=true&w=640",
          };

          return (
            <Link to={"/recipes/" + item.slug}>
              <div class="flex flex-col items-center justify-center max-w-sm mx-auto">
                <div
                  class="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
                  style={divStyle}
                ></div>

                <div class="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                  <h3 class="mx-2 py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                    {item.recipe.title}
                  </h3>

                  <div class="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                    <span class="font-bold text-gray-800 dark:text-gray-200">
                      {Math.ceil(item.recipe.totalTime / 60)} minutes
                    </span>
                    <button class="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <section className="flex justify-center py-8">
        <Link
          to={"/" + (currentPage <= 2 ? "" : currentPage - 1)}
          class="flex items-center px-4 py-2 mx-1 text-gray-500 bg-white rounded-md cursor-not-allowed dark:bg-gray-900 dark:text-gray-600"
        >
          previous
        </Link>

        {range(1, numPages).map((step) => {
          return (
            <Link
              to={"/" + (currentPage === 1 ? "" : currentPage)}
              class="items-center hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:flex dark:bg-gray-900 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
            >
              {step}
            </Link>
          );
        })}

        <Link
          to={"/" + (currentPage === numPages ? currentPage : currentPage + 1)}
          class="flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md dark:bg-gray-900 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
        >
          Next
        </Link>
      </section>
    </PageLayout>
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
