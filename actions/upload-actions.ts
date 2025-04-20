"use server";

import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";

export type UploadResponse = [
  {
    serverData: {
      userId: string;
      file: {
        url: string;
        name: string;
      };
    };
  }
];

export async function generatePdfSummary(uploadResponse: UploadResponse) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);

    const summary = await generateSummaryFromGemini(pdfText);
    return {
      success: true,
      message: "File uploaded successfully",
      data: {
        summary,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
}
