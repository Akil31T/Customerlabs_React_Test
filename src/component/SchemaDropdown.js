import React, { useState } from "react";

// Sample schema data
const AVAILABLE_SCHEMAS = [
  { id: "1", label: "First Name", value: "first_name", type: "user" },
  { id: "2", label: "Last Name", value: "last_name", type: "user" },
  { id: "3", label: "Gender", value: "gender", type: "user" },
  { id: "4", label: "Age", value: "age", type: "user" },
  { id: "5", label: "Account Name", value: "account_name", type: "group" },
  { id: "6", label: "City", value: "city", type: "user" },
  { id: "7", label: "State", value: "state", type: "user" },
];

export default function SchemaSelector({ onAddSchema, selectedSchemaIds = [] }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleAddClick = () => {
    if (selectedValue) {
      const schema = AVAILABLE_SCHEMAS.find((s) => s.id === selectedValue);
      if (schema) {
        onAddSchema(schema);
        setSelectedValue("");
      }
    }
  };

  const availableOptions = AVAILABLE_SCHEMAS.filter(
    (s) => !selectedSchemaIds.includes(s.id)
  );

  return (
    <div className="mb-4">
      <label className="form-label fw-semibold">Add schema to segment</label>
      <div className="d-flex flex-column flex-md-row gap-2">
        {/* Dropdown */}
        <select
          className="form-select flex-grow-1"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          <option value="">Select schema...</option>
          {availableOptions.length === 0 ? (
            <option disabled>All schemas added</option>
          ) : (
            availableOptions.map((schema) => (
              <option key={schema.id} value={schema.id}>
                {schema.label}{" "}
                {schema.type === "user" ? "(User)" : "(Group)"}
              </option>
            ))
          )}
        </select>

        {/* Add button */}
        <button
          onClick={handleAddClick}
          disabled={!selectedValue}
          className="btn btn-primary fw-semibold d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-plus-lg me-1"></i>
          Add
        </button>
      </div>

      {/* Optional link */}
      <div className="mt-2">
        <a href="#" className="text-primary text-decoration-none fw-medium">
          + Add new schema
        </a>
      </div>
    </div>
  );
}
