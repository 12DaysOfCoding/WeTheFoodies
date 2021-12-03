describe('Basic user flow for Recipe Add page', () => {
	beforeAll(async () => {
		await page.goto('http://127.0.0.1:5500/source/recipe-add.html');
	});

  /**
   * Check click back to dashboard
   */
  it('Check go dashboard', async () => {
    console.log('Checking go dashboard');
    let sections = await page.$$('section');
    let divs = await sections[1].$$('div');
    await Promise.all([
      divs[0].click(),
      page.waitForNavigation(),
    ]);
    let saved_recipe = await page.$('h2');
    let text = await saved_recipe.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("Saved Recipes");
    await page.goto('http://127.0.0.1:5500/source/recipe-add.html');
  });


  /**
   * Check click go search
   */
  it('Check go search', async () => {
    console.log('Checking go search');
    let sections = await page.$$('section');
    let divs = await sections[1].$$('div');
    await Promise.all([
      divs[1].click(),
      page.waitForNavigation(),
    ]);
    let applyFilters = await page.$('#apply-filters');
    let innerText = await applyFilters.getProperty('innerText');
    let text = innerText['_remoteObject'].value;
    expect(text).toBe("APPLY FILTERS");
    await page.goto('http://127.0.0.1:5500/source/recipe-add.html');
  });

  /**
   * Check click go add
   */
  it('Check go add', async () => {
    console.log('Checking go add');
    let sections = await page.$$('section');
    let divs = await sections[1].$$('div');
    await Promise.all([
      divs[2].click(),
      page.waitForNavigation(),
    ]);
    let label = await page.$('label');
    let text = await label.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("NAME: ");
    await page.goto('http://127.0.0.1:5500/source/recipe-add.html');
  });

  /**
   * Check click go setting
   */
  it('Check go setting', async () => {
    console.log('Checking go setting');
    let sections = await page.$$('section');
    let divs = await sections[1].$$('div');
    await Promise.all([
      divs[3].click(),
      page.waitForNavigation(),
    ]);
    // TODO: check the page after implementing settings page
    await page.goto('http://127.0.0.1:5500/source/recipe-add.html');
  });

  /**
   * Check click back to dashboard
   */
  it('Check go dashboard', async () => {
    console.log('Checking go dashboard');
    let sections = await page.$$('section');
    let divs = await sections[1].$$('div');
    await Promise.all([
      divs[0].click(),
      page.waitForNavigation(),
    ]);
    let saved_recipe = await page.$('h2');
    let text = await saved_recipe.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("Saved Recipes");
    await page.goto('http://127.0.0.1:5500/source/recipe-add.html');
  });


  /**
   * Check click go search
   */
  it('Check go search', async () => {
    console.log('Checking go search');
    let sections = await page.$$('section');
    let divs = await sections[1].$$('div');
    await Promise.all([
      divs[1].click(),
      page.waitForNavigation(),
    ]);
    let applyFilters = await page.$('#apply-filters');
    let innerText = await applyFilters.getProperty('innerText');
    let text = innerText['_remoteObject'].value;
    expect(text).toBe("APPLY FILTERS");
    await page.goto('http://127.0.0.1:5500/source/recipe-add.html');
  });

  /**
   * Check click go add
   */
  it('Check go add', async () => {
    console.log('Checking go add');
    let sections = await page.$$('section');
    let divs = await sections[1].$$('div');
    await Promise.all([
      divs[2].click(),
      page.waitForNavigation(),
    ]);
    let label = await page.$('label');
    let text = await label.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("NAME: ");
    await page.goto('http://127.0.0.1:5500/source/recipe-add.html');
  });

  /**
   * Check click go setting
   */
  it('Check go setting', async () => {
    console.log('Checking go setting');
    let sections = await page.$$('section');
    let divs = await sections[1].$$('div');
    await Promise.all([
      divs[3].click(),
      page.waitForNavigation(),
    ]);
    // TODO: check the page after implementing settings page
    await page.goto('http://127.0.0.1:5500/source/recipe-add.html');
  });

	/**
	 * Initialize Add Recipe Page
	 */
   it('Initialize Add Recipe Page', async () => {
		console.log('Checking if page loads');
    let label = await page.$('label');
    let text = await label.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("NAME: ");
	});

  /**
	 * Add three lines for ingredients (id: 2 - 4)
	 */
  it('Add three lines for ingredients', async () => {
		console.log('Checking addIngredient');
		let button = await page.$('.ingredientButton');
		await button.click();
		await button.click();
    await button.click();
		let list = await page.$$('#ingredientOrderedList > li');
		expect(list.length).toBe(4);
	});

  /**
	 * Delete line 3 for ingredients (id: 3)
	 */
  it('Delete line 3 for ingredients', async () => {
		console.log('Checking deleteIngredient');
		let img = await page.$('#delete-ingredient-3');
    await img.click();
		let list = await page.$$('#ingredientOrderedList > li');
		expect(list.length).toBe(3);
    let id = await list[1].getProperty('id');
    expect(id['_remoteObject'].value).toBe('ingredient-2');
    id = await list[2].getProperty('id');
    expect(id['_remoteObject'].value).toBe('ingredient-4');
	});

  /**
	 * Delete line 2-3 for ingredients (id: 2, 4)
	 */
  it('Delete line 2-3 for ingredients', async () => {
		console.log('Checking deleteIngredient');
		let imgs = await page.$$('li > img');
		for (let i = 0; i < imgs.length; i += 1){
      await imgs[i].click();
    }
		let list = await page.$$('#ingredientOrderedList > li');
		expect(list.length).toBe(1);
	});



  /**
	 * Add three lines for instructions (id: 2 - 4)
	 */
   it('Add three lines for instructions', async () => {
		console.log('Checking addInstruction');
		let button = await page.$('.instructionButton');
		await button.click();
		await button.click();
    await button.click();
		let list = await page.$$('#instructionOrderedList > li');
		expect(list.length).toBe(4);
	});

  /**
	 * Delete line 3 for instructions (id: 3)
	 */
  it('Delete line 3 for instructions', async () => {
		console.log('Checking deleteInstruction');
		let img = await page.$('#delete-instruction-3');
    await img.click();
		let list = await page.$$('#instructionOrderedList > li');
		expect(list.length).toBe(3);
    let id = await list[1].getProperty('id');
    expect(id['_remoteObject'].value).toBe('instruction-2');
    id = await list[2].getProperty('id');
    expect(id['_remoteObject'].value).toBe('instruction-4');
	});

  /**
	 * Delete line 2-3 for instructions (id: 2, 4)
	 */
  it('Delete line 2-3 for instructions', async () => {
		console.log('Checking deleteInstruction');
		let imgs = await page.$$('li > img');
		for (let i = 0; i < imgs.length; i += 1){
      await imgs[i].click();
    }
		let list = await page.$$('#instructionOrderedList > li');
		expect(list.length).toBe(1);
	});

  /**
   * Check go search after reload
   */
  it('Check go search after reload', async () => {
    console.log('Checking go search after reload');
    await page.reload();
    let sections = await page.$$('section');
    let divs = await sections[1].$$('div');
    await Promise.all([
      divs[1].click(),
      page.waitForNavigation(),
    ]);
    let applyFilters = await page.$('#apply-filters');
    let innerText = await applyFilters.getProperty('innerText');
    let text = innerText['_remoteObject'].value;
    expect(text).toBe("APPLY FILTERS");
    await page.goto('http://127.0.0.1:5500/source/recipe-add.html');
  });

  /**
   * Check go dashboard after reload
   */
   it('Check go dashboard after reload', async () => {
    console.log('Checking go dashboard after reload');
    await page.reload();
    let sections = await page.$$('section');
    let divs = await sections[1].$$('div');
    await Promise.all([
      divs[0].click(),
      page.waitForNavigation(),
    ]);
    let saved_recipe = await page.$('h2');
    let text = await saved_recipe.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("Saved Recipes");
    await page.goto('http://127.0.0.1:5500/source/recipe-add.html');
  });

  /**
   * Check click go add after reload
   */
   it('Check go add after reload', async () => {
    console.log('Checking go add after reload');
    await page.reload();
    let sections = await page.$$('section');
    let divs = await sections[1].$$('div');
    await Promise.all([
      divs[2].click(),
      page.waitForNavigation(),
    ]);
    let label = await page.$('label');
    let text = await label.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("NAME: ");
    await page.goto('http://127.0.0.1:5500/source/recipe-add.html');
  });

  /**
   * Check click go setting after reload
   */
   it('Check go setting after reload', async () => {
    console.log('Checking go setting after reload');
    await page.reload();
    let sections = await page.$$('section');
    let divs = await sections[1].$$('div');
    await Promise.all([
      divs[3].click(),
      page.waitForNavigation(),
    ]);
    // TODO: check the page after implementing settings page
    await page.goto('http://127.0.0.1:5500/source/recipe-add.html');
  });

  /**
	 * Add three lines for ingredients (id: 2 - 4)
	 */
   it('Add three lines and reload', async () => {
		console.log('Checking addIngredient');
		let button = await page.$('.ingredientButton');
		await button.click();
		await button.click();
    await button.click();
		let list = await page.$$('#ingredientOrderedList > li');
		expect(list.length).toBe(4);

    await page.reload();
    let new_list = await page.$$('#instructionOrderedList > li');
		expect(new_list.length).toBe(1);

	});

});
