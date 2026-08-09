/**
 * validators.js
 * ---------------------------------------------------------------------------
 * Framework-free validation for the contact form. Returns a map of
 * `{ field: 'message' }` — an empty object means the form is valid.
 */

// Deliberately pragmatic: catches typos without rejecting valid addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

export const rules = {
  name: { min: 2, max: 60 },
  subject: { min: 3, max: 100 },
  message: { min: 10, max: 1000 },
}

/** Validates a single field. Returns an error string, or '' when valid. */
export function validateField(field, rawValue) {
  const value = (rawValue ?? '').trim()

  switch (field) {
    case 'name':
      if (!value) return 'Please enter your name.'
      if (value.length < rules.name.min) return 'Name must be at least 2 characters.'
      if (value.length > rules.name.max) return 'Name is too long.'
      return ''

    case 'email':
      if (!value) return 'Please enter your email address.'
      if (!EMAIL_PATTERN.test(value)) return 'That does not look like a valid email.'
      return ''

    case 'subject':
      if (!value) return 'Please add a subject.'
      if (value.length < rules.subject.min) return 'Subject must be at least 3 characters.'
      if (value.length > rules.subject.max) return 'Subject is too long.'
      return ''

    case 'message':
      if (!value) return 'Please write a message.'
      if (value.length < rules.message.min)
        return `Message must be at least ${rules.message.min} characters.`
      if (value.length > rules.message.max)
        return `Message must be under ${rules.message.max} characters.`
      return ''

    default:
      return ''
  }
}

/** Validates the whole form object. */
export function validateForm(values) {
  return Object.keys(values).reduce((errors, field) => {
    const error = validateField(field, values[field])
    if (error) errors[field] = error
    return errors
  }, {})
}
