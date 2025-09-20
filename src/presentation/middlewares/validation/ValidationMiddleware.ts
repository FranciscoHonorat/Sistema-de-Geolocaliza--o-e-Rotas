interface ValidationRule {
    required?: boolean;
    type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validator?: (value: any) => boolean;
    message?: string;
}

interface ValidationSchema {
    [fieldName: string]: ValidationRule;
}