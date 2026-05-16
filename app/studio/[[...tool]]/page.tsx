"use client"

import { NextStudio } from "next-sanity/studio"

import config from "../../../sanity.config"

export const dynamic = "force-static"

const StudioPage = () => <NextStudio config={config} />

export default StudioPage
