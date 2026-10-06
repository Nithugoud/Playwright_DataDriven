import {Page,expect, Locator} from "@playwright/test"
export class StockitemPage{
    Page:Page
    readonly ClickStock:Locator
    readonly ClickAddIcon:Locator
    readonly stockCategory:Locator
    readonly SupplierNumber:Locator
    readonly stockNumber:Locator
    readonly stockName:Locator
    readonly unitOfMeasurement:Locator
    readonly PurchasingPrice:Locator
    readonly SellingPrice:Locator
    readonly Notes:Locator
    readonly ClickAddBtn:Locator
    readonly ClickConfirmOk:Locator
    readonly ClickAlertOk:Locator
    readonly ClickSearchPanel:Locator
    readonly EnterSearchSnumber:Locator
    readonly ClickSearchBtn:Locator
    readonly StockGrid:Locator
    private expNumber!: string;

    constructor(page:Page)
    {
        this.Page=page
        this.ClickStock = page.locator('li#mi_a_stock_items')
        this.ClickAddIcon = page.locator(".btn.btn-default.ewAddEdit.ewAdd.btn-sm").first()
        this.stockCategory = page.locator('#x_Category')
        this.SupplierNumber = page.locator('#x_Supplier_Number')
        this.stockNumber = page.locator('#x_Stock_Number')
        this.stockName = page.locator('#x_Stock_Name')
        this.unitOfMeasurement = page.locator('select#x_Unit_Of_Measurement')
        this.PurchasingPrice = page.locator('#x_Purchasing_Price')
        this.SellingPrice = page.locator('#x_Selling_Price')
        this.Notes = page.locator('#x_Notes')
        this.ClickAddBtn = page.locator("button[type='submit']")
        this.ClickConfirmOk = page.locator("button.ajs-button.btn.btn-primary").filter({ hasText: 'OK!' }).first()
        this.ClickAlertOk = page.locator("button.ajs-button.btn.btn-primary").filter({ hasText: 'OK!' }).nth(1)
        this.ClickSearchPanel = page.locator("span[data-caption='Search']")
        this.EnterSearchSnumber = page.locator("input#psearch")
        this.ClickSearchBtn = page.locator("button#btnsubmit")
        this.StockGrid = page.locator("#tbl_a_stock_itemslist>tbody>tr:nth-child(1)>td:nth-child(6)>div>span>span")
    }
    async NavigateToStock()
    {
        await this.ClickStock.waitFor()
        await this.ClickStock.click()
        await this.ClickAddIcon.waitFor()
        await this.ClickAddIcon.click()
    }
    async addStockDetails(
        stockCategory: string,
        supplierNumber: string,
        stockName: string,
        unitOfMeasurement: string,
        purchasingPrice: string,
        sellingPrice: string,
        notes: string
    ){
        await this.stockCategory.click()
        await this.stockCategory.selectOption(stockCategory)
        await this.SupplierNumber.click()
        await this.SupplierNumber.selectOption(supplierNumber)
        await this.stockNumber.waitFor()
        this.expNumber = await this.stockNumber.inputValue()
        await this.stockName.fill(stockName)
        // await this.unitOfMeasurement.waitFor()
         await this.unitOfMeasurement.click()
        await this.unitOfMeasurement.selectOption(unitOfMeasurement)
        await this.PurchasingPrice.fill(purchasingPrice)
        await this.SellingPrice.fill(sellingPrice)
        await this.Notes.fill(notes)
        await this.ClickAddBtn.click()
    }
    async confirmDialog(){
        const okButtons = this.Page.locator("button.ajs-button.btn.btn-primary").filter({ hasText: 'OK!' })
        await okButtons.first().waitFor({ state: 'visible', timeout: 15000 })
        await okButtons.first().click()

        await this.Page.waitForTimeout(500)
        if (await okButtons.count() > 1) {
            await okButtons.nth(1).waitFor({ state: 'visible', timeout: 15000 })
            await okButtons.nth(1).click()
        }
    }
    async stockTable(){
        if(!await this.EnterSearchSnumber.isVisible()){
            await this.ClickSearchPanel.click()
        }
        await this.EnterSearchSnumber.fill(this.expNumber)
        await this.ClickSearchBtn.click()
        const StockRow=  this.Page.locator("#tbl_a_stock_itemslist>tbody>tr",
            {
                hasText:this.expNumber
            })
        await expect(StockRow).toBeVisible()
        console.log(`Stock Number Found in Table ${this.expNumber}`)
        await expect(StockRow).toContainText(this.expNumber)
    }

}