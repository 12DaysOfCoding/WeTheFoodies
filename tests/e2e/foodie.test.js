describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto('http://cse110-group30-affd4.web.app/recipe-search.html');
    const begin_button = await page.$('.save');
    if (begin_button) {
      await begin_button.click();
      await page.waitForNavigation();
      await page.goto('http://cse110-group30-affd4.web.app/recipe-search.html');
    }
    await page.type('#search-field', 'pizza');
    const search_button = await page.$('#search-button');
    await search_button.click();
    await page.waitForTimeout(1500);
    const card = await page.$('recipe-card');
    await card.click();
    await page.waitForNavigation();
    await page.goto('https://cse110-group30-affd4.web.app/foodie.html');
  });

  // check page loads
  it('initializes heading', async () => {
    let heading = await page.$$('h1');
    let text = await heading[0].getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("FOODIE MODE");
  });
  /**
   * Check initial buttons
   */
  it('initializes prev and next buttons', async () => {
    let buttons = await page.$$('button');

    const prevBtn = await buttons[0].getProperty('innerText');
    let prevBtnClass = await (await buttons[0].getProperty('className')).jsonValue();
    expect(prevBtn['_remoteObject'].value).toContain("Prev");
    expect(prevBtnClass).toContain('hidden');

    const nextBtn = await buttons[1].getProperty('innerText');
    expect(nextBtn['_remoteObject'].value).toContain("Next");
  });
  /**
   * Check buttons after 'Next' click
   */
  it('displays prev button after first next click', async () => {
    let buttons = await page.$$('button');

    const nextBtn = await buttons[1];
    await nextBtn.click();

    let prevBtnClass = await (await buttons[0].getProperty('className')).jsonValue();
    expect(prevBtnClass).toBe('');
  });
});
  
  