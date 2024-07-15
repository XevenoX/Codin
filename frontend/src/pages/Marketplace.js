import React, { useState, useEffect } from 'react';
import PriceSlider from '../components/marketplace/marketplace-filters/PriceSlider';
import { Typography } from '@mui/material';
import Category from '../components/marketplace/marketplace-filters/Category';
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

const MarketPlace = () => {
  // cookie
  const [cookies] = useCookies(['user']); // 读取 'user' cookie
  const user = cookies.user;

  // ---------------- Select Price Range ----------------------
  const [priceRange, setPriceRange] = useState([0, 3000]);

  // for displaying projects
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortCriteria, setSortCriteria] = useState('priceAsc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.defaults.baseURL =
      process.env.REACT_APP_API_BASE_URL || 'http://localhost:5050';
    loadProjects();
  }, [page, sortCriteria, searchTerm, priceRange]); // 添加 priceRange 作为依赖项

  async function loadProjects() {
    setLoading(true);
    try {
      const res = await axios.get('/marketplace/projects', {
        params: {
          page,
          limit: 5,
          sort: sortCriteria,
          search: searchTerm,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          user: user ? user.id : null, // 将用户ID传递给后端
        },
      });
      setProjects(res.data.projects);
      setTotalPages(res.data.totalPages);
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
    setPage(1); // Reset page to 1 when filters change
  };

  // ---------------- Select Task Category ----------------------
  const [category, setCategory] = useState('frontend');

  const handleSelectCategory = (e) => {
    setCategory(e.target.value);
    setPage(1); // Reset page to 1 when filters change
  };

  // ---------------- Select Date Range ----------------------
  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'day');

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const handleSelectStartDate = (newValue) => {
    setStartDate(newValue);
    setPage(1); // Reset page to 1 when filters change
  };

  const handleSelectEndDate = (newValue) => {
    setEndDate(newValue);
    setPage(1); // Reset page to 1 when filters change
  };

  const handleSortChange = (newCriteria) => {
    setSortCriteria(newCriteria);
    setPage(1); // Reset page to 1 when filters change
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setPage(1); // Reset page to 1 when filters change
  };

  return (
    <Box
      className="marketplace"
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      {/* {loading && <CircularProgress />}
      {error && (
        <Alert severity="error">Error loading projects: {error.message}</Alert>
      )} */}
      {/* {!loading && !error && ( */}
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
                category={category}
                handleSelectCategory={handleSelectCategory}
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
              sx={{ display: 'flex' }}
            >
              <MarketItems projects={projects} />
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                  variant="contained"
                  disabled={page === 1}
                  onClick={handlePreviousPage}
                >
                  Previous
                </Button>
                <Typography>
                  Page {page} of {totalPages}
                </Typography>
                <Button
                  variant="contained"
                  disabled={page === totalPages}
                  onClick={handleNextPage}
                >
                  Next
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* )} */}
    </Box>
  );
};

export default MarketPlace;
