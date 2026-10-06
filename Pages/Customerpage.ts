import { expect, Locator, Page } from "@playwright/test"

export class CustomersPage{
     //declare properties for suppliers
        page:Page
        readonly ClickcustomersLink:Locator
        readonly ClikAddIconButton:Locator
        readonly customerNumber:Locator
        readonly customerNameInput:Locator
        readonly customerAddress :Locator
        readonly customerCity:Locator
        readonly customerCountry:Locator
        readonly customerContactPerson : Locator
        readonly customerPhoneNumber:Locator
        readonly customerEmail: Locator
        readonly customerMobileNumber:Locator
        readonly customerNotes:Locator
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
            this.ClickcustomersLink = page.locator('#mi_a_customers')
            this.ClikAddIconButton = page.locator('span[data-caption="Add"]').first()
            this.customerNumber = page.getByLabel('Customer Number')
            this.customerNameInput= page.getByPlaceholder('Customer Name')
            this.customerAddress = page.getByPlaceholder('Address')
            this.customerCity = page.getByPlaceholder('City')
            this.customerCountry = page.getByPlaceholder('Country')
            this.customerContactPerson = page.getByPlaceholder('Contact Person')
            this.customerPhoneNumber = page.getByPlaceholder('Phone Number')
            this.customerEmail = page.getByPlaceholder('Email')
            this.customerMobileNumber = page.getByPlaceholder('Mobile Number')
            this.customerNotes = page.getByPlaceholder('Notes')
            this.clickAddButton = page.locator('#btnAction')
            this.clickConformOk = page.locator('button.ajs-button.btn.btn-primary')
            this.clickAlertOk = page.locator('button.ajs-button.btn.btn-primary')
            this.searchPanel = page.locator('[data-caption="Search Panel"]')
            this.searchTextbox = page.locator('#psearch')
            this.seacrhButton =page.locator('#btnsubmit')
        }
        //method for navigate to supplier add page
        async NavigateToCustomer()
        {
            await this.ClickcustomersLink.waitFor()
            await this.ClickcustomersLink.click()
            await this.ClikAddIconButton.waitFor()
            await this.ClikAddIconButton.click()
        }
        //method for fill customer deatils
        async AddcustomerDeatils(cname:string,address:string,city:string,country:string,
            cperson:string,pnumber:string,email:string,mnumber:string,notes:string)
            {
                 await this.customerNumber.waitFor()
                this.expNumber = await this.customerNumber.inputValue()
                await this.customerNameInput.fill(cname)
                await this.customerAddress.fill(address)
                await this.customerCity.fill(city)
                await this.customerCountry.fill(country)
                await this.customerContactPerson.fill(cperson)
                await this.customerPhoneNumber.fill(pnumber)
                await this.customerEmail.fill(email)
                await this.customerMobileNumber.fill(mnumber)
                await this.customerNotes.fill(notes)
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
            //method for customer table
             async customerTable() {
    
            if (!await this.searchTextbox.isVisible()) {
                await this.searchPanel.click();
            }
             await this.searchTextbox.clear()
            await this.searchTextbox.fill(this.expNumber)
    
            await this.seacrhButton.click();
    
            const customerRow =this.page.locator('#tbl_a_customerslist tbody tr',
                    {
                        hasText: this.expNumber
                    })
    
            await expect(customerRow).toBeVisible();
    
            console.log(`Customer Number Found in Table: ${this.expNumber}`)
            await expect(customerRow).toContainText(this.expNumber)
        }
    
    
}