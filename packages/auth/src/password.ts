import bcrypt from 'bcryptjs'

export class PasswordService {
  private static readonly SALT_ROUNDS = 12

  /**
   * Hash a plain text password
   */
  static async hashPassword(plainPassword: string): Promise<string> {
    if (!plainPassword) {
      throw new Error('Password is required')
    }

    if (plainPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long')
    }

    return bcrypt.hash(plainPassword, this.SALT_ROUNDS)
  }

  /**
   * Compare a plain text password with a hashed password
   */
  static async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    if (!plainPassword || !hashedPassword) {
      return false
    }

    return bcrypt.compare(plainPassword, hashedPassword)
  }

  /**
   * Validate password strength
   */
  static validatePassword(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!password) {
      errors.push('Password is required')
      return { valid: false, errors }
    }

    if (password.length < 6) {
      errors.push('Password must be at least 6 characters long')
    }

    if (password.length > 128) {
      errors.push('Password must be less than 128 characters long')
    }

    if (!/[A-Za-z]/.test(password)) {
      errors.push('Password must contain at least one letter')
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number')
    }

    // Check for common weak passwords
    const commonPasswords = [
      'password', '123456', 'password123', 'admin', 'qwerty', 
      'letmein', 'welcome', '1234567890'
    ]
    
    if (commonPasswords.includes(password.toLowerCase())) {
      errors.push('Password is too common. Please choose a stronger password')
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }
}