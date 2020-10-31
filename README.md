# hii

this is a thing idk, it copies necessary resourcepack png, json, ogg, and mcmeta files and optimises them if possible to save storage space (or you can choose not to optimise the text files soon™). this thing requires `node` and [`pnpm`](https://pnpm.js.org/).

## installing pnpm

if you have npm installed (you should, it comes with node by default), you can run `npm i -g pnpm` to install it.

## setup

1. `git clone` and `cd` into the dir (standard stuff)
2. `pnpm i` to install dependencies (still standard (npm) stuff)
3. put your resourcepack files inside a folder called `original` (not the zip file, put the loose files)

## use

1. `pnpm run optimise` to optimise/compress your resourcepack. the output is put inside `out/optimised`
2. `pnpm run optimise:verbose` to run with verbose output
3. `pnpx gulp --tasks` to list available tasks
4. `pnpx gulp <taskname>` to run a task (where `<taskname>` is the name of the task)
5. see the gulpfile (`gulpfile.js`) for more info on what happens

### available tasks

- `optimise` task to copy, and optimise if possible, the files for the resourcepack into `out/optimised`. `optimise:verbose` to enable verbose output if available.
- `copy` to copy the files that would be included inside the copying/optimising task into `out/copy`, without touching them. included for comparison reasons, and just why not lol
- `compare` to run both the `optimise` and `copy` task, so that you get an uncompressed version and a compress version to compare sizes and make sure nothing went wrong.
- `png`, `mcmeta`, `json`, `ogg` tasks. for each one, a copy and verbose version are available (for png, the three available ones are `png`, `png:verbose`, and `png:copy`).
- `copylicense` to copy all license files into the optimised directory (`copylicense:copy` to copy it into the copying directory instead)
- `clean` to clean and delete the `out` folder. (`clean:copy` and `clean:optimise` available to delete only their respective output directories)
