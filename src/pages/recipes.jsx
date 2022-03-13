import { graphql } from "gatsby";
import * as React from "react";

export default function RecipesPage({ data }) {
  return (
    <div className="wrapper">
      <main>
        <ul>
          {data.nodes.map((item) => {
            return <li>{item.title}</li>;
          })}
        </ul>
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
