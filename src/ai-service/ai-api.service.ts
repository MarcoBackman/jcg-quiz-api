import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ServerConfig } from '../config/config'; 

@Injectable()
export class AiApiService {
  private readonly aiApiBaseUrl: string;
  private readonly aiAgent: string; // Add aiAgent property
  private readonly aiApiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly serverConfig: ServerConfig, // Renamed from aiConfig for clarity based on your provided code
  ) {
    this.aiApiBaseUrl = this.serverConfig.aiApiBaseUrl;
    this.aiAgent = this.serverConfig.aiAgent;
    this.aiApiKey = this.serverConfig.aiApiKey;
  }


  async callGeminiApi(prompt: string, generationConfig: any = {}): Promise<any> {
    const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory, generationConfig };

    // Construct the API URL to match the curl command:
    // Base URL + Model Name + :generateContent
    const apiUrl = `${this.aiApiBaseUrl}${this.aiAgent}:generateContent`;

    try {
      const response = await firstValueFrom(
        this.httpService.post(apiUrl, payload, {
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': this.aiApiKey, // API Key in header as per curl command
          }
        })
      );
      const result = response.data;

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        // If structured response is expected, parse JSON
        if (generationConfig.responseMimeType === "application/json") {
          return JSON.parse(text);
        }
        return { text: text }; // Return as a simple object if not JSON
      } else {
        console.error("AI API response structure unexpected:", result);
        throw new Error("Failed to get valid response from AI API.");
      }
    } catch (error) {
      console.error("Error calling AI API:", error.response?.data || error.message);
      throw new Error("Failed to communicate with AI service.");
    }
  }
}