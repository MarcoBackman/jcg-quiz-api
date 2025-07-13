import {JCG_TOPIC} from '../../type/jcg-topic-enum'

//공통 단답형 문제
const commonForm = (topic: string, numberOfQuestions: number, difficulty: string, language: string) => {
    return `${numberOfQuestions} 개의 단답식 형식이 답인 ${topic}에 대한 정보처리기사 문제들을 만들어줘. 주어진 숫자만큼 문제를 만들 때 중복 답이 없게 만들어줘.
        Difficulty: ${difficulty || 'medium'}.
        Topics: ${topic} - '정보처리기사 주제'}.
        Language: ${language}.
        For each question, provide:
        - a unique 'id' (e.g., "dp_q_001")
        - 'question' 랜덤으로 선택된 문제에 대한 최소 두개 이상의 설명글이며 난이도에 따라 답이 유추가 가능하다
        - 'description' (a brief introductory context or scenario for the question)
        - 'correctAnswer' (the correct answer from the options)
        - 'explanation' (a detailed explanation for the correct answer).
        Ensure the 'correctAnswer' is always from 정보처리기사 범위 내용.
        Format the response as a JSON object with a 'questions' array.`;
}

//DB 설계
export class DbArchitechingPrompt {

    static getPromptMessage(numberOfQuestions: number, difficulty: string, language: string): string {
        const topic: string = JCG_TOPIC.DB_ARCHITECTURE;
        return commonForm(topic, numberOfQuestions, difficulty, language);
    }
}

//다지인 패턴 다이어 그램 종류
export class DesignPatternPrompt {

    static getPromptMessage(numberOfQuestions: number, difficulty: string, language: string): string {
        const topic: string = JCG_TOPIC.DESIGN_PATTERN;
        return commonForm(topic, numberOfQuestions, difficulty, language);
    }
}

//소프트웨어 다이어 그램 종류
export class SoftwareDiagramPrompt {
    
    static getPromptMessage(numberOfQuestions: number, difficulty: string, language: string): string {
        const topic: string = JCG_TOPIC.SOFTWARE_DIAGRAM;
        return commonForm(topic, numberOfQuestions, difficulty, language);
    }
}

//통합 테스트 문제
export class IntegrationTestPrompt {

    static getPromptMessage(numberOfQuestions: number, difficulty: string, language: string): string {
        const topic: string = JCG_TOPIC.INTEGRATION_TEST;
        return commonForm(topic, numberOfQuestions, difficulty, language)
    }
}

 //모듈 응집도, 결합도
export class ModuleCouplingCohesionPrompt {

    static getPromptMessage(numberOfQuestions: number, difficulty: string, language: string): string {
        const topic: string = JCG_TOPIC.MODULE_COUPLING_COHESION;
        return commonForm(topic, numberOfQuestions, difficulty, language)
    }
}

//소프트웨어 개발 모델
export class SoftwareDevelopmentModelPrompt {

    static getPromptMessage(numberOfQuestions: number, difficulty: string, language: string): string {
        const topic: string = JCG_TOPIC.SOFTWARE_DEVELOPMENT_MODEL;
        return commonForm(topic, numberOfQuestions, difficulty, language)
    }
}

//테스팅 기법
export class TestingPrompt {

    static getPromptMessage(numberOfQuestions: number, difficulty: string, language: string): string {
        const topic: string = JCG_TOPIC.TESTING_TYPES;
        return commonForm(topic, numberOfQuestions, difficulty, language)
    }
}