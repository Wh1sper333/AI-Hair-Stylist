
import { GoogleGenAI } from "@google/genai";
import { StylistOptions, GenerationResult, Gender } from "../types";
import { HAIR_STYLES } from "../data/hairStyles";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a hairstyle based on the input image and selected options.
 */
export const generateHairstyle = async (
  base64Image: string,
  options: StylistOptions
): Promise<GenerationResult> => {
  try {
    // Strip header if present
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    // Find the full style object to get the detailed prompt description
    const allStyles = [...HAIR_STYLES[Gender.MALE], ...HAIR_STYLES[Gender.FEMALE]];
    const selectedStyleDef = allStyles.find(s => s.id === options.styleId);
    const stylePrompt = selectedStyleDef ? selectedStyleDef.prompt : options.styleId;

    const prompt = `
      Act as a world-class professional hair stylist and image editor.
      
      Task:
      1. Analyze the face shape of the person in the provided image.
      2. Edit the image to give the person a new hairstyle based on the requests below.
      
      Requirements for the new look:
      - **Target Gender**: ${options.gender}
      - **Hairstyle Style**: ${stylePrompt}
      - **Hair Color**: ${options.color} (Apply this color naturally, respecting lighting)
      
      Fine-tuning Details:
      - **Bangs/Fringe**: ${options.refinements.bangs}
      - **Hair Volume/Density**: ${options.refinements.volume}
      - **Root Lift/Fluffiness**: ${options.refinements.rootLift}
      - **Hair Texture Quality**: ${options.refinements.quality} (Important: Adjust rendering to simulate this hair texture. Soft hair should fall more flat and silky. Coarse hair should hold shape more stiffly.)
      
      Execution Rules:
      - Crucially, ensure the chosen style fits the person's face shape. If the requested bangs or volume don't suit the face shape perfectly, adjust them slightly to look AESTHETICALLY PLEASING while keeping the main style request.
      - PRESERVE the person's facial features, skin tone, and expression exactly. Only change the hair.
      - The output must be photorealistic. High resolution.
      
      Output:
      1. The edited image.
      2. A brief text explanation in **CHINESE (Simplified)** explaining why this specific style and color suits their face shape (e.g., "这款微分碎盖很适合你的鹅蛋脸...").
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: 'image/jpeg',
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        generationConfig: {
          temperature: 0.4, 
        }
      }
    });

    let imageUrl: string | null = null;
    let textAnalysis: string | null = null;

    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        } else if (part.text) {
          textAnalysis = part.text;
        }
      }
    }

    return { imageUrl, textAnalysis };

  } catch (error) {
    console.error("Error generating hairstyle:", error);
    throw error;
  }
};
