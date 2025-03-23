export default async function handler(req, res) {
    const { code, sourceLanguage, targetLanguage } = req.body;
  
    const prompt = `Convert the following code from ${sourceLanguage} to ${targetLanguage}:\n\n${code}`;
  
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
      }),
    });
  
    const data = await response.json();
    const translated = data.choices?.[0]?.message?.content || 'No translation available.';
    res.json({ code: translated });
  }
  