function isRemoteUrl(value) {
  return typeof value === "string" && /^https?:\/\//i.test(value);
}

function stripLeadingSlashes(p) {
  return p.replace(/^\/+/, "");
}

function stripExtension(p) {
  return p.replace(/\.[a-z0-9]+$/i, "");
}

function joinPath(...parts) {
  return parts
    .filter(Boolean)
    .map((p) => String(p).replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");
}

/** Public defaults so builds work without env (overridable via GATSBY_*). */
const DEFAULT_CLOUD_NAME = "dh012rexm";
const DEFAULT_FOLDER = "soheee-bae-site";

function cloudinaryUrl({ resourceType, publicId, transforms }) {
  const cloudName =
    process.env.GATSBY_CLOUDINARY_CLOUD_NAME || DEFAULT_CLOUD_NAME;
  if (!cloudName) return null;

  const safeTransforms = transforms?.length ? transforms.join(",") : null;
  const withTransforms = safeTransforms ? `${safeTransforms}/` : "";

  return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${withTransforms}${publicId}`;
}

export function cloudinaryImageUrl(assetPath, opts = {}) {
  if (!assetPath || typeof assetPath !== "string") return null;
  if (isRemoteUrl(assetPath)) return assetPath;

  const folder = process.env.GATSBY_CLOUDINARY_FOLDER ?? DEFAULT_FOLDER;
  const normalized = stripLeadingSlashes(assetPath);
  const publicId = joinPath(folder, stripExtension(normalized));

  return cloudinaryUrl({
    resourceType: "image",
    publicId,
    transforms: opts.transforms || ["f_auto", "q_auto"],
  });
}

export function cloudinaryVideoUrl(assetPath, opts = {}) {
  if (!assetPath || typeof assetPath !== "string") return null;
  if (isRemoteUrl(assetPath)) return assetPath;

  const folder = process.env.GATSBY_CLOUDINARY_FOLDER ?? DEFAULT_FOLDER;
  const normalized = stripLeadingSlashes(assetPath);
  const publicId = joinPath(folder, stripExtension(normalized));

  return cloudinaryUrl({
    resourceType: "video",
    publicId,
    transforms: opts.transforms || ["f_auto", "q_auto"],
  });
}

