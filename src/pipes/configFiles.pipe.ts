import {
    ArgumentMetadata,
    Injectable,
    PipeTransform,
    Logger,
} from '@nestjs/common';

@Injectable()
export class ConfigFilesPipe implements PipeTransform {
    private readonly logger = new Logger(ConfigFilesPipe.name);

    transform(value: any, metadata: ArgumentMetadata) {
        this.logger.log(ConfigFilesPipe.name, value, metadata);
      
        console.log({value})
    }
}
