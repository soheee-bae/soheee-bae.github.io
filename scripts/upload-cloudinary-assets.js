#!/usr/bin/env node

/**
 * Upload all assets/images and assets/videos to Cloudinary.
 *
 * Usage:
 *  - CLOUDINARY_CLOUD_NAME=... CLOUDINARY_API_KEY=... CLOUDINARY_API_SECRET=... CLOUDINARY_FOLDER=... node scripts/upload-cloudinary-assets.js
 *
 * Notes:
 *  - Images are uploaded with resource_type=image
 *  - Videos are uploaded with resource_type=video
 *  - public_id preserves folder structure and strips extension
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

function normalizeToPosix(p) {
  return p.split(path.sep).join("/");
}

async function main() {
  const cloudinaryCloudName =
    process.env.CLOUDINARY_CLOUD_NAME || requireEnv("CLOUDINARY_CLOUD_NAME");
  const cloudinaryApiKey = requireEnv("CLOUDINARY_API_KEY");
  const cloudinaryApiSecret = requireEnv("CLOUDINARY_API_SECRET");
  const folder = process.env.CLOUDINARY_FOLDER || process.env.GATSBY_CLOUDINARY_FOLDER || "";
  const overwrite = String(process.env.CLOUDINARY_OVERWRITE || "").toLowerCase() === "true";

  const cloudinary = require("cloudinary").v2;
  cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret,
    secure: true,
  });

  const repoRoot = path.join(__dirname, "..");
  const imagesRoot = path.join(repoRoot, "assets/images");
  const videosRoot = path.join(repoRoot, "assets/videos");

  const imageFiles = getAllFiles(imagesRoot).filter((f) =>
    /\.(png|jpe?g|gif|webp|svg)$/i.test(f)
  );
  const videoFiles = getAllFiles(videosRoot).filter((f) => /\.(mp4|webm|mov)$/i.test(f));

  const all = [
    ...imageFiles.map((fullPath) => ({ fullPath, root: imagesRoot, resource_type: "image" })),
    ...videoFiles.map((fullPath) => ({ fullPath, root: videosRoot, resource_type: "video" })),
  ];

  console.log(`Found ${imageFiles.length} images, ${videoFiles.length} videos (${all.length} total)`);
  console.log(`Cloudinary folder prefix: ${folder || "(none)"}`);
  console.log(`Overwrite: ${overwrite}`);

  let ok = 0;
  let fail = 0;

  for (const item of all) {
    const rel = normalizeToPosix(path.relative(item.root, item.fullPath));
    const publicId = [folder, stripExt(rel)].filter(Boolean).join("/");

    try {
      const result = await cloudinary.uploader.upload(item.fullPath, {
        resource_type: item.resource_type,
        public_id: publicId,
        overwrite,
        unique_filename: false,
        use_filename: false,
      });
      ok += 1;
      console.log(`[OK] ${item.resource_type} ${rel} -> ${result.public_id}`);
    } catch (e) {
      fail += 1;
      console.error(`[FAIL] ${item.resource_type} ${rel}`);
      console.error(e?.message || e);
    }
  }

  console.log(`Done. OK=${ok} FAIL=${fail}`);
  process.exit(fail === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

