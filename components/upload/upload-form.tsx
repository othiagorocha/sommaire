"use client";
import React from "react";
import { z } from "zod";
import { UploadFormInput } from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generatePdfSummary, storePdfSummaryAction, UploadResponse } from "@/actions/upload-actions";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size < 20 * 1024 * 1024, "File size must be less than 20MB")
    .refine((file) => file.type.startsWith("application/pdf"), "File must be a PDF"),
});

export const UploadForm = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const { startUpload, isUploading, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("Uploaded successfully!");
      toast.dismiss("uploading");
    },
    onUploadProgress: () => {
      toast.loading("Uploading...", { id: "uploading" });
    },
    onUploadError: (err) => {
      toast.error(err.message ?? "Something went wrong");
    },
    onUploadBegin: () => {
      console.log("Upload started!");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    // validating the fields
    const validatedFields = schema.safeParse({ file });
    console.log(validatedFields);

    if (!validatedFields.success) {
      toast.error(validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file");
      return;
    }
    // upload the file to uploading
    const resp = await startUpload([file]);
    if (!resp) {
      toast.error("Something went wrong");
      toast.dismiss("uploading");
      return;
    }
    // parse the pdf using lang chain

    const transformedResp = resp.map((file) => ({
      serverData: {
        userId: file.serverData.userId,
        file: {
          url: file.ufsUrl,
          name: file.name || "unknown", // Provide a default name if not available
        },
      },
    }));
    const { data, message, success } = await generatePdfSummary(transformedResp as UploadResponse);
    console.log(data);

    if (data?.summary) {
      const storeResult = await storePdfSummaryAction({
        userId: resp[0].serverData.userId,
        fileUrl: resp[0].ufsUrl,
        summary: data.summary,
        title: data.title,
        fileName: file.name,
      });

      toast.success("✨ Summary generated successfully! ✨");

      formRef.current?.reset();
    }
  };

  return (
    <div className='flex flex-col gap-8 w-full max-w-2xl mx-auto'>
      <UploadFormInput isLoading={isUploading} onSubmit={handleSubmit} />
    </div>
  );
};
