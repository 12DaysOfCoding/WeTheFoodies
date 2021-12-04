describe('preference-setting test', () => {
  beforeAll(async () => {
    await page.goto('http://cse110-group30-affd4.web.app/preference-setting.html');
  });

  /**
	 * Check save button
	 */
  it('responds to "save" button press', async () => {
    let saved_check = await page.$('#save-or-not');
    let text = await saved_check.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("SAVE");

    let button = await page.$('button');
    await button.click();
    let text2 = await saved_check.getProperty('innerText');
    expect(text2['_remoteObject'].value).toBe("SAVED");
  });
});

/**
 * check version page with reloading reload
 */
 describe('check version page after reload', () => {
  beforeAll(async () => {
    await page.goto('http://cse110-group30-affd4.web.app/version.html');
  });

  it('check version page', async () => {
    let version = await page.$("#v-text");
    let text = await version.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("Version beta 1.0");
    await page.reload();

    let new_version = await page.$("#v-text");
    let new_text = await new_version.getProperty('innerText');
    expect(new_text['_remoteObject'].value).toBe("Version beta 1.0");
  });
});

describe('preference-setting test', () => {
  beforeAll(async () => {
    await page.goto('http://cse110-group30-affd4.web.app/preference-setting.html');
  });

  /**
	 * Check save button after reload
	 */
  it('responds to "save" button press', async () => {
    let saved_check = await page.$('#save-or-not');
    let text = await saved_check.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("SAVE");

    let button = await page.$('button');
    await button.click();
    let text2 = await saved_check.getProperty('innerText');
    expect(text2['_remoteObject'].value).toBe("SAVED");

    await page.reload();
    let new_check = await page.$('#save-or-not');
    let new_text = await new_check.getProperty('innerText');
    expect(new_text['_remoteObject'].value).toBe("SAVE");
  });

  /**
   * Saving preferences as dairy-free and gluten-free 
   * shows up in add recipe page, search page, and settings page
   */
  it('setting preferences as dairy-free and gluten-free saves correctly', async () => {
    let checkboxes = await page.$$('label');
    await checkboxes[2].click();
    await checkboxes[4].click();
    let saved_check = await page.$('#save-or-not');
    let button = await page.$('button');
    await button.click();
    let text2 = await saved_check.getProperty('innerText');
    expect(text2['_remoteObject'].value).toBe("SAVED");
    
    await page.goto('https://cse110-group30-affd4.web.app/recipe-add.html');
    let addRecipeCheckboxes = await page.$$('.diet-restrictionBox input');
    let checkedCorrectly = true;
    for (let i = 0; i < addRecipeCheckboxes.length ; i++) {
      let checked = await (await addRecipeCheckboxes[i].getProperty('checked')).jsonValue();
      if (i == 2 || i == 4) {
        if (! checked) { checkedCorrectly = false; }
      }
      else {
        if (checked) { checkedCorrectly = false; }
      }
    }

    await page.goto('https://cse110-group30-affd4.web.app/recipe-search.html');
    let searchCheckboxes = await page.$$('.diet-restrictionBox input');
    for (let i = 0; i < searchCheckboxes.length ; i++) {
      let checked = await (await searchCheckboxes[i].getProperty('checked')).jsonValue();
      if (i == 2 || i == 4) {
        if (! checked) { checkedCorrectly = false; }
      }
      else {
        if (checked) { checkedCorrectly = false; }
      }
    }

    await page.goto('https://cse110-group30-affd4.web.app/preference-setting.html');
    let settingsCheckboxes = await page.$$('input');
    for (let i = 0; i < settingsCheckboxes.length ; i++) {
      let checked = await (await settingsCheckboxes[i].getProperty('checked')).jsonValue();
      if (i == 2 || i == 4) {
        if (! checked) { checkedCorrectly = false; }
      }
      else {
        if (checked) { checkedCorrectly = false; }
      }
    }
    expect(checkedCorrectly).toBe(true);
  });
});


/**
 * go to setting page from dashboard
 */
describe('go to setting', () => { 
  beforeAll(async () => {
    await page.goto('http://cse110-group30-affd4.web.app/index.html');
  });

  it('go to setting page from dashboard', async () => {
    let settings = await page.$('.nav-settings');
    await Promise.all([
      settings.click(),
      page.waitForNavigation(),
    ]);
    let font = await page.$('#setting-text');
    let text = await font.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("PREFERENCE");
  });
});
