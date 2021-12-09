async function validate_checkboxes(checkbox_selector, boxes_to_check) {
  const checkboxes = await page.$$(checkbox_selector);
  for (let i = 0; i < checkboxes.length; i++) {
    let checked = await (await checkboxes[i].getProperty('checked')).jsonValue();
    expect(checked).toBe(boxes_to_check.includes(i));  // if it should be checked
  }
}

describe('onBoarding preference-setting test', () => {
    beforeAll(async () => {
      await page.goto('http://cse110-group30-affd4.web.app/onBoardingPage.html');
    });

    /**
     * Saving onBoarding page as dairy-free and vegan (left div)
     * shows up in add recipe page, search page, and settings page
     */
  it('onBoarding preferences set persistence', async () => {
    /**
     * Set preference from onBoarding page
     */
    const boxes_to_check = [0, 2, 5, 7];
    let checkboxes = await page.$$('label');
    for (let button of boxes_to_check)
      await checkboxes[button].click();
    let done = await page.$('button');
    await done.click();
    
    /**
     * check preference from recipe add page
     */
    await page.goto('https://cse110-group30-affd4.web.app/recipe-add.html');
    await validate_checkboxes(".diet-restrictionBox input", boxes_to_check);

    /**
     * check preference from recipe search page
     */
    await page.goto('https://cse110-group30-affd4.web.app/recipe-search.html');
    await validate_checkboxes(".diet-restrictionBox input", boxes_to_check);

    /**
     * check preference from preference setting page
     */
    await page.goto('https://cse110-group30-affd4.web.app/preference-setting.html');
    await validate_checkboxes(".diet-restrictionBox input", boxes_to_check);
  });
});
