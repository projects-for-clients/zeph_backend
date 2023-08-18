
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
} from "@nestjs/common";

import { FilesInterceptor } from "@nestjs/platform-express";
import { CreateDto, UpdateTdo } from "./dto";

import { FileSizeValidationPipe } from "src/pipes/fileSize.pipe";
import { DeedOfAssignmentService } from './deed_of_assignment.service';


@Controller("deed_of_assignment")
export class DeedOfAssignmentController {
  constructor(private readonly deedOfAssignment: DeedOfAssignmentService) { }

  @Post()
  @UseInterceptors(FilesInterceptor("relevant_documents"))
  create(
    @Body() create: CreateDto,
    @UploadedFiles(new FileSizeValidationPipe()) files: Express.Multer.File[],
  ) {
    return this.deedOfAssignment.create(create, files);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.deedOfAssignment.findAll(query);
  }

  @Get(":id")
  findOne(@Param('id') id: number) {
    return this.deedOfAssignment.findOne(+id);
  }

  @Patch(":id")
  update(@Param('id') id: number, @Body() update: UpdateTdo) {
    return this.deedOfAssignment.update(+id, update);
  }

  @Delete(":id")
  delete(@Param('id') id: number) {
    return this.deedOfAssignment.delete(+id);
  }
}
