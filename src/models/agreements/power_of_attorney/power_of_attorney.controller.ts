
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
import { PowerOfAttorneyService } from './power_of_attorney.service';


@Controller("power_of_attorney")
export class PowerOfAttorneyController {
  constructor(private readonly powerOfAttorney: PowerOfAttorneyService) { }

  @Post()
  @UseInterceptors(FilesInterceptor("relevant_documents"))
  create(
    @Body() create: CreateDto,
    @UploadedFiles(new FileSizeValidationPipe()) files: Express.Multer.File[],
  ) {
    return this.powerOfAttorney.create(create, files);
  }

  @Get()
  findAll() {
    return this.powerOfAttorney.findAll();
  }

  @Get(":id")
  findOne(@Param('id') id: number) {
    return this.powerOfAttorney.findOne(+id);
  }

  @Patch(":id")
  update(@Param('id') id: number, @Body() update: UpdateTdo) {
    return this.powerOfAttorney.update(+id, update);
  }

  @Delete(":id")
  delete(@Param('id') id: number) {
    return this.powerOfAttorney.delete(+id);
  }
}
