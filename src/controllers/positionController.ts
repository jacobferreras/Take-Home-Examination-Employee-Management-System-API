import { Request, Response, NextFunction } from "express";
import { getDb } from "../config/firebase";

export const createPosition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, departmentId } = req.body;

    if (!title || !departmentId) {
      return res
        .status(400)
        .json({ message: "Title and Department ID are required" });
    }

    const positionData = await getDb().collection("positions").add({
      title,
      departmentId,
      createdAt: new Date(),
    });

    const newPosition = {
      id: positionData.id,
      title,
      departmentId,
      createdAt: new Date(),
    };

    res.status(201).json({
      success: true,
      message: "Position created successfully",
      data: newPosition,
    });
  } catch (error) {
    console.error("Error creating position:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export const getAllPositions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const positionsSnapshot = await getDb().collection("positions").get();

    const positions = positionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      success: true,
      message: "Positions retrieved successfully",
      data: positions,
    });
  } catch (error) {
    console.error("Error fetching positions:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export const getPositionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const positionDoc = await getDb().collection("positions").doc(id).get();

    if (!positionDoc.exists) {
      return res.status(404).json({ message: "Position not found" });
    }

    const position = { id: positionDoc.id, ...positionDoc.data() };

    res.status(200).json({
      success: true,
      message: "Position retrieved successfully",
      data: position,
    });
  } catch (error) {
    console.error("Error fetching position:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export const updatePosition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, departmentId } = req.body;

    if (!title && !departmentId) {
      return res.status(400).json({
        message: "At least one of Title or Department ID is required",
      });
    }

    const positionDoc = await getDb().collection("positions").doc(id).get();

    if (!positionDoc.exists) {
      return res.status(404).json({ message: "Position not found" });
    }

    await getDb().collection("positions").doc(id).update({
      title,
      departmentId,
    });

    const updatedPosition = { id, title, departmentId };

    res.status(200).json({
      success: true,
      message: "Position updated successfully",
      data: updatedPosition,
    });
  } catch (error) {
    console.error("Error updating position:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export const deletePosition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const positionDoc = await getDb().collection("positions").doc(id).get();

    if (!positionDoc.exists) {
      return res.status(404).json({ message: "Position not found" });
    }

    await getDb().collection("positions").doc(id).delete();

    res.status(204).json();
  } catch (error) {
    console.error("Error deleting position:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};
