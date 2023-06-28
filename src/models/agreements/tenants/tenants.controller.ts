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
	ParseFilePipe,
	MaxFileSizeValidator,

} from "@nestjs/common";

import { TenantsService } from "./tenants.service";
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
@Controller("tenants")
export class TenantsController {
	constructor(private readonly tenantsService: TenantsService) { }

	@Post()
	@UseInterceptors(FilesInterceptor("relevant_documents"))
	create(
		@Body() tenantDto: CreateDto,
		@UploadedFiles(new FileSizeValidationPipe()) files: Array<Express.Multer.File>,
	) {
		return this.tenantsService.create(tenantDto, files);
	}

	@Get()
	findAll() {
		return this.tenantsService.findAll();
	}

	@Get(":id")
	findOne(@Param('id') id: number) {
		return this.tenantsService.findOne(+id);
	}

	@Patch(":id")
	update(@Param('id') id: number, @Body() updateTenantDto: UpdateTdo) {
		return this.tenantsService.update(+id, updateTenantDto);
	}

	@Delete(":id")
	delete(@Param('id') id: number) {
		return this.tenantsService.delete(+id);
	}
}
