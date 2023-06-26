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
} from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantDto } from './dto';
import { ParseFormDataJsonPipe } from 'src/pipes/parseFormDataJson.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  // @Post()
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     limits: { fileSize: imgurConfig.fileSizeLimit },
  //   }),
  // )
  // async createProductByAdmin(
  //   @Body(
  //     new ParseFormDataJsonPipe({ except: ['image', 'categoryIds'] }),
  //     new ValidationPipe(),
  //   )
  //   createDto: TenantDto,
  //   @UploadedFile() image: Express.Multer.File,
  // ) {
  //   console.log(`createDto`, createDto);
  // }

  @Post()
  create(@Headers() headers, @Body() tenantDto: TenantDto) {
    console.log({ headers });
    return this.tenantsService.create(tenantDto);
  }

  @Get()
  findAll() {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenantDto: TenantDto) {
    return this.tenantsService.update(+id, updateTenantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantsService.remove(+id);
  }
}
