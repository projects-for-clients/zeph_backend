
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

} from "@nestjs/common";

import { FilesInterceptor } from "@nestjs/platform-express";
import { CreateDto, UpdateTdo } from "./dto";
import { SaleService } from "./sale.service";

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
@Controller("sale")
export class SaleController {
  constructor(private readonly saleService: SaleService) { }

  @Post()
  @UseInterceptors(FilesInterceptor("relevant_documents[]"))
  create(
    @Body() saleDto: CreateDto,
    @UploadedFiles(new FileSizeValidationPipe()) files: Express.Multer.File[],
  ) {
    return this.saleService.create(saleDto, files);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.saleService.findAll(query);
  }

  @Get(":id")
  findOne(@Param('id') id: number) {
    return this.saleService.findOne(+id);
  }

  @Patch(":id")
  update(@Param('id') id: number, @Body() updateSaleDto: UpdateTdo) {
    return this.saleService.update(+id, updateSaleDto);
  }

  @Delete(":id")
  delete(@Param('id') id: number) {
    return this.saleService.delete(+id);
  }
}
