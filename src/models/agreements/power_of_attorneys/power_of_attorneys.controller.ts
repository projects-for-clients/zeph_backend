
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";

import { CreateDto, UpdateTdo } from "./dto";
import { FilesInterceptor } from "@nestjs/platform-express";

import { FileSizeValidationPipe } from "src/pipes/fileSize.pipe";
import { PowerOfAttorneysService } from './power_of_attorneys.service';


@Controller("power_of_attorneys")
export class PowerOfAttorneysController {
  constructor(private readonly powerOfAttorneys: PowerOfAttorneysService) { }

  @Post()
  @UseInterceptors(FilesInterceptor("relevant_documents"))
  create(
    @Body() create: CreateDto,
    @UploadedFiles(new FileSizeValidationPipe()) files: Array<Express.Multer.File>,
  ) {
    return this.powerOfAttorneys.create(create, files);
  }

  @Get()
  findAll() {
    return this.powerOfAttorneys.findAll();
  }

  @Get(":id")
  findOne(@Param('id') id: number) {
    return this.powerOfAttorneys.findOne(+id);
  }

  @Patch(":id")
  update(@Param('id') id: number, @Body() update: UpdateTdo) {
    return this.powerOfAttorneys.update(+id, update);
  }

  @Delete(":id")
  delete(@Param('id') id: number) {
    return this.powerOfAttorneys.delete(+id);
  }
}
