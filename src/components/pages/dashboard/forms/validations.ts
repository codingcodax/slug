export const urlValidation = {
  required: { value: true, message: 'Please enter a URL' },
  minLength: {
    value: 10,
    message:
      'Please enter a valid URL. It should be at least 10 characters long',
  },
  pattern: {
    value: /^https?:\/\//i,
    message:
      'Please enter a valid URL. It should start with http:// or https://',
  },
};

export const slugValidation = {
  required: {
    value: true,
    message: 'Please enter a custom slug or generate a random one',
  },
  pattern: {
    value: /^[a-zA-Z0-9_-]+$/i,
    message:
      'Please enter a valid slug with blank space or special characters.',
  },
};
