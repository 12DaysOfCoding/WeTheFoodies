/**
 * Check search filter
 */
 describe('recipe-searchPage load test', () => {
  beforeAll(async () => {
    await page.goto('http://cse110-group30-affd4.web.app/recipe-search.html');
  });

  it('loads filter button', async () => {
    let text_check = await page.$('#apply-filters');
    let text = await text_check.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("APPLY FILTERS");
  });

  it('loads search button', async () => {
    let text_check = await page.$('.nav-search #nav-dashboard-text');
    let text = await text_check.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("SEARCH");
  });
});