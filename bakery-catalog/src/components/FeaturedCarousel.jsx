import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, Card, CardMedia, CardContent, Chip } from '@mui/material';
import { products } from '../data/products';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Mark first 4 products as featured for demo
const featured = products.slice(0, 4);

const FeaturedCarousel = ({ onProductClick }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h4" color="primary" fontWeight={700} align="center" gutterBottom>
        Featured Treats
      </Typography>
      <Slider {...settings}>
        {featured.map((product) => (
          <Box key={product.id} px={2} onClick={() => onProductClick(product)} sx={{ cursor: 'pointer' }}>
            <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
              <CardMedia
                component="img"
                height="220"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
              />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Chip
                    label={product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="h6" fontWeight={600}>{product.name}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default FeaturedCarousel; 