export default async function handler(req, res) {
    const { description } = req.body;
  
    const prompt = `Write a function based on this description:\n\n${description}`;
  
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
    const code = data.choices?.[0]?.message?.content || 'No code generated.';
    res.json({ code });
  }
  