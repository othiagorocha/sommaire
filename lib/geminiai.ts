import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { text } from "stream/consumers";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateSummaryFromGemini(pdfText: string) {
  try {
    const model = genAi.getGenerativeModel({
      model: "gemini-1.5-pro-002",
      generationConfig: { temperature: 0.7, maxOutputTokens: 1500 },
    });

    const prompt = {
      contents: [
        {
          role: "user",
          parts: [
            { text: SUMMARY_SYSTEM_PROMPT },
            {
              text: `\n\nTransforme esse documento em um resumo envolvente e fácil de ler, com emojis contextualmente relevantes, em PT-BR e no formato markdown \n\n${pdfText}`,
            },
          ],
        },
      ],
    };

    const result = await model.generateContent(prompt);
    const response = result.response;

    if (!response.text) {
      throw new Error("No response from Gemini API");
    }

    return response.text();
  } catch (error: any) {
    if (error.status === 429) {
      throw new Error("API rate limit exceeded. Please try again later.");
    }

    throw new Error("Something went wrong. Please try again later", {
      cause: error,
    });
  }
}
