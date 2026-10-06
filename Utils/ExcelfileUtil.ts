import xlsx from 'xlsx'
export class ExcelFileUtil{
    static getCelldata(filepath:string,shettname:string)
    {
        try {
            //get workbook from file
            const wrokbook = xlsx.readFile(filepath)
            //get all sheet from wb
            const sheet = wrokbook.Sheets[shettname]
            //convert all sheet data into json data
            const jsondata = xlsx.utils.sheet_to_json(sheet)
            return jsondata
        } catch (error) {
            console.log(error)
        }
    }
}

