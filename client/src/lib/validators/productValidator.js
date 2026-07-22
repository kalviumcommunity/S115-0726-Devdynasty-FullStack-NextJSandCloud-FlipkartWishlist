export function validateProductUpdate(data = {}) {
  const errors = [];
  const requiredFields = ["title", "price", "stock", "category", "image", "description"];

  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || String(data[field]).trim() === "") {
      errors.push(`${field} is required.`);
    }
  }

  const price = Number(data.price);
  const stock = Number(data.stock);

  if (data.price !== undefined && (!Number.isFinite(price) || price <= 0)) {
    errors.push("Price must be a number greater than 0.");
  }

  if (data.stock !== undefined && (!Number.isInteger(stock) || stock < 0)) {
    errors.push("Stock must be an integer greater than or equal to 0.");
  }

  if (data.title !== undefined && String(data.title).trim().length === 0) {
    errors.push("Title cannot be empty.");
  }

  if (data.description !== undefined && String(data.description).trim().length === 0) {
    errors.push("Description cannot be empty.");
  }

  return errors.length > 0
    ? { success: false, errors }
    : {
        success: true,
        value: {
          title: String(data.title).trim(),
          price,
          stock,
          category: String(data.category).trim(),
          image: String(data.image).trim(),
          description: String(data.description).trim(),
        },
      };
}
