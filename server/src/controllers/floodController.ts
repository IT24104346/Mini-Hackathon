import { Request, Response } from 'express';
import FloodReport from '../models/FloodReport';
import { INITIAL_FLOOD_REPORTS } from '../data/seedData';
import { isDBConnected } from '../config/db';

// In-memory persistent state for local offline development & evaluation fallback
let memoryReports: any[] = INITIAL_FLOOD_REPORTS.map((r, i) => ({
  ...r,
  _id: `mem_flood_${i + 1}`,
  reportedAt: r.reportedAt.toISOString(),
  updatedAt: r.reportedAt.toISOString()
}));

// @desc    Get all flood reports with filtering, searching, and sorting
// @route   GET /api/floods
export const getFloodReports = async (req: Request, res: Response): Promise<void> => {
  try {
    const { district, severity, status, floodType, search, sortBy, order } = req.query;

    if (isDBConnected()) {
      const query: any = {};

      if (district && district !== 'All') query.district = district;
      if (severity && severity !== 'All') query.severity = severity;
      if (status && status !== 'All') query.status = status;
      if (floodType && floodType !== 'All') query.floodType = floodType;

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

      let sortOption: any = { reportedAt: -1 };
      if (sortBy === 'oldest') sortOption = { reportedAt: 1 };
      else if (sortBy === 'waterLevel') sortOption = { waterLevel: order === 'asc' ? 1 : -1 };
      else if (sortBy === 'affectedPeople') sortOption = { affectedPeople: order === 'asc' ? 1 : -1 };

      const reports = await FloodReport.find(query).sort(sortOption);

      if (sortBy === 'highestSeverity') {
        const severityOrder: Record<string, number> = { Critical: 4, High: 3, Moderate: 2, Low: 1 };
        reports.sort((a, b) => (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0));
      }

      res.status(200).json({
        success: true,
        count: reports.length,
        data: reports
      });
      return;
    }

    // Fallback: In-memory dataset filtering
    let results = [...memoryReports];

    if (district && district !== 'All') {
      results = results.filter(r => r.district.toLowerCase() === (district as string).toLowerCase());
    }

    if (severity && severity !== 'All') {
      results = results.filter(r => r.severity.toLowerCase() === (severity as string).toLowerCase());
    }

    if (status && status !== 'All') {
      results = results.filter(r => r.status.toLowerCase() === (status as string).toLowerCase());
    }

    if (floodType && floodType !== 'All') {
      results = results.filter(r => r.floodType.toLowerCase() === (floodType as string).toLowerCase());
    }

    if (search && typeof search === 'string' && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      results = results.filter(
        r =>
          r.location.toLowerCase().includes(q) ||
          r.district.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          (r.reporterName && r.reporterName.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'oldest') {
      results.sort((a, b) => new Date(a.reportedAt).getTime() - new Date(b.reportedAt).getTime());
    } else if (sortBy === 'highestSeverity') {
      const severityOrder: Record<string, number> = { Critical: 4, High: 3, Moderate: 2, Low: 1 };
      results.sort((a, b) => (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0));
    } else if (sortBy === 'waterLevel') {
      results.sort((a, b) => (order === 'asc' ? a.waterLevel - b.waterLevel : b.waterLevel - a.waterLevel));
    } else if (sortBy === 'affectedPeople') {
      results.sort((a, b) => (order === 'asc' ? a.affectedPeople - b.affectedPeople : b.affectedPeople - a.affectedPeople));
    } else {
      // default newest first
      results.sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime());
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve flood reports',
      error: error.message
    });
  }
};

// @desc    Get aggregate statistics
// @route   GET /api/floods/stats
export const getFloodStatistics = async (req: Request, res: Response): Promise<void> => {
  try {
    let allReports: any[] = [];

    if (isDBConnected()) {
      allReports = await FloodReport.find();
    } else {
      allReports = [...memoryReports];
    }

    const totalReports = allReports.length;
    const activeFloods = allReports.filter(r => r.status === 'Active').length;
    const monitoringFloods = allReports.filter(r => r.status === 'Monitoring').length;
    const resolvedFloods = allReports.filter(r => r.status === 'Resolved').length;

    const criticalFloods = allReports.filter(r => r.severity === 'Critical' && r.status !== 'Resolved').length;
    const highFloods = allReports.filter(r => r.severity === 'High' && r.status !== 'Resolved').length;
    const moderateFloods = allReports.filter(r => r.severity === 'Moderate' && r.status !== 'Resolved').length;
    const lowFloods = allReports.filter(r => r.severity === 'Low' && r.status !== 'Resolved').length;

    const totalAffectedPeople = allReports.reduce((acc, curr) => acc + (curr.affectedPeople || 0), 0);

    const districtBreakdown: Record<string, number> = {};
    allReports.forEach(r => {
      districtBreakdown[r.district] = (districtBreakdown[r.district] || 0) + 1;
    });

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
    res.status(500).json({
      success: false,
      message: 'Failed to generate flood statistics',
      error: error.message
    });
  }
};

