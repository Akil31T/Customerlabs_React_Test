import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AVAILABLE_SCHEMAS = [
  { id: "1", label: "First Name", value: "first_name", type: "user" },
  { id: "2", label: "Last Name", value: "last_name", type: "user" },
  { id: "3", label: "Gender", value: "gender", type: "user" },
  { id: "4", label: "Age", value: "age", type: "user" },
  { id: "5", label: "Account Name", value: "account_name", type: "group" },
  { id: "6", label: "City", value: "city", type: "user" },
  { id: "7", label: "State", value: "state", type: "user" },
];

export default function SegmentModal() {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isOpen = true; // Always open for demo
  const onClose = () => {};

  const handleAddSchema = (schema) => {
    if (!selectedSchemas.find((s) => s.id === schema.id)) {
      setSelectedSchemas([...selectedSchemas, schema]);
    }
  };

  const handleRemoveSchema = (schemaId) => {
    setSelectedSchemas(selectedSchemas.filter((s) => s.id !== schemaId));
  };
  const webhookUrl = process.env.REACT_APP_WEBHOOK_URL;

  const handleSaveSegment = async (e) => {
    e.preventDefault(); // prevent form reload

    const payload = {
      segment_name: segmentName, // your input value
      schema: selectedSchemas.map((item) => ({
        [item.value]: item.label,
      })),
    };

    console.log("Sending payload:", payload);

    try {
      const response = await fetch("/f31acd94-dff3-4578-a313-0ed6ef443758", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      alert("Payload sent to webhook URL");
      if (!response.ok) throw new Error("Failed to send data");
      console.log("✅ Segment saved successfully");
    } catch (error) {
      console.error("Error saving segment:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Save Segment</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger">
                <strong>{error}</strong>
                <div className="small mt-1">
                  Make sure to set your webhook URL in the environment
                  variables.
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Enter the Name of the Segment
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Name of the segment"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
              />
            </div>

            <p className="text-muted">
              To save your segment, you need to add the schemas to build the
              query.
            </p>

            {/* Trait indicators */}
            <div className="d-flex gap-4 mb-3">
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-success rounded-circle p-2"></span>
                <span>User Traits</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-danger rounded-circle p-2"></span>
                <span>Group Traits</span>
              </div>
            </div>

            {/* Selected Schemas */}
            <div className="border rounded p-3 bg-light mb-3">
              <h6 className="fw-semibold mb-3">Selected Schemas</h6>
              {selectedSchemas.length === 0 ? (
                <p className="text-muted fst-italic">
                  No schemas selected yet. Add schemas below.
                </p>
              ) : (
                selectedSchemas.map((schema) => (
                  <div
                    key={schema.id}
                    className="d-flex justify-content-between align-items-center border rounded px-3 py-2 mb-2 bg-white"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <span
                        className={`badge rounded-circle ${
                          schema.type === "user" ? "bg-success" : "bg-danger"
                        } p-2`}
                      ></span>
                      <span className="fw-medium">{schema.label}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveSchema(schema.id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Schema Selector */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Add Schema</label>
              <select
                className="form-select"
                onChange={(e) => {
                  const schema = AVAILABLE_SCHEMAS.find(
                    (s) => s.id === e.target.value
                  );
                  if (schema) handleAddSchema(schema);
                  e.target.value = "";
                }}
              >
                <option value="">Select schema...</option>
                {AVAILABLE_SCHEMAS.map((schema) => (
                  <option key={schema.id} value={schema.id}>
                    {schema.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              className="btn btn-success"
              disabled={
                isLoading || !segmentName.trim() || selectedSchemas.length === 0
              }
              onClick={handleSaveSegment}
            >
              {isLoading ? "Saving..." : "Save Segment"}
            </button>
            <button className="btn btn-outline-danger" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
