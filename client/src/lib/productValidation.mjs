export function validateProductUpdate(input = {}) {
  const price = Number(input.price);
  const stock = Number(input.stock);

  if (Number.isNaN(price) || Number.isNaN(stock)) {
    return { ok: false, error: 'Price and stock must be valid numbers.' };
  }

  if (price < 0) {
    return { ok: false, error: 'Price cannot be negative.' };
  }

  if (stock < 0) {
    return { ok: false, error: 'Stock cannot be negative.' };
  }

  return { ok: true, value: { price, stock } };
}
