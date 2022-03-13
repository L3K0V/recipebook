# Recipe book

This a recipe book powered by [CookLang](https://cooklang.org) where all family recipes and experiments are organized.

## Getting started

For now to use this recipe book you can use the [CookCLI](https://github.com/cooklang/CookCLI) or the online [CookLang Playground](https://biowaffeln.github.io/cooklang-parser/).

### Read the recipe

```sh
cook recipe read "German soup with cheese and leeks.cook"
```

### Create shopping list

```sh
cook shopping-list \
  "Basic mayonnaise.cook" \
  "Chicken Wings with Coconut Dip.cook" \
```

### Run a server

Run from the `recipes` directory:

```sh
cook server
```

Then open [http://127.0.0.1:9080](http://127.0.0.1:9080) in your browser.