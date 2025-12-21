import fs from "fs-extra";
import path from "path";
import { exit } from "process";
import puppeteer from "puppeteer";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const SAVE_DIR = "temp/screenshots";
const MD_DIR = "src/contents";
const SAMPLE_FILE = "src/_data/samples.json";
const PATH_URL = "samples";
const BASE_URL = "http://localhost:8080";

const argv = yargs(hideBin(process.argv))
  .usage("Usage: $0 [options]")
  .describe("f", "Font to use for screenshots")
  .alias("f", "font")
  .describe("l", "Code sample to use for screenshot")
  .alias("l", "lang")
  .describe("t", "Theme to use for screenshots")
  .alias("t", "theme")
  .describe("parallel", "Run the screenshots in parallel, NOT too many screenshots at once.")
  .describe("p", "pathPrefix of URL")
  .alias("p", "pathPrefix")
  .help("h")
  .alias("h", "help")
  .example("node $0 -f source-code-pro -l js -t dark", "Take a screenshot...")
  .demandOption(["lang", "font", "theme"])
  .wrap(115)
  .epilog("Developed for Coding Fonts")
  .parseSync();

const buildFontDirectories = (fonts) => {
  fonts.forEach((font) => {
    const directory = `${SAVE_DIR}/${font}`;
    if (!fs.existsSync(directory)) {
      console.log(`${directory} does not exist. Making directory...`);
      fs.mkdirSync(directory, { recursive: true });
    }
  });
};

const takeScreenshots = async (font, lang, theme, pathPrefix) => {
  const targetUrl = `${BASE_URL}/${pathPrefix}/${PATH_URL}/${lang}/?font=${font}&theme=${theme}`;
  const savePath = path.join(SAVE_DIR, font, `${lang}-${theme}.png`);
  console.log(`Taking screenshot for: [${font} | ${lang} | ${theme}]`);

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: 800,
      height: 600,
      deviceScaleFactor: 2
    });

    page.on("console", (msg) => console.warn(`Browser Log [${font}]: ${msg.text()}`));

    console.log(targetUrl);
    await page.goto(targetUrl, {
      waitUntil: "networkidle0",
      timeout: 100000
    });

    await page.screenshot({ path: savePath });
    await page.screenshot({
      path: savePath
    });
  } finally {
    await browser.close();
  }
};

const parseInputs = (fonts, langs, themes) => {
  let samples = { languages: [], themes: [] };
  if (fs.existsSync(SAMPLE_FILE)) {
    samples = fs.readJsonSync(SAMPLE_FILE);
  }

  const processedFonts =
    fonts === "all"
      ? fs
        .readdirSync(MD_DIR)
        .filter((file) => file.endsWith(".md"))
        .map((file) => file.replace(".md", "").toLocaleLowerCase())
      : [fonts.toLocaleLowerCase()];

  const processedLangs = langs === "all" ? samples.languages.map((lang) => lang.value) : [langs];
  const processedThemes = themes === "all" ? samples.themes : [themes];
  return [processedFonts, processedLangs, processedThemes];
};

const run = async (fonts, langs, themes, parallel, pathPrefix) => {
  console.log(`Running in ${parallel ? "parallel" : "serial"} mode`);
  console.log(`Taking ${fonts.length * langs.length * themes.length} screenshots\n`);

  if (parallel) {
    const tasks = [];
    for (const font of fonts) {
      for (const lang of langs) {
        for (const theme of themes) {
          tasks.push(
            takeScreenshots(font, lang, theme, pathPrefix).catch(e => {
              console.error(`Error in ${font}:`, e);
              exit(1);
            })
          );
        }
      }
    }
    await Promise.all(tasks);
  } else {
    for (const font of fonts) {
      for (const lang of langs) {
        for (const theme of themes) {
          try {
            await takeScreenshots(font, lang, theme, pathPrefix);
          } catch (e) {
            console.error("\nAn error occurred during serial execution:\n", e);
            exit(1);
          }
        }
      }
    }
  }
};

const main = async () => {
  let { font, lang, theme, parallel, pathPrefix } = argv;

  const [fonts, langs, themes] = parseInputs(font, lang, theme);

  buildFontDirectories(fonts);

  await run(fonts, langs, themes, parallel, pathPrefix);
  console.log("\nAll screenshots completed.");
};

main();
