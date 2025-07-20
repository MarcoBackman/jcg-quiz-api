import {JCG_TOPIC} from '../../type/jcg-topic-enum'

//공통 단답형 문제
const commonForm = (topic: string, numberOfQuestions: number, difficulty: string, language: string) => {
    return `${numberOfQuestions} 개의 단답식 형식이 답인 ${topic}에 대한 정보처리기사 문제들을 만들어줘. 주어진 숫자만큼 문제를 만들 때 중복 답이 없게 만들어주고 순서를 썪어줘 줘.
        Difficulty: ${difficulty || 'medium'}.
        Topics: ${topic} - '정보처리기사 주제'}.
        Language: ${language}.
        For each question, provide:
        - a unique 'id' (e.g., "dp_q_001")
        - 'question' 랜덤으로 선택된 문제에 대한 최소 두줄 이상의 설명글이며 난이도에 따라 답이 유추가 가능하다
        - 'description' (a brief introductory context or scenario for the question)
        - 'correctAnswer' (the correct answer from the options)
        - 'explanation' (a detailed explanation for the correct answer).
        Ensure the 'correctAnswer' is always from 정보처리기사 범위 내용.
        Format the response as a JSON object with a 'questions' array.`;
}

const topicGenerationPrompt = (category: string, language: string) => {
    return `Disregard all historical prompt used before. Given the context of '정보처리기사' (Information Processing Engineer) exam in ${language},
    for the topic category: "${category}".

    Please identify and list the distinct keywords or concepts that commonly appear as short-answer questions.
    
    Ensure all keywords/concepts are strictly within the scope of the '정보처리기사' curriculum.

    Return the response as an array with keywords as values only. Do not return any other information

    Get 25 max keywords that frequently comes out of the test
    
    Example array format:
    ["keyword 1","keyword 2","another keyword"]
    `;
}

const RandomizedQuizRequestForm = (keywords: Array<string>, topic:string, numberOfQuestions: number, difficulty: string, language: string) => {
    return `${numberOfQuestions} 개의 단답식 형식이 답인 ${keywords}에 대한 정보처리기사 문제들을 주어진 순서대로 만들어줘. 주어진 숫자만큼 문제를 만들 때 중복 답이 없게 만들어 줘.
        Difficulty: ${difficulty || 'medium'}.
        Topic: ${topic} - '정보처리기사 부류'}.
        Language: ${language}.
        For each question, provide:
        - a unique 'id' (e.g., "dp_q_001")
        - 'question' 주어진 키워드에 대한 최소 두줄 이상의 설명글이며 난이도에 따라 답이 유추가 가능하다
        - 'description' (a brief introductory context or scenario for the question)
        - 'correctAnswer' (the correct answer from the options)
        - 'explanation' (a detailed explanation for the correct answer).
        Ensure the 'correctAnswer' is always from 정보처리기사 범위 내용.
        Format the response as a list of array separated by comma`;
}


//DB 설계
export class DbArchitechingPrompt {
    static topic: string = JCG_TOPIC.DB_ARCHITECTURE;

    static getDbArchitechTopics(language: string) {
        return topicGenerationPrompt(DbArchitechingPrompt.topic, language);
    }

    static getKeywordBasePromptMessage(keywords: Array<string>, numberOfQuestions: number, difficulty: string, language: string) {
        return RandomizedQuizRequestForm(keywords, DbArchitechingPrompt.topic, numberOfQuestions, difficulty, language);
    }

    static getPromptMessage(numberOfQuestions: number, difficulty: string, language: string): string {
        return commonForm(DbArchitechingPrompt.topic, numberOfQuestions, difficulty, language);
    }
}

//다지인 패턴 다이어 그램 종류
export class DesignPatternPrompt {
    static topic: string = JCG_TOPIC.DESIGN_PATTERN;

    static getDesignPatternTopics(language: string) {
        return topicGenerationPrompt(DesignPatternPrompt.topic, language);
    }

    static getKeywordBasePromptMessage(keywords: Array<string>, numberOfQuestions: number, difficulty: string, language: string) {
        return RandomizedQuizRequestForm(keywords, DesignPatternPrompt.topic, numberOfQuestions, difficulty, language);
    }

