import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const resend = new Resend(process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY || '');

export const POST: APIRoute = async (context) => {
  const { request } = context;
  try {
    const { name, phone, email, guests, notes, lang } = await request.json();

    // Validate required fields
    if (!name || !phone || !email || !guests) {
      return new Response(
        JSON.stringify({ error: 'Falten camps obligatoris' }),
        { status: 400 }
      );
    }

    const price = 15;
    const total = guests * price;
    const isCa = lang === 'ca';

    // ── 1. Email to association ──
    await resend.emails.send({
      from: 'Web AVES <hola@aveixamplesbd.com>',
      to: 'aavveixamplesbd@gmail.com',
      subject: `Nova reserva sopar Festa Major: ${name} (${guests} comensals)`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #37645d; margin-top: 0;">🍽️ Nova reserva – Sopar de Festa Major</h2>
          <p>S'ha rebut una nova reserva per al sopar a través del formulari web.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
            <tr style="background-color: #f3f4f4;">
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #e1e3e3; width: 40%; color: #37645d;">Nom</td>
              <td style="padding: 10px 14px; border: 1px solid #e1e3e3;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #e1e3e3; color: #37645d;">Telèfon</td>
              <td style="padding: 10px 14px; border: 1px solid #e1e3e3;">${phone}</td>
            </tr>
            <tr style="background-color: #f3f4f4;">
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #e1e3e3; color: #37645d;">Email</td>
              <td style="padding: 10px 14px; border: 1px solid #e1e3e3;"><a href="mailto:${email}" style="color: #37645d;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #e1e3e3; color: #37645d;">Comensals</td>
              <td style="padding: 10px 14px; border: 1px solid #e1e3e3;">${guests}</td>
            </tr>
            <tr style="background-color: #f3f4f4;">
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #e1e3e3; color: #37645d;">Total</td>
              <td style="padding: 10px 14px; border: 1px solid #e1e3e3; font-weight: bold; font-size: 16px;">${total}€</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #e1e3e3; color: #37645d;">Observacions</td>
              <td style="padding: 10px 14px; border: 1px solid #e1e3e3;">${notes || '—'}</td>
            </tr>
            <tr style="background-color: #f3f4f4;">
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #e1e3e3; color: #37645d;">Idioma</td>
              <td style="padding: 10px 14px; border: 1px solid #e1e3e3;">${isCa ? 'Català' : 'Castellà'}</td>
            </tr>
          </table>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 0.8em; color: #666;">Enviat des del lloc web oficial de l'AVV de l'Eixample de Sabadell.</p>
        </div>
      `,
    });

    // ── 2. Confirmation email to user ──
    const confirmSubject = isCa
      ? `Confirmació reserva – Sopar de Festa Major`
      : `Confirmación reserva – Cena de Fiesta Mayor`;

    const confirmHtml = isCa
      ? `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; padding: 24px;">
          <h2 style="color: #37645d; margin-top: 0;">🍽️ Reserva confirmada!</h2>
          <p>Hola <strong>${name}</strong>,</p>
          <p>Confirmem que hem rebut la teva reserva per al <strong>Sopar de Festa Major</strong>.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
            <tr style="background-color: #f3f4f4;">
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #e1e3e3; color: #37645d;">📅 Data</td>
              <td style="padding: 10px 14px; border: 1px solid #e1e3e3;">Dissabte 26 de setembre, 21h</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #e1e3e3; color: #37645d;">📍 Lloc</td>
              <td style="padding: 10px 14px; border: 1px solid #e1e3e3;">Av. Barberà (Carpa AVV)</td>
            </tr>
            <tr style="background-color: #f3f4f4;">
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #e1e3e3; color: #37645d;">👥 Comensals</td>
              <td style="padding: 10px 14px; border: 1px solid #e1e3e3;">${guests}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #e1e3e3; color: #37645d;">💰 Total</td>
              <td style="padding: 10px 14px; border: 1px solid #e1e3e3; font-weight: bold;">${total}€</td>
            </tr>
          </table>
          <p>El pagament es realitza el dia del sopar. Si necessites cancel·lar o modificar la reserva, contacta'ns al <strong>672 520 479</strong>.</p>
          <br/>
          <p>Atentament,</p>
          <p style="font-weight: bold; color: #37645d; margin-bottom: 0;">Associació de Veïns Eixample Sabadell</p>
          <p style="font-size: 0.9em; color: #666; margin-top: 4px;">Carrer Sardà, 18, 08203 Sabadell</p>
        </div>
      `
      : `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; padding: 24px;">
          <h2 style="color: #37645d; margin-top: 0;">🍽️ ¡Reserva confirmada!</h2>
          <p>Hola <strong>${name}</strong>,</p>
          <p>Confirmamos que hemos recibido tu reserva para la <strong>Cena de Fiesta Mayor</strong>.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
            <tr style="background-color: #f3f4f4;">
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #e1e3e3; color: #37645d;">📅 Fecha</td>
              <td style="padding: 10px 14px; border: 1px solid #e1e3e3;">Sábado 26 de septiembre, 21h</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #e1e3e3; color: #37645d;">📍 Lugar</td>
              <td style="padding: 10px 14px; border: 1px solid #e1e3e3;">Av. Barberà (Carpa AVV)</td>
            </tr>
            <tr style="background-color: #f3f4f4;">
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #e1e3e3; color: #37645d;">👥 Comensales</td>
              <td style="padding: 10px 14px; border: 1px solid #e1e3e3;">${guests}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #e1e3e3; color: #37645d;">💰 Total</td>
              <td style="padding: 10px 14px; border: 1px solid #e1e3e3; font-weight: bold;">${total}€</td>
            </tr>
          </table>
          <p>El pago se realiza el día de la cena. Si necesitas cancelar o modificar la reserva, contacta con nosotros al <strong>672 520 479</strong>.</p>
          <br/>
          <p>Atentamente,</p>
          <p style="font-weight: bold; color: #37645d; margin-bottom: 0;">Asociación de Vecinos Eixample Sabadell</p>
          <p style="font-size: 0.9em; color: #666; margin-top: 4px;">Calle Sardà, 18, 08203 Sabadell</p>
        </div>
      `;

    await resend.emails.send({
      from: 'Associació de Veïns <hola@aveixamplesbd.com>',
      to: email,
      subject: confirmSubject,
      html: confirmHtml,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error('Error in /api/sopar:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
