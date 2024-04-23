import React ,{useState}from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody ,Typography,Box, IconButton, Tooltip,TablePagination} from '@mui/material';
import { StyledTableCell } from '../../assets/theme/theme';
import { CustomHeaderCell } from '../Shared/index';
import style from './ShippingDetailsTable.module.scss';
import { CustomButton,  } from '../Shared';
import { StyledTextField } from '../../assets/theme/theme';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { EditOutlined } from '@mui/icons-material'
import { SCREEN_MODES,APP_TABLE_CONFIGS } from '../../utilities/app.constants';
const ShippingAddressTable = (props) => {
  const {
    page,
    rowsPerPage,
    isFiltered,
    onHandleChangePage,
    onHandleChangeRowsPerPage,
    requestDataIsLoading,
    filteredList,
    sortMeta,
    onSortHandle,
    onFilterHandle,
    getFilterList,
    onClearFilter,
    handleAction,
    handleReportGeneration,
    HandleAddFeedBack,
    handleEditRequest, } = props;


  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (event ) => {
    setSearchTerm(event.target.value);
  };

  const filteredListData = searchTerm
  ? props.filteredList.filter((item) =>
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.addressLine1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.addressLine2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item._id.includes(searchTerm)
    )
  : filteredList;
  return (
    <section className={style.gridContainer}>
          <div className={style.gridHeader}>
       <Typography
        noWrap
        component="div"
        className={style.gridTitle}
      >
       <h3>Recent Shipping</h3>
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <div className='layout-row'>
      <StyledTextField
          fullWidth
          label="Search Shipping Address Details"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by Name, email, or City..."
        />
        {props.isFiltered &&
          <CustomButton text='Clear filter' textColor='black' bgColor='#ffe4d9' onClick={props.onClearFilter} />
        }
  
       <CustomButton text='Generate Shipping Report'sx={{width:"2rem"}} onClick={() =>{props.handleReportGeneration() }} />
      </div>
     
    </div>
    <TableContainer component={Paper} className={style.grid}>
      <Table className={style.table}>
        <TableHead>
          <TableRow>
          <CustomHeaderCell width={80} id='Index'>Index</CustomHeaderCell>
          <CustomHeaderCell width={150} id='FullName' sortable onSort={props.onSortHandle}>Full Name</CustomHeaderCell>
          <CustomHeaderCell width={200} id='EmailAddress'>Email Address</CustomHeaderCell>
          <CustomHeaderCell width={200} id='AddressLine1'>Address Line 1</CustomHeaderCell>
          <CustomHeaderCell width={200} id='AddressLine2'>Address Line 2</CustomHeaderCell>
          <CustomHeaderCell width={150} id='city'sortable onSort={props.onSortHandle} filtered getFilterList={props.getFilterList} onFilter={props.onFilterHandle}>City</CustomHeaderCell>
          <CustomHeaderCell width={120} id='postalCode'sortable onSort={props.onSortHandle} filtered getFilterList={props.getFilterList} onFilter={props.onFilterHandle}>Postal Code</CustomHeaderCell>
          <CustomHeaderCell width={150} id='country'sortable onSort={props.onSortHandle} filtered getFilterList={props.getFilterList} onFilter={props.onFilterHandle}>Country</CustomHeaderCell>
          <CustomHeaderCell width={150} id='PhoneNumber'>Phone Number</CustomHeaderCell>
          <CustomHeaderCell width={180} id='Actions'>Actions</CustomHeaderCell>


          </TableRow>
        </TableHead>
        <TableBody>
        {filteredListData.length === 0 ? (
                        <TableRow>
                            <StyledTableCell align="left" colSpan={8}>No data to preview</StyledTableCell>
                        </TableRow>
                    ) : (
                        filteredListData.map((data, index) => (
                            <TableRow key={data._id}>
                                <StyledTableCell>{index + 1}</StyledTableCell>
                                <StyledTableCell>{data.fullName}</StyledTableCell>
                                <StyledTableCell>{data.email}</StyledTableCell>
                                <StyledTableCell>{data.addressLine1}</StyledTableCell>
                                <StyledTableCell>{data.addressLine2}</StyledTableCell>
                                <StyledTableCell>{data.city}</StyledTableCell>
                                <StyledTableCell>{data.postalCode}</StyledTableCell>
                                <StyledTableCell>{data.country}</StyledTableCell>
                                <StyledTableCell>{data.phoneNumber}</StyledTableCell>
                                <StyledTableCell style={{ backgroundColor: '#db8380' }}>

                                <Box className='layout-row'>
                    <Box>
                    <IconButton size='small' onClick={() => {props.handleAction(data._id.toString() ,SCREEN_MODES.VIEW) }}>
                          <Tooltip title="View">
                            <VisibilityOutlinedIcon sx={{ fontSize: '20px', mr: '-1', color: 'white' }} />
                          </Tooltip>
                        </IconButton>
                      </Box>
                     <Box>
                        <IconButton size='small' onClick={() => {props.handleAction(data._id.toString() ,SCREEN_MODES.EDIT) }}>
                          <Tooltip title="Edit">
                            <EditOutlined sx={{ fontSize: '20px', mr: '-1', color: 'white' }} />
                          </Tooltip>
                        </IconButton>
                      </Box>
                      
                      <Box>
                        <IconButton size='small' onClick={() => {props.handleAction(data._id.toString() ,SCREEN_MODES.DELETE) }}>
                          <Tooltip title="Delete">
                            <DeleteOutlinedIcon sx={{ fontSize: '20px', mr: '-1', color: 'white' }} />
                          </Tooltip>
                        </IconButton>
                      </Box>
                  </Box>
                                </StyledTableCell>
                            </TableRow>
                        ))
                    )}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={APP_TABLE_CONFIGS.DEFAULT_ROWS_PER_PAGE_OPTIONS}
        component="div"
        labelRowsPerPage={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              color: 'white',
            }}
          >
            Items per page
          </div>
        }
        count={props.filteredList.length}
        page={props.page}
        onPageChange={props.onHandleChangePage}
        onRowsPerPageChange={props.onHandleChangeRowsPerPage}
        rowsPerPage={props.rowsPerPage}
        showFirstButton={true}
        showLastButton={true}
        sx={{ backgroundColor: "#a45a70", color: "white" }}
      />
  </section>

  );
};

export default ShippingAddressTable;
