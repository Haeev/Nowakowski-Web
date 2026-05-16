import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

export async function POST(req: NextRequest) {
  try {
    const { name, contact, message } = await req.json()

    if (!name || !contact || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 },
      )
    }

    if (
      typeof name !== "string" ||
      typeof contact !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { error: "Format invalide." },
        { status: 400 },
      )
    }

    if (message.length > 5000 || name.length > 200 || contact.length > 200) {
      return NextResponse.json(
        { error: "Contenu trop long." },
        { status: 400 },
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    const fromAddress = process.env.CONTACT_EMAIL_FROM
    const toAddress = process.env.CONTACT_EMAIL_TO

    if (!apiKey || !fromAddress || !toAddress) {
      console.error(
        "Contact API: missing RESEND_API_KEY, CONTACT_EMAIL_FROM or CONTACT_EMAIL_TO",
      )
      return NextResponse.json(
        { error: "Configuration serveur incomplète." },
        { status: 500 },
      )
    }

    const resend = new Resend(apiKey)

    const safeName = escapeHtml(name)
    const safeContact = escapeHtml(contact)
    const safeMessage = escapeHtml(message)

    const { data, error } = await resend.emails.send({
      from: `Nowakowski Web <${fromAddress}>`,
      to: [toAddress],
      replyTo: contact.includes("@") ? contact : undefined,
      subject: `Nouveau message de ${name}`,
      text: `Nom : ${name}\nContact : ${contact}\n\nMessage :\n${message}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px;">
          <h2 style="color: #AB19F5;">Nouveau message — Nowakowski Web</h2>
          <p><strong>Nom :</strong> ${safeName}</p>
          <p><strong>Contact :</strong> ${safeContact}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: "Erreur lors de l'envoi." },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error("Contact API error:", err)
    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 },
    )
  }
}
