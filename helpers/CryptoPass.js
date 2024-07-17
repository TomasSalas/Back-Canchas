import { randomBytes, createHash } from 'crypto'

export const hashPassword = async (password) => {
  try {
    const salt = randomBytes(16).toString('hex')
    const derivedKey = await new Promise((resolve, reject) => {
      const hash = createHash('sha256')
      hash.update(password + salt)
      resolve(hash.digest('hex'))
    })
    return `${derivedKey}.${salt}`
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const verifyPassword = async (password, storedHash) => {
  const [hashedPassword, salt] = storedHash.split('.')

  const derivedKey = createHash('sha256')
    .update(password + salt)
    .digest('hex')

  return derivedKey === hashedPassword
}
