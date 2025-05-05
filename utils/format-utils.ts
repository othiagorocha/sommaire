export function formatFileNameAsTitle(fileName: string): string {
  // Remove a extensão (ex: .pdf, .docx, etc.)
  const withoutExtension = fileName.replace(/\.[^\.]+$/, "");

  // Substitui hífens e underlines por espaço, e adiciona espaço entre camelCase
  const withSpaces = withoutExtension.replace(/[-_]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2");

  // Capitaliza cada palavra
  return withSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
    .trim();
}
