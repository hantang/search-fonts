module.exports = {
  layout: "layouts/for_screenshot.njk",
  // permalink: process.env.ELEVENTY_ENV === 'production' ? false : '/code_samples/{{ page.fileSlug }}/'
  eleventyComputed: {
    permalink: (data) => `${data.page.filePathStem}/`
  }
}