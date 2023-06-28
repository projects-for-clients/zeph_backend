import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UsePipes,
  UploadedFiles,
} from "@nestjs/common";

import { CreateDto, UpdateTdo } from "./dto";
import { FilesInterceptor } from "@nestjs/platform-express";

import { FileSizeValidationPipe } from "src/pipes/fileSize.pipe";
import { DeedOfAssignmentsService } from './deed_of_assignments.service';

@UsePipes(
)
@Controller("deed_of_assignments")
export class TenantsController {
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
