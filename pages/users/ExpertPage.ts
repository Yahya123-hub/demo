
import { Page, expect, Locator, FrameLocator } from '@playwright/test';

export class ExpertPage {
  readonly page: Page;
  readonly expertsLink: Locator;
  readonly consultBtn: Locator;
  readonly buyNowBtn: Locator;
  readonly paySuccessMsg: Locator;
  readonly goHomeBtn: Locator;
  readonly inboxLink: Locator;
  readonly groupCoachingBtn : Locator;
  readonly stripeFrame: FrameLocator;
  readonly groupcoachingLink : Locator
  readonly consultLink : Locator;
  readonly programBtn : Locator;
  readonly myprogramBtn : Locator;
  readonly programLink : Locator;
  readonly beginprogramBtn : Locator

  constructor(page: Page) {
    this.page = page;
    this.expertsLink = page.locator('a[href="/portal/customer/lms/expert"]');
    this.groupcoachingLink = page.locator('a[href="/portal/customer/lms/group_coaching"]');
    this.consultBtn = page.locator('button:has-text("Consult")');
    this.programBtn = page.locator('button:has-text("Programs")');
    this.beginprogramBtn = page.locator('button:has-text("Begin Program")');
    this.myprogramBtn = page.locator('button:has-text("MY PROGRAMS")');
    this.programLink = page.locator('a[href="/portal/customer/lms/program"]')
    this.groupCoachingBtn = page.locator('button:has-text("Group Coaching")');
    this.buyNowBtn = page.getByText('Buy Now', { exact: true });
    this.paySuccessMsg = page.getByText('Payment Successful!', { exact: true });
    this.goHomeBtn = page.locator('button:has-text("Go to Home")');
    this.inboxLink = page.locator('a[href="/portal/inbox"]');
    this.consultLink = page.locator('a[href="/portal/customer/lms/consultation"]');
    this.stripeFrame = page.frameLocator('iframe[name="embedded-checkout"]');
  }

  async bookConsultation(
    expertName: string,
    consultationName: string,
    stripe: {
      email: string;
      cardNumber: string;
      expDate: string;
      cvc: string;
      billingName: string;
    }
  ) {
    await this.expertsLink.click();

    const expertCard = this.page.locator('div.p-4.flex.flex-col', {
      has: this.page.getByRole('heading', { name: expertName, exact:true }),
    });
    await expertCard.getByRole('button', { name: 'View Profile', exact: true }).first().click();

    await this.consultBtn.click();
    
    const consultCard = this.page.locator('div.p-4.flex.flex-col').filter({
      has: this.page.getByRole('heading', { name: consultationName, exact: true }),
    });

    await consultCard.getByRole('button', { name: 'Book Now', exact: true }).first().click();

    await this.buyNowBtn.click();
    await this.fillStripeForm(stripe);
    await this.goHomeBtn.click();

    await this.consultLink.click()
    await expect(this.page.getByText(consultationName, {exact :true})).toBeVisible({
      timeout: 10000,
    });

    await this.inboxLink.click();
    await expect(this.page.getByText(consultationName, {exact :true})).toBeVisible({
      timeout: 10000,
    });
    
  }

  private async fillStripeForm(stripe: {
  email: string;
  cardNumber: string;
  expDate: string;
  cvc: string;
  billingName: string;
  }) {

  
  await this.stripeFrame.locator('input#email').fill(stripe.email);
  await this.stripeFrame.locator('input#cardNumber').fill(stripe.cardNumber);
  await this.stripeFrame.locator('input#cardExpiry').fill(stripe.expDate);
  await this.stripeFrame.locator('input#cardCvc').fill(stripe.cvc);
  await this.stripeFrame.locator('input#billingName').fill(stripe.billingName);

  await this.stripeFrame.getByRole('button', { name: 'Pay', exact: true }).click();
  await expect(this.goHomeBtn).toBeVisible({ timeout: 15000 });
  await this.goHomeBtn.click();
  }

  async enrollGroupCoaching(
  expertName: string,
  groupName: string,
  stripe: {
  email: string;
  cardNumber: string;
  expDate: string;
  cvc: string;
  billingName: string;
  }
  ) {
  
  await this.expertsLink.click();

  const expertCard = this.page.locator('div.p-4.flex.flex-col', {
    has: this.page.getByRole('heading', { name: expertName, exact: true }),
  });
  await expertCard.getByRole('button', { name: 'View Profile', exact: true }).first().click();
  await this.groupCoachingBtn.click();

  const groupCard = this.page.locator('div.p-4.flex.flex-col').filter({
    has: this.page.getByRole('heading', { name: groupName, exact: true }),
  });
  await groupCard.getByRole('button', { name: 'Enroll Now', exact: true }).first().click();
  await this.buyNowBtn.click();
  await this.fillStripeForm(stripe);

  await this.groupcoachingLink.click();
  await expect(this.page.getByText(groupName, {exact:true})).toBeVisible({timeout:10000})

  await this.inboxLink.click();
  await expect(this.page.getByText(groupName, {exact:true})).toBeVisible({timeout:10000})

}


async enrollProgram(programName: string, expertName : string) {

  await this.expertsLink.click();

  const expertCard = this.page.locator('div.p-4.flex.flex-col', {
    has: this.page.getByRole('heading', { name: expertName, exact: true }),
  });
  await expertCard.getByRole('button', { name: 'View Profile', exact: true }).first().click();

  await this.programBtn.click();

  const programCard = this.page.locator('div.p-4.flex.flex-col', {
    has: this.page.getByRole('heading', { name: programName, exact: true }),
  });
  await programCard.getByRole('button', { name: 'Enroll Now', exact: true }).first().click();

  await this.beginprogramBtn.click();

  await expect(
    this.page.getByText('Program enrolled successfully', { exact: true })
  ).toBeVisible({ timeout: 10000 });

  await expect(
    this.page.getByText('InProgress', { exact: true })
  ).toBeVisible({ timeout: 10000 });

  await this.programLink.click();
  await this.myprogramBtn.click();

  await expect(
    this.page.getByText(programName, { exact: true })
  ).toBeVisible({ timeout: 10000 });
}


}

