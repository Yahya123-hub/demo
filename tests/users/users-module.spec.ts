import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/users/LoginPage';
import { testData } from '../fixtures/testData';
import { InboxPage } from '../../pages/users/InboxPage';
import { ExpertPage } from '../../pages/users/ExpertPage';
import { JournalPage } from '../../pages/users/JournalPage';


test.describe('Expert tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      testData.login.Email,
      testData.login.Password
    );
    await loginPage.expectLoginSuccess();
  });
 
  //use serial for order

  test.skip('User can search groups', async ({ page }) => {
    const Inboxpage = new InboxPage(page);
    await Inboxpage.searchGroups(testData.Groupsearchquery.text.query)
    await Inboxpage.assertGroupVisible(testData.Groupsearchquery.text.query);
    
  });

  test.skip('User can join groups', async ({ page }) => {
    const Inboxpage = new InboxPage(page);
    await Inboxpage.joinGroups(testData.Grouptojoin.text.name)
  });

  test.skip('User can book a consultation', async ({ page }) => { 
    const Expertpage = new ExpertPage(page);
    await Expertpage.bookConsultation(
    testData.expert.name,
    testData.consultation.name,
    testData.stripe,
    )
  });

  test.skip('User can enroll in group coaching', async ({ page }) => { 
    const Expertpage = new ExpertPage(page);
    await Expertpage.enrollGroupCoaching(
    testData.expertfor_groupenrollment.name,
    testData.groupcoachingevent.name,
    testData.stripe,
    )
  });

  test.skip('User can enroll in program', async ({ page }) => { 
    const Expertpage = new ExpertPage(page);
    await Expertpage.enrollProgram(
    testData.expertfor_programenrollment.name,
    testData.program.name,
    )
  }); 

  test.skip('User can add thoughts with selected dates', async ({ page }) => {
    const journal = new JournalPage(page);
    await journal.addThoughtWithDate(testData.journalTestData);
    
  });
  






});
