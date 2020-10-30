const { task, src, dest, parallel } =require("gulp");
const jsonmin =require("gulp-jsonmin");
const imagemin =require("gulp-imagemin");

task("imagemin", () => src("original/**/*.png").pipe(imagemin()).pipe(dest("optimised")));
task("imagemin:verbose", () => src("original/**/*.png").pipe(imagemin({ verbose: true })).pipe(dest("optimised")));

task("jsonmin", () => src(["original/**/*.json", "original/**/*.mcmeta"]).pipe(jsonmin()).pipe(dest("optimised")));
task("jsonmin:verbose", () => src(["original/**/*.json", "original/**/*.mcmeta"]).pipe(jsonmin({ verbose: true })).pipe(dest("optimised")));

task("copylicense", () => src("LICENSE").pipe(dest("optimised")));

exports.optimise_verbose = parallel("imagemin:verbose", "jsonmin:verbose", "copylicense");
exports.optimise = parallel("imagemin", "jsonmin", "copylicense");
