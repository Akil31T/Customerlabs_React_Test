import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import SegmentModal from "./Modal"

export default function SegmentBuilder() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 p-4">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-3 display-5 text-wrap">Audience Segmentation</h1>
          <p className="text-muted fs-5 text-wrap">
            Create and manage audience segments with custom schemas
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary btn-lg px-5 py-3 shadow"
          >
            Save Segment
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Save Segment</h5>
                <SegmentModal/>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Here you can create or edit your audience segment.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
