import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Common-controller')
@Controller('main')
export class MainController {

    @Get('get-jcg-subject-categories')
    @ApiOperation({summary: 'Main controller to get supported 정보처리기사 categories'})
    @ApiResponse({
        status: 200,
        description: 'list of 정보처리기사 quiz categories',
    })
    async getQuizCategories(): Promise<string[]> {

        return ['design-pattern']
    }

}