import NextImage, { type ImageProps } from "next/image";

/**
 * Every photograph on the site goes through here (2026-10-08, "I want the
 * best quality of all images"): next/image at quality 90 instead of the
 * default 75. 90 is allow-listed in next.config.ts `images.qualities`.
 */
export default function Image({ quality = 90, alt, ...props }: ImageProps) {
  return <NextImage quality={quality} alt={alt} {...props} />;
}
