import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEmail, validateSignup, validateLogin } from '../src/lib/validators/authValidator.js';

test('validateEmail allows valid gmail addresses and normalizes them', () => {
  const res1 = validateEmail('john@gmail.com');
  assert.equal(res1.isValid, true);
  assert.equal(res1.email, 'john@gmail.com');

  const res2 = validateEmail('  JOHN.DOE+test@GMAIL.COM  ');
  assert.equal(res2.isValid, true);
  assert.equal(res2.email, 'john.doe+test@gmail.com');
});

test('validateEmail rejects non-gmail domains and invalid formats', () => {
  const domains = ['john@yahoo.com', 'john@outlook.com', 'john@company.com', 'john@gmail.com.co', '@gmail.com', 'invalid'];
  for (const email of domains) {
    const res = validateEmail(email);
    assert.equal(res.isValid, false, `Failed to reject: ${email}`);
    assert.equal(res.error, 'Only Gmail addresses are allowed.');
  }
});

test('validateSignup accepts valid signup data', () => {
  const result = validateSignup({
    name: 'John Doe',
    email: ' JOHN@GMAIL.COM ',
    password: 'Password@123',
  });
  assert.equal(result.isValid, true);
  assert.deepEqual(result.sanitizedData, {
    name: 'John Doe',
    email: 'john@gmail.com',
    password: 'Password@123',
  });
});

test('validateSignup rejects weak passwords', () => {
  // Short password (< 8 chars)
  const shortRes = validateSignup({
    name: 'John',
    email: 'john@gmail.com',
    password: 'pass123',
  });
  assert.equal(shortRes.isValid, false);
  assert.equal(shortRes.error, 'Password must be at least 8 characters long.');

  // Missing lowercase and special character
  const noLowerSpecial = validateSignup({
    name: 'John',
    email: 'john@gmail.com',
    password: 'PASSWORD123',
  });
  assert.equal(noLowerSpecial.isValid, false);
  assert.equal(noLowerSpecial.error, 'Password must contain an uppercase letter, lowercase letter, number, and special character.');

  // Missing uppercase
  const noUpper = validateSignup({
    name: 'John',
    email: 'john@gmail.com',
    password: 'password@123',
  });
  assert.equal(noUpper.isValid, false);
  assert.equal(noUpper.error, 'Password must contain an uppercase letter, lowercase letter, number, and special character.');

  // Missing number
  const noNum = validateSignup({
    name: 'John',
    email: 'john@gmail.com',
    password: 'Password@abc',
  });
  assert.equal(noNum.isValid, false);
  assert.equal(noNum.error, 'Password must contain an uppercase letter, lowercase letter, number, and special character.');
});

test('validateLogin rejects invalid email or short password without DB query', () => {
  const invalidEmail = validateLogin({
    email: 'john@yahoo.com',
    password: 'Password@123',
  });
  assert.equal(invalidEmail.isValid, false);
  assert.equal(invalidEmail.error, 'Only Gmail addresses are allowed.');

  const shortPass = validateLogin({
    email: 'john@gmail.com',
    password: 'pass',
  });
  assert.equal(shortPass.isValid, false);
  assert.equal(shortPass.error, 'Password must be at least 8 characters long.');

  const valid = validateLogin({
    email: '  JOHN@GMAIL.COM  ',
    password: 'Password@123',
  });
  assert.equal(valid.isValid, true);
  assert.equal(valid.sanitizedData.email, 'john@gmail.com');
});
