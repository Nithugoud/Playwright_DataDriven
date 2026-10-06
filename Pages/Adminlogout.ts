import { Locator, Page } from "@playwright/test"

export class Adminlogout{
    page:Page
    readonly ClickLogout:Locator
    constructor(page:Page)
    {
        this.page=page
        this.ClickLogout = page.locator('li#mi_logout')
    }
    async ERPlogout()
    {
        await this.ClickLogout.waitFor()
        await this.ClickLogout.click()
    }
}