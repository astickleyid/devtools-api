export default async function handler(req, res) {
    const { code, language } = req.body;
  
    const prompt = `Explain what this ${language} code does:\n\n${code}`;
  
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
      }),
    });
  
    const data = await response.json();
    const explanation = data.choices?.[0]?.message?.content || 'No explanation available.';
    res.json({ explanation });
  }
  