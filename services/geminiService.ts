
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Always use direct process.env.API_KEY for initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async getAffordabilityInsight(income: number, expenses: number, creditScore: number) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Evaluate the property affordability for a South African user with:
        Monthly Income: R${income}
        Monthly Expenses: R${expenses}
        Credit Score: ${creditScore}
        
        Provide a concise summary of their buying power (max loan amount) and tips for improvement.
        IMPORTANT: Output purely as plain text. Do not use Markdown formatting (no **, ##, or bullet points using *).`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  },

  async getPropertyValuation(propertyDetails: any) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Act as a South African property valuer. Estimate the value and market demand for this property:
        Location: ${propertyDetails.location}
        Type: ${propertyDetails.type}
        Beds: ${propertyDetails.beds}
        Features: ${propertyDetails.features.join(', ')}
        
        Provide: 
        1. Estimated Price Range (ZAR)
        2. Market Sentiment (High/Medium/Low)
        3. Market Demand Prediction: A brief analysis of future demand trends (next 12 months) for this specific area and property type.
        4. 3 Unique Key Selling Points that distinguish this property.
        
        Ensure all text fields are plain text without markdown symbols.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            estimatedRange: { type: Type.STRING },
            marketSentiment: { type: Type.STRING },
            marketDemandPrediction: { type: Type.STRING, description: "Prediction of future market demand." },
            sellingPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          propertyOrdering: ["estimatedRange", "marketSentiment", "marketDemandPrediction", "sellingPoints"]
        }
      }
    });
    const jsonStr = response.text?.trim() || '{}';
    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse JSON response from Gemini", e);
      return {};
    }
  },

  async getPropertyImprovementTips(propertyDetails: any) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide 5 personalized tips for improving property appeal for a South African home:
        Location: ${propertyDetails.location}
        Type: ${propertyDetails.type}
        Beds: ${propertyDetails.beds}
        Current Features: ${propertyDetails.features.join(', ')}
        
        Focus on:
        - Staging advice (furniture, lighting)
        - Minor renovations (low cost, high impact like painting, fittings)
        - Curb appeal (gardening, entrance)
        
        Return the result as JSON. Ensure strings are plain text without markdown.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tips: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING, description: 'e.g., Staging, Renovation, Curb Appeal' },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  impact: { type: Type.STRING, description: 'High, Medium, Low' }
                }
              }
            },
            summary: { type: Type.STRING }
          }
        }
      }
    });
    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      return { tips: [], summary: "Failed to generate tips." };
    }
  },

  async getChatResponse(history: { role: string; text: string }[], message: string) {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: 'You are PropTransfer, a friendly South African real estate assistant. You help users understand bond applications, conveyancing, and property listings in South Africa. Use local terms like "Bond", "Transfer Duty", "OTP", and "Deeds Office". IMPORTANT: Do not use Markdown formatting (like **, ##) in your responses. Use plain text only.'
      }
    });
    const result = await chat.sendMessage({ message });
    return result.text;
  }
};
