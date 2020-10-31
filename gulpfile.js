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

const png = (opts) => pngsrc().pipe(imagemin(opts)).pipe(dest(`${destdir}/${optimiseddir}`));
const json = (opts) => jsonsrc().pipe(jsonmin(opts)).pipe(dest(`${destdir}/${optimiseddir}`));
const mcmeta = (opts) => mcmetasrc().pipe(jsonmin(opts)).pipe(dest(`${destdir}/${optimiseddir}`));
const ogg = (opts) => oggsrc().pipe(dest(`${destdir}/${optimiseddir}`));


task("png", () => png());
task("png:verbose", () => png(verbose));
task("png:copy", () => pngsrc().pipe(dest(`${destdir}/${copieddir}`)));

task("json", () => json());
task("json:verbose", () => json(verbose));
task("json:copy", () => jsonsrc().pipe(dest(`${destdir}/${copieddir}`)));

task("mcmeta", () => mcmeta());
task("mcmeta:verbose", () => mcmeta(verbose));
task("mcmeta:copy", () => mcmetasrc().pipe(dest(`${destdir}/${copieddir}`)));

task("ogg", () => ogg());
task("ogg:verbose", () => ogg(verbose));
task("ogg:copy", () => oggsrc().pipe(dest(`${destdir}/${copieddir}`)));

task("copylicense", () => src(`${srcdir}/**/${license}`).pipe(dest(`${destdir}/${optimiseddir}`)));
task("copylicense:copy", () => src(`${srcdir}/**/${license}`).pipe(dest(`${destdir}/${copieddir}`)));

task("clean:copy", () => del(`${destdir}/${copieddir}`));
task("clean:optimise", () => del(`${destdir}/${optimiseddir}`));
task("clean", () => del(destdir));

task("optimise", series("clean:optimise", parallel("png", "json", "mcmeta", "ogg", "copylicense")));
task("optimise:verbose", series("clean:optimise", parallel("png:verbose", "json:verbose", "mcmeta:verbose", "ogg:verbose", "copylicense")));
task("copy", series("clean:copy", parallel("png:copy", "json:copy", "mcmeta:copy", "ogg:copy", "copylicense:copy")));

task("compare", series("clean", parallel("copy", "optimise")));
