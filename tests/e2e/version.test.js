/**
 * check version page 
 */
 describe('check version page', () => {

    /**
     * go to version page
     */
    beforeAll(async () => {
      await page.goto('http://cse110-group30-affd4.web.app/version.html');
    });
  
    it('check version page', async () => {
      console.log('check version page')

      let version = await page.$("#v-text");
      let innerText = await version.getProperty('innerText');
      let text = innerText['_remoteObject'].value;
      expect(text).toBe("Version beta 1.0");
    });
  });
  
  /**
   * check version page after reload
   */
   describe('check version page after reload', () => {

    /**
     * go to version page
     */
    beforeAll(async () => {
      await page.goto('http://cse110-group30-affd4.web.app/version.html');
    });
  
    it('check version page after reload', async () => {
      let version = await page.$("#v-text");
      let innerText = await version.getProperty('innerText');
      let text = innerText['_remoteObject'].value;
      expect(text).toBe("Version beta 1.0");

      //reload page  
      await page.reload();

  
      let new_version = await page.$("#v-text");
      let new_innerText = await new_version.getProperty('innerText');
      let new_text = new_innerText['_remoteObject'].value;
      expect(new_text).toBe("Version beta 1.0");
    });
  });