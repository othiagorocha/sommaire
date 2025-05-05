"use server";

import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
import { getDbConnection } from "./db";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { revalidatePath } from "next/cache";

interface PdfSummaryType {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

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

    const formattedFileName = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: "File uploaded successfully",
      data: {
        title: formattedFileName,
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

type SavedPdfSummary = {
  id: string;
  summary_text: string;
};

async function savePdfSummary({ userId, fileUrl, summary, title, fileName }: PdfSummaryType) {
  // save the summary to the database
  try {
    const sql = await getDbConnection();
    const [savedSummary] = (await sql`INSERT INTO pdf_summaries (
          user_id,
          original_file_url,
          summary_text,
          title,
          file_name
      ) VALUES (
          ${userId},
          ${fileUrl},
          ${summary},
          ${title},
          ${fileName}
      )RETURNING id, summary_text`) as [SavedPdfSummary];

    return savedSummary;
  } catch (error) {
    console.error("Error storing PDF summary:", error);
    throw error;
  }
}

export async function storePdfSummaryAction({ userId, fileUrl, summary, title, fileName }: PdfSummaryType) {
  let savedPdfSummary: SavedPdfSummary | null = null;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    savedPdfSummary = await savePdfSummary({ userId, fileUrl, summary, title, fileName });
    if (!savedPdfSummary) {
      return {
        success: false,
        message: "Error saving PDF summary, please try again...",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }

  revalidatePath(`/summaries/${savedPdfSummary.id}`);

  return {
    success: true,
    message: "PDF summary saved successfully",
    data: {
      id: savedPdfSummary.id,
    },
  };
}