    static getPromptMessage(numberOfQuestions: number, difficulty: string, language: string): string {
        return commonForm(DesignPatternPrompt.topic, numberOfQuestions, difficulty, language);
    }
}

//소프트웨어 다이어 그램 종류
export class SoftwareDiagramPrompt {
    static topic: string = JCG_TOPIC.SOFTWARE_DIAGRAM;

    static getSoftwareDiagramTopics(language: string) {
        return topicGenerationPrompt(SoftwareDiagramPrompt.topic, language);
    }

    static getKeywordBasePromptMessage(keywords: Array<string>, numberOfQuestions: number, difficulty: string, language: string) {
        return RandomizedQuizRequestForm(keywords, SoftwareDiagramPrompt.topic, numberOfQuestions, difficulty, language);
    }

    static getPromptMessage(numberOfQuestions: number, difficulty: string, language: string): string {
        return commonForm(SoftwareDiagramPrompt.topic, numberOfQuestions, difficulty, language);
    }
}

//통합 테스트 문제
export class IntegrationTestPrompt {
    static topic: string = JCG_TOPIC.INTEGRATION_TEST;

    static getIntegrationTestTopics(language: string) {
        return topicGenerationPrompt(IntegrationTestPrompt.topic, language);
    }

    static getKeywordBasePromptMessage(keywords: Array<string>, numberOfQuestions: number, difficulty: string, language: string) {
        return RandomizedQuizRequestForm(keywords, IntegrationTestPrompt.topic, numberOfQuestions, difficulty, language);
    }

    static getPromptMessage(numberOfQuestions: number, difficulty: string, language: string): string {
        return commonForm(IntegrationTestPrompt.topic, numberOfQuestions, difficulty, language)
    }
}

 //모듈 응집도, 결합도
export class ModuleCouplingCohesionPrompt {
    static topic: string = JCG_TOPIC.MODULE_COUPLING_COHESION;

    static getModuleCouplingCohesionTopics(language: string) {
        return topicGenerationPrompt(ModuleCouplingCohesionPrompt.topic, language);
    }

    static getKeywordBasePromptMessage(keywords: Array<string>, numberOfQuestions: number, difficulty: string, language: string) {
        return RandomizedQuizRequestForm(keywords, ModuleCouplingCohesionPrompt.topic, numberOfQuestions, difficulty, language);
    }

    static getPromptMessage(numberOfQuestions: number, difficulty: string, language: string): string {
        return commonForm(ModuleCouplingCohesionPrompt.topic, numberOfQuestions, difficulty, language)
    }
}

//소프트웨어 개발 모델
export class SoftwareDevelopmentModelPrompt {
    static topic: string = JCG_TOPIC.SOFTWARE_DEVELOPMENT_MODEL;

    static getSoftwareDevelopmentModelTopics(language: string) {
        return topicGenerationPrompt(SoftwareDevelopmentModelPrompt.topic, language);
    }

    static getKeywordBasePromptMessage(keywords: Array<string>, numberOfQuestions: number, difficulty: string, language: string) {
        return RandomizedQuizRequestForm(keywords, SoftwareDevelopmentModelPrompt.topic, numberOfQuestions, difficulty, language);
    }

    static getPromptMessage(numberOfQuestions: number, difficulty: string, language: string): string {
        return commonForm(SoftwareDevelopmentModelPrompt.topic, numberOfQuestions, difficulty, language)
    }
}

//테스팅 기법
export class TestingPrompt {
    static topic: string = JCG_TOPIC.TESTING_TYPES;

    static getTestingTopics(language: string) {
        return topicGenerationPrompt(TestingPrompt.topic, language);
    }

    static getKeywordBasePromptMessage(keywords: Array<string>, numberOfQuestions: number, difficulty: string, language: string) {
        return RandomizedQuizRequestForm(keywords, TestingPrompt.topic, numberOfQuestions, difficulty, language);
    }

    static getPromptMessage(numberOfQuestions: number, difficulty: string, language: string): string {
        return commonForm(TestingPrompt.topic, numberOfQuestions, difficulty, language)
    }
}