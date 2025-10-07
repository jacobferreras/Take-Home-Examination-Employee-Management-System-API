import { Request, Response, NextFunction } from "express";
import { getDb } from "../config/firebase";

export const createDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Department name is required" });
    }

    const departmentData = await getDb().collection("departments").add({
      name,
      createdAt: new Date(),
    });

    const newDepartment = {
      id: departmentData.id,
      name,
      createdAt: new Date(),
    };

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: newDepartment,
    });
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export const getAllDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Implement logic to get all departments.
    // 1. Query the 'departments' collection.
    // 2. Return an array of departments with a 200 status.
    res.status(501).json({ message: "Not Implemented" });
  } catch (error) {
    next(error);
  }
};

export const getDepartmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Implement logic to get a single department by its ID.
    // 1. Get department ID from req.params.
    // 2. Fetch the document from Firestore.
    // 3. If not found, return 404.
    // 4. Return the department data with a 200 status.
    res.status(501).json({ message: "Not Implemented" });
  } catch (error) {
    next(error);
  }
};

export const updateDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Implement logic to update a department.
    // 1. Get department ID from req.params and 'name' from req.body.
    // 2. Update the document in Firestore.
    // 3. Return the updated department data with a 200 status.
    res.status(501).json({ message: "Not Implemented" });
  } catch (error) {
    next(error);
  }
};

export const deleteDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Implement logic to delete a department.
    // 1. Get department ID from req.params.
    // 2. Delete the document from Firestore.
    // 3. Return a 204 No Content status.
    res.status(501).json({ message: "Not Implemented" });
  } catch (error) {
    next(error);
  }
};
