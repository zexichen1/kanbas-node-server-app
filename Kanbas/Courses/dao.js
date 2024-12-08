import Database from "../Database/index.js";

export function findAllCourses() {
  return model.find();
}

export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;
  return courses.filter(({ _id }) =>
    enrollments.some(({ user, course }) => user === userId && course === _id)
  );
}

export function findCoursesForUnenrolledUser(userId) {
  const { courses, enrollments } = Database;
  return courses.filter(({ _id }) =>
    !enrollments.some(({ user, course }) => user === userId && course === _id)
  );
}

export function createCourse(course) {
  const { _id, ...courseData } = course; // 删除 _id 字段
  return model.create(courseData);
}

export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}
