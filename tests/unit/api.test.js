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
import { search_recipe,get_info_localstore,set_localstore,remove_localstore,add_favorite,add_custom,remove_favorite,remove_custom,set_intolerance } from '../../source/assets/scripts/api.js';
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

test('test get local with key not exist',() => {
  const result=get_info_localstore('dne');
  expect(result).toBe(undefined);
});

test('test set local and get local',async () => {
  set_localstore('a',[1,2,3,4,5]);
  const result=get_info_localstore('a');
  expect(result).toHaveLength(5);
});

test('test remove local',async () => {
  remove_localstore('a');
  const result=get_info_localstore('a');
  expect(result).toBe(undefined);
});

test('add favorite with kay does not exist',async () => {
  add_favorite('1')
  const result=get_info_localstore('favorite');
  console.log(result);
  expect(result).toHaveLength(1);
});

test('add favorite with kay exist',async () => {
  add_favorite('1')
  const result=get_info_localstore('favorite');
  expect(result).toHaveLength(1);
});

test('remove favorite',async () => {
  remove_favorite('1')
  const result=get_info_localstore('favorite');
  expect(result).toHaveLength(0);
});

test('testing set intolerance preference',async  () => {
  set_intolerance(['a','b']);
  const result=get_info_localstore('intolerance');
  expect(result).toHaveLength(2);
});

test('testing set intolerance preference reset the data',async  () => {
  set_intolerance(['1','2','3']);
  const result=get_info_localstore('intolerance');
  expect(result).toHaveLength(3);
});
 
