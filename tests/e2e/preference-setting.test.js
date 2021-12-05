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
      /**
       * Set preference from preference setting page
       */
      let checkboxes = await page.$$('label');
      await checkboxes[2].click();
      await checkboxes[4].click();
      let saved_check = await page.$('#save-or-not');
      let button = await page.$('button');
      await button.click();
      let text2 = await saved_check.getProperty('innerText');
      expect(text2['_remoteObject'].value).toBe("SAVED");
      
      /**
       * check preference from recipe add page
       */
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
  
      /**
       * check preference from recipe search page
       */
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
  
      /**
       * check preference from preference setting page
       */
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

describe('preference-setting test', () => {
    beforeAll(async () => {
        await page.goto('https://cse110-group30-affd4.web.app/preference-setting.html');
    });

    /**
     * Saving as Gluten-free and Soy-free (right div)
     * shows up in add recipe page, search page, and settings page
     */
  it('preferences set from left div', async () => {
    console.log('set preferences from left div');

    /**
     * Set preference in preference setting page
     */
    let checkboxes = await page.$$('label');
    await checkboxes[4].click();
    await checkboxes[7].click();
    let button = await page.$('button');
    await button.click();
    
    /**
     * check preference from recipe add page
     */
    await page.goto('https://cse110-group30-affd4.web.app/recipe-add.html');
    let addRecipeCheckboxes = await page.$$('.diet-restrictionBox input');
    let checkedCorrectly = true;
    for (let i = 0; i < addRecipeCheckboxes.length ; i++) {
      let checked = await (await addRecipeCheckboxes[i].getProperty('checked')).jsonValue();
      if (i == 4 || i == 7) {
        if (! checked) { checkedCorrectly = false; }
      }
      else {
        if (checked) { checkedCorrectly = false; }
      }
    }
    expect(checkedCorrectly).toBe(true);

    /**
     * check preference from recipe search page
     */
    await page.goto('https://cse110-group30-affd4.web.app/recipe-search.html');
    let searchCheckboxes = await page.$$('.diet-restrictionBox input');
    for (let i = 0; i < searchCheckboxes.length ; i++) {
      let checked = await (await searchCheckboxes[i].getProperty('checked')).jsonValue();
      if (i == 4 || i == 7) {
        if (! checked) { checkedCorrectly = false; }
      }
      else {
        if (checked) { checkedCorrectly = false; }
      }
    }
    expect(checkedCorrectly).toBe(true);

    /**
     * check preference from preference setting page
     */
    await page.goto('https://cse110-group30-affd4.web.app/preference-setting.html');
    let settingsCheckboxes = await page.$$('input');
    for (let i = 0; i < settingsCheckboxes.length ; i++) {
      let checked = await (await settingsCheckboxes[i].getProperty('checked')).jsonValue();
      if (i == 4 || i == 7) {
        if (! checked) { checkedCorrectly = false; }
      }
      else {
        if (checked) { checkedCorrectly = false; }
      }
    }
    expect(checkedCorrectly).toBe(true);
  });
});

describe('preference-setting test', () => {
    beforeAll(async () => {
        await page.goto('https://cse110-group30-affd4.web.app/preference-setting.html');
    });

    /**
     * Saving as dairy-free and vegan (left div)
     * shows up in add recipe page, search page, and settings page
     */
  it('preferences set from left div', async () => {
    console.log('set preferences from left div');

    /**
     * Set preference in preference setting page
     */
    let checkboxes = await page.$$('label');
    await checkboxes[0].click();
    await checkboxes[2].click();
    let button = await page.$('button');
    await button.click();
    
    /**
     * check preference from recipe add page
     */
    await page.goto('https://cse110-group30-affd4.web.app/recipe-add.html');
    let addRecipeCheckboxes = await page.$$('.diet-restrictionBox input');
    let checkedCorrectly = true;
    for (let i = 0; i < addRecipeCheckboxes.length ; i++) {
      let checked = await (await addRecipeCheckboxes[i].getProperty('checked')).jsonValue();
      if (i == 0 || i == 2) {
        if (! checked) { checkedCorrectly = false; }
      }
      else {
        if (checked) { checkedCorrectly = false; }
      }
    }
    expect(checkedCorrectly).toBe(true);

    /**
     * check preference from recipe search page
     */
    await page.goto('https://cse110-group30-affd4.web.app/recipe-search.html');
    let searchCheckboxes = await page.$$('.diet-restrictionBox input');
    for (let i = 0; i < searchCheckboxes.length ; i++) {
      let checked = await (await searchCheckboxes[i].getProperty('checked')).jsonValue();
      if (i == 0 || i == 2) {
        if (! checked) { checkedCorrectly = false; }
      }
      else {
        if (checked) { checkedCorrectly = false; }
      }
    }
    expect(checkedCorrectly).toBe(true);

    /**
     * check preference from preference setting page
     */
    await page.goto('https://cse110-group30-affd4.web.app/preference-setting.html');
    let settingsCheckboxes = await page.$$('input');
    for (let i = 0; i < settingsCheckboxes.length ; i++) {
      let checked = await (await settingsCheckboxes[i].getProperty('checked')).jsonValue();
      if (i == 0 || i == 2) {
        if (! checked) { checkedCorrectly = false; }
      }
      else {
        if (checked) { checkedCorrectly = false; }
      }
    }
    expect(checkedCorrectly).toBe(true);
  });
});

describe('onBoarding preference-setting test', () => {
    beforeAll(async () => {
        await page.goto('http://cse110-group30-affd4.web.app/preference-setting.html');
    });

    /**
     * Saving onBoarding preference with no preference
     * nothing shows up in add recipe page, search page, and settings page
     */
  it('preferences set to nothing', async () => {
    console.log('set preferences to nothing');

    /**
     * Set preference to nothing from onBoarding page
     */
    
    let button = await page.$('button');
    await button.click();
    
    /**
     * check preference from recipe add page
     */
    await page.goto('https://cse110-group30-affd4.web.app/recipe-add.html');
    let addRecipeCheckboxes = await page.$$('.diet-restrictionBox input');
    let checkedCorrectly = true;
    for (let i = 0; i < addRecipeCheckboxes.length ; i++) {
      let checked = await (await addRecipeCheckboxes[i].getProperty('checked')).jsonValue();
      if (checked) { checkedCorrectly = false; }
    }
    expect(checkedCorrectly).toBe(true);

    /**
     * check preference from recipe search page
     */
    await page.goto('https://cse110-group30-affd4.web.app/recipe-search.html');
    let searchCheckboxes = await page.$$('.diet-restrictionBox input');
    for (let i = 0; i < searchCheckboxes.length ; i++) {
      let checked = await (await searchCheckboxes[i].getProperty('checked')).jsonValue();
      if (checked) { checkedCorrectly = false; }
    }
    expect(checkedCorrectly).toBe(true);

    /**
     * check preference from preference setting page
     */
    await page.goto('https://cse110-group30-affd4.web.app/preference-setting.html');
    let settingsCheckboxes = await page.$$('input');
    for (let i = 0; i < settingsCheckboxes.length ; i++) {
      let checked = await (await settingsCheckboxes[i].getProperty('checked')).jsonValue();
      if (checked) { checkedCorrectly = false; }
    }
    expect(checkedCorrectly).toBe(true);
  });
});

//To Do: set preference and reload before save
//To Do: set preference and reload after save
