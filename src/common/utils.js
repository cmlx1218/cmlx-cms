export function DataToFormData(data) {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key];
      formData.append(key, element);
    }
  }
  return formData
}
