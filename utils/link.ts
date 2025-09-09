export function extractPublicId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const publicId = urlObj.searchParams.get("public_id");

    // Decode the URL-encoded value if it exists
    return publicId ? decodeURIComponent(publicId) : null;
  } catch (error) {
    console.error("Invalid URL provided:", error);
    return null;
  }
}
