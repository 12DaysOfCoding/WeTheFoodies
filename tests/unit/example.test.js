/**
 * @jest-environment jsdom
 */

/**
 * example for how to write a test case as well as to test if the testing framework works
 */

import { add } from '../../source/example.js';

test('testing the add function in order to test the testing framework : )', () => {
  expect(add(1, 2)).toBe(3);
});
