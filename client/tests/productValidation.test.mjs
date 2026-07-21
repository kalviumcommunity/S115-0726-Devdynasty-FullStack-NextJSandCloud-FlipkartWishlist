import test from 'node:test';
import assert from 'node:assert/strict';
import { validateProductUpdate } from '../src/lib/productValidation.mjs';

test('accepts non-negative stock and price values', () => {
  const result = validateProductUpdate({ price: 499, stock: 15 });

  assert.deepEqual(result, { ok: true, value: { price: 499, stock: 15 } });
});

test('rejects negative price or stock', () => {
  assert.deepEqual(validateProductUpdate({ price: -1, stock: 4 }), {
    ok: false,
    error: 'Price cannot be negative.'
  });

  assert.deepEqual(validateProductUpdate({ price: 120, stock: -2 }), {
    ok: false,
    error: 'Stock cannot be negative.'
  });
});
