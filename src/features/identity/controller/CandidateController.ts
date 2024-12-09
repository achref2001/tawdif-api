import { Request, Response } from "express";
import { CandidateService } from "../service/CandidateService";
import { asyncHandler } from "../../../utils/asyncHandler";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Candidate, ICandidate } from "../model/Candidate";
import multer from "multer";

const candidateService = new CandidateService();
const JWT_SECRET = (process.env.JWT_SECRET as string) || "default_jwt_secret";

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the directory to save files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Append timestamp to filename
  },
});

const upload = multer({ storage });

export const createCandidate = [
  upload.fields([{ name: "picture" }, { name: "cv" }]), // Handle multiple file uploads
  asyncHandler(async (req: Request, res: Response) => {
    const {
      fullName,
      jobTitle,
      phoneNumber,
      age,
      password,
      languages,
      skills,
      experiences,
      education,
      certifications,
      email,
    } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Validate email domain
    const allowedDomains = ["gmail.com", "condor.dz"];
    const emailDomain = email.split("@")[1];
    if (!allowedDomains.includes(emailDomain)) {
      return res
        .status(400)
        .json({
          message:
            "Email domain is not allowed. Use a Gmail or Condor email address.",
        });
    }

    // Type assertion to specify the expected structure of req.files
    const files = req.files as {
      picture?: Express.Multer.File[];
      cv?: Express.Multer.File[];
    };

    // Safely parse JSON fields with error handling
    let parsedFields;
    try {
      parsedFields = {
        languages: languages ? JSON.parse(languages) : [],
        skills: skills ? JSON.parse(skills) : [],
        experiences: experiences ? JSON.parse(experiences) : [],
        education: education ? JSON.parse(education) : [],
        certifications: certifications ? JSON.parse(certifications) : [],
      };
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Invalid JSON format in one or more fields" });
    }

    const newCandidate = await candidateService.createCandidate({
      fullName,
      jobTitle,
      phoneNumber,
      age,
      password,
      email,
      picture: files.picture ? files.picture[0].path : null,
      cv: files.cv ? files.cv[0].path : null,
      ...parsedFields,
    } as ICandidate);

    res.status(201).json(newCandidate);
  }),
];

export const loginCandidate = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const candidate = await candidateService.findByEmail(email);
    if (!candidate) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, candidate.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: candidate._id, role: "candidate" },
      JWT_SECRET,
      {
        expiresIn: "1h", // Token validity
      }
    );

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      maxAge: 3600000, // 1 hour in milliseconds
    });

    res.json({ message: "Login successful" });
  }
);
export const getAllCandidates = asyncHandler(
  async (req: Request, res: Response) => {
    const candidates = await candidateService.getAllCandidates();
    res.json(candidates);
  }
);

export const getCandidateById = asyncHandler(
  async (req: Request, res: Response) => {
    const candidate = await candidateService.getCandidateById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.json(candidate);
  }
);

export const updateCandidate = [
    upload.fields([{ name: "picture" }, { name: "cv" }]), // Handle multiple file uploads
    asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params;
  
      // Check if the candidate exists
      const existingCandidate = await candidateService.getCandidateById(id);
      if (!existingCandidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }
  
      // Type assertion to specify the expected structure of req.files
      const files = req.files as {
        picture?: Express.Multer.File[];
        cv?: Express.Multer.File[];
      };
  
      // Safely parse JSON fields with error handling
      let parsedFields;
      try {
        parsedFields = {
          languages: req.body.languages ? JSON.parse(req.body.languages) : undefined,
          skills: req.body.skills ? JSON.parse(req.body.skills) : undefined,
          experiences: req.body.experiences ? JSON.parse(req.body.experiences) : undefined,
          education: req.body.education ? JSON.parse(req.body.education) : undefined,
          certifications: req.body.certifications ? JSON.parse(req.body.certifications) : undefined,
        };
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Invalid JSON format in one or more fields" });
      }
  
      // Fields to update
      const fieldsToUpdate: Partial<ICandidate> = {
        fullName: req.body.fullName || existingCandidate.fullName,
        jobTitle: req.body.jobTitle || existingCandidate.jobTitle,
        phoneNumber: req.body.phoneNumber || existingCandidate.phoneNumber,
        age: req.body.age || existingCandidate.age,
        email: req.body.email || existingCandidate.email,
        picture: files.picture ? files.picture[0].path : existingCandidate.picture,
        cv: files.cv ? files.cv[0].path : existingCandidate.cv,
        ...parsedFields,
      };
  
      // Update the candidate
      const updatedCandidate = await candidateService.updateCandidate(id, fieldsToUpdate);
  
      res.status(200).json(updatedCandidate);
    }),
  ];
  

export const deleteCandidate = asyncHandler(
  async (req: Request, res: Response) => {
    const deletedCandidate = await candidateService.deleteCandidate(
      req.params.id
    );
    if (!deletedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.json({ message: "Candidate deleted successfully" });
  }
);
export const registerCandidate = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if the candidate already exists
    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    // Create a new candidate with only email and password
    const newCandidate = await candidateService.createCandidate({
      email,
      password,
    } as ICandidate);

    res.status(201).json({
      message: "Registration successful. Please complete your profile.",
      candidateId: newCandidate._id,
    });
  }
);

export const deleteCandidateCV = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    // Check if the candidate exists
    const existingCandidate = await candidateService.getCandidateById(id);
    if (!existingCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    // Update the candidate's CV field to undefined
    existingCandidate.cv = undefined;
    const updatedCandidate = await candidateService.updateCandidate(id, { cv: undefined });

    res.status(200).json(updatedCandidate);
  }
);
