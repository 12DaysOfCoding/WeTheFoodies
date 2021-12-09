/**
 * go to setting page from dashboard
 */
describe('go to setting', () => { 
  beforeAll(async () => {
    await page.goto('http://cse110-group30-affd4.web.app/index.html');
    const begin_button = await page.$('.save');
    if (begin_button) {
      await begin_button.click();
      await page.waitForNavigation();
      await page.goto('http://cse110-group30-affd4.web.app/index.html');
    }
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