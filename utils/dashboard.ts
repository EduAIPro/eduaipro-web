export async function downloadImage(url: string, filename = "certificate.jpg") {
  const response = await fetch(url, { mode: "cors" });
  if (!response.ok) throw new Error("Failed to fetch image");
  const blob = await response.blob();
  const blobUrl = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(blobUrl);
}
