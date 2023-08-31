import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { createDto, updateDto } from './dto';
import { LoanService } from './loan.service';
import { ConvertTypePipe } from 'src/pipes/convertType.pipe';


@UsePipes(
  new ConvertTypePipe([
    {
      key: "amount",
      toType: "number",
    },
  ]),

)

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) { }

  @Post()
  create(@Body() createLeaseDto: createDto) {
    return this.loanService.create(createLeaseDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.loanService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.loanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLeaseDto: updateDto) {
    return this.loanService.update(+id, updateLeaseDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.loanService.delete(+id);
  }
}
