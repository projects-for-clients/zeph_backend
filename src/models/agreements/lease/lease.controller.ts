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
import { LeaseService } from './lease.service';

@UsePipes(
  new ConvertTypePipe([
    {
      key: "amount",
      toType: "number",
    },
  ]),

)

@Controller('lease')
export class LeaseController {
  constructor(private readonly leaseService: LeaseService) { }

  @Post()
  @UseInterceptors(FilesInterceptor("relevant_documents[]"))
  create(
    @Body() create: createDto,
    @UploadedFiles(new FileSizeValidationPipe()) files: Express.Multer.File[],
  ) {
    return this.leaseService.create(create, files);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.leaseService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.leaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLeaseDto: updateDto) {
    return this.leaseService.update(+id, updateLeaseDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.leaseService.delete(+id);
  }
}
