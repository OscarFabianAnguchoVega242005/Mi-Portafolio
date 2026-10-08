interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string; // tu email donde recibir los mensajes
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { name, email, subject, message } = await context.request.json();
    
    // Validación básica
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'Todos los campos son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Email inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Enviar con Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to: [context.env.CONTACT_EMAIL],
        subject: `Nuevo mensaje del portfolio: ${subject}`,
        html: `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Asunto:</strong> ${subject}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
        reply_to: email,
      }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('Resend error:', error);
      return new Response(JSON.stringify({ error: 'Error enviando email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ error: 'Error interno' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}