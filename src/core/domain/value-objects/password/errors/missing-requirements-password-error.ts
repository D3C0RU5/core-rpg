import { SPECIAL_CHARACTERS } from '..'
import { InvalidValueError } from '../../../../../utils/errors/invalid-value-error'

export const missingRequirementsPasswordError = (password: string) => {
  return new InvalidValueError(
    'PASSWORD.MISSING_REQUIREMENTS',
    'The password should follow the requirements, grather than size 8, less than size 16, with numbers, and special characters',
    { value: password, specialCharacters: SPECIAL_CHARACTERS },
  )
}
