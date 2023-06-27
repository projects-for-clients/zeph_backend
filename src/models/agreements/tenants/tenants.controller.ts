import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Headers,
	UseInterceptors,
	ValidationPipe,
	UploadedFile,
	UsePipes,
	UploadedFiles,
} from "@nestjs/common";
import { ApiConsumes } from "@nestjs/swagger";
import { TenantsService } from "./tenants.service";
import { TenantDto } from "./dto";
import { ParseFormDataJsonPipe } from "src/pipes/parseFormDataJson.pipe";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { imgConfig } from "src/config/img.config";
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
		@UploadedFiles() files: Array<Express.Multer.File>,
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
