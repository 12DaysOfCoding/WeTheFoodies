/**
 * testing the functionalities of the api module
 */

class LocalStorageMock {
  constructor() {
    this.store = {};
    this.length = 0;
  }
  clear() {
    this.store = {};
    this.length = 0;
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    if (!(key in this.store)) this.length++;
    this.store[key] = String(value);
  }
  removeItem(key) {
    if (key in this.store) this.length--;
    delete this.store[key];
  }
  key(idx) {
    return Object.keys(this.store)[idx];
  }
}
global.localStorage = new LocalStorageMock;  // we need this to mock the local storage
import fetch from 'node-fetch';  // we need a fetch equivalent for nodejs
global.fetch = fetch;

// test begins
import * as backend from '../../source/assets/scripts/backend.js';
import { recipe_data } from '../../source/assets/scripts/recipe-data.js'

describe('testing functionalities that require actual recipes', () => {
  let result;
  beforeAll(async () => {
    result = await backend.fetch_recipe('cherry pie');
  });

  describe('testing search functionalities', () => {
    it('fuzzy searches', async () => {
      expect(await backend.search_recipe('fried rice')).toHaveLength(0);
      const online_results = await backend.search_recipe('fried rice', true);
      console.log(online_results)
      expect(online_results.length > 0).toBe(true);
    });
    
    it('fuzzy searches with intolerances', async () => {
      const results_before = await backend.search_recipe('pie', false, 10, []);
      const intolerances = ["Gluten-free"];
      const results_after = await backend.search_recipe('pie', false, 10, intolerances);
      results_after.forEach(result => expect(results_before.includes(result)).toBe(true));  // subset
      expect(results_after.length).toBeLessThan(results_before.length);  // subsetneq
    });
  });

  describe('testing fetch along with its helpers', () => {
    it('fetches and filters recipe objects to have the right keys and key types', () =>
      result.forEach(recipe =>
        Object.keys(recipe_data).forEach(key => {
          expect(recipe).toHaveProperty(key);  // check every key exists
          expect(typeof recipe[key]).toBe(typeof recipe_data[key]);  // check every value has the right type
        })
      )
    );

    it('computes hash correctly for each recipe', () =>
      result.forEach(recipe => expect(recipe.hash.startsWith(recipe.name+"$")).toBe(true))
    );

    it('computes difficulty correctly for each recipe', () =>
      result.forEach(recipe => expect(recipe.difficulty).toBeGreaterThan(0))
    );

    it('does not add spoonacular recipes as custom', () =>
      expect(backend.get_custom()).toHaveLength(0)
    );

    it('saves fetched recipe objects in localstore and getter is also working', () => 
      result.forEach(recipe => expect(backend.get_recipe(recipe.hash).name).toEqual(recipe.name))
    );
  });

  it('can add a custom recipe', () => {
    const custom_recipe = result[0];
    const original_hash = custom_recipe.hash;
    custom_recipe.name = 'I am custom';
    custom_recipe.steps.push('hahaha');
    backend.add_recipe(custom_recipe, true);
    const custom_recipes = backend.get_custom();
    expect(custom_recipes).toHaveLength(1);  // only 1 added
    const [recipe_hash] = custom_recipes;
    const recipe = backend.get_recipe(recipe_hash);
    expect(recipe.name).toBe(custom_recipe.name);  // name same
    expect(recipe.steps.pop()).toBe(custom_recipe.steps.pop());  // last step same
    expect(recipe.hash.slice(-7) !== original_hash.slice(-7)).toBe(true);  // different hash
  });

  it('does not allow dup custom recipe', () => {
    const custom_recipe = result[0];
    custom_recipe.name = 'I am custom';
    backend.add_recipe(custom_recipe, true);
    const old_length = backend.get_custom().length;
    backend.add_recipe(custom_recipe, true);
    expect(backend.get_custom()).toHaveLength(old_length);  // length unchanged
  })

  it('can remove recipes', () => {
    const recipe_to_remove = result[1];
    expect(backend.get_recipe(recipe_to_remove.hash)).toBeTruthy();  // not null
    backend.remove_recipe(recipe_to_remove.hash);
    expect(backend.get_recipe(recipe_to_remove.hash)).toBeNull();  // gone!
  });

  it('removes custom when recipe is removed', () => {
    const custom_recipe_hash = backend.get_custom()[0];  // there should still be some left
    backend.remove_recipe(custom_recipe_hash);
    expect(backend.get_recipe(custom_recipe_hash)).toBeNull();  // gone!
    expect(backend.get_custom().includes(custom_recipe_hash)).toBe(false);  // gone too from list!
  });
});

// test('testing fetch recipe that should return emtpy list', async () => {
//   const result = await backend.fetch_recipe('computer');  // should have just 0 entry
//   expect(result).toHaveLength(0);
// });

test('testing get/set intolerance preference', async () => {
  backend.set_intolerance(['a','b']);
  expect(backend.get_intolerance()).toEqual(['a','b']);
  backend.set_intolerance(['1','2','3']);
  expect(backend.get_intolerance()).toEqual(['1','2','3']);
});

test('testing get/set intolerance preference', async () => {
  backend.set_intolerance(['Vegan','Soy-free']);
  expect(backend.get_intolerance()).toEqual(['Vegan','Soy-free']);
  backend.set_intolerance(['Tree Nut-free','Gluten-free','Dairy-free']);
  expect(backend.get_intolerance()).toEqual(['Tree Nut-free','Gluten-free','Dairy-free']);
});
