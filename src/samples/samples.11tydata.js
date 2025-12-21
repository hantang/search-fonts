module.exports = {
  layout: "layouts/for_screenshot.njk",
  eleventyComputed: {
    permalink: (data) => `${data.page.filePathStem}/`
  }
}