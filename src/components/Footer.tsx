import { Cookware, Ingredient, Recipe, Timer } from "cooklang";
import React from "react";
import { VFC } from "react";
import "../index.css";

export const Footer: VFC = () => {
  return (
    <footer>
      <div className="container px-6 py-8 mx-auto">
        <hr className="my-10 border-gray-200 dark:border-gray-700" />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-400">
            © Copyright 2021. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
