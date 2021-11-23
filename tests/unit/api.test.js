/**
 * testing the functionalities of the api module
 */

class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
}
global.localStorage = new LocalStorageMock;  // we need this to mock the local storage
import fetch from 'node-fetch';  // we need a fetch equivalent for nodejs
global.fetch = fetch;

// test begins
import { search_recipe } from '../../source/assets/scripts/api.js';
import { recipe_data } from '../../source/assets/scripts/recipe-data.js'

test('testing search recipe w/o intolerance', async () => {
  const result = await search_recipe('cherry pie');
  result.forEach(recipe => Object.keys(recipe_data).forEach(key => {
    expect(recipe).toHaveProperty(key);  // check every key exists
    expect(typeof recipe[key]).toBe(typeof recipe_data[key]);  // check every value has the right type
  }));
});

test('testing search recipe w/ intolerance', async () => {
  const result = await search_recipe('cherry pie', ['gluten']);  // should have just 1 entry haha
  result.forEach(recipe => Object.keys(recipe_data).forEach(key => {
    expect(recipe).toHaveProperty(key);  // check every key exists
    expect(typeof recipe[key]).toBe(typeof recipe_data[key]);  // check every value has the right type
    expect(recipe.intolerances.join(',')).toContain('gluten');  // intolerances should have gluten
  }));
});

test('testing search recipe that should return emtpy list', async () => {
  const result = await search_recipe('computer');  // should have just 0 entry
  expect(result).toHaveLength(0);
});
 