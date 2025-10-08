import { Request, Response, NextFunction } from "express";
import { getDb } from "../config/firebase";
import { firestore } from "firebase-admin";

// Helper function to find an employee document by their custom employeeId
const findEmployeeByCustomId = async (employeeId: string) => {
  const db = getDb();
  const employeeQuery = await db
    .collection("employees")
    .where("employeeId", "==", employeeId)
    .limit(1)
    .get();
  if (employeeQuery.empty) {
    return null;
  }
  return employeeQuery.docs[0];
};

export const timeIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId) {
      return res.status(400).json({ message: "employeeId is required." });
    }

    const employeeDoc = await findEmployeeByCustomId(employeeId);

    if (!employeeDoc) {
      return res.status(404).json({ message: "Employee not found." });
    }

    const attendanceRef = employeeDoc.ref.collection("attendance");

    const attendanceRecord = await attendanceRef.add({
      type: "time-in",
      timestamp: firestore.Timestamp.now(),
      location: "BGC, Taguig City Office",
    });

    res.status(201).json({
      success: true,
      message: "Time-In recorded successfully.",
      data: {
        id: attendanceRecord.id,
        type: "time-in",
        location: "BGC, Taguig City Office",
        timestamp: firestore.Timestamp.now(),
      },
    });
  } catch (error) {
    console.error("Error recording time-in:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export const timeOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { employeeId } = req.body;
    if (!employeeId) {
      return res.status(400).json({ message: "employeeId is required." });
    }

    const employeeDoc = await findEmployeeByCustomId(employeeId);

    if (!employeeDoc) {
      return res.status(404).json({ message: "Employee not found." });
    }

    const attendanceRef = employeeDoc.ref.collection("attendance");

    const attendanceRecord = await attendanceRef.add({
      type: "time-out",
      timestamp: firestore.Timestamp.now(),
      location: "BGC, Taguig City Office",
    });

    res.status(201).json({
      success: true,
      message: "Time-Out recorded successfully.",
      data: {
        id: attendanceRecord.id,
        type: "time-out",
        location: "BGC, Taguig City Office",
        timestamp: firestore.Timestamp.now(),
      },
    });
  } catch (error) {
    console.error("Error recording time-out:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export const getAttendanceRecords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { employeeId } = req.params;

    const employeeDoc = await findEmployeeByCustomId(employeeId);

    if (!employeeDoc) {
      return res.status(404).json({ message: "Employee not found." });
    }

    const attendanceRef = employeeDoc.ref.collection("attendance");

    const attendanceSnapshot = await attendanceRef
      .orderBy("timestamp", "desc")
      .get();

    const records = attendanceSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      success: true,
      message: "Attendance records retrieved successfully.",
      data: records,
    });
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};
