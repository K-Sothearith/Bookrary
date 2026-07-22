export const ALLOWED_EMAIL_DOMAINS = [
  "@gmail.com",
  "@outlook.com",
  "@student.cadt.edu.kh",
  "@icloud.com",
  "@yahoo.com"
];

export function validateEmail(email) {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim().toLowerCase();
  return ALLOWED_EMAIL_DOMAINS.some((domain) => trimmed.endsWith(domain));
}

export function validatePassword(password) {
  if (!password || typeof password !== "string") return false;
  if (password.length < 6) return false;

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password);

  return hasLower && hasUpper && hasNumber && hasSpecial;
}
