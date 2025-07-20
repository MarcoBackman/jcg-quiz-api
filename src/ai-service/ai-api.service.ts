import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ServerConfig } from '../config/config'; // Make sure this path is correct

@Injectable()
export class AiApiService {
  private readonly aiApiBaseUrl: string;
  private readonly aiAgent: string; // e.g., 'gemini-pro', 'gemini-1.5-pro-latest'
  private readonly aiApiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly serverConfig: ServerConfig,
  ) {
    this.aiApiBaseUrl = this.serverConfig.aiApiBaseUrl;
    this.aiAgent = this.serverConfig.aiAgent;
    this.aiApiKey = this.serverConfig.aiApiKey;

    // --- TEMPORARY DEBUGGING LOGS (REMOVE OR SECURE IN PRODUCTION) ---
    console.log(`[AiApiService] aiApiBaseUrl: ${this.aiApiBaseUrl}`);
    console.log(`[AiApiService] aiAgent: ${this.aiAgent}`);
    const keyLength = this.aiApiKey ? this.aiApiKey.length : 0;
    const keyPrefix = this.aiApiKey ? this.aiApiKey.substring(0, 5) : 'N/A';
    console.log(`[AiApiService] AI_API_KEY length: ${keyLength}`);
    console.log(`[AiApiService] AI_API_KEY prefix: ${keyPrefix}...`);
    // --- END TEMPORARY DEBUGGING LOGS ---
  }

  /**
   * Calls the Gemini API with a given prompt and generation configuration.
   * Ensures no conversation history is passed unless explicitly added to systemInstruction.
   *
   * @param userPrompt The main user query for this turn.
   * @param generationConfig Configuration for text generation (e.g., temperature, topK, responseMimeType).
   * @param systemInstruction An optional string for a system-level instruction that applies to this single request.
   * This is the ideal place for meta-instructions about formatting or behavior.
   * @returns The parsed AI response.
   */
  async callGeminiApi(
    userPrompt: string,
    generationConfig: any = "responseMimeType",
    systemInstruction?: string, // Added systemInstruction parameter
  ): Promise<any> {

    console.log("userPrompt:", userPrompt);

    const contents = [{ role: "user", parts: [{ text: userPrompt }] }];

    const payload: any = { contents, generationConfig };

    console.log("contents:", contents);
    console.log("payload:", payload);

    // Add systemInstruction to the payload if provided
    if (systemInstruction) {
      payload.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    const apiUrl = `${this.aiApiBaseUrl}${this.aiAgent}:generateContent?key=${this.aiApiKey}`;

    // If using 'X-goog-api-key' header (more secure), the URL should be just:
    // const apiUrl = `${this.aiApiBaseUrl}${this.aiAgent}:generateContent`;

    try {
      const response = await firstValueFrom(
        this.httpService.post(apiUrl, payload, {
          headers: {
            'Content-Type': 'application/json',
            // 'X-goog-api-key': this.aiApiKey, // Only needed if not in URL
          }
        })
      );
      const result = response.data;

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {

        const text = result.candidates[0].content.parts[0].text;

        // More robust JSON parsing
        if (generationConfig.responseMimeType === "application/json") {
          try {
            // Trim whitespace and potential markdown backticks
            const cleanedText = text.trim().replace(/^```json\s*|```\s*$/g, '');
            return JSON.parse(cleanedText);
          } catch (jsonError) {
            console.error("AI API returned non-parseable JSON:", text);
            console.error("JSON parsing error:", jsonError);
            throw new Error("Failed to parse AI response as JSON.");
          }
        }
        return { text: text }; // Return as a simple object if not JSON
      } else {
        console.error("AI API response structure unexpected or empty candidates:", JSON.stringify(result, null, 2));
        throw new Error("Failed to get valid content from AI API response.");
      }
    } catch (error) {
      // Log full error response from Axios if available
      if (error.response) {
        console.error("Error calling AI API. Status:", error.response.status);
        console.error("Error data:", error.response.data);
      } else {
        console.error("Error calling AI API:", error.message);
      }
      throw new Error(`Failed to communicate with AI service: ${error.message}`);
    }
  }
}