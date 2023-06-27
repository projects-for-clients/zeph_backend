import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { deepParseJson } from "deep-parse-json";
import * as _ from "lodash";

type TParseFormDataJsonOptions = {
	except?: string[];
};

export class ParseFormDataJsonPipe implements PipeTransform {
	constructor(private options?: TParseFormDataJsonOptions) {}

	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	transform(value: any, _metadata: ArgumentMetadata) {
		const { except } = this.options;
		const serializedValue = value;
		const originProperties = {};
		if (except?.length) {
			_.merge(originProperties, _.pick(serializedValue, ...except));
		}

		console.log({ value });

		const deserializedValue = deepParseJson(value);

		return { ...deserializedValue, ...originProperties };
	}
}
