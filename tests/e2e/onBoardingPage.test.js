describe('onBoarding preference-setting test', () => {
    beforeAll(async () => {
        await page.goto('http://cse110-group30-affd4.web.app/onBoardingPage.html');
    });

    /**
     * Saving onBoarding page as dairy-free and vegan (left div)
     * shows up in add recipe page, search page, and settings page
     */
  it('onBoarding preferences set from left div', async () => {
    console.log('set onBoarding preferences from left div');

    /**
     * Set preference from onBoarding page
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
        await page.goto('http://cse110-group30-affd4.web.app/onBoardingPage.html');
    });

    /**
     * Saving onBoarding page as Gluten-free and Soy-free (right div)
     * shows up in add recipe page, search page, and settings page
     */
  it('onBoarding preferences set from right div', async () => {
    console.log('set onBoarding preferences from right div');

    /**
     * Set preference from onBoarding page
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

describe('onBoarding preference-setting test', () => {
    beforeAll(async () => {
        await page.goto('http://cse110-group30-affd4.web.app/onBoardingPage.html');
    });

    /**
     * Saving onBoarding preference with no preference
     * nothing shows up in add recipe page, search page, and settings page
     */
  it('onBoarding preferences set to nothing', async () => {
    console.log('set onBoarding preferences to nothing');

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

describe('onBoarding test', () => {
    beforeAll(async () => {
        await page.goto('http://cse110-group30-affd4.web.app/onBoardingPage.html');
    });

    /**
     * check if onBoarding page loads
     */
    it('check onBoarding page loads', async () => {
        console.log("check onBoarding page loads");

        let button = await page.$('.begin-text');
        let innerText = await button.getProperty('innerText');
        let text = innerText['_remoteObject'].value;
        expect(text).toBe("Let's begin!");
    });
});

describe('onBoarding test', () => {
    beforeAll(async () => {
        await page.goto('http://cse110-group30-affd4.web.app/onBoardingPage.html');
    });

    /**
     * check if onBoarding page loads after reload
     */
    it('check onBoarding page loads after reload', async () => {
        console.log("check onBoarding page loads after reload");

        //check if page is onBoarding page
        let button = await page.$('.begin-text');
        let innerText = await button.getProperty('innerText');
        let text = innerText['_remoteObject'].value;
        expect(text).toBe("Let's begin!");

        //reload page
        await page.reload();
        
        //recheck if page is onBoarding page
        let new_button = await page.$('.begin-text');
        let new_innerText = await new_button.getProperty('innerText');
        let new_text = new_innerText['_remoteObject'].value;
        expect(new_text).toBe("Let's begin!");
    });
});

describe('onBoarding test', () => {
    beforeAll(async () => {
        await page.goto('http://cse110-group30-affd4.web.app/onBoardingPage.html');
    });

    /**
     * onBoarding go to index page
     */
    it('onBoarding go to index page', async () => {
        console.log("onBoarding go to index page");
        
        //go to index page from onBoarding page
        let button = await page.$('button');
        await button.click();

        //check if page is index page
        let savedRecipes = await page.$('h2');
        let innerText = await savedRecipes.getProperty('innerText');
        let text = innerText['_remoteObject'].value;
        expect(text).toBe('Saved Recipes');
    });
});

describe('onBoarding test', () => {
    beforeAll(async () => {
        await page.goto('http://cse110-group30-affd4.web.app/onBoardingPage.html');
    });

    /**
     * onBoarding go to index page
     */
    it('onBoarding go to index page before reload', async () => {
        console.log("onBoarding go to index page before reload");
        
        //go to index page from onBoarding page
        let button = await page.$('button');
        await button.click();

        //check if page is index page
        let savedRecipes = await page.$('h2');
        let innerText = await savedRecipes.getProperty('innerText');
        let text = innerText['_remoteObject'].value;
        expect(text).toBe('Saved Recipes');

        //reload page
        await page.reload();

        //check if page is index page after reload
        let new_savedRecipes = await page.$('h2');
        let new_innerText = await new_savedRecipes.getProperty('innerText');
        let new_text = new_innerText['_remoteObject'].value;
        expect(new_text).toBe('Saved Recipes');
    });
});

describe('onBoarding test', () => {
    beforeAll(async () => {
        await page.goto('http://cse110-group30-affd4.web.app/onBoardingPage.html');
    });

    /**
     * onBoarding go to index page
     */
    it('onBoarding go to index page after reload', async () => {
        console.log("onBoarding go to index page after reload");

        //check if page is onBoarding page
        let button = await page.$('.begin-text');
        let innerText = await button.getProperty('innerText');
        let text = innerText['_remoteObject'].value;
        expect(text).toBe("Let's begin!");

        //reload page
        await page.reload();
        
        //recheck if page is onBoarding page
        let new_button = await page.$('.begin-text');
        let new_innerText = await new_button.getProperty('innerText');
        let new_text = new_innerText['_remoteObject'].value;
        expect(new_text).toBe("Let's begin!");
        
        //go to index page from onBoarding page
        await new_button.click();

        //check if page is index page
        let savedRecipes = await page.$('h2');
        let innerText = await savedRecipes.getProperty('innerText');
        let text = innerText['_remoteObject'].value;
        expect(text).toBe('Saved Recipes');
    });
});

describe('onBoarding test', () => {
    beforeAll(async () => {
        await page.goto('http://cse110-group30-affd4.web.app/onBoardingPage.html');
    });

    /**
     * onBoarding go to index page
     */
    it('onBoarding go to index page with two reloads', async () => {
        console.log('onBoarding go to index page with two reloads');

        //check if page is onBoarding page
        let button = await page.$('.begin-text');
        let innerText = await button.getProperty('innerText');
        let text = innerText['_remoteObject'].value;
        expect(text).toBe("Let's begin!");

        //reload page
        await page.reload();
        
        //recheck if page is onBoarding page
        let new_button = await page.$('.begin-text');
        let new_innerText = await new_button.getProperty('innerText');
        let new_text = new_innerText['_remoteObject'].value;
        expect(new_text).toBe("Let's begin!");
        
        //go to index page from onBoarding page
        await new_button.click();

        //check if page is index page
        let savedRecipes = await page.$('h2');
        let innerText = await savedRecipes.getProperty('innerText');
        let text = innerText['_remoteObject'].value;
        expect(text).toBe('Saved Recipes');

        //reload page
        await page.reload();

        //check if page is index page after reload
        let new_savedRecipes = await page.$('h2');
        let new_innerText = await new_savedRecipes.getProperty('innerText');
        let new_text = new_innerText['_remoteObject'].value;
        expect(new_text).toBe('Saved Recipes');
    });
});

describe('onBoarding preference-setting test', () => {
  beforeAll(async () => {
      await page.goto('http://cse110-group30-affd4.web.app/onBoardingPage.html');
  });

  /**
   * Saving onBoarding page as dairy-free and vegan (left div) and reload onBoarding page
   * shows up in add recipe page, search page, and settings page
   * expected to store nothing
   */
it('set onBoarding preferences and reload before save', async () => {
  console.log('set onBoarding preferences and reload before save');

  /**
   * Set preference from onBoarding page
   */
  let checkboxes = await page.$$('label');
  await checkboxes[0].click();
  await checkboxes[2].click();
  
  //reload page
  await page.reload();
  
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

describe('onBoarding preference-setting test', () => {
  beforeAll(async () => {
      await page.goto('http://cse110-group30-affd4.web.app/onBoardingPage.html');
  });

  /**
   * Saving onBoarding page as dairy-free and vegan (left div), save and reload
   * shows up in add recipe page, search page, and settings page
   * expected to show dairy-free and vegan
   */
it('onBoarding preferences set from left div', async () => {
  console.log('set onBoarding preferences from left div');

  /**
   * Set preference from onBoarding page
   */
  let checkboxes = await page.$$('label');
  await checkboxes[0].click();
  await checkboxes[2].click();
  let button = await page.$('button');
  await button.click();

  //reload page
  await page.reload();
  
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