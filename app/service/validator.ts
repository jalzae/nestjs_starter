import { validate, IsNotEmpty, IsString, IsEmail } from 'class-validator';

export function generateValidator(input: any, schema: any) {
  try {
    const requiredFields = Object.keys(schema).filter((key) => {
      return schema[key].required && schema[key].required.length > 0;
    });

    const missingFields = requiredFields.filter((key) => {
      return !input.hasOwnProperty(key);
    });

    if (missingFields.length > 0) {
      const missingFieldsMessage = missingFields.join(', ');
      const errorMessage = `${missingFieldsMessage} ${missingFields.length === 1 ? 'is' : 'are'} required`;
      throw errorMessage;
    }

    const messageError = []
    for (const key in schema) {
      if (input[key] && schema[key].type) {
        //cek kesesuaian type 
        const type = schema[key].type
        const inputValue = input[key];

        if (type === 'string' && typeof inputValue !== 'string') {
          messageError.push(`${key} should be a string`);
        } else if (type === 'bool' && typeof inputValue !== 'boolean') {
          messageError.push(`${key} should be a string`);
        } else if (type === 'email' && !isValidEmail(inputValue)) {
          messageError.push(`${key} should be a valid email`);
        } else if (type === 'number' && !isNumber(inputValue)) {
          messageError.push(`${key} should be a valid number`);
        } else if (type === 'pass' && !isValidCustomType(inputValue)) {
          messageError.push(`${key} should be a valid password matched with uppercase,symbol,no space`);
        } else if (type === 'array' && !isArray(inputValue)) {
          messageError.push(`${key} should be a valid array`);
        } else if (type === 'object' && !isObject(inputValue)) {
          messageError.push(`${key} should be a valid object`);
        } else if (type === 'uuid' && !isValidUUID(inputValue)) {
          messageError.push(`${key} should be a valid UUID`);
        } else if (type === 'date' && !isDate(inputValue)) {
          messageError.push(`${key} should be a valid date format y-m-d`);
        } else if (type === 'datetime' && !isDateTime(inputValue)) {
          messageError.push(`${key} should be a valid datetime format y-m-d h:m:s`);
        }
      }

      if (input[key] && schema[key].valid) {
        const inputValue = input[key];
        const valid = schema[key].valid;
        for (const item of valid) {
          if (item.type === 'min' && !isMinLength(inputValue, item.value)) {
            messageError.push(`${key} should be a min ${item.value} character`);
          } else if (item.type === 'max' && !isMaxLength(inputValue, item.value)) {
            messageError.push(`${key} should be a max ${item.value} character`);
          } else if (item.type === '>' && !isLengthComparison(inputValue, item.key, item.value)) {
            messageError.push(`${key} should be a more than ${item.value}`);
          } else if (item.type === '<' && !isLengthComparison(inputValue, item.key, item.value)) {
            messageError.push(`${key} should be a less than ${item.value}`);
          } else if (item.type === '=' && !isLengthComparison(inputValue, item.key, item.value)) {
            messageError.push(`${key} should be a equal ${item.value}`);
          }
        }
      }
    }

    if (messageError.length > 0) {
      throw messageError;
    }

    return {
      status: true,
    }
  } catch (e) {
    return {
      status: false,
      message: e
    }
  }
}


export function validation(input: any, schema: any) {
  try {
    const result = generateValidator(input, schema)

    return result
  } catch (error) {
    return {
      status: false,
      message: error.message
    }
  }
}

// Helper functions to validate email and UUID
function isValidEmail(email) {
  // You can implement your email validation logic here
  // For a basic check, you can use a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidUUID(uuid) {
  // You can implement your UUID validation logic here
  // For a basic check, you can use a regular expression
  const uuidRegex = /^[a-f\d]{8}-([a-f\d]{4}-){3}[a-f\d]{12}$/i;
  return uuidRegex.test(uuid);
}

function isNumber(value: any): boolean {
  // Check if the value is a number
  return typeof value === 'number' && !isNaN(value);
}

function isValidCustomType(value: string): boolean {
  // Check if the value meets the specified criteria
  const regex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d)(?!.*\s).*$/;
  return regex.test(value);
}

function isArray(value: any): boolean {
  return Array.isArray(value);
}

function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isDate(value: string): boolean {
  // Regular expression to match the yyyy-mm-dd date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(value);
}

function isDateTime(value: string): boolean {
  // Regular expression to match the yyyy-mm-dd h:m:s date-time format
  const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}$/;
  return dateTimeRegex.test(value);
}

function isMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

function isMaxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength;
}

function isLengthComparison(value: number, comparator: string, length: number): boolean {
  switch (comparator) {
    case '>':
      return value > length;
    case '<':
      return value < length;
    case '=':
      return value === length;
    default:
      return false; // Invalid comparator
  }
}