export interface DistrictInfo {
  name: string;
  province: string;
  lat: number;
  lng: number;
  majorRivers: string[];
}

export const SRI_LANKA_DISTRICTS_DATA: DistrictInfo[] = [
  { name: 'Ampara', province: 'Eastern', lat: 7.2912, lng: 81.6747, majorRivers: ['Gal Oya', 'Heda Oya'] },
  { name: 'Anuradhapura', province: 'North Central', lat: 8.3114, lng: 80.4037, majorRivers: ['Malwathu Oya', 'Kala Oya'] },
  { name: 'Badulla', province: 'Uva', lat: 6.9934, lng: 81.0550, majorRivers: ['Uma Oya', 'Badulu Oya'] },
  { name: 'Batticaloa', province: 'Eastern', lat: 7.7310, lng: 81.6747, majorRivers: ['Mundeni Aru', 'Maduru Oya'] },
  { name: 'Colombo', province: 'Western', lat: 6.9271, lng: 79.8612, majorRivers: ['Kelani Ganga'] },
  { name: 'Galle', province: 'Southern', lat: 6.0535, lng: 80.2210, majorRivers: ['Gin Ganga'] },
  { name: 'Gampaha', province: 'Western', lat: 7.0840, lng: 79.9939, majorRivers: ['Attanagalu Oya', 'Kelani Ganga (lower)'] },
  { name: 'Hambantota', province: 'Southern', lat: 6.1429, lng: 81.1212, majorRivers: ['Walawe Ganga', 'Kirindi Oya'] },
  { name: 'Jaffna', province: 'Northern', lat: 9.6615, lng: 80.0255, majorRivers: ['Lagoon network'] },
  { name: 'Kalutara', province: 'Western', lat: 6.5854, lng: 79.9607, majorRivers: ['Kalu Ganga', 'Kuda Ganga'] },
  { name: 'Kandy', province: 'Central', lat: 7.2906, lng: 80.6337, majorRivers: ['Mahaweli Ganga', 'Ping Oya'] },
  { name: 'Kegalle', province: 'Sabaragamuwa', lat: 7.2513, lng: 80.3464, majorRivers: ['Kelani Ganga (upper)', 'Maha Oya'] },
  { name: 'Kilinochchi', province: 'Northern', lat: 9.3803, lng: 80.3770, majorRivers: ['Iranamadu Catchment', 'Kanakarayan Aru'] },
  { name: 'Kurunegala', province: 'North Western', lat: 7.4863, lng: 80.3623, majorRivers: ['Deduru Oya', 'Maha Oya'] },
  { name: 'Mannar', province: 'Northern', lat: 8.9810, lng: 79.9044, majorRivers: ['Malwathu Oya (lower)'] },
  { name: 'Matale', province: 'Central', lat: 7.4675, lng: 80.6234, majorRivers: ['Suduganga', 'Amban Ganga'] },
  { name: 'Matara', province: 'Southern', lat: 5.9549, lng: 80.5550, majorRivers: ['Nilwala Ganga'] },
  { name: 'Monaragala', province: 'Uva', lat: 6.8728, lng: 81.3507, majorRivers: ['Menik Ganga', 'Kumbukkan Oya'] },
  { name: 'Mullaitivu', province: 'Northern', lat: 9.2671, lng: 80.8143, majorRivers: ['Nay Aru', 'Per Aru'] },
  { name: 'Nuwara Eliya', province: 'Central', lat: 6.9497, lng: 80.7891, majorRivers: ['Kelani (origin)', 'Kotmale Oya'] },
  { name: 'Polonnaruwa', province: 'North Central', lat: 7.9403, lng: 81.0188, majorRivers: ['Mahaweli Ganga (middle)'] },
  { name: 'Puttalam', province: 'North Western', lat: 8.0408, lng: 79.8394, majorRivers: ['Mi Oya', 'Deduru Oya (estuary)'] },
  { name: 'Ratnapura', province: 'Sabaragamuwa', lat: 6.6828, lng: 80.4034, majorRivers: ['Kalu Ganga (upper)', 'Wey Ganga'] },
  { name: 'Trincomalee', province: 'Eastern', lat: 8.5874, lng: 81.2152, majorRivers: ['Mahaweli Ganga (delta)', 'Yan Oya'] },
  { name: 'Vavuniya', province: 'Northern', lat: 8.7514, lng: 80.4971, majorRivers: ['Paranki Aru', 'Aruvi Aru'] }
];

export const DISTRICT_NAMES = SRI_LANKA_DISTRICTS_DATA.map(d => d.name);

export const getDistrictCoordinates = (districtName: string): { lat: number; lng: number } => {
  const match = SRI_LANKA_DISTRICTS_DATA.find(d => d.name.toLowerCase() === districtName.toLowerCase());
  return match ? { lat: match.lat, lng: match.lng } : { lat: 7.8731, lng: 80.7718 };
};
