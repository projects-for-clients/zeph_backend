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
import { ApiConsumes } from '@nestjs/swagger';
import { TenantsService } from './tenants.service';
import { TenantDto } from './dto';
import { ParseFormDataJsonPipe } from 'src/pipes/parseFormDataJson.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { imgConfig } from 'src/config/img.config';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: imgConfig.maxFileSize },
    }),
  )
  async createProductByAdmin(
    @Body(
      new ParseFormDataJsonPipe({ except: ['image'] }),
      new ValidationPipe(),
    )
    createDto: TenantDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    console.log(`createDto`, createDto, `image`, image);
  }

  // @Post()
  // create(@Headers() headers, @Body() tenantDto: TenantDto) {
  //   console.log({ headers });
  //   return this.tenantsService.create(tenantDto);
  // }

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
