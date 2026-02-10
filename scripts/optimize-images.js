#!/usr/bin/env node

/**
 * Image Optimization Script
 *
 * This script helps optimize images before committing.
 * Run with: node scripts/optimize-images.js
 *
 * Note: Requires imagemin packages (install with npm install --save-dev imagemin imagemin-webp imagemin-mozjpeg)
 */

const fs = require("fs");
const path = require("path");

const ASSETS_DIR = path.join(__dirname, "../assets/images");
const MAX_FILE_SIZE = 500 * 1024; // 500KB - flag files larger than this

function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

function findLargeImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findLargeImages(filePath, fileList);
    } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
      const size = getFileSize(filePath);
      if (size > MAX_FILE_SIZE) {
        fileList.push({
          path: filePath.replace(process.cwd() + "/", ""),
          size: size,
          formattedSize: formatBytes(size),
        });
      }
    }
  });

  return fileList;
}

console.log("🔍 Scanning for large images...\n");

const largeImages = findLargeImages(ASSETS_DIR);

if (largeImages.length === 0) {
  console.log("✅ No large images found! All images are under 500KB.\n");
  process.exit(0);
}

console.log(`⚠️  Found ${largeImages.length} large image(s) (>500KB):\n`);

largeImages
  .sort((a, b) => b.size - a.size)
  .forEach((img, index) => {
    console.log(`${index + 1}. ${img.path}`);
    console.log(`   Size: ${img.formattedSize}\n`);
  });

console.log("\n💡 Recommendations:");
console.log("   1. Use ImageOptim (https://imageoptim.com/mac) to compress");
console.log("   2. Use Squoosh (https://squoosh.app/) to convert to WebP");
console.log(
  "   3. Consider using external CDN (Cloudinary) for very large images"
);
console.log("   4. Resize images to actual display size (max 1200px width)\n");

process.exit(1);
