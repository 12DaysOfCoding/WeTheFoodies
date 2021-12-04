describe('Basic user flow for Recipe detail page', () => {
	beforeAll(async () => {
		await page.goto('http://cse110-group30-affd4.web.app/recipe-search.html');
		await page.type('#search-field', 'pizza');
		const search_button = await page.$('#search-button');
		await search_button.click();
		await page.waitForTimeout(1500);
		const card = await page.$('recipe-card');
		await card.click();
		await page.waitForNavigation();
	});

	/**
	 * Check initial recipe card
	 */
	it('Initial Recipe detail Page', async () => {
		// console.log('Checking if page loads');
		let ingredients = await page.$('h1');
		let text = await ingredients.getProperty('innerText');
		expect(text['_remoteObject'].value).toBe("Recipe Detail");
	});

	/**
	 * Check initial recipe card after reload
	 */
	 it('Initial Recipe detail Page after reload', async () => {
		// console.log('Checking if page loads after reload');
		let ingredients = await page.$('h1');
		let text = await ingredients.getProperty('innerText');
		expect(text['_remoteObject'].value).toBe("Recipe Detail");

		await page.reload();
		let new_ingredients = await page.$('h1');
		let new_text = await new_ingredients.getProperty('innerText');
		expect(new_text['_remoteObject'].value).toBe("Recipe Detail");
	});
	
	/**
	 * Check click save the button change to saved
	 */
	it('Check save or saved', async () => {
		// console.log('Checking the "save" button...');
		// before click
		let buttonP = await page.$('#save-or-not');
		let innerText = await buttonP.getProperty('innerText');
		let text = innerText['_remoteObject'].value;
		expect(text).toBe("SAVE");

		// click
		let save_button = await page.$('.save');
		await save_button.click();
		page.waitForTimeout(500);
		// after click
		buttonP = await page.$('#save-or-not');
		innerText = await buttonP.getProperty('innerText');
		text = innerText['_remoteObject'].value;
		expect(text).toBe("SAVED");

		// click again
		await save_button.click();
		page.waitForTimeout(500);
		buttonP = await page.$('#save-or-not');
		innerText = await buttonP.getProperty('innerText');
		text = innerText['_remoteObject'].value;
		expect(text).toBe("SAVE");
	});

	/**
	 * Check foodie mode
	 */
	it('Check entering foodie mode', async () => {
        let foodie = await page.$('#foodie-mode');
		await Promise.all([
			foodie.click(),
			page.waitForNavigation(),
		]);
		let step = await page.$('#step-num');
		let innerText = await step.getProperty('innerText');
		let text = innerText['_remoteObject'].value;
		expect(text).toBe('STEP 1');
	});

	it('Check foodie mode next button', async () => {
        let next = await page.$('#next');
		await next.click();
		let step = await page.$('#step-num');
		let innerText = await step.getProperty('innerText');
		let text = innerText['_remoteObject'].value;
		expect(text).toBe('STEP 2');
	});

	it('Check foodie mode prev button', async () => {
        let prev = await page.$('#prev');
		await prev.click();
		let step = await page.$('#step-num');
		let innerText = await step.getProperty('innerText');
		let text = innerText['_remoteObject'].value;
		expect(text).toBe('STEP 1');
	});

	it('Check exiting foodie mode', async () => {
        let exit = await page.$('#exit');
		await Promise.all([
			exit.click(),
			page.waitForNavigation(),
		]);
		let recipeDetail = await page.$('h1');
		let innerText = await recipeDetail.getProperty('innerText');
		let text = innerText['_remoteObject'].value;
		expect(text).toBe('Recipe Detail');
	});
});
