
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";

import { FilesInterceptor } from "@nestjs/platform-express";
import { CreateDto, UpdateTdo } from "./dto";

import { FileSizeValidationPipe } from "src/pipes/fileSize.pipe";
import { DeedOfAssignmentsService } from './deed_of_assignment.service';


@Controller("deed_of_assignments")
export class DeedOfAssignmentsController {
  constructor(private readonly DeedOfAssignment: DeedOfAssignmentsService) { }

  @Post()
  @UseInterceptors(FilesInterceptor("relevant_documents"))
  create(
    @Body() create: CreateDto,
    @UploadedFiles(new FileSizeValidationPipe()) files: Array<Express.Multer.File>,
  ) {
    return this.DeedOfAssignment.create(create, files);
  }

  @Get()
  findAll() {
    return this.DeedOfAssignment.findAll();
  }

  @Get(":id")
  findOne(@Param('id') id: number) {
    return this.DeedOfAssignment.findOne(+id);
  }

  @Patch(":id")
  update(@Param('id') id: number, @Body() update: UpdateTdo) {
    return this.DeedOfAssignment.update(+id, update);
  }

  @Delete(":id")
  delete(@Param('id') id: number) {
    return this.DeedOfAssignment.delete(+id);
  }
}