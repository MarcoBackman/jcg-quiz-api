import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Category } from './type/type.category';
import {JCG_TOPIC} from './type/jcg-topic-enum';

@ApiTags('Common-controller')
@Controller('main')
export class MainController {

    private readonly categories: Category[] = [
        {
        id: '1',
        name: JCG_TOPIC.DB_ARCHITECTURE,
        description: JCG_TOPIC.DB_ARCHITECTURE,
        difficulty: 'Medium',
        },
        {
          id: '2',
          name: JCG_TOPIC.DESIGN_PATTERN,
          description: JCG_TOPIC.DESIGN_PATTERN,
          difficulty: 'Hard',
        },
        {
          id: '3',
          name: JCG_TOPIC.SOFTWARE_DIAGRAM,
          description: JCG_TOPIC.SOFTWARE_DIAGRAM,
          difficulty: 'Medium', 
        },
        {
          id: '4',
          name: JCG_TOPIC.INTEGRATION_TEST,
          description: JCG_TOPIC.INTEGRATION_TEST,
          difficulty: 'Medium', 
        },
        {
          id: '5',
          name: JCG_TOPIC.MODULE_COUPLING_COHESION,
          description: JCG_TOPIC.MODULE_COUPLING_COHESION,
          difficulty: 'Medium', 
        },
        {
          id: '6',
          name: JCG_TOPIC.SOFTWARE_DEVELOPMENT_MODEL,
          description: JCG_TOPIC.SOFTWARE_DEVELOPMENT_MODEL,
          difficulty: 'EASY', 
        },
        {
          id: '7',
          name: JCG_TOPIC.TESTING_TYPES,
          description: JCG_TOPIC.TESTING_TYPES,
          difficulty: 'HARD', 
        },
    ];


    @Get('get-jcg-subject-categories')
    @ApiOperation({summary: 'Main controller to get supported 정보처리기사 categories'})
    @ApiResponse({
        status: 200,
        description: 'list of 정보처리기사 quiz categories',
    })
    async getQuizCategories(): Promise<Category[]> {
        return this.categories;
    }



}