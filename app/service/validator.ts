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
        } else if (type === 'email' && !isValidEmail(inputValue)) {
          messageError.push(`${key} should be a valid email`);
        } else if (type === 'uuid' && !isValidUUID(inputValue)) {
          messageError.push(`${key} should be a valid UUID`);
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