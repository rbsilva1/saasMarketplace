import { passwordValidation } from "./passwordValidation";
import { hash } from 'bcryptjs'

const passwordTest = '123456'

describe('passwordValidation', () => {
  test('should return true if password is valid', async () => {
    const hashedPassword = await hash(passwordTest, 8)
    const isValid = await passwordValidation(passwordTest, hashedPassword)
    expect(isValid).toBe(true)
  })

  test('should return false if password is invalid', async () => {
    const falsyPassword = '123'
    const hashedPassword = await hash(passwordTest, 8)
    const isValid = await passwordValidation(falsyPassword, hashedPassword)
    expect(isValid).toBe(false)
  })
})