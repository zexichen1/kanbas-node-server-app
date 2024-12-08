import Database from "../Database/index.js";

export function findAssignmentsForCourse(courseId) {
  return Database.assignments.filter(({ course }) => course === courseId);
}

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: `${Date.now()}` };
  Database.assignments.push(newAssignment);
  return newAssignment;
}

export function deleteAssignment(assignmentId) {
  Database.assignments = Database.assignments.filter(
    ({ _id }) => _id !== assignmentId
  );
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  const assignment = Database.assignments.find(({ _id }) => _id === assignmentId);
  if (assignment) {
    return Object.assign(assignment, assignmentUpdates);
  }
  return null;
}
