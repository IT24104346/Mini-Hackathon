export interface DistrictInfo {
  name: string;
  province: string;
  lat: number;
  lng: number;
  majorRivers: string[];
}

export interface TownLocation {
  town: string;
  district: string;
  lat: number;
  lng: number;
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

export const SRI_LANKA_TOWNS: TownLocation[] = [
  // ==================== COLOMBO DISTRICT ====================
  { town: 'Godagama', district: 'Colombo', lat: 6.8521, lng: 80.0384 },
  { town: 'Meegoda', district: 'Colombo', lat: 6.8450, lng: 80.0540 },
  { town: 'Homagama', district: 'Colombo', lat: 6.8440, lng: 80.0025 },
  { town: 'Kottawa', district: 'Colombo', lat: 6.8430, lng: 79.9650 },
  { town: 'Pannipitiya', district: 'Colombo', lat: 6.8470, lng: 79.9530 },
  { town: 'Maharagama', district: 'Colombo', lat: 6.8480, lng: 79.9268 },
  { town: 'Nugegoda', district: 'Colombo', lat: 6.8650, lng: 79.8997 },
  { town: 'Boralesgamuwa', district: 'Colombo', lat: 6.8410, lng: 79.9020 },
  { town: 'Piliyandala', district: 'Colombo', lat: 6.8018, lng: 79.9227 },
  { town: 'Kesbewa', district: 'Colombo', lat: 6.7860, lng: 79.9480 },
  { town: 'Moratuwa', district: 'Colombo', lat: 6.7730, lng: 79.8816 },
  { town: 'Ratmalana', district: 'Colombo', lat: 6.8200, lng: 79.8800 },
  { town: 'Dehiwala', district: 'Colombo', lat: 6.8510, lng: 79.8659 },
  { town: 'Mount Lavinia', district: 'Colombo', lat: 6.8380, lng: 79.8640 },
  { town: 'Wellawatte', district: 'Colombo', lat: 6.8740, lng: 79.8600 },
  { town: 'Bambalapitiya', district: 'Colombo', lat: 6.8920, lng: 79.8550 },
  { town: 'Kollupitiya', district: 'Colombo', lat: 6.9110, lng: 79.8510 },
  { town: 'Colombo', district: 'Colombo', lat: 6.9271, lng: 79.8612 },
  { town: 'Fort', district: 'Colombo', lat: 6.9344, lng: 79.8428 },
  { town: 'Pettah', district: 'Colombo', lat: 6.9405, lng: 79.8598 },
  { town: 'Grandpass', district: 'Colombo', lat: 6.9510, lng: 79.8710 },
  { town: 'Sedawatta', district: 'Colombo', lat: 6.9534, lng: 79.8845 },
  { town: 'Wellampitiya', district: 'Colombo', lat: 6.9482, lng: 79.8961 },
  { town: 'Kotikawatta', district: 'Colombo', lat: 6.9412, lng: 79.9056 },
  { town: 'Kolonnawa', district: 'Colombo', lat: 6.9320, lng: 79.8950 },
  { town: 'Angoda', district: 'Colombo', lat: 6.9280, lng: 79.9150 },
  { town: 'Rajagiriya', district: 'Colombo', lat: 6.9090, lng: 79.8930 },
  { town: 'Battaramulla', district: 'Colombo', lat: 6.8982, lng: 79.9192 },
  { town: 'Pelawatta', district: 'Colombo', lat: 6.8870, lng: 79.9320 },
  { town: 'Thalawathugoda', district: 'Colombo', lat: 6.8720, lng: 79.9410 },
  { town: 'Hokandara', district: 'Colombo', lat: 6.8750, lng: 79.9680 },
  { town: 'Malabe', district: 'Colombo', lat: 6.9042, lng: 79.9547 },
  { town: 'Kaduwela', district: 'Colombo', lat: 6.9344, lng: 79.9842 },
  { town: 'Athurugiriya', district: 'Colombo', lat: 6.8708, lng: 79.9886 },
  { town: 'Habarakada', district: 'Colombo', lat: 6.8620, lng: 80.0150 },
  { town: 'Hanwella', district: 'Colombo', lat: 6.9015, lng: 80.0822 },
  { town: 'Padukka', district: 'Colombo', lat: 6.8512, lng: 80.1034 },
  { town: 'Avissawella', district: 'Colombo', lat: 6.9542, lng: 80.2045 },
  { town: 'Kosgama', district: 'Colombo', lat: 6.9340, lng: 80.1420 },
  { town: 'Kaluaggala', district: 'Colombo', lat: 6.8920, lng: 80.0980 },
  { town: 'Meepe', district: 'Colombo', lat: 6.8630, lng: 80.0760 },
  { town: 'Kotte', district: 'Colombo', lat: 6.8890, lng: 79.9070 },

  // ==================== GAMPAHA DISTRICT ====================
  { town: 'Gampaha', district: 'Gampaha', lat: 7.0840, lng: 79.9939 },
  { town: 'Negombo', district: 'Gampaha', lat: 7.2008, lng: 79.8736 },
  { town: 'Katunayake', district: 'Gampaha', lat: 7.1700, lng: 79.8800 },
  { town: 'Seeduwa', district: 'Gampaha', lat: 7.1260, lng: 79.8760 },
  { town: 'Ja-Ela', district: 'Gampaha', lat: 7.0744, lng: 79.8917 },
  { town: 'Kandana', district: 'Gampaha', lat: 7.0478, lng: 79.8972 },
  { town: 'Ragama', district: 'Gampaha', lat: 7.0270, lng: 79.9210 },
  { town: 'Mahabage', district: 'Gampaha', lat: 7.0050, lng: 79.8920 },
  { town: 'Wattala', district: 'Gampaha', lat: 6.9895, lng: 79.8912 },
  { town: 'Peliyagoda', district: 'Gampaha', lat: 6.9610, lng: 79.8850 },
  { town: 'Kelaniya', district: 'Gampaha', lat: 6.9535, lng: 79.9198 },
  { town: 'Kiribathgoda', district: 'Gampaha', lat: 6.9790, lng: 79.9290 },
  { town: 'Kadawatha', district: 'Gampaha', lat: 7.0017, lng: 79.9536 },
  { town: 'Eldeniya', district: 'Gampaha', lat: 6.9950, lng: 79.9480 },
  { town: 'Biyagama', district: 'Gampaha', lat: 6.9312, lng: 79.9876 },
  { town: 'Delgoda', district: 'Gampaha', lat: 6.9850, lng: 80.0350 },
  { town: 'Pugoda', district: 'Gampaha', lat: 6.9680, lng: 80.1200 },
  { town: 'Dompe', district: 'Gampaha', lat: 6.9480, lng: 80.0540 },
  { town: 'Yakkala', district: 'Gampaha', lat: 7.0860, lng: 80.0350 },
  { town: 'Nittambuwa', district: 'Gampaha', lat: 7.1444, lng: 80.0972 },
  { town: 'Veyangoda', district: 'Gampaha', lat: 7.1550, lng: 80.0570 },
  { town: 'Mirigama', district: 'Gampaha', lat: 7.2430, lng: 80.1300 },
  { town: 'Minuwangoda', district: 'Gampaha', lat: 7.1667, lng: 79.9500 },
  { town: 'Divulapitiya', district: 'Gampaha', lat: 7.2210, lng: 80.0050 },
  { town: 'Ganemulla', district: 'Gampaha', lat: 7.0620, lng: 79.9600 },
  { town: 'Raddoluwa', district: 'Gampaha', lat: 7.1350, lng: 79.8950 },

  // ==================== KALUTARA DISTRICT ====================
  { town: 'Kalutara', district: 'Kalutara', lat: 6.5854, lng: 79.9607 },
  { town: 'Panadura', district: 'Kalutara', lat: 6.7132, lng: 79.9074 },
  { town: 'Wadduwa', district: 'Kalutara', lat: 6.6667, lng: 79.9333 },
  { town: 'Paiyagala', district: 'Kalutara', lat: 6.5350, lng: 79.9750 },
  { town: 'Beruwala', district: 'Kalutara', lat: 6.4789, lng: 79.9828 },
  { town: 'Aluthgama', district: 'Kalutara', lat: 6.4344, lng: 79.9989 },
  { town: 'Bandaragama', district: 'Kalutara', lat: 6.7180, lng: 79.9890 },
  { town: 'Horana', district: 'Kalutara', lat: 6.7150, lng: 80.0620 },
  { town: 'Ingiriya', district: 'Kalutara', lat: 6.7410, lng: 80.1650 },
  { town: 'Bulathsinhala', district: 'Kalutara', lat: 6.6498, lng: 80.1477 },
  { town: 'Matugama', district: 'Kalutara', lat: 6.5220, lng: 80.1170 },
  { town: 'Agalawatta', district: 'Kalutara', lat: 6.5410, lng: 80.1550 },
  { town: 'Dodangoda', district: 'Kalutara', lat: 6.5820, lng: 80.0510 },
  { town: 'Neboda', district: 'Kalutara', lat: 6.6200, lng: 80.0820 },
  { town: 'Tebuwana', district: 'Kalutara', lat: 6.6020, lng: 80.0400 },

  // ==================== GALLE DISTRICT ====================
  { town: 'Galle', district: 'Galle', lat: 6.0535, lng: 80.2210 },
  { town: 'Karapitiya', district: 'Galle', lat: 6.0650, lng: 80.2310 },
  { town: 'Unawatuna', district: 'Galle', lat: 6.0100, lng: 80.2490 },
  { town: 'Hikkaduwa', district: 'Galle', lat: 6.1408, lng: 80.1006 },
  { town: 'Ambalangoda', district: 'Galle', lat: 6.2361, lng: 80.0542 },
  { town: 'Bentota', district: 'Galle', lat: 6.4250, lng: 79.9960 },
  { town: 'Baddegama', district: 'Galle', lat: 6.1852, lng: 80.1983 },
  { town: 'Elpitiya', district: 'Galle', lat: 6.2580, lng: 80.1420 },
  { town: 'Batapola', district: 'Galle', lat: 6.2200, lng: 80.1100 },
  { town: 'Nagoda', district: 'Galle', lat: 6.2050, lng: 80.2750 },
  { town: 'Wanduramba', district: 'Galle', lat: 6.1720, lng: 80.2240 },
  { town: 'Yakkalamulla', district: 'Galle', lat: 6.1300, lng: 80.3200 },
  { town: 'Neluwa', district: 'Galle', lat: 6.3680, lng: 80.4350 },
  { town: 'Ahangama', district: 'Galle', lat: 5.9750, lng: 80.3650 },
  { town: 'Koggala', district: 'Galle', lat: 5.9920, lng: 80.3250 },
  { town: 'Habaraduwa', district: 'Galle', lat: 6.0020, lng: 80.2950 },

  // ==================== MATARA DISTRICT ====================
  { town: 'Matara', district: 'Matara', lat: 5.9549, lng: 80.5550 },
  { town: 'Weligama', district: 'Matara', lat: 5.9722, lng: 80.4286 },
  { town: 'Mirissa', district: 'Matara', lat: 5.9480, lng: 80.4580 },
  { town: 'Akuressa', district: 'Matara', lat: 6.1000, lng: 80.4780 },
  { town: 'Thihagoda', district: 'Matara', lat: 6.0076, lng: 80.5732 },
  { town: 'Kamburupitiya', district: 'Matara', lat: 6.0820, lng: 80.5650 },
  { town: 'Deniyaya', district: 'Matara', lat: 6.3450, lng: 80.5570 },
  { town: 'Morawaka', district: 'Matara', lat: 6.2650, lng: 80.4850 },
  { town: 'Hakmana', district: 'Matara', lat: 6.0880, lng: 80.6480 },
  { town: 'Dickwella', district: 'Matara', lat: 5.9640, lng: 80.6970 },
  { town: 'Devinuwara', district: 'Matara', lat: 5.9260, lng: 80.5890 },
  { town: 'Dondra', district: 'Matara', lat: 5.9260, lng: 80.5890 },
  { town: 'Malimbada', district: 'Matara', lat: 6.0350, lng: 80.5350 },
  { town: 'Gandara', district: 'Matara', lat: 5.9400, lng: 80.6200 },
  { town: 'Kekanadurra', district: 'Matara', lat: 5.9800, lng: 80.6000 },
  { town: 'Urubokka', district: 'Matara', lat: 6.2800, lng: 80.6500 },

  // ==================== HAMBANTOTA DISTRICT ====================
  { town: 'Hambantota', district: 'Hambantota', lat: 6.1429, lng: 81.1212 },
  { town: 'Tangalle', district: 'Hambantota', lat: 6.0242, lng: 80.7942 },
  { town: 'Beliatta', district: 'Hambantota', lat: 6.0500, lng: 80.7200 },
  { town: 'Ambalantota', district: 'Hambantota', lat: 6.1200, lng: 81.0200 },
  { town: 'Tissamaharama', district: 'Hambantota', lat: 6.2800, lng: 81.2900 },
  { town: 'Walasmulla', district: 'Hambantota', lat: 6.1400, lng: 80.6900 },
  { town: 'Weeraketiya', district: 'Hambantota', lat: 6.1500, lng: 80.7800 },
  { town: 'Middeniya', district: 'Hambantota', lat: 6.2200, lng: 80.7500 },
  { town: 'Ranna', district: 'Hambantota', lat: 6.0900, lng: 80.8900 },
  { town: 'Hungama', district: 'Hambantota', lat: 6.1050, lng: 80.9400 },
  { town: 'Sooriyawewa', district: 'Hambantota', lat: 6.3200, lng: 81.0100 },

  // ==================== RATNAPURA DISTRICT ====================
  { town: 'Ratnapura', district: 'Ratnapura', lat: 6.6828, lng: 80.4034 },
  { town: 'Balangoda', district: 'Ratnapura', lat: 6.6500, lng: 80.7000 },
  { town: 'Pelmadulla', district: 'Ratnapura', lat: 6.6250, lng: 80.5480 },
  { town: 'Eheliyagoda', district: 'Ratnapura', lat: 6.8500, lng: 80.2600 },
  { town: 'Kuruwita', district: 'Ratnapura', lat: 6.7720, lng: 80.3690 },
  { town: 'Kiriella', district: 'Ratnapura', lat: 6.7450, lng: 80.3120 },
  { town: 'Embilipitiya', district: 'Ratnapura', lat: 6.3400, lng: 80.8500 },
  { town: 'Rakwana', district: 'Ratnapura', lat: 6.4670, lng: 80.6170 },
  { town: 'Kalawana', district: 'Ratnapura', lat: 6.5250, lng: 80.4000 },
  { town: 'Ayagama', district: 'Ratnapura', lat: 6.6200, lng: 80.3000 },
  { town: 'Nivithigala', district: 'Ratnapura', lat: 6.5800, lng: 80.4500 },
  { town: 'Godakawela', district: 'Ratnapura', lat: 6.5300, lng: 80.6200 },
  { town: 'Kahawatta', district: 'Ratnapura', lat: 6.5800, lng: 80.5700 },

  // ==================== KEGALLE DISTRICT ====================
  { town: 'Kegalle', district: 'Kegalle', lat: 7.2513, lng: 80.3464 },
  { town: 'Mawanella', district: 'Kegalle', lat: 7.2520, lng: 80.4480 },
  { town: 'Warakapola', district: 'Kegalle', lat: 7.2240, lng: 80.1980 },
  { town: 'Ruwanwella', district: 'Kegalle', lat: 7.0420, lng: 80.2550 },
  { town: 'Yatiyantota', district: 'Kegalle', lat: 7.0350, lng: 80.3000 },
  { town: 'Dehiowita', district: 'Kegalle', lat: 6.9800, lng: 80.2700 },
  { town: 'Deraniyagala', district: 'Kegalle', lat: 6.9280, lng: 80.3390 },
  { town: 'Rambukkana', district: 'Kegalle', lat: 7.3200, lng: 80.3950 },
  { town: 'Kitulgala', district: 'Kegalle', lat: 6.9890, lng: 80.4180 },
  { town: 'Galigamuwa', district: 'Kegalle', lat: 7.2200, lng: 80.2800 },
  { town: 'Aranayaka', district: 'Kegalle', lat: 7.1500, lng: 80.4800 },
  { town: 'Bulathkohupitiya', district: 'Kegalle', lat: 7.1100, lng: 80.3500 },

  // ==================== KANDY DISTRICT ====================
  { town: 'Kandy', district: 'Kandy', lat: 7.2906, lng: 80.6337 },
  { town: 'Peradeniya', district: 'Kandy', lat: 7.2600, lng: 80.5980 },
  { town: 'Katugastota', district: 'Kandy', lat: 7.3200, lng: 80.6200 },
  { town: 'Gampola', district: 'Kandy', lat: 7.1643, lng: 80.5753 },
  { town: 'Kundasale', district: 'Kandy', lat: 7.2880, lng: 80.6850 },
  { town: 'Digana', district: 'Kandy', lat: 7.3000, lng: 80.7300 },
  { town: 'Teldeniya', district: 'Kandy', lat: 7.3100, lng: 80.7700 },
  { town: 'Menikhinna', district: 'Kandy', lat: 7.3200, lng: 80.7000 },
  { town: 'Wattegama', district: 'Kandy', lat: 7.3500, lng: 80.6800 },
  { town: 'Akurana', district: 'Kandy', lat: 7.3670, lng: 80.6170 },
  { town: 'Ampitiya', district: 'Kandy', lat: 7.2750, lng: 80.6600 },
  { town: 'Nawalapitiya', district: 'Kandy', lat: 7.0500, lng: 80.5350 },
  { town: 'Kadugannawa', district: 'Kandy', lat: 7.2550, lng: 80.5220 },
  { town: 'Pilimathalawa', district: 'Kandy', lat: 7.2650, lng: 80.5600 },
  { town: 'Gelioya', district: 'Kandy', lat: 7.2050, lng: 80.5950 },
  { town: 'Hasalaka', district: 'Kandy', lat: 7.3900, lng: 80.9500 },

  // ==================== MATALE DISTRICT ====================
  { town: 'Matale', district: 'Matale', lat: 7.4675, lng: 80.6234 },
  { town: 'Dambulla', district: 'Matale', lat: 7.8742, lng: 80.6511 },
  { town: 'Sigiriya', district: 'Matale', lat: 7.9570, lng: 80.7600 },
  { town: 'Galewela', district: 'Matale', lat: 7.7600, lng: 80.5700 },
  { town: 'Rattota', district: 'Matale', lat: 7.5180, lng: 80.6650 },
  { town: 'Ukuwela', district: 'Matale', lat: 7.4350, lng: 80.6300 },
  { town: 'Naula', district: 'Matale', lat: 7.7000, lng: 80.6500 },

  // ==================== NUWARA ELIYA DISTRICT ====================
  { town: 'Nuwara Eliya', district: 'Nuwara Eliya', lat: 6.9497, lng: 80.7891 },
  { town: 'Hatton', district: 'Nuwara Eliya', lat: 6.8917, lng: 80.5950 },
  { town: 'Talawakelle', district: 'Nuwara Eliya', lat: 6.9380, lng: 80.6590 },
  { town: 'Ginigathena', district: 'Nuwara Eliya', lat: 6.9850, lng: 80.4900 },
  { town: 'Kotmale', district: 'Nuwara Eliya', lat: 7.0700, lng: 80.6000 },
  { town: 'Maskeliya', district: 'Nuwara Eliya', lat: 6.8350, lng: 80.5650 },
  { town: 'Norwood', district: 'Nuwara Eliya', lat: 6.8350, lng: 80.6100 },
  { town: 'Bogawantalawa', district: 'Nuwara Eliya', lat: 6.7900, lng: 80.6600 },
  { town: 'Ragala', district: 'Nuwara Eliya', lat: 7.0000, lng: 80.8400 },
  { town: 'Walapane', district: 'Nuwara Eliya', lat: 7.0800, lng: 80.8600 },
  { town: 'Nanu Oya', district: 'Nuwara Eliya', lat: 6.9300, lng: 80.7400 },

  // ==================== KURUNEGALA DISTRICT ====================
  { town: 'Kurunegala', district: 'Kurunegala', lat: 7.4863, lng: 80.3623 },
  { town: 'Kuliyapitiya', district: 'Kurunegala', lat: 7.4689, lng: 80.0400 },
  { town: 'Narammala', district: 'Kurunegala', lat: 7.4333, lng: 80.2167 },
  { town: 'Polgahawela', district: 'Kurunegala', lat: 7.3333, lng: 80.3000 },
  { town: 'Alawwa', district: 'Kurunegala', lat: 7.3000, lng: 80.2400 },
  { town: 'Giriulla', district: 'Kurunegala', lat: 7.3500, lng: 80.1200 },
  { town: 'Wariyapola', district: 'Kurunegala', lat: 7.6333, lng: 80.2667 },
  { town: 'Pannala', district: 'Kurunegala', lat: 7.3400, lng: 80.0300 },
  { town: 'Mawathagama', district: 'Kurunegala', lat: 7.4300, lng: 80.4400 },
  { town: 'Ibbagamuwa', district: 'Kurunegala', lat: 7.5400, lng: 80.4300 },
  { town: 'Nikaweratiya', district: 'Kurunegala', lat: 7.7500, lng: 80.1100 },
  { town: 'Maho', district: 'Kurunegala', lat: 7.8200, lng: 80.2700 },
  { town: 'Galgamuwa', district: 'Kurunegala', lat: 7.9800, lng: 80.2800 },
  { town: 'Dambadeniya', district: 'Kurunegala', lat: 7.3600, lng: 80.1400 },

  // ==================== PUTTALAM DISTRICT ====================
  { town: 'Puttalam', district: 'Puttalam', lat: 8.0408, lng: 79.8394 },
  { town: 'Chilaw', district: 'Puttalam', lat: 7.5758, lng: 79.7953 },
  { town: 'Wennappuwa', district: 'Puttalam', lat: 7.3341, lng: 79.8456 },
  { town: 'Marawila', district: 'Puttalam', lat: 7.4100, lng: 79.8200 },
  { town: 'Dankotuwa', district: 'Puttalam', lat: 7.3000, lng: 79.8900 },
  { town: 'Nattandiya', district: 'Puttalam', lat: 7.4200, lng: 79.8700 },
  { town: 'Madampe', district: 'Puttalam', lat: 7.5000, lng: 79.8400 },
  { town: 'Mahawewa', district: 'Puttalam', lat: 7.4500, lng: 79.8300 },
  { town: 'Anamaduwa', district: 'Puttalam', lat: 7.9000, lng: 80.0100 },
  { town: 'Kalpitiya', district: 'Puttalam', lat: 8.2300, lng: 79.7600 },
  { town: 'Norochcholai', district: 'Puttalam', lat: 8.1600, lng: 79.7200 },

  // ==================== ANURADHAPURA DISTRICT ====================
  { town: 'Anuradhapura', district: 'Anuradhapura', lat: 8.3114, lng: 80.4037 },
  { town: 'Kekirawa', district: 'Anuradhapura', lat: 8.0400, lng: 80.6000 },
  { town: 'Medawachchiya', district: 'Anuradhapura', lat: 8.5400, lng: 80.4900 },
  { town: 'Tambuttegama', district: 'Anuradhapura', lat: 8.1500, lng: 80.2900 },
  { town: 'Eppawala', district: 'Anuradhapura', lat: 8.1400, lng: 80.4100 },
  { town: 'Mihintale', district: 'Anuradhapura', lat: 8.3500, lng: 80.5000 },
  { town: 'Habarana', district: 'Anuradhapura', lat: 8.0300, lng: 80.7500 },
  { town: 'Nochchiyagama', district: 'Anuradhapura', lat: 8.2800, lng: 80.1900 },
  { town: 'Talawa', district: 'Anuradhapura', lat: 8.1800, lng: 80.3300 },
  { town: 'Galnewa', district: 'Anuradhapura', lat: 8.0100, lng: 80.4300 },
  { town: 'Horowpathana', district: 'Anuradhapura', lat: 8.5800, lng: 80.8600 },

  // ==================== POLONNARUWA DISTRICT ====================
  { town: 'Polonnaruwa', district: 'Polonnaruwa', lat: 7.9403, lng: 81.0188 },
  { town: 'Kaduruwela', district: 'Polonnaruwa', lat: 7.9300, lng: 81.0100 },
  { town: 'Hingurakgoda', district: 'Polonnaruwa', lat: 8.0500, lng: 80.9800 },
  { town: 'Medirigiriya', district: 'Polonnaruwa', lat: 8.1500, lng: 81.0100 },
  { town: 'Minneriya', district: 'Polonnaruwa', lat: 8.0300, lng: 80.9000 },
  { town: 'Welikanda', district: 'Polonnaruwa', lat: 7.9200, lng: 81.2500 },
  { town: 'Bakamuna', district: 'Polonnaruwa', lat: 7.7800, lng: 80.8200 },

  // ==================== BADULLA DISTRICT ====================
  { town: 'Badulla', district: 'Badulla', lat: 6.9934, lng: 81.0550 },
  { town: 'Bandarawela', district: 'Badulla', lat: 6.8333, lng: 80.9833 },
  { town: 'Ella', district: 'Badulla', lat: 6.8667, lng: 81.0467 },
  { town: 'Haputale', district: 'Badulla', lat: 6.7667, lng: 80.9500 },
  { town: 'Welimada', district: 'Badulla', lat: 6.9000, lng: 80.9000 },
  { town: 'Mahiyanganaya', district: 'Badulla', lat: 7.3167, lng: 81.0000 },
  { town: 'Diyatalawa', district: 'Badulla', lat: 6.8000, lng: 80.9600 },
  { town: 'Hali-Ela', district: 'Badulla', lat: 6.9500, lng: 81.0300 },
  { town: 'Passara', district: 'Badulla', lat: 6.9300, lng: 81.1500 },

  // ==================== MONARAGALA DISTRICT ====================
  { town: 'Monaragala', district: 'Monaragala', lat: 6.8728, lng: 81.3507 },
  { town: 'Wellawaya', district: 'Monaragala', lat: 6.7333, lng: 81.1000 },
  { town: 'Buttala', district: 'Monaragala', lat: 6.7580, lng: 81.2400 },
  { town: 'Bibile', district: 'Monaragala', lat: 7.1667, lng: 81.2333 },
  { town: 'Kataragama', district: 'Monaragala', lat: 6.4167, lng: 81.3333 },
  { town: 'Thanamalwila', district: 'Monaragala', lat: 6.4400, lng: 81.1300 },
  { town: 'Siyambalanduwa', district: 'Monaragala', lat: 6.9000, lng: 81.5500 },

  // ==================== TRINCOMALEE DISTRICT ====================
  { town: 'Trincomalee', district: 'Trincomalee', lat: 8.5874, lng: 81.2152 },
  { town: 'Kinniya', district: 'Trincomalee', lat: 8.5000, lng: 81.1800 },
  { town: 'Muttur', district: 'Trincomalee', lat: 8.4500, lng: 81.2700 },
  { town: 'Kantale', district: 'Trincomalee', lat: 8.3600, lng: 81.0000 },
  { town: 'Nilaveli', district: 'Trincomalee', lat: 8.6800, lng: 81.1900 },
  { town: 'Kuchchaveli', district: 'Trincomalee', lat: 8.8200, lng: 81.0900 },

  // ==================== BATTICALOA DISTRICT ====================
  { town: 'Batticaloa', district: 'Batticaloa', lat: 7.7310, lng: 81.6747 },
  { town: 'Kattankudy', district: 'Batticaloa', lat: 7.6800, lng: 81.7200 },
  { town: 'Eravur', district: 'Batticaloa', lat: 7.7800, lng: 81.6000 },
  { town: 'Valaichchenai', district: 'Batticaloa', lat: 7.9200, lng: 81.5300 },
  { town: 'Chenkalady', district: 'Batticaloa', lat: 7.8100, lng: 81.5700 },
  { town: 'Kaluwanchikudy', district: 'Batticaloa', lat: 7.5200, lng: 81.7900 },
  { town: 'Oddamavadi', district: 'Batticaloa', lat: 7.9250, lng: 81.5150 },

  // ==================== AMPARA DISTRICT ====================
  { town: 'Ampara', district: 'Ampara', lat: 7.2912, lng: 81.6747 },
  { town: 'Kalmunai', district: 'Ampara', lat: 7.4167, lng: 81.8167 },
  { town: 'Sammanthurai', district: 'Ampara', lat: 7.3600, lng: 81.8000 },
  { town: 'Akkaraipattu', district: 'Ampara', lat: 7.2200, lng: 81.8500 },
  { town: 'Pottuvil', district: 'Ampara', lat: 6.8700, lng: 81.8300 },
  { town: 'Arugam Bay', district: 'Ampara', lat: 6.8400, lng: 81.8300 },
  { town: 'Sainthamaruthu', district: 'Ampara', lat: 7.4000, lng: 81.8300 },
  { town: 'Uhana', district: 'Ampara', lat: 7.3500, lng: 81.6100 },
  { town: 'Dehiattakandiya', district: 'Ampara', lat: 7.6800, lng: 81.0800 },

  // ==================== JAFFNA DISTRICT ====================
  { town: 'Jaffna', district: 'Jaffna', lat: 9.6615, lng: 80.0255 },
  { town: 'Nallur', district: 'Jaffna', lat: 9.6750, lng: 80.0300 },
  { town: 'Chavakachcheri', district: 'Jaffna', lat: 9.6500, lng: 80.1500 },
  { town: 'Point Pedro', district: 'Jaffna', lat: 9.8200, lng: 80.2300 },
  { town: 'Chunnakam', district: 'Jaffna', lat: 9.7400, lng: 80.0200 },
  { town: 'Manipay', district: 'Jaffna', lat: 9.7100, lng: 79.9900 },
  { town: 'Valvettithurai', district: 'Jaffna', lat: 9.8100, lng: 80.1700 },

  // ==================== NORTHERN DISTRICTS ====================
  { town: 'Kilinochchi', district: 'Kilinochchi', lat: 9.3803, lng: 80.3770 },
  { town: 'Paranthan', district: 'Kilinochchi', lat: 9.4300, lng: 80.4000 },
  { town: 'Mannar', district: 'Mannar', lat: 8.9810, lng: 79.9044 },
  { town: 'Pesalai', district: 'Mannar', lat: 9.0800, lng: 79.8200 },
  { town: 'Thalaimannar', district: 'Mannar', lat: 9.1000, lng: 79.7200 },
  { town: 'Vavuniya', district: 'Vavuniya', lat: 8.7514, lng: 80.4971 },
  { town: 'Mullaitivu', district: 'Mullaitivu', lat: 9.2671, lng: 80.8143 }
];

export const getDistrictCoordinates = (districtName: string): { lat: number; lng: number } => {
  const match = SRI_LANKA_DISTRICTS_DATA.find(d => d.name.toLowerCase() === districtName.toLowerCase());
  return match ? { lat: match.lat, lng: match.lng } : { lat: 7.8731, lng: 80.7718 };
};

// Automatic City / Town to District and Coordinates Lookup
export const detectDistrictFromLocation = (
  locationInput: string
): { detectedDistrict?: string; lat?: number; lng?: number; matchedTown?: string } => {
  if (!locationInput || locationInput.trim().length < 2) return {};

  const cleanInput = locationInput.toLowerCase().trim();

  // 1. Exact match in town dictionary (longer names first)
  const sortedTowns = [...SRI_LANKA_TOWNS].sort((a, b) => b.town.length - a.town.length);

  for (const item of sortedTowns) {
    const townLower = item.town.toLowerCase();
    const regex = new RegExp(`\\b${townLower}\\b`, 'i');
    if (regex.test(cleanInput) || cleanInput.includes(townLower)) {
      return {
        detectedDistrict: item.district,
        lat: item.lat,
        lng: item.lng,
        matchedTown: item.town
      };
    }
  }

  // 2. Direct match with district names
  for (const district of SRI_LANKA_DISTRICTS_DATA) {
    if (cleanInput.includes(district.name.toLowerCase())) {
      return {
        detectedDistrict: district.name,
        lat: district.lat,
        lng: district.lng,
        matchedTown: district.name
      };
    }
  }

  return {};
};

// Autocomplete suggestions helper
export const getTownSuggestions = (input: string, limit = 8): TownLocation[] => {
  if (!input || input.trim().length < 1) return [];
  const q = input.toLowerCase().trim();
  return SRI_LANKA_TOWNS.filter(t => t.town.toLowerCase().includes(q) || t.district.toLowerCase().includes(q)).slice(0, limit);
};
