import * as enrollmentsDao from "./dao.js";
import Database from "../Database/index.js";
export default function EnrollmentsRoutes(app) {
  app.post("/api/enrollments/:userId/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    const newEnrollment = enrollmentsDao.enrollUserInCourse(userId, courseId);
    const allEnrollments = Database.enrollments;
    res.status(201).send({ success: true, enrollment: newEnrollment, allEnrollments });
  });
  app.delete("/api/enrollments/:userId/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
  
    try {
      // Call DAO function to delete the enrollment
      const success = enrollmentsDao.deleteEnrollment(userId, courseId);
  
      if (success) {
        const allEnrollments = Database.enrollments; // Get updated enrollments
        res.status(200).send({
          success: true,
          message: "Enrollment deleted successfully.",
          allEnrollments,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "Enrollment not found. No changes were made.",
        });
      }
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      res.status(500).send({ success: false, error: "Server error while deleting enrollment." });
    }
  });
}