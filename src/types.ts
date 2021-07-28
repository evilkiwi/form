import type { ComputedRef, WritableComputedRef } from 'vue';
import type { RuleItem, ValidateError } from 'async-validator';

export type DefaultFields = Record<string, unknown>;

export interface Options<Fields extends DefaultFields> {
    defaults?: Partial<FieldValues<Fields>>;
    validationMode?: 'change'|'submit';
}

export interface FieldOptions extends RuleItem {

}

export type FieldValues<Fields extends DefaultFields> = {
    [K in keyof Fields]: Fields[K];
}

export interface Field<T> {
    errors: ComputedRef<ValidateError[]>;
    error: ComputedRef<ValidateError|null>;
    hasError: ComputedRef<boolean>;
    setError: (text: string) => void;
    clearError: () => void;
    value: WritableComputedRef<T>;
}
