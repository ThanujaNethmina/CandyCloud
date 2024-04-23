// Define your products data

import {productImage1,productImage3,productImage2,productImage4,productImage5} from '../assets/images/index'

export const products = [
    { id: 1, name: 'Milk Toffee', price: 'LKR520.00', imageUrl: null, rating: 3.9  },
    { id: 2, name: 'Chocolate Cake', price: 'LKR1020.00', imageUrl: productImage3 , rating: 3.9 },
    { id: 3, name: 'Circular Lollipop', price: 'LKR150.00', imageUrl: productImage2 , rating: 3.9 },
    { id: 4, name: 'Marshmallow', price: 'LKR600.00', imageUrl: productImage4, rating: 3.9  },
    { id: 5, name: 'Sesame Balls', price: 'LKR220.00', imageUrl: productImage2 , rating: 3.9 },
    { id: 6, name: 'Aluwa', price: 'LKR250.00', imageUrl: productImage1, rating: 3.9  },
    { id: 7, name: 'Coconut Toffee', price: 'LKR150.00', imageUrl: productImage3, rating: 3.9  },
    { id: 8, name: 'Pani Kaju', price: 'LKR100.00', imageUrl: undefined, rating: 3.9  },
    { id: 9, name: 'Rulang', price: 'LKR200.00', imageUrl: productImage5, rating: 3.9  },
    { id: 10, name: 'Chocolate Pudding', price: 'LKR250.00', imageUrl: productImage2, rating: 3.9  },
    { id: 11, name: 'Brownies', price: 'LKR200.00', imageUrl: productImage4, rating: 3.9  },
    { id: 12, name: 'Ginger Toffee', price: 'LKR120.00', imageUrl: productImage3, rating: 3.9 },
  ];

  export const sampleShippingData = [
    {
      _id: "1",
      fullName: "John Doe",
      addressLine1: "123 Main St",
      addressLine2: "",
      city: "Anytown",
      postalCode: "12345",
      country: "Country",
      phoneNumber: "123-456-7890",
    },
    {
      _id: "2",
      fullName: "Jane Smith",
      addressLine1: "456 Elm St",
      addressLine2: "Apt 101",
      city: "Sometown",
      postalCode: "54321",
      country: "Another Country",
      phoneNumber: "987-654-3210",
    },
    // Add more shipping data objects as needed
  ];
  
 export const cartItems = [
    {
      id: 'p1',
      name: 'Wireless Mouse',
      price: 19.99,
      quantity: 2,
      imageUrl: null
    },
    {
      id: 'p2',
      name: 'Keyboard',
      price: 49.99,
      quantity: 1,
      imageUrl: productImage2
    },
    {
      id: 'p3',
      name: 'HD Monitor',
      price: 149.99,
      quantity: 1,
      imageUrl:productImage1
    },
    {
      id: 'p4',
      name: 'USB-C Charging Cable',
      price: 14.99,
      quantity: 3,
      imageUrl: productImage2
    },
    {
      id: 'p5',
      name: 'Portable External Hard Drive',
      price: 59.99,
      quantity: 1,
      imageUrl: productImage5
    }
  ];
  