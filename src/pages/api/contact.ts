import type { APIRoute } from 'astro';
import { addContactSubmission, getSiteContent } from '../../lib/content-store';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();
    const topic = String(body.topic || 'Información de Admisiones').trim();
    const message = String(body.message || '').trim();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Por favor completa tu nombre, correo electrónico y mensaje.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Ingresa un correo electrónico válido.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const saved = await addContactSubmission({ name, email, phone, topic, message });
    const content = await getSiteContent();

    // Optional Resend webhook/email forwarding when RESEND_API_KEY is configured in production
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.MAIL_FROM || 'Portal Institucional <no-reply@universidadantequera.edu.mx>',
            to: [content.contact.email],
            reply_to: email,
            subject: `[Portal Web] ${topic} — ${name}`,
            text: `Nueva solicitud desde el sitio web:\n\nNombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone || 'No proporcionado'}\nAsunto: ${topic}\n\nMensaje:\n${message}`,
          }),
        });
      } catch {
        // Submission is already safely stored in the institutional inbox
      }
    }

    return new Response(
      JSON.stringify({
        ok: true,
        id: saved.id,
        recipientEmail: content.contact.email,
        message: 'Tu solicitud ha sido enviada correctamente. Nuestro equipo de Admisiones te responderá muy pronto.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: 'No se pudo procesar tu solicitud. Intenta nuevamente.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
