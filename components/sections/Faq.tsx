"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import SectionLabel from "../ui/SectionLabel"
import { FAQ_ITEMS } from "@/lib/content/faq"
import { cn } from "@/lib/cn"
import { Container, Section, SectionHeading } from "../ui"

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <Section tone="surface">
      <Container>
        <div className="max-w-3xl">
          <SectionLabel accent="red">Questions fréquentes</SectionLabel>
          <SectionHeading>Tout ce que vous voulez savoir.</SectionHeading>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <ul className="divide-y divide-border rounded-2xl border border-border bg-bg">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index
              const panelId = `faq-panel-${index}`
              const buttonId = `faq-button-${index}`
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
                            : "font-medium text-gray-700 dark:text-gray-300",
                        )}
                      >
                        {item.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown
                          className="h-5 w-5 text-brand"
                          aria-hidden
                        />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="px-6 pb-6 leading-relaxed text-fg-muted">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </Section>
  )
}

export default Faq
