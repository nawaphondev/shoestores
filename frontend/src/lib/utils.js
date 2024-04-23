export function calculateTax(number, tax) {
  return (number / 100) * tax;
}

export function thaiDateFormat(dateString, withTime = false) {
  if (!dateString) {
    dateString = new Date().toISOString();
  }
  const date = new Date(dateString);
  const options = {
    day: "numeric",
    year: "numeric",
    month: "long",
  };

  if (withTime) {
    options.hour = "numeric";
    options.minute = "2-digit";
  }

  return date.toLocaleDateString("th-TH", options);
}
