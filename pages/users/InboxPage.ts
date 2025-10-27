import { Page, Locator, expect } from '@playwright/test';

export class InboxPage {
  readonly page: Page;
  readonly exploreMoreBtn: Locator;
  readonly searchInput: Locator;
  readonly groupCard: Locator;
  readonly inboxLink : Locator;

  constructor(page: Page) {
    this.page = page;
    this.exploreMoreBtn = page.getByRole('button', { name: "Explore More" });
    this.searchInput = page.locator('input[placeholder="Search conversations..."]');
    this.inboxLink = page.locator('a[href="/portal/inbox"]');
    this.groupCard = page.locator('div.group') 
  }

  async searchGroups(groupName: string) {
    await this.inboxLink.click()
    await this.exploreMoreBtn.click()
    await this.searchInput.fill(groupName);
  }

  async joinGroups(groupName : string){
    await this.inboxLink.click()
    await this.exploreMoreBtn.click()
    const groupdiv = await this.page.locator('div.group', { hasText: groupName });
    await groupdiv.locator('button:has-text("Join Group")').click();
    await expect(this.page.getByText(groupName)).toBeVisible({timeout :10000})
  }

  async assertGroupVisible(groupName: string) {
    const matches = this.page.locator('div.group h3', { hasText: groupName });
    await expect(matches.first()).toBeVisible({ timeout: 10000 });
  }
}
