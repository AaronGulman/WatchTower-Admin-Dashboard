import React from 'react'
import {Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from 'state/api'; 
import Header from "components/Header";
import { DataGrid } from '@mui/x-data-grid';


const Customers = () => {

    const theme = useTheme();
    const{ data, isLoading} = useGetCustomersQuery();
    // console.log("🚀 ~ Customers ~ data:", data)

  const columns = [
    {
      field: "_id",
      headerName:"ID",
      flex: 1,
    },
    {
      field: "name",
      headerName:"Name",
      flex: 1,
    },
    {
      field: "email",
      headerName:"Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName:"Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3") //grabbing the value and replacing with REGEX
      }                             // 3-3-4 digits per container in example (091)092-2202
    },
    {
      field: "city",
      headerName:"City",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName:"Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName:"Role",
      flex: 0.5,
    },
  ]

  return (
    <Box m="1.5rem 2.5rem" >
      <Header title="CUSTOMERS" subtitle="List of Customer"/>
      <Box mt="40px" heigth="75vh"
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
        "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
          color: `${theme.palette.secondary[200]} !important`
        }
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
      
  )
}

export default Customers;

