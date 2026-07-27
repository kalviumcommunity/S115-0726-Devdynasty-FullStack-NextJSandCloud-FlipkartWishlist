/**
 * Validates whether an email string is present and ends with @gmail.com.
 * Trims whitespace and converts to lowercase.
 *
 * @param {string} email 
 * @returns {{ isValid: boolean, error: string | null, email: string }}
 */
export function validateEmail(email) {
  if (typeof email !== "string") {
    return { isValid: false, error: "Only Gmail addresses are allowed.", email: "" };
  }

  const trimmed = email.trim().toLowerCase();

  if (!trimmed) {
    return { isValid: false, error: "Only Gmail addresses are allowed.", email: "" };
  }

  // Must have local-part before @ and domain must be strictly @gmail.com
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!gmailRegex.test(trimmed)) {
    return { isValid: false, error: "Only Gmail addresses are allowed.", email: trimmed };
  }

  return { isValid: true, error: null, email: trimmed };
}

/**
 * Validates signup payload: name, email, password.
 *
 * @param {{ name?: string, email?: string, password?: string }} data 
 * @returns {{ isValid: boolean, error: string | null, sanitizedData?: { name: string, email: string, password: string } }}
 */
export function validateSignup(data = {}) {
  const { name, email, password } = data;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return { isValid: false, error: "Name is required." };
  }

  const emailResult = validateEmail(email);
  if (!emailResult.isValid) {
    return { isValid: false, error: emailResult.error };
  }

  if (!password || typeof password !== "string" || password.length < 8) {
    return { isValid: false, error: "Password must be at least 8 characters long." };
  }

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
    return {
      isValid: false,
      error: "Password must contain an uppercase letter, lowercase letter, number, and special character.",
    };
  }

  return {
    isValid: true,
    error: null,
    sanitizedData: {
      name: name.trim(),
      email: emailResult.email,
      password,
    },
  };
}

/**
 * Validates login payload before processing / database query.
 *
 * @param {{ email?: string, password?: string }} data 
 * @returns {{ isValid: boolean, error: string | null, sanitizedData?: { email: string, password: string } }}
 */
export function validateLogin(data = {}) {
  const { email, password } = data;

  const emailResult = validateEmail(email);
  if (!emailResult.isValid) {
    return { isValid: false, error: emailResult.error };
  }

  if (!password || typeof password !== "string" || password.length < 8) {
    return { isValid: false, error: "Password must be at least 8 characters long." };
  }

  return {
    isValid: true,
    error: null,
    sanitizedData: {
      email: emailResult.email,
      password,
    },
  };
}
