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
import * as backend from '../../source/assets/scripts/backend.js';
import { recipe_data } from '../../source/assets/scripts/recipe-data.js'

describe('testing fetch recipe w/o intolerance', () => {
  let result;
  beforeAll(async () => {
    result = await backend.fetch_recipe('cherry pie');
  });

  it('fetches and filters recipe objects to have the right keys and key types', () =>
    result.forEach(recipe =>
      Object.keys(recipe_data).forEach(key => {
        expect(recipe).toHaveProperty(key);  // check every key exists
        expect(typeof recipe[key]).toBe(typeof recipe_data[key]);  // check every value has the right type
      })
    )
  );

  it('saves fetched recipe objects in localstore', () => 
    result.forEach(recipe => expect(backend.get_recipe(recipe.hash)).toEqual(recipe))
  );
});

test('testing fetch recipe w/ intolerance', async () => {
  const result = await backend.fetch_recipe('cherry pie', ['gluten']);  // should have just 1 entry haha
  result.forEach(recipe => Object.keys(recipe_data).forEach(key => {
    expect(recipe).toHaveProperty(key);  // check every key exists
    expect(typeof recipe[key]).toBe(typeof recipe_data[key]);  // check every value has the right type
    expect(recipe.intolerances.join(',')).toContain('gluten');  // intolerances should have gluten
  }));
});

test('testing fetch recipe that should return emtpy list', async () => {
  const result = await backend.fetch_recipe('computer');  // should have just 0 entry
  expect(result).toHaveLength(0);
});

// test('test get local with key not exist',() => {
//   const result=backend.get_recipe('dne');
//   expect(result).toBe(null);
// });

// test('test set local and get local',async () => {
//   backend.add_recipe('a',[1,2,3,4,5]);
//   const result=backend.get_recipe('a');
//   expect(result).toHaveLength(5);
// });

// test('test remove local',async () => {
//   backend.remove_localstore('a');
//   const result=backend.get_recipe('a');
//   expect(result).toBe(null);
// });

// test('add favorite with kay does not exist',async () => {
//   backend.add_favorite('1')
//   const result=backend.get_recipe('favorite');
//   console.log(result);
//   expect(result).toHaveLength(1);
// });

// test('add favorite with kay exist',async () => {
//   backend.add_favorite('1')
//   const result=backend.get_info_localstore('favorite');
//   expect(result).toHaveLength(1);
// });

// test('remove favorite',async () => {
//   backend.remove_favorite('1')
//   const result=backend.get_info_localstore('favorite');
//   expect(result).toHaveLength(0);
// });

// test('testing set intolerance preference',async  () => {
//   backend.set_intolerance(['a','b']);
//   const result=backend.get_info_localstore('intolerance');
//   expect(result).toHaveLength(2);
// });

// test('testing set intolerance preference reset the data',async  () => {
//   backend.set_intolerance(['1','2','3']);
//   const result=backend.get_info_localstore('intolerance');
//   expect(result).toHaveLength(3);
// });
 
