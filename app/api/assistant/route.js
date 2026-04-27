export async function POST(request) {
  try {
    const body = await request.json();
    const message = String(body?.message || '').trim();
    const topic = String(body?.topic || 'Data Analysis');

    if (!message) {
      return Response.json({ reply: 'Please type a question first.' }, { status: 400 });
    }

    const reply = `AI Assistant: For ${topic}, start by identifying the dataset, business question, metric, method, result, and final business action. Your question was: "${message}".`;

    return Response.json({ reply });
  } catch (error) {
    return Response.json({ reply: 'Server error. Please try again.' }, { status: 500 });
  }
}
