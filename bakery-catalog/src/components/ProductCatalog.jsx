import { useState, useEffect, useRef } from 'react';
import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Divider,
  IconButton,
  Badge,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import { products } from '../data/products';
import ProductModal from './ProductModal';
import FeaturedCarousel from './FeaturedCarousel';
import { useTheme } from '@mui/material/styles';

const categoryColors = {
  cakes: 'secondary',
  bread: 'warning',
  cookies: 'success',
  muffins: 'info',
  pastries: 'primary',
  tarts: 'error',
};

const ProductCatalog = ({ mode = 'light', toggleMode = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [sort, setSort] = useState('default');
  const [page, setPage] = useState(1);
  const productsPerPage = 6;
  const theme = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = {
    home: useRef(null),
    catalog: useRef(null),
    about: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    });
    // Sorting logic
    if (sort === 'price-asc') filtered = filtered.slice().sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') filtered = filtered.slice().sort((a, b) => b.price - a.price);
    if (sort === 'name-asc') filtered = filtered.slice().sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'name-desc') filtered = filtered.slice().sort((a, b) => b.name.localeCompare(a.name));
    setFilteredProducts(filtered);
    setPage(1); // Reset to first page on filter/sort change
  }, [searchTerm, category, sort]);

  // Scrollspy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offsets = Object.entries(sectionRefs).map(([key, ref]) => ({
        key,
        offset: ref.current ? ref.current.offsetTop : 0
      }));
      const current = offsets.reduce((acc, curr) => {
        if (scrollY + 100 >= curr.offset) return curr.key;
        return acc;
      }, 'home');
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['all', ...new Set(products.map((product) => product.category))];

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setSelectedVariant('');
    setModalOpen(true);
  };

  const handleAddToCart = (product, variantLabel) => {
    const variant = product.items.find((item) => item.variant === variantLabel);
    if (!variant) return;
    setCart((prev) => [
      ...prev,
      {
        productId: product.id,
        name: product.name,
        variant: variant.variant,
        price: variant.price,
        image: product.image,
        quantity: 1
      }
    ]);
    setModalOpen(false);
  };

  const handleRemoveFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Smooth scroll handler
  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to catalog section after pagination
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', overflowX: 'hidden', pt: '80px' }}>
      {/* AppBar with Cart Icon */}
      <AppBar position="fixed" color="inherit" elevation={3} sx={{ zIndex: 1201, backdropFilter: 'blur(8px)', background: mode === 'dark' ? 'rgba(24,26,27,0.95)' : 'rgba(255,255,255,0.85)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: 80 }}>
          <Typography
            variant="h5"
            color="primary"
            fontWeight={700}
            sx={{ cursor: 'pointer', letterSpacing: 1 }}
            onClick={() => handleNavClick('home')}
          >
            Sweet Treats Bakery
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button color={activeSection === 'home' ? 'primary' : 'inherit'} variant={activeSection === 'home' ? 'contained' : 'text'} onClick={() => handleNavClick('home')}>Home</Button>
            <Button color={activeSection === 'catalog' ? 'primary' : 'inherit'} variant={activeSection === 'catalog' ? 'contained' : 'text'} onClick={() => handleNavClick('catalog')}>Food Catalog</Button>
            <Button color={activeSection === 'about' ? 'primary' : 'inherit'} variant={activeSection === 'about' ? 'contained' : 'text'} onClick={() => handleNavClick('about')}>About Us</Button>
            <Button color={activeSection === 'contact' ? 'primary' : 'inherit'} variant={activeSection === 'contact' ? 'contained' : 'text'} onClick={() => handleNavClick('contact')}>Contact Us</Button>
            <IconButton color="primary" onClick={toggleMode} sx={{ mr: 1 }}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton color="primary" onClick={() => setCartOpen(true)}>
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box id="home" ref={sectionRefs.home}
        sx={{
          width: '100%',
          minHeight: '100vh',
          background: `url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1500&q=80) center/cover no-repeat`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
        }}
      >
        <Box sx={{ bgcolor: mode === 'dark' ? 'rgba(24,26,27,0.85)' : 'rgba(255,255,255,0.85)', p: 4, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h2" color="primary" fontWeight={700} align="center" gutterBottom>
            Welcome to Sweet Treats Bakery
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary">
            Discover our delicious, freshly baked goods!
          </Typography>
        </Box>
      </Box>

      {/* Featured Products Carousel */}
      <FeaturedCarousel onProductClick={handleCardClick} />

      <Container id="catalog" ref={sectionRefs.catalog} maxWidth="lg" sx={{ py: 4, minHeight: '100vh', scrollMarginTop: '100px', width: '100%' }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
            Bakery Product Catalog
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Box>

        {/* Category Chip Bar */}
        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap', pb: 1 }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat.charAt(0).toUpperCase() + cat.slice(1)}
              color={category === cat ? 'primary' : 'default'}
              clickable
              onClick={() => setCategory(cat)}
              sx={{ fontWeight: 600 }}
            />
          ))}
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search Products"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* Sorting Dropdown */}
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sort}
                label="Sort By"
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
                <MenuItem value="name-asc">Name: A-Z</MenuItem>
                <MenuItem value="name-desc">Name: Z-A</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {filteredProducts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No products found.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try a different search or category.
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {filteredProducts.slice((page-1)*productsPerPage, page*productsPerPage).map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 4,
                      boxShadow: 4,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: 8,
                      },
                      cursor: 'pointer',
                    }}
                    onClick={() => handleCardClick(product)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.name}
                      sx={{ objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Chip
                          label={product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                          color={categoryColors[product.category] || 'default'}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="h5" component="h2" fontWeight={600}>
                          {product.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {product.description}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ${product.price.toFixed(2)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {/* Pagination Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
              <Button
                variant="outlined"
                disabled={page === 1}
                onClick={() => { setPage(page - 1); setTimeout(scrollToCatalog, 100); }}
              >
                Previous
              </Button>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                Page {page} of {Math.ceil(filteredProducts.length / productsPerPage)}
              </Typography>
              <Button
                variant="outlined"
                disabled={page === Math.ceil(filteredProducts.length / productsPerPage) || filteredProducts.length === 0}
                onClick={() => { setPage(page + 1); setTimeout(scrollToCatalog, 100); }}
              >
                Next
              </Button>
            </Box>
          </>
        )}
      </Container>

      {/* Product Details Modal */}
      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box sx={{ width: 320, p: 2, position: 'relative' }}>
          <IconButton
            onClick={() => setCartOpen(false)}
            sx={{ position: 'absolute', top: 8, right: 8 }}
            aria-label="Close cart"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2, pr: 4 }}>
            Your Cart
          </Typography>
          {cart.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              Your cart is empty.
            </Typography>
          ) : (
            <List>
              {cart.map((item, idx) => (
                <ListItem key={idx} secondaryAction={
                  <Button color="error" onClick={() => handleRemoveFromCart(idx)}>
                    Remove
                  </Button>
                }>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <img src={item.image} alt={item.name} width={40} height={40} style={{ borderRadius: 4 }} />
                    <ListItemText
                      primary={`${item.name} (${item.variant})`}
                      secondary={`$${item.price.toFixed(2)}`}
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Drawer>

      {/* About Us Section */}
      <Box
        id="about"
        ref={sectionRefs.about}
        sx={{
          py: 8,
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          background: `url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80) center/cover no-repeat`,
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: mode === 'dark' ? 'rgba(24,26,27,0.85)' : 'rgba(255,255,255,0.3)', zIndex: 1 }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#fff' }}>
                Our Story
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: '#fff' }}>
                Sweet Treats Bakery is a family-owned bakery dedicated to bringing you the freshest, most delicious baked goods in town. Our passion for baking is matched only by our commitment to quality and customer satisfaction. Whether you crave classic cakes, artisan breads, or delightful cookies, we have something for everyone. Visit us and taste the love in every bite!
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <img src="https://img.icons8.com/ios-filled/50/4ECDC4/bread.png" alt="Fresh" width={28} />
                  <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#fff' }}>Fresh Ingredients</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <img src="https://img.icons8.com/ios-filled/50/4ECDC4/family.png" alt="Family" width={28} />
                  <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#fff' }}>Family-Owned & Operated</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <img src="https://img.icons8.com/ios-filled/50/4ECDC4/cake.png" alt="Custom" width={28} />
                  <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#fff' }}>Custom Orders Welcome</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Removed content image for About Us */}
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Contact Us Section */}
      <Box
        id="contact"
        ref={sectionRefs.contact}
        sx={{
          py: 8,
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          background: `url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80) center/cover no-repeat`,
          my: 6,
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: mode === 'dark' ? 'rgba(24,26,27,0.85)' : 'rgba(255,255,255,0.3)', zIndex: 1 }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#fff' }}>
                Contact Us
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: '#fff' }}>
                Have a question or want to place a custom order? Reach out to us!
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon color="secondary" />
                  <Typography variant="body2" sx={{ color: '#fff' }}>123 Bakery Lane, Sweet City</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon color="secondary" />
                  <Typography variant="body2" sx={{ color: '#fff' }}>(123) 456-7890</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon color="secondary" />
                  <Typography variant="body2" sx={{ color: '#fff' }}>hello@sweettreats.com</Typography>
                </Box>
              </Box>
              {/* Removed map image for Contact Us */}
            </Grid>
            <Grid item xs={12} md={6}>
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, bgcolor: mode === 'dark' ? '#23272A' : '#f9f9f9', p: 3, borderRadius: 3, boxShadow: 1 }}>
                <TextField label="Your Name" variant="outlined" fullWidth required InputProps={{ startAdornment: <PersonIcon color="secondary" sx={{ mr: 1 }} /> }} />
                <TextField label="Email" variant="outlined" fullWidth required type="email" InputProps={{ startAdornment: <EmailIcon color="secondary" sx={{ mr: 1 }} /> }} />
                <TextField label="Message" variant="outlined" fullWidth required multiline rows={4} InputProps={{ startAdornment: <EmailIcon color="secondary" sx={{ mr: 1 }} /> }} />
                <Button variant="contained" color="primary" sx={{ alignSelf: 'center', mt: 2 }} disabled>
                  Send Message
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: mode === 'dark' ? theme.palette.primary.dark : '#FF6B6B', color: '#fff', py: 3, mt: 6, textAlign: 'center' }}>
        <Typography variant="h6" fontWeight={500}>
          Sweet Treats Bakery &copy; {new Date().getFullYear()} &mdash; Freshly baked with love!
        </Typography>
        <Typography variant="body2">
          123 Bakery Lane, Sweet City | Contact: (123) 456-7890
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductCatalog; 
// export default ProductCatalog; 