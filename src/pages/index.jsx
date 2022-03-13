import { graphql, Link } from "gatsby";
import * as React from "react";

export default function RecipesPage({ data }) {
  return (
    <div>
      <main className="max-w-2xl mx-auto">
        <section className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <ul class="divide-y divide-gray-200 dark:divide-gray-700">
            {data.allCookRecipe.nodes.map((item) => {
              return (
                <li class="py-3 sm:py-4">
                  <Link to={"/recipes/" + item.slug}>
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {item.recipe.title}
                        </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {item.recipe.totalTime}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}

export const query = graphql`
  query {
    allCookRecipe {
      nodes {
        slug
        recipe {
          title
          totalTime
        }
      }
    }
  }
`;
