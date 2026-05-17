"use client"

import { type FormEvent, useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react"
import { AnimatedSection, AnimatedItem, fadeUp } from "../ui/animations"
import ObfuscatedEmail from "../ui/ObfuscatedEmail"
import { getTelHref, siteConfig } from "@/lib/site-config"
import { Container, Section, SectionHeading } from "../ui"

type SubmitStatus = "idle" | "loading" | "success" | "error"

const inputClasses =
  "w-full rounded-xl border-2 border-border bg-bg px-4 py-3 text-fg placeholder:text-fg-subtle transition-colors focus:border-brand focus:outline-none disabled:opacity-60"

const Contact = () => {
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<SubmitStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const isLoading = status === "loading"
  const isSuccess = status === "success"
  const isError = status === "error"

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isLoading) return

    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, message }),
      })

      const data = (await res.json().catch(() => ({}))) as {
        error?: string
      }

      if (!res.ok) {
        throw new Error(data?.error || "Erreur lors de l'envoi.")
      }

      setStatus("success")
      setName("")
      setContact("")
      setMessage("")
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Erreur inconnue.")
    }
  }

  return (
    <Section
      id="contact"
      className="grain-overlay bg-white dark:bg-[#0D0D0D]"
    >
      <Container>
        <AnimatedSection className="mx-auto max-w-3xl text-center">
          <AnimatedItem variants={fadeUp}>
            <SectionHeading size="large">
              On travaille
              <br />
              ensemble ?
            </SectionHeading>
          </AnimatedItem>
          <AnimatedItem variants={fadeUp}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-fg-muted">
              Décrivez votre projet. Je reviens vers vous sous 24h.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection
          className="mx-auto mt-10 max-w-2xl"
          variants={fadeUp}
        >
          <form
            onSubmit={handleSubmit}
            aria-label="Formulaire de contact"
            className="space-y-5 rounded-2xl border border-border bg-surface p-6 md:p-8"
            noValidate
          >
            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block text-sm font-semibold"
              >
                Prénom & Nom
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                aria-required="true"
                autoComplete="name"
                maxLength={200}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={siteConfig.founder.fullName}
                disabled={isLoading}
                className={inputClasses}
              />
            </div>
            <div>
              <label
                htmlFor="contact-contact"
                className="mb-2 block text-sm font-semibold"
              >
                Téléphone ou email
              </label>
              <input
                id="contact-contact"
                name="contact"
                type="text"
                required
                aria-required="true"
                autoComplete="email"
                maxLength={200}
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                placeholder="06 12 34 56 78 ou vous@exemple.fr"
                disabled={isLoading}
                className={inputClasses}
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-semibold"
              >
                Votre message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                aria-required="true"
                aria-invalid={isError ? "true" : undefined}
                aria-describedby={isError ? "contact-error" : undefined}
                rows={4}
                maxLength={5000}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Parlez-moi de votre activité et de ce que vous voulez faire en ligne…"
                disabled={isLoading}
                className={`${inputClasses} resize-y`}
              />
            </div>

            <motion.button
              whileHover={{ scale: isLoading || isSuccess ? 1 : 1.02 }}
              whileTap={{ scale: isLoading || isSuccess ? 1 : 0.97 }}
              type="submit"
              disabled={isLoading || isSuccess}
              aria-busy={isLoading}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-shadow duration-200 hover:shadow-brand-glow disabled:cursor-not-allowed disabled:opacity-80"
            >
              {isSuccess ? (
                <>
                  <CheckCircle2 className="h-4 w-4" aria-hidden />
                  Merci, je reviens vers vous sous 24h
                </>
              ) : isLoading ? (
                <>Envoi…</>
              ) : (
                <>
                  Envoyer
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </>
              )}
            </motion.button>

            <div
              role="status"
              aria-live="polite"
              className="min-h-[1.25rem] text-sm"
            >
              {isSuccess && (
                <p className="text-center text-fg-muted">
                  Merci, je reviens vers vous sous 24h.
                </p>
              )}
              {isError && (
                <p
                  id="contact-error"
                  className="text-center font-medium text-brand-red"
                >
                  {errorMsg}
                </p>
              )}
            </div>
          </form>
        </AnimatedSection>

        <AnimatedSection className="mx-auto mt-10 max-w-3xl" variants={fadeUp}>
          <ul className="flex flex-col flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:flex-row">
            <li>
              <span className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-brand">
                <Mail className="h-4 w-4 text-brand" aria-hidden />
                <ObfuscatedEmail className="text-fg-muted transition-colors hover:text-brand" />
              </span>
            </li>
            <li>
              <a href={getTelHref()} className="inline-flex">
                <span className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-brand">
                  <Phone className="h-4 w-4 text-brand" aria-hidden />
                  {siteConfig.contact.phoneDisplay}
                </span>
              </a>
            </li>
            <li>
              <span className="inline-flex items-center gap-2 text-sm text-fg-muted">
                <MapPin className="h-4 w-4 text-brand" aria-hidden />
                {siteConfig.address.locality}, {siteConfig.address.region} (
                {siteConfig.address.departmentCode})
              </span>
            </li>
          </ul>
        </AnimatedSection>
      </Container>
    </Section>
  )
}

export default Contact
