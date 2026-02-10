#!/usr/bin/env node

/**
 * Find Unused Assets Script
 *
 * This script helps identify assets that are not referenced in your content.
 * Run with: npm run find-unused-assets
 */

const fs = require("fs");
const path = require("path");

const ASSETS_DIR = path.join(__dirname, "../assets");
const CONTENT_DIR = path.join(__dirname, "../content");
const SRC_DIR = path.join(__dirname, "../src");

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    return "";
  }
}

function findAssetReferences(assetName, contentFiles) {
  const references = [];

  contentFiles.forEach((file) => {
    const content = readFileContent(file);
    const relativePath = file.replace(process.cwd() + "/", "");

    // Check for various reference patterns
    const patterns = [
      new RegExp(assetName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
      new RegExp(assetName.replace(/\.(png|jpg|jpeg|gif|mp4|svg)$/i, ""), "gi"),
    ];

    patterns.forEach((pattern) => {
      if (pattern.test(content)) {
        references.push(relativePath);
      }
    });
  });

  return [...new Set(references)]; // Remove duplicates
}

console.log("🔍 Scanning for unused assets...\n");

// Get all asset files
const assetFiles = getAllFiles(ASSETS_DIR)
  .filter((file) => /\.(png|jpg|jpeg|gif|mp4|svg|webp)$/i.test(file))
  .map((file) => ({
    fullPath: file,
    relativePath: file.replace(ASSETS_DIR + "/", ""),
    fileName: path.basename(file),
    nameWithoutExt: path.basename(file, path.extname(file)),
  }));

// Get all content files to search
const contentFiles = [
  ...getAllFiles(CONTENT_DIR).filter((f) => /\.(md|mdx)$/i.test(f)),
  ...getAllFiles(SRC_DIR).filter((f) => /\.(js|jsx|ts|tsx)$/i.test(f)),
  path.join(__dirname, "../gatsby-config.js"),
];

console.log(`📁 Found ${assetFiles.length} asset files`);
console.log(`📄 Searching in ${contentFiles.length} content files\n`);

const unusedAssets = [];
const usedAssets = [];

assetFiles.forEach((asset) => {
  const references = findAssetReferences(asset.fileName, contentFiles);

  if (references.length === 0) {
    // Also check for name without extension
    const nameRefs = findAssetReferences(asset.nameWithoutExt, contentFiles);
    if (nameRefs.length === 0) {
      unusedAssets.push({
        ...asset,
        references: [],
      });
    } else {
      usedAssets.push({
        ...asset,
        references: nameRefs,
      });
    }
  } else {
    usedAssets.push({
      ...asset,
      references,
    });
  }
});

if (unusedAssets.length === 0) {
  console.log("✅ All assets are being used!\n");
} else {
  console.log(
    `⚠️  Found ${unusedAssets.length} potentially unused asset(s):\n`
  );

  unusedAssets.forEach((asset, index) => {
    const stats = fs.statSync(asset.fullPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`${index + 1}. ${asset.relativePath}`);
    console.log(`   Size: ${sizeKB} KB\n`);
  });

  console.log(
    "\n💡 Note: This is a heuristic check. Please verify manually before deleting."
  );
  console.log(
    "   Some assets might be referenced dynamically or in config files.\n"
  );
}

// Summary
const totalSize = assetFiles.reduce((sum, asset) => {
  const stats = fs.statSync(asset.fullPath);
  return sum + stats.size;
}, 0);

const unusedSize = unusedAssets.reduce((sum, asset) => {
  const stats = fs.statSync(asset.fullPath);
  return sum + stats.size;
}, 0);

console.log("📊 Summary:");
console.log(`   Total assets: ${assetFiles.length}`);
console.log(`   Used: ${usedAssets.length}`);
console.log(`   Potentially unused: ${unusedAssets.length}`);
console.log(`   Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
if (unusedSize > 0) {
  console.log(`   Unused size: ${(unusedSize / 1024 / 1024).toFixed(2)} MB`);
}
console.log("");
