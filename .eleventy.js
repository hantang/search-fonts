const htmlmin = require('html-minifier');

module.exports = async function (eleventyConfig) {
	const { HtmlBasePlugin } = await import("@11ty/eleventy");
	eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/screenshots');
  // eleventyConfig.addPassthroughCopy('src/favicon.ico');
  // eleventyConfig.addPassthroughCopy('src/fonts-for-ui');

  eleventyConfig.addCollection('contents', function (collection) {
    let fonts = collection
      .getFilteredByGlob('src/contents/*.md')
      .sort((a, b) => (b.data.title < a.data.title ? 1 : -1));
    return fonts;
  });

  // is production build (netlify) :: minify html
  if (process.env.PROD === 'true') {
    // https://www.11ty.dev/docs/transforms/#minify-html-output
    eleventyeleventyConfig.addTransform("htmlmin", function (content) {
      // String conversion to handle `permalink: false`
      if ((this.page.outputPath || "").endsWith(".html")) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
        });

        return minified;
      }

      // If not an HTML output, return content as-is
      return content;
    });
  }

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data'
    },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    pathPrefix: "/search-fonts/",
  };
};
