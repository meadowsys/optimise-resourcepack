"use strict";

/** the options object passed to the gulp plugins to enable verbose logging */
const verbose = { verbose: true };
/** source directory */
const srcdir = "original";
/** destination directory */
const destdir = "out";
/** optimised directory name */
const optimiseddir = "optimised";
/** copied directory name */
const copieddir = "copied";
/** name of the license file */
const license = "LICENSE";

// npm imports and stuff
const { task, src, dest, parallel, series } = require("gulp");
const jsonmin = require("gulp-jsonmin");
const imagemin = require("gulp-imagemin");
const del = require("del");

// rest is stuff and stuff
const pngsrc = () => src(`${srcdir}/**/*.png`);
const jsonsrc = () => src(`${srcdir}/**/*.json`);
const mcmetasrc = () => src(`${srcdir}/**/*.mcmeta`);
const oggsrc = () => src(`${srcdir}/**/*.ogg`);

const png = (opts) => pngsrc().pipe(imagemin({
   plugins: [imagemin.optipng({
      optimizationLevel: 7
   })],
   verbose: opts ? opts.verbose : false
})).pipe(dest(`${destdir}/${optimiseddir}`));
const json = (opts) => jsonsrc().pipe(jsonmin(opts)).pipe(dest(`${destdir}/${optimiseddir}`));
const mcmeta = (opts) => mcmetasrc().pipe(jsonmin(opts)).pipe(dest(`${destdir}/${optimiseddir}`));
const ogg = (opts) => oggsrc().pipe(dest(`${destdir}/${optimiseddir}`));


// optimise png images into output dir
task("png", () => png());
// optimise png images with verbose output into output dir
task("png:verbose", () => png(verbose));
// copy png images into copy dir
task("png:copy", () => pngsrc().pipe(dest(`${destdir}/${copieddir}`)));

// optimise json files into output dir
task("json", () => json());
// optimise json files with verbose output into output dir
task("json:verbose", () => json(verbose));
// copy json files into copy dir
task("json:copy", () => jsonsrc().pipe(dest(`${destdir}/${copieddir}`)));

// optimise mcmeta files into output dir
task("mcmeta", () => mcmeta());
// optimise mcmeta files with verbose output into output dir
task("mcmeta:verbose", () => mcmeta(verbose));
// copy mcmeta files into copy dir
task("mcmeta:copy", () => mcmetasrc().pipe(dest(`${destdir}/${copieddir}`)));

// no optimisation available yet, copies ogg files into output dir
task("ogg", () => ogg());
// no optimisation or verbose output available yet, copies ogg files into output dir
task("ogg:verbose", () => ogg(verbose));
// copy ogg files into copy dir
task("ogg:copy", () => oggsrc().pipe(dest(`${destdir}/${copieddir}`)));

// copy license file(s) into output dir
task("copylicense", () => src(`${srcdir}/**/${license}`).pipe(dest(`${destdir}/${optimiseddir}`)));
// copy license file(s) into copy dir
task("copylicense:copy", () => src(`${srcdir}/**/${license}`).pipe(dest(`${destdir}/${copieddir}`)));

// deletes copy dir
task("clean:copy", () => del(`${destdir}/${copieddir}`));
// deletes output dir
task("clean:optimise", () => del(`${destdir}/${optimiseddir}`));
// deletes all output (copy and output dir)
task("clean", () => del(destdir));

// runs optimisation, puts files into output dir
task("optimise", series("clean:optimise", parallel("png", "json", "mcmeta", "ogg", "copylicense")));
// runs optimisation with verbose output, puts files into output dir
task("optimise:verbose", series("clean:optimise", parallel("png:verbose", "json:verbose", "mcmeta:verbose", "ogg:verbose", "copylicense")));
// copies files that would be optimised into copy dir
task("copy", series("clean:copy", parallel("png:copy", "json:copy", "mcmeta:copy", "ogg:copy", "copylicense:copy")));

// runs optimise and copy tasks, so you can easily compare the filesizes and other stuff
task("compare", series("clean", parallel("copy", "optimise")));
