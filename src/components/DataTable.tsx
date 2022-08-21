import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { capitalize } from '../utils/helpers';

interface DataTableProps {
  rows: any[]
  columns: GridColDef[]
  type: string
}

const DataTable = ({ rows, columns, type }: DataTableProps) => {

  const navigate = useNavigate();

  const [pageSize, setPageSize] = useState<number>(5);
  const [searchField, setSearchField] = useState<string>(columns[0].field);
  const [search, setSearch] = useState<string>('');
  const [filteredRows, setFilteredRows] = useState<any[]>(rows);

  useEffect(() => {
    if (!search) {
      setFilteredRows(rows);
    } else {
      const filtered = rows.filter((row) => {
        if (Array.isArray(row[searchField])) {
          return row[searchField].some((option: string) => option.toLowerCase().startsWith(search.toLowerCase()));
        }
        return row[searchField].toLowerCase().startsWith(search.toLowerCase());
      });
      setFilteredRows(filtered);
    }
  }, [search, searchField]);

  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  return (
    <Box marginTop='2rem' width='100%'>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, marginBottom: 1 }}>
        <TextField
          sx={{ paddingBottom: { xs: '8px', sm: '0px' }, width: { xs: '100%', sm: '55%' } }}
          label='Search'
          type='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          select
          sx={{ display: { xs: 'none', sm: 'flex' }, paddingLeft: '5px', width: '30%' }}
          label='Search Field'
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        >
          {columns.filter((column) => column.field !== 'actions' && !column.hide).map((column) => {
            return (
              <MenuItem key={column.field} value={column.field}>
                {column.headerName}
              </MenuItem>
            )
          })}
        </TextField>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: { xs: '0px', sm: '0px 5px' }, width: { xs: '100%', sm: '15%' } }}>
          <Button variant='contained' sx={{ flexGrow: { xs: 1, sm: 0 } }} onClick={() => navigate(`/${type}/new`)}>
            New {capitalize(type).slice(0, -1)}
          </Button>
        </Box>
      </Box>
      <DataGrid
        autoHeight
        rows={filteredRows}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 25]}
        disableSelectionOnClick
        disableColumnFilter
        disableColumnMenu
      />
    </Box>
  );
};

export default DataTable;
