describe('Basic user flow for Recipe Add page', () => {
	beforeAll(async () => {
		await page.goto('http://cse110-group30-affd4.web.app/recipe-add.html');
		const begin_button = await page.$('.save');
    if (begin_button) {
      await begin_button.click();
      await page.waitForNavigation();
			await page.goto('http://cse110-group30-affd4.web.app/recipe-add.html');
    }
	});

	/**
	 * Initialize Add Recipe Page
	 */
   it('Initialize Add Recipe Page', async () => {
		// console.log('Checking if page loads');
    let label = await page.$('label');
    let text = await label.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("NAME: ");
	});

  /**
	 * Add three lines for ingredients (id: 2 - 4)
	 */
  it('Add three lines for ingredients', async () => {
		// console.log('Checking addIngredient');
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
		// console.log('Checking deleteIngredient');
		let img = await page.$('#delete-ingredient-3');
    await img.click();
		let list = await page.$$('#ingredientOrderedList > li');
		expect(list.length).toBe(3);
    let id = await list[1].getProperty('id');
    expect(id['_remoteObject'].value).toBe('ingredientNode-2');
    id = await list[2].getProperty('id');
    expect(id['_remoteObject'].value).toBe('ingredientNode-4');
	});

  /**
	 * Delete line 2-3 for ingredients (id: 2, 4)
	 */
  it('Delete line 2-3 for ingredients', async () => {
		// console.log('Checking deleteIngredient');
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
		// console.log('Checking addInstruction');
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
		// console.log('Checking deleteInstruction');
		let img = await page.$('#delete-instruction-3');
    await img.click();
		let list = await page.$$('#instructionOrderedList > li');
		expect(list.length).toBe(3);
    let id = await list[1].getProperty('id');
    expect(id['_remoteObject'].value).toBe('instructionNode-2');
    id = await list[2].getProperty('id');
    expect(id['_remoteObject'].value).toBe('instructionNode-4');
	});

  /**
	 * Delete line 2-3 for instructions (id: 2, 4)
	 */
  it('Delete line 2-3 for instructions', async () => {
		// console.log('Checking deleteInstruction');
		let imgs = await page.$$('li > img');
		for (let i = 0; i < imgs.length; i += 1){
      await imgs[i].click();
    }
		let list = await page.$$('#instructionOrderedList > li');
		expect(list.length).toBe(1);
	});

  /**
	 * Add three lines for ingredients (id: 2 - 4)
	 */
   it('Add three lines and reload', async () => {
		// console.log('Checking addIngredient');
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
