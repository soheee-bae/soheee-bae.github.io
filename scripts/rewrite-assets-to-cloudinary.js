#!/usr/bin/env node

/**
 * Rewrite Markdown references from local assets to Cloudinary URLs.
 *
 * - Rewrites:
 *    - ![alt](../../assets/images/<path.ext>) -> https://res.cloudinary.com/<cloud>/image/upload/f_auto,q_auto/<folder>/<path>
 *    - <video src="../../assets/videos/<path.ext>" ...> -> https://res.cloudinary.com/<cloud>/video/upload/f_auto,q_auto/<folder>/<path>
 *
 * Usage:
 *  - GATSBY_CLOUDINARY_CLOUD_NAME=... GATSBY_CLOUDINARY_FOLDER=... node scripts/rewrite-assets-to-cloudinary.js
 */

const fs = require("fs");
const path = require("path");

const activeEnv = process.env.NODE_ENV || "development";
require("dotenv").config({
  path: path.join(__dirname, `../.env.${activeEnv}`),
});

function requireEnv(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing required env var: ${name}`);
    process.exit(1);
  }
  return v;
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) getAllFiles(filePath, fileList);
    else fileList.push(filePath);
  });
  return fileList;
}

function stripExt(p) {
  return p.replace(/\.[a-z0-9]+$/i, "");
}

function cloudinaryUrl({ cloudName, resourceType, folder, relPathNoExt }) {
  const publicId = [folder, relPathNoExt].filter(Boolean).join("/");
  return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/f_auto,q_auto/${publicId}`;
}

function rewriteContent(content, { cloudName, folder }) {
  let out = content;

  // 1) Markdown image links pointing to assets/images
  // Example: ![alt](../../assets/images/r3f/r3f-useThreeState.png)
  out = out.replace(
    /!\[([^\]]*)\]\(([^)]*?)assets\/images\/([^)\s]+?\.(?:png|jpe?g|gif|webp|svg))\)/gi,
    (match, alt, prefix, relWithExt) => {
      const relNoExt = stripExt(relWithExt);
      const url = cloudinaryUrl({
        cloudName,
        resourceType: "image",
        folder,
        relPathNoExt: relNoExt,
      });
      // preserve markdown alt text, replace only URL
      return `![${alt}](${url})`;
    }
  );

  // 2) HTML video tags with src pointing to assets/videos
  out = out.replace(
    /<video([^>]*?)\ssrc=["']([^"']*?)assets\/videos\/([^"']+?\.(?:mp4|webm|mov))["']([^>]*?)>/gi,
    (match, beforeSrcAttrs, prefix, relWithExt, afterSrcAttrs) => {
      const relNoExt = stripExt(relWithExt);
      const url = cloudinaryUrl({
        cloudName,
        resourceType: "video",
        folder,
        relPathNoExt: relNoExt,
      });
      return `<video${beforeSrcAttrs} src="${url}"${afterSrcAttrs}>`;
    }
  );

  // 3) Fallback: any raw string occurrences of assets/images or assets/videos (keeps surrounding text)
  out = out.replace(
    /assets\/images\/([^\s)"']+?\.(?:png|jpe?g|gif|webp|svg))/gi,
    (match, relWithExt) =>
      cloudinaryUrl({
        cloudName,
        resourceType: "image",
        folder,
        relPathNoExt: stripExt(relWithExt),
      })
  );

  out = out.replace(
    /assets\/videos\/([^\s)"']+?\.(?:mp4|webm|mov))/gi,
    (match, relWithExt) =>
      cloudinaryUrl({
        cloudName,
        resourceType: "video",
        folder,
        relPathNoExt: stripExt(relWithExt),
      })
  );

  return out;
}

function main() {
  const cloudName = requireEnv("GATSBY_CLOUDINARY_CLOUD_NAME");
  const folder = process.env.GATSBY_CLOUDINARY_FOLDER || "";

  const repoRoot = path.join(__dirname, "..");
  const contentRoot = path.join(repoRoot, "content");

  const mdFiles = getAllFiles(contentRoot).filter((f) => /\.(md|mdx)$/i.test(f));
  let changed = 0;

  mdFiles.forEach((file) => {
    const before = fs.readFileSync(file, "utf8");
    const after = rewriteContent(before, { cloudName, folder });
    if (after !== before) {
      fs.writeFileSync(file, after, "utf8");
      changed += 1;
    }
  });

  console.log(`Rewrote ${changed}/${mdFiles.length} Markdown file(s).`);
}

main();

