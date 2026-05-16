"use client"

import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"

import { apiVersion, dataset, projectId, studioBasePath } from "./sanity/env"
import { schema } from "./sanity/schemaTypes"

export default defineConfig({
  basePath: studioBasePath,
  projectId,
  dataset,
  title: "Nowakowski Web — Studio",
  schema,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
})
