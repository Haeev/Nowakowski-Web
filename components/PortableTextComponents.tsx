import Image from "next/image"
import Link from "next/link"
import type { PortableTextComponents as PortableTextComponentsType } from "@portabletext/react"

import { urlForImage } from "@/sanity/lib/image"

type ImageBlock = {
  _key: string
  _type: "image"
  asset?: { _ref: string; _type: "reference" }
  alt?: string
  caption?: string
}

const isInternalLink = (href: string) =>
  href.startsWith("/") || href.startsWith("#")

export const portableTextComponents: PortableTextComponentsType = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 font-display text-3xl font-bold tracking-tight text-fg md:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 font-display text-2xl font-semibold tracking-tight text-fg md:text-3xl">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mt-5 text-base leading-relaxed text-fg-muted md:text-lg">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-brand bg-surface px-6 py-4 italic text-fg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-fg-muted marker:text-brand">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-fg-muted marker:text-brand">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-fg">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-brand">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href: string = value?.href || "#"
      const blank: boolean = value?.blank ?? true

      if (isInternalLink(href)) {
        return (
          <Link
            href={href}
            className="text-brand underline-offset-4 hover:underline"
          >
            {children}
          </Link>
        )
      }
      return (
        <a
          href={href}
          target={blank ? "_blank" : undefined}
          rel={blank ? "noopener noreferrer" : undefined}
          className="text-brand underline-offset-4 hover:underline"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }: { value: ImageBlock }) => {
      const url = urlForImage(value)?.width(1600).url()
      if (!url) return null
      const alt = value.alt || ""
      return (
        <figure className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface">
            <Image
              src={url}
              alt={alt}
              width={1600}
              height={900}
              sizes="(min-width: 1024px) 768px, 100vw"
              className="h-auto w-full"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-fg-subtle">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}
