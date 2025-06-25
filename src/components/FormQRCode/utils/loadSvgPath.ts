export const loadSvgPath = async (path: string): Promise<string> => {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load SVG path: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Error loading SVG path:", error);
    throw error;
  }
};
