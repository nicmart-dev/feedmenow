import DataTable from './DataTable.jsx/index.js'
import { columns } from '../../data-table/columns.jsx' // get localized column headers

/* TODO: sample component that uses TanTack Table UI component 
Could switch to Typescript https://tanstack.com/table/latest/docs/overview#headless
*/
const CustomTable = ({ users }) => {
    /* Sample users prop format:
    [
        {
            "Role": "Linguist",
            "Picture": "https://lh3.googleusercontent.com/a/ACg8ocKHlwJUpk6cYZAH2WfJBUmyvWEP3UOeIlzxGvFwhomNAU1bLQ=s96-c",
            "Email": "pokemontest734@gmail.com",
            "Name": "Pokemon Test2",
            "availability": [
                {
                    "result": true
                }
            ]
            (...) // other user details
        },
    ]     */


    return <DataTable data={users} columns={columns} />
}

export default CustomTable
