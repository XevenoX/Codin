import React, { useState, useEffect } from 'react';
import PriceSlider from '../components/marketplace/marketplace-filters/PriceSlider';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import SortByMenu from '../components/marketplace/SortByMenu';
import MarketHeader from '../components/marketplace/marketplace-header/MarketHeader';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MarketFilters from '../components/marketplace/marketplace-filters/MarketFilters';
import MarketItems from '../components/marketplace/marketplace-items/MarketItems';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const MarketPlace = () => {
  const query = useQuery();
  const initialCategory = query.get('category');

  const [cookies] = useCookies(['user']);
  const user = cookies.user;

  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [sortCriteria, setSortCriteria] = useState('priceAsc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [initialCategory] : []
  );

  const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(
    dayjs().add(2, 'year').format('YYYY-MM-DD')
  );

  useEffect(() => {
    axios.defaults.baseURL =
      process.env.REACT_APP_API_BASE_URL || 'http://localhost:5050';
    loadProjects();
  }, [
    page,
    sortCriteria,
    searchTerm,
    priceRange,
    startDate,
    endDate,
    selectedCategories,
  ]);

  async function loadProjects() {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 5, // Ensure 5 projects per page
        sort: sortCriteria,
        search: searchTerm,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        startDate,
        endDate,
        user: user ? user.id : null,
        selectedCategories: selectedCategories
          .map((cat) => cat.toLowerCase())
          .join(','),
      };

      console.log('Request parameters:', params);

      const res = await axios.get('/marketplace/projects', { params });
      setProjects(res.data.projects);
      setTotalPages(res.data.totalPages);
      setTotalProjects(res.data.totalProjects);
      console.log('Projects:', res.data.projects);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handlePriceChange = (event, newPriceRange) => {
    setPriceRange(newPriceRange);
    setPage(1); // Reset to first page on filter change
  };

  const handleSelectCategories = (categories) => {
    setSelectedCategories(categories);
    setPage(1); // Reset to first page on filter change
  };

  const handleSelectStartDate = (newValue) => {
    setStartDate(newValue.format('YYYY-MM-DD'));
    setPage(1); // Reset to first page on filter change
  };

  const handleSelectEndDate = (newValue) => {
    setEndDate(newValue.format('YYYY-MM-DD'));
    setPage(1); // Reset to first page on filter change
  };

  const handleSortChange = (newCriteria) => {
    setSortCriteria(newCriteria);
    setPage(1); // Reset to first page on sort change
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setPage(1); // Reset to first page on search
  };

  return (
    <Box
      className="marketplace"
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <Box
        className="marketplace-container"
        sx={{
          width: '100%',
          maxWidth: '980px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MarketHeader
              onSortChange={handleSortChange}
              onSearch={handleSearch}
              totalProjects={totalProjects}
            />
          </Grid>
          <Grid
            item
            container
            xs={12}
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'flex-left',
              alignItems: 'flex-top',
            }}
          >
            <Grid item xs={12} md={3} className="market-filters">
              <MarketFilters
                selectedCategories={selectedCategories}
                handleSelectCategories={handleSelectCategories}
                priceRange={priceRange}
                handlePriceChange={handlePriceChange}
                startDate={startDate}
                handleSelectStartDate={handleSelectStartDate}
                endDate={endDate}
                handleSelectEndDate={handleSelectEndDate}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={9}
              className="market-items"
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Alert severity="error">{error.message}</Alert>
              ) : (
                <>
                  <MarketItems projects={projects} />
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt={2}
                    mr={3}
                    sx={{ flexDirection: 'row' }} // 修改为横向布局
                  >
                    <Button
                      variant="contained"
                      size="small" // 设置按钮大小为小
                      disabled={page === 1}
                      onClick={handlePreviousPage}
                    >
                      Previous
                    </Button>
                    <Typography sx={{ mx: 2 }}>
                      {' '}
                      {/* 添加左右边距 */}
                      Page {page} of {totalPages}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small" // 设置按钮大小为小
                      disabled={page === totalPages}
                      onClick={handleNextPage}
                    >
                      Next
                    </Button>
                  </Box>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MarketPlace;
