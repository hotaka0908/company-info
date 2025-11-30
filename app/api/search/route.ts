import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import companyData from '@/data/company-info.json';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: '質問を入力してください' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI APIキーが設定されていません。.envファイルにOPENAI_API_KEYを設定してください。' },
        { status: 500 }
      );
    }

    const companyInfo = JSON.stringify(companyData, null, 2);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `あなたは会社情報アシスタントです。以下の会社情報に基づいて、ユーザーの質問に親切かつ正確に回答してください。

会社情報:
${companyInfo}

回答する際の注意点:
- 会社情報に含まれる内容のみを使用して回答してください
- 簡潔で分かりやすい日本語で回答してください
- 具体的な数字や事例がある場合は積極的に含めてください
- 情報が不足している場合は、その旨を正直に伝えてください
- 丁寧な言葉遣いを心がけてください`,
        },
        {
          role: 'user',
          content: query,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const answer = completion.choices[0]?.message?.content || '回答を生成できませんでした。';

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'AI検索中にエラーが発生しました。APIキーが正しく設定されているか確認してください。' },
      { status: 500 }
    );
  }
}
