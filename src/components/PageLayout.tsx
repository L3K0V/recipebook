import { Cookware, Ingredient, Recipe, Timer } from "cooklang";
import React, { Children } from "react";
import { VFC } from "react";
import "../index.css";
import { Footer } from "./Footer";

interface PageLayoutProps {
  children: JSX.Element;
}

export const PageLayout: VFC<PageLayoutProps> = ({ children }) => {
  return (
    <body>
      <header>
        <div className="container flex flex-col items-center px-4 py-12 mx-auto text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-700 sm:text-4xl dark:text-white">
            Recipebook
          </h2>
        </div>
      </header>
      <main className="container mx-auto">
        <hr className="my-10 border-gray-200 dark:border-gray-700" />
        {children}
      </main>
      <Footer />
    </body>
  );
};
