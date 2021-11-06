/**
 * example for how to write a test case as well as to test if the testing framework works
 */

// import the testing framework since we are using ES6 Modules
import { jest, expect, test } from '@jest/globals';
jest.useFakeTimers();

import { add } from '../source/example.js';

test('testing the add function in order to test the testing framework : )', () => {
  expect(add(1, 2)).toBe(3);
});
