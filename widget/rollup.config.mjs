import terser from "@rollup/plugin-terser";

// Builds the embeddable widget into a single minified IIFE.
// Output goes to public/ so Next.js can serve it with immutable cache headers,
// and is also mirrored to widget/dist for CDN upload.
export default {
  input: "widget/src/widget.js",
  output: [
    {
      file: "public/widget.min.js",
      format: "iife",
      plugins: [
        terser({
          compress: { passes: 2, drop_console: true, drop_debugger: true, pure_getters: true, toplevel: true },
          mangle: { toplevel: true, properties: { regex: /^_/ } },
          format: { comments: false },
        }),
      ],
    },
    {
      file: "widget/dist/widget.min.js",
      format: "iife",
      plugins: [
        terser({
          compress: { passes: 2, drop_console: true, drop_debugger: true, pure_getters: true, toplevel: true },
          mangle: { toplevel: true, properties: { regex: /^_/ } },
          format: { comments: false },
        }),
      ],
    },
  ],
};
