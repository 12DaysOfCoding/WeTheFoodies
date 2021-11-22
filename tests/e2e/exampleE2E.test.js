describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/source/index.html');
  });

  // check page loads
  it('Initial Home Page', async () => {
    console.log('Checking if page loads');
    let saved_recipe = await page.$('h2');
    let text = await saved_recipe.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("Saved Recipes");
  });
});

describe('preference-setting test', () => {

  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/source/preference-setting.html');
  });

  // check preference-setting
  it('check saved or not ', async () => {
    console.log('Checking if preference saved or not');
    let saved_check = await page.$('#save-or-not');
    let text = await saved_check.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("SAVE");

    let button = await page.$('button');
    await button.click();
    let text2 = await saved_check.getProperty('innerText');
    expect(text2['_remoteObject'].value).toBe("SAVED");
  });
});
