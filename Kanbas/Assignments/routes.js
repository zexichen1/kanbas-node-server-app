import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.delete("/api/assignments/:assignmentId", handleDeleteAssignment);
  app.put("/api/assignments/:assignmentId", handleUpdateAssignment);
}

async function handleDeleteAssignment(req, res) {
  try {
    const { assignmentId } = req.params;
    const status = await assignmentsDao.deleteAssignment(assignmentId);
    res.status(200).send(status);
  } catch (error) {
    res.status(500).send({ error: "Failed to delete assignment" });
  }
}

async function handleUpdateAssignment(req, res) {
  try {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = await assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
    res.status(200).send(status);
  } catch (error) {
    res.status(500).send({ error: "Failed to update assignment" });
  }
}
