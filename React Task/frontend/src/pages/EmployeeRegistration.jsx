
import React, { useState } from "react";
import "../css/empForm.css";
import {  Users, Building2, User } from "lucide-react";


function EmployeeRegistration() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    department: "",
    basicSalary: "",
    allowance: "",
  });
  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  const capitalizeName = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "fullName") {
      if (value.length > 50) return;
      value = capitalizeName(value);
    }

    if (name === "basicSalary" || name === "allowance") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 7) return;
    }

    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(form.email)) {
      newErrors.email = "Email must be a valid @gmail.com address";
    }

    if (!form.department) newErrors.department = "Please select a department";

    if (!form.basicSalary || isNaN(form.basicSalary) || parseInt(form.basicSalary) <= 0) {
      newErrors.basicSalary = "Enter a valid integer salary greater than 0";
    }

    if (form.allowance === "" || isNaN(form.allowance) || parseInt(form.allowance) < 0) {
      newErrors.allowance = "Allowance must be a valid integer (0 or greater)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatNumber = (num) => {
    return Number(num).toLocaleString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const basicSalary = parseInt(form.basicSalary);
    const allowance = parseInt(form.allowance);
    const totalSalary = basicSalary + allowance;
    const bonus = totalSalary * 0.1;

    const employeeData = {
      ...form,
      basicSalary,
      allowance,
      totalSalary,
      bonus,
    };

    if (editIndex !== null) {
      const updatedEmployees = [...employees];
      updatedEmployees[editIndex] = employeeData;
      setEmployees(updatedEmployees);
      setEditIndex(null);
      alert("Employee details updated successfully!");
    } else {
      setEmployees([...employees, employeeData]);
      alert("Employee registered successfully!");
    }

    setForm({
      fullName: "",
      email: "",
      department: "",
      basicSalary: "",
      allowance: "",
    });
    setErrors({});
  };

  const handleDelete = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    const employee = employees[index];
    setForm({
      fullName: employee.fullName,
      email: employee.email,
      department: employee.department,
      basicSalary: employee.basicSalary.toString(),
      allowance: employee.allowance.toString(),
    });
    setEditIndex(index);
  };

  return (
    <div className="employee-container">
      <h1 className="title"><Building2 className="icon-large" />Employee Management System</h1>

      <div className="form-card">
        <h2><User className="icon-large" />
               Register New Employee</h2>
        <p className="form-subtext">Add a new employer to the company </p>
        <form onSubmit={handleSubmit} className="emp-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              maxLength={50}
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
            >
              <option value="">Select department</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
            </select>
            {errors.department && <span className="error">{errors.department}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Basic Salary</label>
              <input
                type="number"
                name="basicSalary"
                value={form.basicSalary}
                onChange={handleChange}
              />
              {errors.basicSalary && <span className="error">{errors.basicSalary}</span>}
            </div>

            <div className="form-group">
              <label>Allowance</label>
              <input
                type="number"
                name="allowance"
                value={form.allowance}
                onChange={handleChange}
              />
              {errors.allowance && <span className="error">{errors.allowance}</span>}
            </div>
          </div>

          <button type="submit" className="submit-btn">
            {editIndex !== null ? "Update Employee" : "Register Employee"}
          </button>
        </form>
      </div>

      <h2 className="list-title"><Users className="icon-large"/>Employee List</h2>
      {employees.length === 0 ? (
        <p>No employees.</p>
      ) : (
        <div className="employee-table-wrapper">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Basic Salary</th>
                <th>Allowance</th>
                <th>Total Salary</th>
                <th>Bonus (10%)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={index}>
                  <td>{emp.fullName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>Rs {formatNumber(emp.basicSalary)}</td>
                  <td>Rs {formatNumber(emp.allowance)}</td>
                  <td>Rs {formatNumber(emp.totalSalary)}</td>
                  <td>Rs {formatNumber(emp.bonus)}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmployeeRegistration;
