import React, { useState } from 'react';
import { Box, useTheme } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useGetReportsQuery } from 'state/api';
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar"; 



const Reports = () => {
    const theme = useTheme();

    // States to be sent to the backend
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState(""); // Now properly handling search state
    const [searchInput, setSearchInput] = useState("");

    const { data, isLoading } = useGetReportsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search, // Params that is sent to the backend
    });

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "location",
            headerName: "Location",
            flex: 0.8,
        },
        {
            field: "disasterCategory",
            headerName: "Disaster Category",
            flex: 0.6,
        },
        {
            field: "disasterImage",
            headerName: "Images",
            flex: 0.6
        },
        {
            field: "disasterInfi",
            headerName: "Description",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "Date",
            flex: 0.5,
            renderCell: (params) => params.value.length // Grabbing the number of products
        },
        {
            field: "reporterId",
            headerName: "Reported By",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
        },
        {
            field: "disasterStatus",
            headerName: "Status",
            flex: 0.5,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
        },
    ];

    return (

        
        <Box m="1.5rem 2.5rem">
            <Header title="Reports" subtitle="Entire list of Reports" />
            
            
            <Box height="80vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none"
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`
                    }
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={(data && data.transactions) || []}
                    columns={columns}
                    rowCount={(data && data.total) || 0}
                    rowsPerPageOptions={[20, 50, 100]}
                    pagination
                    page={page}
                    pageSize={pageSize}
                    paginationMode="server"
                    sortingMode="server"
                    onPageChange={(newPage) => setPage(newPage)} // Configuration for setting the new page
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                    components={{ Toolbar: DataGridCustomToolbar }}
                    slots={{
                        toolbar: DataGridCustomToolbar,
                      }}
                />
            </Box>
        </Box>
    );
}

export default Reports;
