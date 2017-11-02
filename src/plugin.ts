import { readFileSync } from "fs";
import { parse } from "path";

import * as svgstore from "svgstore";
import * as joi from "joi";
import * as glob from "glob-promise";
import { Compiler } from "webpack";

export class SvgstoreWebpackPlugin {
    /**
     * Svgstore instance
     **/
    private svgs: any;
    /**
     * Plugin options
     **/
    private options: PluginOptions;

    private get optionsSchema() {
        return joi.object({
            src: joi.string().required().disallow(""),
            context: joi.string(),
            // svgstore options
            // https://github.com/svgstore/svgstore#svgstore-options
            svgOptions: joi.object().unknown(true)
        });
    }

    constructor(opts: PluginOptions) {
        this.options = this.validateOptions(opts);
        this.svgs = svgstore(this.options.svgOptions);
    }

    public apply(compiler: Compiler) {
        if (!this.options.context && compiler.options.context) {
            this.options.context = compiler.options.context;
        }

        compiler.plugin("compilation", (compilation) => {
            compilation.plugin(
                "html-webpack-plugin-before-html-generation",
                (htmlData: any, done: Function) => {
                    htmlData.assets["svgstore"] = this.svgs.toString({
                        inline: true
                    });

                    done(null, htmlData);
                }
            );
        });

        compiler.plugin("make", async (compilation, done) => {
            let files: string[] = [];

            try {
                files = await glob(this.options.src, {
                    cwd: this.options.context
                });

                for (const file of files) {
                    const fileInfo = parse(file);
                    this.svgs.add(fileInfo.name, readFileSync(file));
                }
            } catch (e) {
                compilation.errors.push(e);
            } finally {
                done();
            }
        });
    }

    private validateOptions(opts: PluginOptions) {
        return joi.attempt(opts, this.optionsSchema);
    }
}

///
/// Interfaces
///

export interface PluginOptions {
    src: string;
    context?: string;
    svgOptions: any;
}
