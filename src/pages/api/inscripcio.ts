import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const resend = new Resend(process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY || '');

export const POST: APIRoute = async (context) => {
  const { request } = context;
  try {
    const { name, email, pdfBase64 } = await request.json();

    if (!name || !email || !pdfBase64) {
      return new Response(JSON.stringify({ error: 'Falten camps obligatoris' }), { status: 400 });
    }

    // Extraure les dades base64 netes
    const base64Data = pdfBase64.includes(';base64,') 
      ? pdfBase64.split(';base64,')[1] 
      : pdfBase64;

    const safeName = name.replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `butlleti_inscripcio_${safeName}.pdf`;

    // 1. Enviar correu a l'associació de veïns
    await resend.emails.send({
      from: 'Web AVES <hola@aveixamplesbd.com>',
      to: 'aavveixamplesbd@gmail.com',
      subject: `Nova inscripció de soci (PDF): ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #37645d;">Nova inscripció de soci rebuta online</h2>
          <p>S'ha rebut una nova sol·licitud d'inscripció a través de la pàgina web.</p>
          <ul>
            <li><strong>Nom:</strong> ${name}</li>
            <li><strong>Correu electrònic:</strong> ${email}</li>
          </ul>
          <p>S'adjunta a aquest correu el document de sol·licitud oficial completat i signat en format PDF.</p>
          <br/>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 0.8em; color: #666;">Enviat des del lloc web oficial de l'AVV de l'Eixample de Sabadell.</p>
        </div>
      `,
      attachments: [
        {
          filename: filename,
          content: base64Data,
        }
      ]
    });

    // 2. Enviar còpia de confirmació al soci
    await resend.emails.send({
      from: 'Associació de Veïns <hola@aveixamplesbd.com>',
      to: email,
      subject: `Còpia de la teva inscripció - AVV Eixample Sabadell`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; padding: 24px;">
          <h2 style="color: #37645d; margin-top: 0;">Gràcies per inscriure't!</h2>
          <p>Hola <strong>${name}</strong>,</p>
          <p>Confirmem que hem rebut correctament la teva sol·licitud d'alta com a soci/sòcia de l'<strong>Associació de Veïns de l'Eixample de Sabadell</strong>.</p>
          <p>Adjunt trobaràs el teu butlletí d'inscripció emplenat i signat digitalment. Guarda aquest document com a comprovant de la teva inscripció i autorització del mandat SEPA per al cobrament de la quota anual (12€).</p>
          <p>Ens posarem en contacte amb tu en breu per confirmar la teva alta.</p>
          <br/>
          <p>Atentament,</p>
          <p style="font-weight: bold; color: #37645d; margin-bottom: 0;">Associació de Veïns Eixample Sabadell</p>
          <p style="font-size: 0.9em; color: #666; margin-top: 4px;">Carrer Sardà, 18, 08203 Sabadell</p>
        </div>
      `,
      attachments: [
        {
          filename: 'butlleti_inscripcio.pdf',
          content: base64Data,
        }
      ]
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error('Error in /api/inscripcio:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
