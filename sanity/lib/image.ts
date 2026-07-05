import createImageUrlBuilder from "@sanity/image-url"
import type { Image } from "sanity"

import { dataset, projectId } from "../env"

const builder =
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset })
    : null

export const urlForImage = (source: Image | undefined | null) => {
  if (!builder || !source?.asset) return null
  return builder.image(source).auto("format").fit("max")
}
