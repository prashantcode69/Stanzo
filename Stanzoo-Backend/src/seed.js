import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from './models/Room.js';

dotenv.config();

const seedRooms = [
  {
    name: 'Deluxe Ocean View Suite',
    description: 'Stunning ocean-facing suite with private balcony',
    pricePerNight: 350,
    size: '50 sqm',
    maxGuests: 2,
    amenities: ['WiFi', 'Air Conditioning', 'Ocean View', 'Private Balcony', 'Hot Tub'],
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800']
  },
  {
    name: 'Family Beachfront Bungalow',
    description: 'Spacious bungalow perfect for families with direct beach access',
    pricePerNight: 450,
    size: '100 sqm',
    maxGuests: 4,
    amenities: ['WiFi', 'Full Kitchen', 'Beach Access', 'Dining Area', 'Patio'],
    images: ['https://images.unsplash.com/photo-1618883479302-1e5f59a2b859?w=800']
  },
  {
    name: 'Luxury Presidential Villa',
    description: 'Exclusive villa with premium furnishings and personalized service',
    pricePerNight: 800,
    size: '150 sqm',
    maxGuests: 6,
    amenities: ['WiFi', 'Infinity Pool', 'Spa', 'Personal Chef', 'Concierge', 'Ocean View'],
    images: ['https://images.unsplash.com/photo-1571508601166-763b5c0c26f5?w=800']
  },
  {
    name: 'Cozy Garden Room',
    description: 'Intimate room surrounded by lush tropical gardens',
    pricePerNight: 200,
    size: '30 sqm',
    maxGuests: 2,
    amenities: ['WiFi', 'Garden View', 'Outdoor Shower', 'Air Conditioning'],
    images: ['https://images.unsplash.com/photo-1496645695483-60770fcf272f?w=800']
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    
    // Clear existing rooms
    await Room.deleteMany({});
    console.log('Cleared existing rooms');
    
    // Insert seed data
    const createdRooms = await Room.insertMany(seedRooms);
    console.log(`Successfully created ${createdRooms.length} rooms`);
    
    await mongoose.connection.close();
    console.log('Database seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seed();
