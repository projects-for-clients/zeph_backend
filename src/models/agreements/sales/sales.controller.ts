
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

import { SalesService } from "./sales.service";
import { CreateDto, UpdateTdo } from "./dto";
import { FilesInterceptor } from "@nestjs/platform-express";

import { ConvertTypePipe } from "src/pipes/convertType.pipe";
import { FileSizeValidationPipe } from "src/pipes/fileSize.pipe";

@UsePipes(
  new ConvertTypePipe([
    {
      key: "amount",
      toType: "number",
    },
  ]),

)
@Controller("sales")
export class SalesController {
  constructor(private readonly salesService: SalesService) { }

  @Post()
  @UseInterceptors(FilesInterceptor("relevant_documents"))
  create(
    @Body() saleDto: CreateDto,
    @UploadedFiles(new FileSizeValidationPipe()) files: Array<Express.Multer.File>,
  ) {
    return this.salesService.create(saleDto, files);
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(":id")
  findOne(@Param('id') id: number) {
    return this.salesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param('id') id: number, @Body() updateSaleDto: UpdateTdo) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @Delete(":id")
  delete(@Param('id') id: number) {
    return this.salesService.delete(+id);
  }
}
