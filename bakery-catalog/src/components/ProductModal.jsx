import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Box,
  Button,
  Chip,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Rating,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Example reviews (in a real app, this would come from a database)
const sampleReviews = [
  { user: 'Ayesha', rating: 5, comment: 'Absolutely delicious and fresh!' },
  { user: 'Rahul', rating: 4, comment: 'Loved the texture and taste.' },
  { user: 'Priya', rating: 5, comment: 'Best bakery in town!' },
];

const ProductModal = ({ open, onClose, product, selectedVariant, setSelectedVariant, onAddToCart }) => {
  if (!product) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography color="error">No product data available.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>{product.name}</Typography>
          <Chip
            label={product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            color="primary"
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{ width: '100%', borderRadius: 2, boxShadow: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {product.description}
            </Typography>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
              Choose a variant:
            </Typography>
            <RadioGroup
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
            >
              {(Array.isArray(product.items) && product.items.length > 0) ? (
                product.items.map((item, idx) => (
                  <FormControlLabel
                    key={item.variant}
                    value={item.variant}
                    control={<Radio />}
                    label={`${item.variant} - $${item.price.toFixed(2)}`}
                  />
                ))
              ) : (
                <Typography color="error">No variants available for this product.</Typography>
              )}
            </RadioGroup>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={!selectedVariant}
              onClick={() => onAddToCart(product, selectedVariant)}
            >
              Add to Cart
            </Button>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
              Customer Reviews
            </Typography>
            {sampleReviews.map((review, idx) => (
              <Box key={idx} sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" fontWeight={600}>{review.user}</Typography>
                  <Rating value={review.rating} readOnly size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {review.comment}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal; 