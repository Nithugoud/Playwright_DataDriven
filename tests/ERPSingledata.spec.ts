import { test } from '../Hooks/ERPhooks'
import {SuppliersPage } from '../Pages/Supplierspage'
import { CustomersPage } from '../Pages/Customerpage'

test.describe('ERP Inventroy Management',()=>{
    // first test case for supplier module
    test('Supplier With Single data',async({page})=>{
        // await page.waitForLoadState()

        const sup = new SuppliersPage(page)
        await sup.NavigateToSupplier()
        await sup.AddSupplierDeatils(
            "Ramu",
            "Hyd1",
            "Hyderabad",
            "India",
            "QedgeTech",
            "87654322",
            "Test@gmail.com",
            "986754321",
            "New Supplier"

        )
        await sup.handleAlerts()
        await sup.supplierTable()
    })

    test('Customer Module',async({page})=>{
        //create object for customerpage file
        const cus = new CustomersPage(page)
        await cus.NavigateToCustomer()
        await cus.AddcustomerDeatils(
            'New Customer',
            'Kadiri',
            'atp',
            'India',
            'ranga',
            '9876543432',
            'Test@gmail.com',
            '87654321',
            'Add new Customer'
        )
        await cus.handleAlerts()
        await cus.customerTable()

    })
    
})
