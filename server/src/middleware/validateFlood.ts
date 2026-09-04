import { Request, Response, NextFunction } from 'express';
import { SRI_LANKA_DISTRICTS } from '../models/FloodReport';

export const validateFloodInput = (req: Request, res: Response, next: NextFunction): void => {
  const {
    location,
    district,
    description,
    floodType,
    severity,
    waterLevel,
    affectedPeople,
    status,
    latitude,
    longitude
  } = req.body;

  const errors: string[] = [];

  if (!location || typeof location !== 'string' || location.trim().length < 2) {
    errors.push('Location is required and must be at least 2 characters long.');
  }

  if (!district || !SRI_LANKA_DISTRICTS.includes(district)) {
    errors.push(`Please select a valid Sri Lankan district. Received: ${district || 'empty'}`);
  }

  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    errors.push('Description must be provided and contain at least 10 characters.');
  }

  const validFloodTypes = [
    'Flash Flood',
    'River Overflow',
    'Urban Flood',
    'Landslide-related Flooding',
    'Heavy Rain Flooding',
    'Coastal Surge'
  ];
  if (floodType && !validFloodTypes.includes(floodType)) {
    errors.push(`Invalid flood type. Must be one of: ${validFloodTypes.join(', ')}`);
  }

  const validSeverities = ['Low', 'Moderate', 'High', 'Critical'];
  if (!severity || !validSeverities.includes(severity)) {
    errors.push(`Please select a valid severity level (${validSeverities.join(', ')}).`);
  }

  if (waterLevel === undefined || waterLevel === null || isNaN(Number(waterLevel)) || Number(waterLevel) < 0) {
    errors.push('Water level must be a positive number representing estimated depth in feet.');
  }

  if (affectedPeople !== undefined && (isNaN(Number(affectedPeople)) || Number(affectedPeople) < 0)) {
    errors.push('Estimated affected people count cannot be negative.');
  }

  const validStatuses = ['Active', 'Monitoring', 'Resolved'];
  if (status && !validStatuses.includes(status)) {
    errors.push(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
  }

  const latNum = Number(latitude);
  const lngNum = Number(longitude);

  if (isNaN(latNum) || latNum < 5.5 || latNum > 10.0) {
    errors.push('Latitude must be a valid coordinate within Sri Lanka (between 5.5 and 10.0).');
  }

  if (isNaN(lngNum) || lngNum < 79.0 || lngNum > 82.5) {
    errors.push('Longitude must be a valid coordinate within Sri Lanka (between 79.0 and 82.5).');
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed on flood report submission',
      errors
    });
    return;
  }

  next();
};

export const validateFloodUpdate = (req: Request, res: Response, next: NextFunction): void => {
  const {
    location,
    district,
    description,
    floodType,
    severity,
    waterLevel,
    affectedPeople,
    status,
    latitude,
    longitude
  } = req.body;

  const errors: string[] = [];

  if (location !== undefined && (typeof location !== 'string' || location.trim().length < 2)) {
    errors.push('Location must be at least 2 characters long.');
  }

  if (district !== undefined && !SRI_LANKA_DISTRICTS.includes(district)) {
    errors.push(`Please select a valid Sri Lankan district. Received: ${district || 'empty'}`);
  }

  if (description !== undefined && (typeof description !== 'string' || description.trim().length < 10)) {
    errors.push('Description must contain at least 10 characters.');
  }

  const validFloodTypes = [
    'Flash Flood',
    'River Overflow',
    'Urban Flood',
    'Landslide-related Flooding',
    'Heavy Rain Flooding',
    'Coastal Surge'
  ];
  if (floodType !== undefined && !validFloodTypes.includes(floodType)) {
    errors.push(`Invalid flood type. Must be one of: ${validFloodTypes.join(', ')}`);
  }

  const validSeverities = ['Low', 'Moderate', 'High', 'Critical'];
  if (severity !== undefined && !validSeverities.includes(severity)) {
    errors.push(`Please select a valid severity level (${validSeverities.join(', ')}).`);
  }

  if (waterLevel !== undefined && (isNaN(Number(waterLevel)) || Number(waterLevel) < 0)) {
    errors.push('Water level must be a non-negative number.');
  }

  if (affectedPeople !== undefined && (isNaN(Number(affectedPeople)) || Number(affectedPeople) < 0)) {
    errors.push('Estimated affected people count cannot be negative.');
  }

  const validStatuses = ['Active', 'Monitoring', 'Resolved'];
  if (status !== undefined && !validStatuses.includes(status)) {
    errors.push(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
  }

  if (latitude !== undefined) {
    const latNum = Number(latitude);
    if (isNaN(latNum) || latNum < 5.5 || latNum > 10.0) {
      errors.push('Latitude must be within Sri Lanka bounds (5.5 - 10.0).');
    }
  }

  if (longitude !== undefined) {
    const lngNum = Number(longitude);
    if (isNaN(lngNum) || lngNum < 79.0 || lngNum > 82.5) {
      errors.push('Longitude must be within Sri Lanka bounds (79.0 - 82.5).');
    }
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed on flood report update',
      errors
    });
    return;
  }

  next();
};
