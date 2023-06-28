import {
	ArgumentMetadata,
	Injectable,
	PipeTransform,
	BadRequestException,
} from "@nestjs/common";

@Injectable()
export class ConvertTypePipe implements PipeTransform {
	constructor(private readonly options: Record<"key" | "toType", string>[]) {}

	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	transform(value: any, metadata: ArgumentMetadata) {
		const errors: string[] = [];
		const convertedTypes = this.options.map((option) => {
			const { key, toType } = option;
			if (metadata.type === "body") {
				if (key in value) {
					const numberCheck = toType === "number" && Number(value[key]);

					if (!numberCheck) {
						return errors.push(`${key} is not a ${toType}`);
					}

					return { [key]: numberCheck };
				}
			}
		});

		const updatedValue = {
			...value,
			...convertedTypes.reduce(
				// rome-ignore lint/suspicious/noExplicitAny: <explanation>
				(acc: any, curr: any) => ({
					...acc,
					...curr,
				}),
				{},
			),
		};

		if (errors.length) {
			throw new BadRequestException(errors);
		}

		return { ...updatedValue };
	}
}
