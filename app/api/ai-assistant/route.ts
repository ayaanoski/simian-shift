import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: "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",
})

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'OpenAI API key not configured' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  const { prompt } = await req.json()

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
    })

    return new Response(
      JSON.stringify({ message: completion.choices[0]?.message?.content?.trim() }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error: any) {
    console.error(`Error with OpenAI API request: ${error.message}`)
    return new Response(
      JSON.stringify({ error: 'An error occurred during your request.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