// @desc    Get single flood report by ID
// @route   GET /api/floods/:id
export const getFloodReportById = async (req: Request, res: Response): Promise<void> => {
  try {
    if (isDBConnected()) {
      const report = await FloodReport.findById(req.params.id);
      if (!report) {
        res.status(404).json({ success: false, message: `Flood report not found with id: ${req.params.id}` });
        return;
      }
      res.status(200).json({ success: true, data: report });
      return;
    }

    const report = memoryReports.find(r => r._id === req.params.id);
    if (!report) {
      res.status(404).json({ success: false, message: `Flood report not found with id: ${req.params.id}` });
      return;
    }

    res.status(200).json({ success: true, data: report });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error fetching flood report details', error: error.message });
  }
};

// @desc    Create new community flood report
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

    const reportData = {
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
      reporterName: reporterName ? reporterName.trim() : 'Anonymous Citizen Reporter',
      contactNumber: contactNumber ? contactNumber.trim() : undefined,
      reportedAt: new Date()
    };

    if (isDBConnected()) {
      const newReport = await FloodReport.create(reportData);
      res.status(201).json({
        success: true,
        message: 'Flood alert submitted successfully to the community network.',
        data: newReport
      });
      return;
    }

    const newReport = {
      ...reportData,
      _id: `mem_flood_${Date.now()}`,
      reportedAt: reportData.reportedAt.toISOString(),
      updatedAt: reportData.reportedAt.toISOString()
    };

    memoryReports.unshift(newReport);

    res.status(201).json({
      success: true,
      message: 'Flood alert submitted successfully to the community network.',
      data: newReport
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to create flood report',
      error: error.message
    });
  }
};

// @desc    Update existing flood report
// @route   PUT /api/floods/:id
export const updateFloodReport = async (req: Request, res: Response): Promise<void> => {
  try {
    if (isDBConnected()) {
      const updatedReport = await FloodReport.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedAt: new Date() },
        { new: true, runValidators: true }
      );

      if (!updatedReport) {
        res.status(404).json({ success: false, message: `Cannot update. Report not found with id: ${req.params.id}` });
        return;
      }

      res.status(200).json({ success: true, message: 'Flood report updated successfully.', data: updatedReport });
      return;
    }

    const index = memoryReports.findIndex(r => r._id === req.params.id);
    if (index === -1) {
      res.status(404).json({ success: false, message: `Cannot update. Report not found with id: ${req.params.id}` });
      return;
    }

    memoryReports[index] = {
      ...memoryReports[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      message: 'Flood report updated successfully.',
      data: memoryReports[index]
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: 'Failed to update flood report', error: error.message });
  }
};

// @desc    Delete flood report
// @route   DELETE /api/floods/:id
export const deleteFloodReport = async (req: Request, res: Response): Promise<void> => {
  try {
    if (isDBConnected()) {
      const report = await FloodReport.findByIdAndDelete(req.params.id);
      if (!report) {
        res.status(404).json({ success: false, message: `Cannot delete. Report not found with id: ${req.params.id}` });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Flood report has been permanently removed from the system.',
        data: { id: req.params.id }
      });
      return;
    }

    const index = memoryReports.findIndex(r => r._id === req.params.id);
    if (index === -1) {
      res.status(404).json({ success: false, message: `Cannot delete. Report not found with id: ${req.params.id}` });
      return;
    }

    memoryReports.splice(index, 1);

    res.status(200).json({
      success: true,
      message: 'Flood report has been permanently removed from the system.',
      data: { id: req.params.id }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete flood report', error: error.message });
  }
};

// @desc    Seed sample data
// @route   POST /api/floods/seed
export const seedSampleData = async (req: Request, res: Response): Promise<void> => {
  try {
    if (isDBConnected()) {
      await FloodReport.deleteMany({});
      const seeded = await FloodReport.insertMany(INITIAL_FLOOD_REPORTS);
      res.status(200).json({ success: true, message: `Reset and seeded ${seeded.length} flood reports.`, data: seeded });
      return;
    }

    memoryReports = INITIAL_FLOOD_REPORTS.map((r, i) => ({
      ...r,
      _id: `mem_flood_${i + 1}`,
      reportedAt: r.reportedAt.toISOString(),
      updatedAt: r.reportedAt.toISOString()
    }));

    res.status(200).json({
      success: true,
      message: `Reset and seeded ${memoryReports.length} realistic Sri Lankan flood reports.`,
      data: memoryReports
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to seed sample flood data', error: error.message });
  }
};
