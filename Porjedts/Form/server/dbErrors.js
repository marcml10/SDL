export function dbErrorMessage(error) {
  if (!error) return 'Database error.';
  if (error?.message) return error.message;
  return 'Database error.';
}