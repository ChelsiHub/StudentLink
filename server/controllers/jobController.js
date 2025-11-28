const Job = require('../models/Job');

// @desc    Get all jobs with filters
// @route   GET /api/jobs
const getJobs = async (req, res) => {
  try {
    let query = {};

    // Search by Title or Company
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { company: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    // Filter by Type (Internship, Full-time)
    if (req.query.type) {
      query.type = req.query.type;
    }

    // Filter by Work Mode (Remote, On-site)
    if (req.query.workMode) {
      query.workMode = req.query.workMode;
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Apply to a job
// @route   POST /api/jobs/:id/apply
// @access  Private
const applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already applied
    if (job.applicants.includes(req.user._id)) {
      return res.status(400).json({ message: 'You have already applied to this job' });
    }

    job.applicants.push(req.user._id);
    await job.save();

    res.json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create dummy jobs (Seeder)
// @route   POST /api/jobs/seed
const seedJobs = async (req, res) => {
  try {
    await Job.deleteMany(); // Clear existing
    const jobs = [
      { title: "Frontend Developer Intern", company: "TechCorp", location: "San Francisco, CA", type: "Internship", workMode: "Remote", description: "React.js internship." },
      { title: "Software Engineer", company: "Google", location: "Mountain View, CA", type: "Full-time", workMode: "Hybrid", description: "Core engineering team." },
      { title: "Data Science Intern", company: "Spotify", location: "New York, NY", type: "Internship", workMode: "On-site", description: "ML models for music." },
      { title: "Backend Developer", company: "Amazon", location: "Seattle, WA", type: "Full-time", workMode: "On-site", description: "AWS infrastructure." },
      { title: "UI/UX Designer", company: "Adobe", location: "San Jose, CA", type: "Contract", workMode: "Remote", description: "Creative cloud tools." }
    ];
    await Job.insertMany(jobs);
    res.json({ message: "Jobs seeded successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getJobs, applyToJob, seedJobs };