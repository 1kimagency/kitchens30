import { spawnSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const routes = [
  { slug: "home", title: "Главная", path: "/" },
  { slug: "manolo-graphite", title: "Кейс Маноло", path: "/cases/manolo-graphite/" },
  { slug: "ciel-light", title: "Кейс Сиэль", path: "/cases/ciel-light/" },
  { slug: "nice-small", title: "Кейс Ницца", path: "/cases/nice-small/" },
  { slug: "trinity-handleless", title: "Кейс Тринити", path: "/cases/trinity-handleless/" },
  { slug: "mozart-family", title: "Кейс Моцарт", path: "/cases/mozart-family/" },
  { slug: "maori-dark", title: "Кейс Маори", path: "/cases/maori-dark/" },
];

const viewports = [
  { slug: "desktop", label: "Desktop 1440px", width: 1440, height: 1200 },
  { slug: "mobile", label: "Mobile 390px", width: 390, height: 844 },
];

const options = parseOptions(process.argv.slice(2));
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const outputDir = path.resolve(options.outputDir, timestamp);
const baseUrl = normalizeBaseUrl(options.baseUrl);
const records = [];

await mkdir(outputDir, { recursive: true });

let browser;
try {
  browser = await chromium.launch({ headless: true });

  for (const route of routes) {
    for (const viewport of viewports) {
      const page = await browser.newPage({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 1,
      });
      const url = resolveSiteUrl(baseUrl, route.path);
      const filename = `${route.slug}-${viewport.slug}.png`;
      const filePath = path.join(outputDir, filename);

      try {
        const response = await page.goto(url, { waitUntil: "load", timeout: options.timeoutMs });
        if (!response?.ok()) {
          throw new Error(`HTTP ${response?.status() ?? "no response"}`);
        }
        await waitForPageToSettle(page);
        await page.screenshot({ path: filePath, fullPage: true });

        records.push({
          status: "ok",
          route,
          viewport,
          url,
          filename,
          pageTitle: await page.title(),
        });
        console.log(`captured ${filename}`);
      } catch (error) {
        records.push({
          status: "error",
          route,
          viewport,
          url,
          filename,
          error: error instanceof Error ? error.message : String(error),
        });
        console.error(`failed ${filename}: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        await page.close();
      }
    }
  }
} catch (error) {
  console.error("Could not start Playwright Chromium.");
  console.error("Run `npx playwright install chromium` if the browser is missing.");
  throw error;
} finally {
  await browser?.close();
}

await writeManifest(outputDir, baseUrl, records);
const archivePath = options.noZip ? null : createZip(outputDir);

console.log("");
console.log(`screenshots: ${outputDir}`);
if (archivePath) {
  console.log(`archive: ${archivePath}`);
}

function parseOptions(args) {
  const parsed = {
    baseUrl: process.env.SITE_BASE_URL || "https://1kimagency.github.io/kitchens30/",
    outputDir: "output/screenshots",
    timeoutMs: 45_000,
    noZip: false,
  };

  for (const arg of args) {
    if (arg.startsWith("--base-url=")) {
      parsed.baseUrl = arg.slice("--base-url=".length);
    } else if (arg.startsWith("--out=")) {
      parsed.outputDir = arg.slice("--out=".length);
    } else if (arg.startsWith("--timeout=")) {
      parsed.timeoutMs = Number(arg.slice("--timeout=".length)) * 1000;
    } else if (arg === "--no-zip") {
      parsed.noZip = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  if (!Number.isFinite(parsed.timeoutMs) || parsed.timeoutMs <= 0) {
    throw new Error("--timeout must be a positive number of seconds");
  }

  return parsed;
}

function normalizeBaseUrl(url) {
  return url.endsWith("/") ? url : `${url}/`;
}

function resolveSiteUrl(base, routePath) {
  if (routePath === "/") return base;
  return new URL(routePath.replace(/^\//, ""), base).toString();
}

async function waitForPageToSettle(page) {
  await page.evaluate(async () => {
    await document.fonts?.ready;
  });
  await waitForImages(page);
  await page.waitForTimeout(300);
}

async function waitForImages(page) {
  await page.evaluate(async () => {
    const images = Array.from(document.images);
    await Promise.all(
      images.map((image) => {
        if (image.complete && image.naturalWidth > 0) return undefined;
        return new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      }),
    );
  });
}

async function writeManifest(dir, siteBaseUrl, captureRecords) {
  const okCount = captureRecords.filter((record) => record.status === "ok").length;
  const errorCount = captureRecords.length - okCount;
  const lines = [
    "# Кухни 30 Screenshots",
    "",
    `Base URL: ${siteBaseUrl}`,
    `Captured at: ${new Date().toISOString()}`,
    `Result: ${okCount} ok, ${errorCount} errors`,
    "",
    "## Suggested LLM Prompt",
    "",
    "Review these screenshots as a conversion-focused landing page for kitchen quote recalculation. Check visual consistency, mobile usability, trust, clarity of offer, lead-form friction, and mismatched imagery. Return prioritized issues with screenshot filename references.",
    "",
    "## Files",
    "",
  ];

  for (const record of captureRecords) {
    if (record.status === "ok") {
      lines.push(`- ${record.filename} - ${record.route.title}, ${record.viewport.label}, ${record.url}`);
    } else {
      lines.push(`- ERROR ${record.filename} - ${record.route.title}, ${record.viewport.label}, ${record.url}: ${record.error}`);
    }
  }

  lines.push("");
  await writeFile(path.join(dir, "manifest.md"), `${lines.join("\n")}\n`, "utf8");
}

function createZip(dir) {
  const parentDir = path.dirname(dir);
  const folderName = path.basename(dir);
  const archiveName = `${folderName}.zip`;
  const result = spawnSync("zip", ["-qr", archiveName, folderName], {
    cwd: parentDir,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    console.warn("zip command failed; screenshots were still created");
    return null;
  }

  return path.join(parentDir, archiveName);
}
