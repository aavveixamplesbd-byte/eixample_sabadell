import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { supabase } from '../../utils/news';

export const prerender = false;

const resend = new Resend(process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY || '');

export const POST: APIRoute = async (context) => {
  const { request } = context;
  try {
    const { name, dni, email, phone, iban, lang } = await request.json();

    if (!name || !dni || !email || !phone || !iban) {
      return new Response(JSON.stringify({ error: 'Falten camps obligatoris' }), { status: 400 });
    }

    const langCode = lang === 'es' ? 'es' : 'ca';
    
    // Obtener IP y User Agent para la Firma Electrónica Simple
    const ip = request.headers.get('x-forwarded-for') || context.clientAddress || 'desconocida';
    const userAgent = request.headers.get('user-agent') || 'desconocido';
    const signatureDate = new Date();

    // Guardar en Supabase si está configurado
    if (supabase) {
      const { error: dbError } = await supabase.from('socis').insert([{
        name,
        dni,
        email,
        phone,
        iban,
        signature_date: signatureDate.toISOString(),
        signature_ip: ip,
        signature_user_agent: userAgent,
        lang: langCode,
        status: 'pendent'
      }]);
      
      if (dbError) {
        console.error('Error inserting member signature to Supabase:', dbError);
        // Retornamos error para no enviar correos si no se ha podido registrar la firma legalmente
        return new Response(JSON.stringify({ error: 'Error al registrar la firma electrónica. Inténtelo más tarde.' }), { status: 500 });
      }
    } else {
      console.warn('Supabase client not initialized. Skipping database insertion.');
    }

    // Formatear fecha para el correo
    const dateStr = signatureDate.toLocaleString(langCode === 'es' ? 'es-ES' : 'ca-ES', { 
      timeZone: 'Europe/Madrid',
      dateStyle: 'short',
      timeStyle: 'medium'
    });

    // Contenido del correo del usuario
    const subjectUser = langCode === 'es' 
      ? 'Mandato SEPA - Confirmación de solicitud y firma digital' 
      : 'Mandat SEPA - Confirmació de sol·licitud i signatura digital';

    const bodyUser = langCode === 'es'
      ? `Hola ${name},\n\nGracias por unirte a la Asociación de Vecinos Eixample Sabadell.\n\nEste correo confirma que hemos recibido tu solicitud de alta de socio y que has firmado digitalmente mediante Firma Electrónica Simple el Mandato SEPA para autorizar el cobro de la cuota anual de 12€.\n\nDATOS DEL ACREEDOR (ASOCIACIÓN):\n- Nombre: Asociación de Vecinos Eixample Sabadell\n- Dirección: Carrer Sardà, 18, 08203 Sabadell\n\nDATOS DE LA DOMICILIACIÓN:\n- Titular de la cuenta: ${name}\n- DNI/NIE: ${dni}\n- Teléfono: ${phone}\n- IBAN de la cuenta: ${iban}\n- Cuota Anual: 12,00 €\n\nDATOS DE LA FIRMA DIGITAL (Aceptada mediante casilla de verificación en web):\n- Fecha y hora: ${dateStr} (Hora Peninsular)\n- Dirección IP: ${ip}\n- Dispositivo/Navegador: ${userAgent}\n- Validez: Este registro electrónico constituye una prueba legal de tu consentimiento para la domiciliación bancaria de acuerdo con la normativa SEPA y el reglamento eIDAS de la Unión Europea.\n\nEn breve nos pondremos en contacto contigo si fuese necesaria alguna comprobación adicional.\n\nAtentamente,\nAsociación de Vecinos Eixample Sabadell\nCarrer Sardà, 18, 08203 Sabadell`
      : `Hola ${name},\n\nGràcies per unir-te a l'Associació de Veïns Eixample Sabadell.\n\nAquest correu confirma que hem rebut la teva sol·licitud d'alta de soci i que has signat digitalment mitjançant Signatura Electrònica Simple el Mandat SEPA per autoritzar el cobrament de la quota anual de 12€.\n\nDADES DE L'ACREEDOR (ASSOCIACIÓ):\n- Nom: Associació de Veïns Eixample Sabadell\n- Adreça: Carrer Sardà, 18, 08203 Sabadell\n\nDADES DE LA DOMICILIACIÓ:\n- Titular del compte: ${name}\n- DNI/NIE: ${dni}\n- Telèfon: ${phone}\n- IBAN del compte: ${iban}\n- Quota Anual: 12,00 €\n\nDADES DE LA SIGNATURA DIGITAL (Acceptada mitjançant casella de verificació a la web):\n- Data i hora: ${dateStr} (Hora Peninsular)\n- Adreça IP: ${ip}\n- Dispositiu/Navegador: ${userAgent}\n- Validesa: Aquest registre electrònic constitueix una prova legal del teu consentiment per a la domiciliació bancària d'acord amb la normativa SEPA i el reglament eIDAS de la Unió Europea.\n\nEn breu ens posarem en contacte amb tu si fos necessària alguna comprovació addicional.\n\nAtentament,\nAssociació de Veïns Eixample Sabadell\nCarrer Sardà, 18, 08203 Sabadell`;

    const subjectAdmin = `Nova sol·licitud d'alta de soci (FIRMAT): ${name}`;
    const bodyAdmin = `S'ha rebut una nova sol·licitud d'alta de soci i signatura de Mandat SEPA a la web:\n\n` +
      `- Nom: ${name}\n` +
      `- Correu: ${email}\n` +
      `- Telèfon: ${phone}\n` +
      `- DNI: ${dni}\n` +
      `- IBAN: ${iban}\n\n` +
      `METADADES DE LA SIGNATURA DIGITAL (Firma Electrònica Simple):\n` +
      `- Data i hora: ${dateStr}\n` +
      `- Adreça IP: ${ip}\n` +
      `- User Agent: ${userAgent}\n\n` +
      `Aquesta informació ha quedat registrada correctament a la base de dades de Supabase per a validesa legal davant l'entitat bancària.`;

    // Enviar correo al usuario
    await resend.emails.send({
      from: 'Associació de Veïns <hola@aveixamplesbd.com>',
      to: email,
      subject: subjectUser,
      text: bodyUser
    });

    // Enviar correo al administrador
    await resend.emails.send({
      from: 'Web AVES <hola@aveixamplesbd.com>',
      to: 'secretaria@aveixamplesbd.com',
      subject: subjectAdmin,
      text: bodyAdmin
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error('Error in /api/join:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
