import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { QueryProblemDto, SubmitProblemDto } from './problems.dto';
import { ProblemsService } from './problems.service';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get()
  findAll(@Query() query: QueryProblemDto) {
    return this.problemsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemsService.findOne(id);
  }

  @Post('submit')
  submit(@Body() dto: SubmitProblemDto) {
    return this.problemsService.submit(dto);
  }
}
