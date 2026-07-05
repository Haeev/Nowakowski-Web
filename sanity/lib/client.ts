import { createClient, type SanityClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "../env"

export const client: SanityClient | null =
  projectId && dataset
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn,
        perspective: "published",
      })
    : null
