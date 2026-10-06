import {test} from '../Hooks/ERPhooks'
import { SuppliersPage} from '../Pages/Supplierspage'
import {CustomersPage} from '../Pages/Customerpage'
import { ExcelFileUtil } from '../Utils/ExcelfileUtil'
import path from 'path'
let supSheet:any
let cusSheet:any
//read path of excel 
const Excelpath =path.join(__dirname,'../TestData/ERpExcelData.xlsx')
try {
   supSheet =ExcelFileUtil.getCelldata(Excelpath,'suppliers')  
   cusSheet = ExcelFileUtil.getCelldata(Excelpath,'customer')
} catch (error) {
    console.log(error)
}
// console.log(supSheet)
// console.log(cusSheet)
test.describe('ERp Management Module',()=>{
    for(const supdata of supSheet)
    {
      test(`Supplier With Excel data ${supdata.suppliername}`,async({page})=>{
        const sup = new SuppliersPage(page)
        await sup.NavigateToSupplier()
        await sup.AddSupplierDeatils(
            supdata.suppliername,
            supdata.Address,
            supdata.City,
            supdata.Country,
            supdata.Contactperson,
            supdata.phoneNumber,
            supdata.Email,
            supdata.MobileNumber,
            supdata.Notes

        )
        await sup.handleAlerts()
        await sup.supplierTable()
      })  
    }
    for(const cusdata of cusSheet)
    {
       test(`Customer data using Excel ${cusdata.City}`,async({page})=>{
        const cus = new CustomersPage(page)
        await cus.NavigateToCustomer()
        await cus.AddcustomerDeatils(
            cusdata.customername,
            cusdata.Address,
            cusdata.City,
            cusdata.Country,
            cusdata.contactPerson,
            cusdata.PhoneNumber,
            cusdata.Email,
            cusdata.MobileNumber,
            cusdata.Notes
        )
        await cus.handleAlerts()
        await cus.customerTable()
        
       }) 

    }
})
