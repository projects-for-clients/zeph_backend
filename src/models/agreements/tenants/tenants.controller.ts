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
} from "@nestjs/common";

import { TenantsService } from "./tenants.service";
import { TenantDto } from "./dto";
import { ParseFormDataJsonPipe } from "src/pipes/parseFormDataJson.pipe";
import { FilesInterceptor } from "@nestjs/platform-express";

import { ConvertTypePipe } from "src/pipes/convertType.pipe";

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
	constructor(private readonly tenantsService: TenantsService) {}

	@Post()
	// @ApiConsumes("multipart/form-data")
	@UseInterceptors(FilesInterceptor("relevant_documents"))
	create(
		@Body(new ParseFormDataJsonPipe({ except: ['relevant_documents'] }))
		tenantDto: TenantDto,
		@UploadedFiles(new ParseFilePipe()) files: Array<Express.Multer.File>,
	) {
		return this.tenantsService.create(tenantDto, files);
	}

	@Get()
	findAll() {
		return this.tenantsService.findAll();
	}

	@Get(":id")
	findOne(@Param('id') id: string) {
		return this.tenantsService.findOne(+id);
	}

	@Patch(":id")
	update(@Param('id') id: string, @Body() updateTenantDto: TenantDto) {
		return this.tenantsService.update(+id, updateTenantDto);
	}

	@Delete(":id")
	remove(@Param('id') id: string) {
		return this.tenantsService.remove(+id);
	}
}
