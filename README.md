# hii

this is a thing idk, it copies necessary resourcepack png, json, ogg, and mcmeta files and optimises them if possible to save storage space (or you can choose not to optimise the text files soon™). this thing requires `node` and [`pnpm`](https://pnpm.js.org/).

## installing pnpm

if you have npm installed (you should, it comes with node by default), you can run `npm i -g pnpm` to install it.

## setup

1. `git clone` and `cd` into the dir (standard stuff)
2. `pnpm i` to install dependencies (still standard (npm) stuff)
3. put your resourcepack files inside a folder called `original` (not the zip file, put the loose files)
4. `pnpm run optimise` to optimise/compress your resourcepack
5. `pnpm run optimise:verbose` to run with verbose output
6. `pnpx gulp --tasks` to list available tasks
7. `pnpx gulp <taskname>` to run a task (where `<taskname>` is the name of the task)
8. see the gulpfile (`gulpfile.js`) for more info on what happens
