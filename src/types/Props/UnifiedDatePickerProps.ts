import {Control, FieldErrors, FieldValues, Path} from "react-hook-form";

export interface UnifiedDatePickerProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    placeholder?: string;
    control: Control<T>;
    rules?: object;
    errors?: FieldErrors<T>;
    minYear?: number;
    maxYear?: number;
    maxDate?: Date;
    minDate?: Date;
    className?: string;
    variant?: 'past' | 'future' | 'custom';
}
