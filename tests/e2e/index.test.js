describe('Navigating the web app', () => {
    beforeAll(async () => {
      await page.goto('https://cse110-group30-affd4.web.app/');
    });
  
    it('Clicking on search goes to search page', async () => {
		let navSearch = await page.$('.nav-search');
		await Promise.all([
			navSearch.click(),
			page.waitForNavigation(),
		]);
		let dietaryRestrictions = await page.$('.word');
		let innerText = await dietaryRestrictions.getProperty('innerText');
		let text = innerText['_remoteObject'].value;
		expect(text).toBe('Dietary Restrictions');
	});

    it('Clicking on add goes to add recipe page', async () => {
		let addRecipe = await page.$('.nav-add');
		await Promise.all([
			addRecipe.click(),
			page.waitForNavigation(),
		]);
		let form = await page.$('form');
        let label = await form.$('label');
		let innerText = await label.getProperty('innerText');
		let text = innerText['_remoteObject'].value;
		expect(text).toBe('NAME: ');
	});

    it('Clicking on settings goes to settings page', async () => {
		let settings = await page.$('.nav-settings');
		await Promise.all([
			settings.click(),
			page.waitForNavigation(),
		]);
		let body = await page.$('.settings-body');
        let divs = await body.$$('div');
		expect(divs.length).toBe(3);
	});

	it('Clicking on dashboard goes to dashboard page', async () => {
		let dashboard = await page.$('.nav-dashboard');
		await Promise.all([
			dashboard.click(),
			page.waitForNavigation(),
		]);
		let savedRecipes = await page.$('h2');
        let innerText = await savedRecipes.getProperty('innerText');
		let text = innerText['_remoteObject'].value;
		expect(text).toBe('Saved Recipes');
	});
  });