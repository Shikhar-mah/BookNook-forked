export function initials(name = "") {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}
export function label(value = "") {
  return value.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
export function dateText(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}
export function validateBookForm(form) {
  const errors = {};
  if (!form.title?.trim()) errors.title = "Title is required.";
  if (!form.author?.trim()) errors.author = "Author is required.";
  if (!form.genreId) errors.genreId = "Genre is required.";
  const loanDays = Number(form.defaultLoanDays);
  if (!Number.isInteger(loanDays) || loanDays < 3 || loanDays > 60) {
    errors.defaultLoanDays = "Default loan days must be an integer between 3 and 60.";
  }
  return errors;
}
export function validateRequestForm(form) {
  const errors = {};
  const loanDays = Number(form.requestedLoanDays);
  if (!Number.isInteger(loanDays) || loanDays < 3 || loanDays > 60) {
    errors.requestedLoanDays = "Borrow days must be an integer between 3 and 60.";
  }
  return errors;
}
export function toBookForm(book) {
  return { ...book, genreId: book.genre?.id };
}