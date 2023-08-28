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
import { CreateDto, UpdateTenancyTdo } from "./dto";
import { TenancyService } from "./tenancy.service";

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
@Controller("tenancy")
export class TenancyController {
	constructor(private readonly tenancyService: TenancyService) { }

	@Post()
	@UseInterceptors(FilesInterceptor("relevant_documents[]"))
	create( 
		@Body() tenancyDto: any,
		@UploadedFiles(new FileSizeValidationPipe()) files: Express.Multer.File[]) {
			
		return this.tenancyService.create(tenancyDto, files);
	}

	@Get()
	findAll(@Query() query: any) {
		
		return this.tenancyService.findAll(query);
	}

	@Get(":id")
	findOne(@Param('id') id: number) {
		return this.tenancyService.findOne(+id);
	}

	@Patch(":id")
	update(@Param('id') id: number, @Body() updatetenancyDto: UpdateTenancyTdo) {

		console.log(updatetenancyDto, id);

		// return this.tenancyService.update(+id, updatetenancyDto);
	}

	@Delete(":id")
	delete(@Param('id') id: number) {
		return this.tenancyService.delete(+id);
	}
}
