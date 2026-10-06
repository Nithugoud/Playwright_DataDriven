import { expect, Locator, Page } from "@playwright/test";

export class Adminloginpage{
    page:Page
    readonly UsernameInput:Locator
    readonly PasswordInput:Locator
    readonly LoginButton:Locator
    HomepageIdentifier:Locator

    constructor(page:Page)
     {
        this.page = page
        this.UsernameInput = page.getByRole('textbox',{ name: 'User Name' })
        this.PasswordInput = page.getByRole('textbox',{ name: 'Password' })
        this.LoginButton = page.locator('#btnsubmit')
        this.HomepageIdentifier = page.locator('#ewBreadcrumb2')
     }

     async launchUrl(Url:string)
     {
        if (!Url) {
            throw new Error('BASE_URL is missing. Set BASE_URL in your .env file before running the tests.')
        }

        await this.page.goto(Url, { waitUntil: 'domcontentloaded', timeout: 30000 })
     }

    async ERPLogin(User:string, pass:string)
    {
         await expect(this.UsernameInput).toBeVisible({ timeout: 15000 })
         await this.UsernameInput.clear()
         await this.UsernameInput.fill(User)
         await this.PasswordInput.clear()
         await this.PasswordInput.fill(pass)
         await this.LoginButton.click()
         await expect(this.HomepageIdentifier).toBeVisible({ timeout: 20000 })
    }
}