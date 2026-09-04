import mongoose, { Document, Schema } from 'mongoose';

export const SRI_LANKA_DISTRICTS = [
  'Ampara',
  'Anuradhapura',
  'Badulla',
  'Batticaloa',
  'Colombo',
  'Galle',
  'Gampaha',
  'Hambantota',
  'Jaffna',
  'Kalutara',
  'Kandy',
  'Kegalle',
  'Kilinochchi',
  'Kurunegala',
  'Mannar',
  'Matale',
  'Matara',
  'Monaragala',
  'Mullaitivu',
  'Nuwara Eliya',
  'Polonnaruwa',
  'Puttalam',
  'Ratnapura',
  'Trincomalee',
  'Vavuniya'
] as const;

export type DistrictType = typeof SRI_LANKA_DISTRICTS[number];
export type SeverityType = 'Low' | 'Moderate' | 'High' | 'Critical';
export type StatusType = 'Active' | 'Monitoring' | 'Resolved';
export type FloodType = 
  | 'Flash Flood'
  | 'River Overflow'
  | 'Urban Flood'
  | 'Landslide-related Flooding'
  | 'Heavy Rain Flooding'
  | 'Coastal Surge';

export interface IFloodReport extends Document {
  location: string;
  district: DistrictType;
  description: string;
  floodType: FloodType;
  severity: SeverityType;
  waterLevel: number; // in feet
  affectedPeople: number;
  status: StatusType;
  latitude: number;
  longitude: number;
  reporterName?: string;
  contactNumber?: string;
  reportedAt: Date;
  updatedAt: Date;
}

const FloodReportSchema: Schema = new Schema(
  {
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      minlength: [2, 'Location must be at least 2 characters long'],
      maxlength: [120, 'Location cannot exceed 120 characters']
    },
    district: {
      type: String,
      required: [true, 'District is required'],
      enum: {
        values: SRI_LANKA_DISTRICTS,
        message: '{VALUE} is not a valid Sri Lankan district'
      }
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must contain at least 10 characters'],
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    floodType: {
      type: String,
      required: [true, 'Flood type is required'],
      enum: {
        values: [
          'Flash Flood',
          'River Overflow',
          'Urban Flood',
          'Landslide-related Flooding',
          'Heavy Rain Flooding',
          'Coastal Surge'
        ],
        message: '{VALUE} is not a supported flood category'
      },
      default: 'Heavy Rain Flooding'
    },
    severity: {
      type: String,
      required: [true, 'Severity level is required'],
      enum: {
        values: ['Low', 'Moderate', 'High', 'Critical'],
        message: '{VALUE} is not a valid severity level'
      },
      default: 'Moderate'
    },
    waterLevel: {
      type: Number,
      required: [true, 'Estimated water level (in feet) is required'],
      min: [0, 'Water level cannot be negative'],
      max: [50, 'Water level seems unrealistically high (max 50 ft)']
    },
    affectedPeople: {
      type: Number,
      required: [true, 'Estimated number of affected people is required'],
      min: [0, 'Affected people count cannot be negative'],
      default: 0
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: ['Active', 'Monitoring', 'Resolved'],
        message: '{VALUE} is not a valid status'
      },
      default: 'Active'
    },
    latitude: {
      type: Number,
      required: [true, 'Latitude is required'],
      min: [5.5, 'Latitude must be within Sri Lanka territory (min 5.5)'],
      max: [10.0, 'Latitude must be within Sri Lanka territory (max 10.0)']
    },
    longitude: {
      type: Number,
      required: [true, 'Longitude is required'],
      min: [79.0, 'Longitude must be within Sri Lanka territory (min 79.0)'],
      max: [82.5, 'Longitude must be within Sri Lanka territory (max 82.5)']
    },
    reporterName: {
      type: String,
      trim: true,
      maxlength: [80, 'Reporter name cannot exceed 80 characters'],
      default: 'Anonymous Community Member'
    },
    contactNumber: {
      type: String,
      trim: true,
      maxlength: [20, 'Contact number cannot exceed 20 characters']
    },
    reportedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Indexes for high performance searches and filters
FloodReportSchema.index({ district: 1, severity: 1, status: 1 });
FloodReportSchema.index({ location: 'text', description: 'text' });

export default mongoose.model<IFloodReport>('FloodReport', FloodReportSchema);
