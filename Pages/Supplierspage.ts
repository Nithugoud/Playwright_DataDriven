import { expect, Locator, Page } from "@playwright/test";
import { count } from "console";
export class SuppliersPage{
    //declare properties for suppliers
    page:Page
    readonly ClickSuppliersLink:Locator
    readonly ClikAddIconButton:Locator
    readonly supplierNumber:Locator
    readonly supplierNameInput:Locator
    readonly supplierAddress :Locator
    readonly supplierCity:Locator
    readonly supplierCountry:Locator
    readonly SupplierContactPerson : Locator
    readonly supplierPhoneNumber:Locator
    readonly supplierEmail: Locator
    readonly supplierMobileNumber:Locator
    readonly supplierNotes:Locator
    readonly clickAddButton:Locator
    readonly clickConformOk:Locator
    readonly clickAlertOk: Locator
    readonly searchPanel:Locator
    readonly searchTextbox: Locator
    readonly seacrhButton :Locator
    //readonly SupplierGrid:Locator
    private expNumber!: string
    constructor(page:Page)
    {
        this.page=page
        this.ClickSuppliersLink = page.locator('#mi_a_suppliers')
        this.ClikAddIconButton = page.locator('span[data-caption="Add"]').first()
        this.supplierNumber = page.getByLabel('Supplier Number')
        this.supplierNameInput= page.getByPlaceholder('Supplier Name')
        this.supplierAddress = page.getByPlaceholder('Address')
        this.supplierCity = page.getByPlaceholder('City')
        this.supplierCountry = page.getByPlaceholder('Country')
        this.SupplierContactPerson = page.getByPlaceholder('Contact Person')
        this.supplierPhoneNumber = page.getByPlaceholder('Phone Number')
        this.supplierEmail = page.getByPlaceholder('Email')
        this.supplierMobileNumber = page.getByPlaceholder('Mobile Number')
        this.supplierNotes = page.getByPlaceholder('Notes')
        this.clickAddButton = page.locator('#btnAction')
        this.clickConformOk = page.locator('button.ajs-button.btn.btn-primary')
        this.clickAlertOk = page.locator('button.ajs-button.btn.btn-primary')
        this.searchPanel = page.locator('[data-caption="Search Panel"]')
        this.searchTextbox = page.locator('#psearch')
        this.seacrhButton =page.locator('#btnsubmit')
    }
    //method for navigate to supplier add page
    async NavigateToSupplier()
    {
        await this.ClickSuppliersLink.waitFor()
        await this.ClickSuppliersLink.click()
        await this.ClikAddIconButton.waitFor()
        await this.ClikAddIconButton.click()
    }
    //method for fill supplier deatils
    async AddSupplierDeatils(sname:string,address:string,city:string,country:string,
        cperson:string,pnumber:string,email:string,mnumber:string,notes:string)
        {
             await this.supplierNumber.waitFor()
            this.expNumber = await this.supplierNumber.inputValue()
            await this.supplierNameInput.fill(sname)
            await this.supplierAddress.fill(address)
            await this.supplierCity.fill(city)
            await this.supplierCountry.fill(country)
            await this.SupplierContactPerson.fill(cperson)
            await this.supplierPhoneNumber.fill(pnumber)
            await this.supplierEmail.fill(email)
            await this.supplierMobileNumber.fill(mnumber)
            await this.supplierNotes.fill(notes)
            await this.clickAddButton.click()
        }
        //method for confirm and alert dialog
        async handleAlerts()
        {
            await this.clickConformOk.waitFor()
            await this.clickConformOk.click()
            await this.clickAlertOk.waitFor()
            await this.clickAlertOk.click()
        }
        //method for supplier table
         async supplierTable() {

        if (!await this.searchTextbox.isVisible()) {
            await this.searchPanel.click();
        }
         await this.searchTextbox.clear()
        await this.searchTextbox.fill(this.expNumber)

        await this.seacrhButton.click();

        const supplierRow =this.page.locator('#tbl_a_supplierslist tbody tr',
                {
                    hasText: this.expNumber
                })

        await expect(supplierRow).toBeVisible();

        console.log(`Supplier Number Found in Table: ${this.expNumber}`)
        await expect(supplierRow).toContainText(this.expNumber)
    }


}