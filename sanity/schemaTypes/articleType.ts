import { defineField, defineType } from "sanity"

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required().min(5).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Résumé",
      description: "Résumé court affiché sur les cards (200 caractères max).",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "mainImage",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif",
          type: "string",
          validation: (rule) =>
            rule
              .required()
              .error("Le texte alternatif est requis pour l'accessibilité."),
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Contenu",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Citation", value: "blockquote" },
          ],
          lists: [
            { title: "Liste à puces", value: "bullet" },
            { title: "Liste numérotée", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Gras", value: "strong" },
              { title: "Italique", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Lien",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule) =>
                      rule
                        .uri({ scheme: ["http", "https", "mailto", "tel"] })
                        .required(),
                  }),
                  defineField({
                    name: "blank",
                    type: "boolean",
                    title: "Ouvrir dans un nouvel onglet",
                    initialValue: true,
                  }),
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texte alternatif",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Légende",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO — Title balise meta",
      description: "Optionnel. Si vide, le titre principal sera utilisé.",
      type: "string",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO — Meta description",
      description: "Optionnel. Si vide, le résumé sera utilisé.",
      type: "string",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "categories",
      title: "Catégories",
      description: "Choisis une ou plusieurs catégories dans la liste.",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Création de site", value: "creation-site" },
          { title: "SEO", value: "seo" },
          { title: "Conseils artisans", value: "conseils-artisans" },
          { title: "Actualités", value: "actualites" },
          { title: "Témoignages", value: "temoignages" },
        ],
      },
    }),
    defineField({
      name: "readingTime",
      title: "Temps de lecture (minutes)",
      type: "number",
      validation: (rule) => rule.integer().min(1).max(60),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          : "Non publié",
        media,
      }
    },
  },
  orderings: [
    {
      title: "Date (récents en premier)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
})
