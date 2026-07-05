"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { LocalFaqItem } from "@/lib/content/local-pages"
import { cn } from "@/lib/cn"
import SectionLabel from "../../ui/SectionLabel"
import { Button, Container, Section, SectionHeading } from "../../ui"

type LocalFaqProps = {
  items: LocalFaqItem[]
  city: string
}

const LocalFaq = ({ items, city }: LocalFaqProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <Section tone="surface">
      <Container>
        <div className="max-w-3xl">
          <SectionLabel accent="red">Questions fréquentes</SectionLabel>
          <SectionHeading>
            Vos questions sur un site à {city}
          </SectionHeading>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <ul className="divide-y divide-border rounded-2xl border border-border bg-bg">
            {items.map((item, index) => {
              const isOpen = openIndex === index
              const panelId = `local-faq-panel-${index}`
              const buttonId = `local-faq-button-${index}`
              return (
                <li key={item.question}>
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => handleToggle(index)}
                      className="group flex w-full items-center justify-between gap-6 px-6 py-6 text-left"
                    >
                      <span
                        className={cn(
                          "leading-snug transition-colors duration-200 group-hover:text-brand md:text-lg",
                          isOpen
                            ? "font-semibold text-fg"
                            : "font-medium text-fg-muted",
                        )}
                      >
                        {item.question}
                      </span>
                      <span
                        className={cn(
                          "flex-shrink-0 transition-transform duration-300",
                          isOpen && "rotate-180",
                        )}
                      >
                        <ChevronDown
                          className="h-5 w-5 text-brand"
                          aria-hidden
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 leading-relaxed text-fg-muted">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 text-center">
          <p className="text-lg text-fg-muted">
            Une autre question sur votre projet à {city} ?
          </p>
          <Button href="#contact">Posez-la moi directement →</Button>
        </div>
      </Container>
    </Section>
  )
}

export default LocalFaq
