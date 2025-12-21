module.exports = {
  layout: "layouts/font-page.njk",
  eleventyComputed: {
    permalink: (data) => `${data.page.filePathStem}/`
  }
}
