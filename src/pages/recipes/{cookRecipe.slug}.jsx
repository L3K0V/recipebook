import * as React from "react";
import { Recipe } from "cooklang";
import { graphql, Link } from "gatsby";
import { PageLayout } from "../../components/PageLayout";
import { RecipeRenderer } from "../../components/RecipeRenderer";

function RecipePage({ data }) {
  const cookData = data.cookRecipe;
  const recipe = new Recipe(cookData.internal.content);

  return (
    <PageLayout>
      <div className="container mx-auto">
        <RecipeRenderer name={cookData.recipe.title} recipe={recipe} />
      </div>
    </PageLayout>
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
