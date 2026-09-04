import { Request, Response } from 'express';
import FloodReport from '../models/FloodReport';
import { INITIAL_FLOOD_REPORTS } from '../data/seedData';

// @desc    Get all flood reports from MongoDB Atlas with filtering, searching, and sorting
// @route   GET /api/floods
export const getFloodReports = async (req: Request, res: Response): Promise<void> => {
  try {
    const { district, severity, status, floodType, search, sortBy, order } = req.query;

    const query: any = {};

    // Filter by District
    if (district && district !== 'All') {
      query.district = district;
    }

    // Filter by Severity
    if (severity && severity !== 'All') {
      query.severity = severity;
    }

    // Filter by Status
    if (status && status !== 'All') {
      query.status = status;
    }

    // Filter by Flood Type
    if (floodType && floodType !== 'All') {
      query.floodType = floodType;
    }

    // Text Search across location, district, description, and reporter
    if (search && typeof search === 'string' && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { location: searchRegex },
        { district: searchRegex },
        { description: searchRegex },
        { reporterName: searchRegex },
        { floodType: searchRegex }
      ];
    }

    // Sorting options in MongoDB
    let sortOption: any = { reportedAt: -1 }; // default newest first
    if (sortBy === 'oldest') {
      sortOption = { reportedAt: 1 };
    } else if (sortBy === 'waterLevel') {
      sortOption = { waterLevel: order === 'asc' ? 1 : -1 };
    } else if (sortBy === 'affectedPeople') {
      sortOption = { affectedPeople: order === 'asc' ? 1 : -1 };
    }

    const reports = await FloodReport.find(query).sort(sortOption).lean();

    // Priority sorting if highest severity is requested
    if (sortBy === 'highestSeverity') {
      const severityOrder: Record<string, number> = { Critical: 4, High: 3, Moderate: 2, Low: 1 };
      reports.sort((a, b) => (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0));
    }

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error: any) {
    console.error('MongoDB Atlas getFloodReports Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve flood reports from MongoDB Atlas',
      error: error.message
    });
  }
};

// @desc    Get dynamic aggregate statistics directly from MongoDB Atlas
// @route   GET /api/floods/stats
export const getFloodStatistics = async (req: Request, res: Response): Promise<void> => {
  try {
    const allReports = await FloodReport.find().lean();

    const totalReports = allReports.length;
    const activeFloods = allReports.filter(r => r.status === 'Active').length;
    const monitoringFloods = allReports.filter(r => r.status === 'Monitoring').length;
    const resolvedFloods = allReports.filter(r => r.status === 'Resolved').length;

    const criticalFloods = allReports.filter(r => r.severity === 'Critical' && r.status !== 'Resolved').length;
    const highFloods = allReports.filter(r => r.severity === 'High' && r.status !== 'Resolved').length;
    const moderateFloods = allReports.filter(r => r.severity === 'Moderate' && r.status !== 'Resolved').length;
    const lowFloods = allReports.filter(r => r.severity === 'Low' && r.status !== 'Resolved').length;

    const totalAffectedPeople = allReports.reduce((acc, curr) => acc + (curr.affectedPeople || 0), 0);

    // Grouping by District
    const districtBreakdown: Record<string, number> = {};
    allReports.forEach(r => {
      districtBreakdown[r.district] = (districtBreakdown[r.district] || 0) + 1;
    });

    // Grouping by Flood Type
    const floodTypeBreakdown: Record<string, number> = {};
    allReports.forEach(r => {
      floodTypeBreakdown[r.floodType] = (floodTypeBreakdown[r.floodType] || 0) + 1;
    });

    const activeAffectedDistricts = new Set(
      allReports.filter(r => r.status === 'Active').map(r => r.district)
    ).size;

    res.status(200).json({
      success: true,
      data: {
        totalReports,
        activeFloods,
        monitoringFloods,
        resolvedFloods,
        criticalFloods,
        highFloods,
        moderateFloods,
        lowFloods,
        totalAffectedPeople,
        activeAffectedDistricts,
        districtBreakdown,
        floodTypeBreakdown,
        lastUpdated: new Date()
      }
    });
  } catch (error: any) {
    console.error('MongoDB Atlas getFloodStatistics Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate flood statistics from MongoDB Atlas',
      error: error.message
    });
  }
};

// @desc    Get single flood report by ID from MongoDB Atlas
// @route   GET /api/floods/:id
export const getFloodReportById = async (req: Request, res: Response): Promise<void> => {
  try {
    const report = await FloodReport.findById(req.params.id);

    if (!report) {
      res.status(404).json({
        success: false,
        message: `Flood report not found in MongoDB with id: ${req.params.id}`
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching flood report details from MongoDB Atlas',
      error: error.message
    });
  }
};

// @desc    Create new community flood report in MongoDB Atlas
// @route   POST /api/floods
export const createFloodReport = async (req: Request, res: Response): Promise<void> => {
  try {
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
      longitude,
      reporterName,
      contactNumber
    } = req.body;

    const newReport = await FloodReport.create({
      location: location.trim(),
      district,
      description: description.trim(),
      floodType: floodType || 'Heavy Rain Flooding',
      severity: severity || 'Moderate',
      waterLevel: Number(waterLevel),
      affectedPeople: Number(affectedPeople) || 0,
      status: status || 'Active',
      latitude: Number(latitude),
      longitude: Number(longitude),
      reporterName: reporterName ? reporterName.trim() : 'Anonymous Community Reporter',
      contactNumber: contactNumber ? contactNumber.trim() : undefined,
      reportedAt: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Flood alert successfully created in MongoDB Atlas.',
      data: newReport
    });
  } catch (error: any) {
    console.error('MongoDB Atlas createFloodReport Error:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create flood report in MongoDB Atlas',
      error: error.message
    });
  }
};

// @desc    Update existing flood report in MongoDB Atlas
// @route   PUT /api/floods/:id
export const updateFloodReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedReport = await FloodReport.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedAt: new Date()
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedReport) {
      res.status(404).json({
        success: false,
        message: `Cannot update. Report not found in MongoDB with id: ${req.params.id}`
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Flood report updated in MongoDB Atlas successfully.',
      data: updatedReport
    });
  } catch (error: any) {
    console.error('MongoDB Atlas updateFloodReport Error:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update flood report in MongoDB Atlas',
      error: error.message
    });
  }
};

// @desc    Delete flood report from MongoDB Atlas
// @route   DELETE /api/floods/:id
export const deleteFloodReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const report = await FloodReport.findByIdAndDelete(req.params.id);

    if (!report) {
      res.status(404).json({
        success: false,
        message: `Cannot delete. Report not found in MongoDB with id: ${req.params.id}`
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Flood report permanently deleted from MongoDB Atlas collection.',
      data: { id: req.params.id }
    });
  } catch (error: any) {
    console.error('MongoDB Atlas deleteFloodReport Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete flood report from MongoDB Atlas',
      error: error.message
    });
  }
};

// @desc    Reset and re-seed all sample data directly into MongoDB Atlas
// @route   POST /api/floods/seed
export const seedSampleData = async (req: Request, res: Response): Promise<void> => {
  try {
    await FloodReport.deleteMany({});
    const seeded = await FloodReport.insertMany(INITIAL_FLOOD_REPORTS);

    res.status(200).json({
      success: true,
      message: `Reset and successfully seeded ${seeded.length} realistic Sri Lankan flood reports into MongoDB Atlas.`,
      data: seeded
    });
  } catch (error: any) {
    console.error('MongoDB Atlas seedSampleData Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to seed sample flood data into MongoDB Atlas',
      error: error.message
    });
  }
};
