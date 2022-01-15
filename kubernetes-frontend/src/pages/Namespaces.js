import React, {useEffect, useState} from 'react';
import useStore from "../state/Store"
import { DataGrid } from '@mui/x-data-grid';

function Namespaces() {

    let [query, setQuery] = useState(false)
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {field: 'creationTime', headerName: "creation Time", width: 300},
        {field: 'apiVersion', headerName: "API Version", width: 200},
        {field: 'name', headerName: "Name", width: 300}]
    const namespaces = useStore((state) => state.namespaces)
    const getNamespaces = useStore((state) => state.getNamespaces)
    const rows = [
        {id: 1, creationTime: 1, name: 1}
    ]
    useEffect(() => {
        console.log(query)
        getNamespaces()
    }, [query]);

    // console.log(namespaces)
    return (
        <div style={{padding: 20}}>
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={namespaces}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
        </div>
    );
}

export default Namespaces;