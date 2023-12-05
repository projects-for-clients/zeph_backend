import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ConvertTypePipe } from 'src/pipes/convertType.pipe';
import { FileSizeValidationPipe } from 'src/pipes/fileSize.pipe';
import { createDto, updateDto } from './dto';
import { LoanService } from './loan.service';


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
  @UseInterceptors(FilesInterceptor("relevant_documents[]"))
  create(@Body() createLeaseDto: createDto,
    @UploadedFiles(new FileSizeValidationPipe()) files: Express.Multer.File[]) {

    return this.loanService.create(createLeaseDto, files);
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
