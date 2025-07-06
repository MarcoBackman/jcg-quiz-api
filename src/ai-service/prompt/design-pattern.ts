export class DesignPatternPrompt {

    static getPromptMessage(numberOfQuestions: number, difficulty: string, language: string): string {
      const prompt = `${numberOfQuestions} 개의 단답식 형식이 답인 디자인 패턴 정보처리기사 문제들을 만들어줘. 주어진 숫자만큼 문제를 만들 때 중복 답이 없게 만들어줘.
        Difficulty: ${difficulty || 'medium'}.
        Topics: 디자인 패턴 - '정보처리기사 주제'}.
        Language: ${language}.
        For each question, provide:
        - a unique 'id' (e.g., "dp_q_001")
        - 'question' 랜덤으로 선택된 디자인 패턴에 대한 최소 두개 이상의 설명글이며 난이도에 따라 답이 유추가 가능하다
        - 'description' (a brief introductory context or scenario for the question)
        - 'correctAnswer' (the correct answer from the options)
        - 'explanation' (a detailed explanation for the correct answer).
        Ensure the 'correctAnswer' is always one of the 'options'.
        Format the response as a JSON object with a 'questions' array.`;
      return prompt;
    }

}