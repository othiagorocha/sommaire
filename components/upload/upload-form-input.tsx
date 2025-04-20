import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const UploadFormInput = ({ onSubmit }: UploadFormInputProps) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex items-center justify-end gap-1.5">
        <Input
          id="file"
          name="file"
          type="file"
          accept="application/pdf"
          required
          className=""
        />

        <Button type="submit">Upload your PDF</Button>
      </div>
    </form>
  );
};
