import { defineStore } from "pinia";
import StudentService from "@/services/StudentService";

export const useStudentStore = defineStore("student", {
  // initial state
  state: () => ({
    students: [],
  }),

  // getters
  getters: {},

  // actions
  actions: {
    async addStudent(payload) {
      const response = await StudentService.addStudent(payload);
      if (response) {
        this.getStudent();
      }
    },
    async getStudent() {
      try {
        const response = await StudentService.getStudent();
        this.setAddStudent(response);
      } catch (error) {
        console.log(error);
      } finally {
        console.log(false);
      }
    },
    async updateStudent(payload) {
      const response = await StudentService.updateStudent(payload);
      if (response) {
        this.getStudent();
      }
    },
    async deleteStudent(payload) {
      const response = await StudentService.deleteStudent(payload);
      if (response) {
        this.students = this.students.filter((item) => item.id !== payload);
      }
    },
    async getStudentById(payload) {
      let data = this.students.filter((c) => c.id === Number(payload));
      if (data) {
        return data[0];
      }
    },
    setAddStudent: function (payload) {
      this.students = payload;
    },
  },
});
