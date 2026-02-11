interface WhatsAppMessage {
  to: string
  template: string
  parameters?: string[]
}

export async function sendWhatsAppMessage({ to, template, parameters }: WhatsAppMessage) {
  const token = process.env.WHATSAPP_TOKEN
  const phoneId = process.env.WHATSAPP_PHONE_ID

  if (!token || !phoneId) {
    console.log('WhatsApp not configured')
    return { success: false, error: 'WhatsApp not configured' }
  }

  // Format phone number (remove +, spaces, dashes)
  const formattedPhone = to.replace(/[\s\-\+]/g, '')

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${phoneId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: formattedPhone,
          type: 'template',
          template: {
            name: template,
            language: { code: 'ru' },
            components: parameters
              ? [
                  {
                    type: 'body',
                    parameters: parameters.map((text) => ({ type: 'text', text })),
                  },
                ]
              : undefined,
          },
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('WhatsApp API error:', data)
      return { success: false, error: data }
    }

    console.log('WhatsApp message sent:', data)
    return { success: true, data }
  } catch (error) {
    console.error('WhatsApp error:', error)
    return { success: false, error }
  }
}

// Send text message (for testing/simple messages)
export async function sendWhatsAppText(to: string, message: string) {
  const token = process.env.WHATSAPP_TOKEN
  const phoneId = process.env.WHATSAPP_PHONE_ID

  if (!token || !phoneId) {
    console.log('WhatsApp not configured')
    return { success: false, error: 'WhatsApp not configured' }
  }

  const formattedPhone = to.replace(/[\s\-\+]/g, '')

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${phoneId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: formattedPhone,
          type: 'text',
          text: { body: message },
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('WhatsApp API error:', data)
      return { success: false, error: data }
    }

    return { success: true, data }
  } catch (error) {
    console.error('WhatsApp error:', error)
    return { success: false, error }
  }
}
