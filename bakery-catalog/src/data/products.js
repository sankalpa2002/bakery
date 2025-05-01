export const products = [
  // Cakes
  {
    id: 1,
    name: "Chocolate Cake",
    category: "cakes",
    price: 25.99,
    description: "Rich and moist chocolate cake with chocolate ganache frosting.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    items: [
      { variant: "Small (6 inch)", price: 15.99 },
      { variant: "Medium (8 inch)", price: 25.99 },
      { variant: "Large (10 inch)", price: 35.99 }
    ]
  },
  {
    id: 2,
    name: "Red Velvet Cake",
    category: "cakes",
    price: 28.99,
    description: "Classic red velvet cake with cream cheese frosting.",
    image: "https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=800&q=80",
    items: [
      { variant: "Small (6 inch)", price: 18.99 },
      { variant: "Medium (8 inch)", price: 28.99 }
    ]
  },
  {
    id: 3,
    name: "Strawberry Shortcake",
    category: "cakes",
    price: 22.99,
    description: "Light sponge cake layered with whipped cream and strawberries.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    items: [
      { variant: "Small (6 inch)", price: 14.99 },
      { variant: "Medium (8 inch)", price: 22.99 }
    ]
  },
  // Cookies
  {
    id: 4,
    name: "Chocolate Chip Cookies",
    category: "cookies",
    price: 2.99,
    description: "Classic chocolate chip cookies with a soft center.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    items: [
      { variant: "Single", price: 2.99 },
      { variant: "Pack of 6", price: 15.99 }
    ]
  },
  {
    id: 5,
    name: "Oatmeal Raisin Cookies",
    category: "cookies",
    price: 2.75,
    description: "Chewy oatmeal cookies with plump raisins.",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    items: [
      { variant: "Single", price: 2.75 },
      { variant: "Pack of 6", price: 14.99 }
    ]
  },
  {
    id: 6,
    name: "Macarons",
    category: "cookies",
    price: 2.50,
    description: "French macarons in various flavors.",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80",
    items: [
      { variant: "Single", price: 2.50 },
      { variant: "Box of 6", price: 13.99 }
    ]
  },
  // Breads
  {
    id: 7,
    name: "Sourdough Bread",
    category: "bread",
    price: 5.99,
    description: "Artisan sourdough bread with a crispy crust.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    items: [
      { variant: "Small Loaf", price: 5.99 },
      { variant: "Large Loaf", price: 9.99 }
    ]
  },
  {
    id: 8,
    name: "Baguette",
    category: "bread",
    price: 2.00,
    description: "Classic French baguette with a crispy crust.",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    items: [
      { variant: "Single", price: 2.00 },
      { variant: "Pack of 3", price: 5.50 }
    ]
  },
  {
    id: 9,
    name: "Focaccia",
    category: "bread",
    price: 4.50,
    description: "Italian flatbread with olive oil and herbs.",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    items: [
      { variant: "Small", price: 4.50 },
      { variant: "Large", price: 7.99 }
    ]
  },
  // Pastries & Muffins
  {
    id: 10,
    name: "Croissant",
    category: "pastries",
    price: 3.99,
    description: "Buttery and flaky French croissant.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    items: [
      { variant: "Single", price: 3.99 },
      { variant: "Pack of 4", price: 14.99 }
    ]
  },
  {
    id: 11,
    name: "Blueberry Muffin",
    category: "muffins",
    price: 3.50,
    description: "Moist muffin loaded with fresh blueberries.",
    image: "https://images.unsplash.com/photo-1506368083636-6defb67639d0?auto=format&fit=crop&w=800&q=80",
    items: [
      { variant: "Single", price: 3.50 },
      { variant: "Pack of 4", price: 12.99 }
    ]
  },
  {
    id: 12,
    name: "Cinnamon Roll",
    category: "pastries",
    price: 4.00,
    description: "Soft cinnamon roll topped with creamy icing.",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    items: [
      { variant: "Single", price: 4.00 },
      { variant: "Pack of 4", price: 15.00 }
    ]
  },
  // Tarts, Donuts, Pies
  {
    id: 13,
    name: "Lemon Tart",
    category: "tarts",
    price: 5.50,
    description: "Tangy lemon tart with a buttery crust.",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80",
    items: [
      { variant: "Single", price: 5.50 },
      { variant: "Box of 4", price: 20.00 }
    ]
  },
  {
    id: 14,
    name: "Glazed Donut",
    category: "donuts",
    price: 2.25,
    description: "Classic glazed yeast donut, soft and sweet.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    items: [
      { variant: "Single", price: 2.25 },
      { variant: "Box of 6", price: 12.00 }
    ]
  },
  {
    id: 15,
    name: "Apple Pie",
    category: "pies",
    price: 16.99,
    description: "Traditional apple pie with a flaky crust.",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    items: [
      { variant: "Slice", price: 3.99 },
      { variant: "Whole Pie", price: 16.99 }
    ]
  },
  // Drinks
  {
    id: 16,
    name: "Cappuccino",
    category: "drinks",
    price: 3.00,
    description: "Espresso with steamed milk and foam.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    items: [
      { variant: "Small", price: 3.00 },
      { variant: "Large", price: 4.00 }
    ]
  },
  {
    id: 17,
    name: "Hot Chocolate",
    category: "drinks",
    price: 2.75,
    description: "Rich and creamy hot chocolate.",
    image: "https://images.unsplash.com/photo-1519681393-8a2b1a1a1a1a?auto=format&fit=crop&w=800&q=80",
    items: [
      { variant: "Small", price: 2.75 },
      { variant: "Large", price: 3.75 }
    ]
  }
]; 