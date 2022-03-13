import * as React from "react";
import { Recipe } from "cooklang";
import { graphql, Link } from "gatsby";
import { RecipeRenderer } from "../../compoments/RecipeRenderer";

function RecipePage({ data }) {
  const cookData = data.cookRecipe;
  const recipe = new Recipe(cookData.internal.content);

  return (
    <div className="wrapper">
      <header>
        <Link to="/">Go back to "Home"</Link>
      </header>
      <main>
        <RecipeRenderer name={cookData.recipe.title} recipe={recipe} />
      </main>
    </div>
  );
}

export default RecipePage;

export const query = graphql`
  query ($id: String!) {
    cookRecipe(id: { eq: $id }) {
      id
      internal {
        content
      }
      recipe {
        title
        totalTime
      }
    }
  }
`;
