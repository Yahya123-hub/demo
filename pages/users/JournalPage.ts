import { Page, Locator, expect } from '@playwright/test';

export class JournalPage {
  readonly page: Page;
  readonly thoughtsTextarea: Locator;
  readonly submitBtn: Locator;
  readonly changeDateBtn: Locator;
  readonly pastDiaries: Locator;
  readonly datePicker: Locator; 
  readonly checkInBtn : Locator;
  readonly journalBtn : Locator;

  constructor(page: Page) {
    this.page = page;

    this.thoughtsTextarea = page.getByPlaceholder('Write your thoughts here...');
    this.submitBtn = page.getByRole('button', { name: 'Submit My Thoughts', exact: true });
    this.changeDateBtn = page.getByText('Change Date', { exact: true });
    this.pastDiaries = page.locator('div.space-y-4'); 
    this.datePicker = page.locator('input[type="date"]'); 
    this.checkInBtn = page.getByText("Check In", {exact:true})
    this.journalBtn = page.getByText("Journal", {exact:true})

  }

  async addThoughtWithDate(data: {
  date: { month: string; day: string },
  thought: string
  }) {
 
    await this.checkInBtn.click()
    await this.journalBtn.click()
    await this.changeDateBtn.click();
    
  await expect(this.page.locator('.MuiPickersCalendarHeader-label')).toHaveText(data.date.month, {
    timeout: 5000,
  });

  await this.page.getByRole('gridcell', { name: data.date.day, exact: true }).click();

  await this.thoughtsTextarea.fill(data.thought);
  await this.submitBtn.click();

  const diaryEntry = this.pastDiaries.locator('div', {
      has: this.page.getByText(data.date.day),
  });

  await expect(diaryEntry.getByText(data.thought, { exact: true })).toBeVisible({
      timeout: 10000,
  });
  }
}
