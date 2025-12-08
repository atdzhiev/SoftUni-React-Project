
import "./ConfirmModal.css"; // optional external stylesheet

function ConfirmModal({ open, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box greenish" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className="modal-actions">
          {/* Confirm button on the LEFT */}
          <button onClick={onConfirm} className="btn-confirm">Confirm</button>
          <button onClick={onCancel} className="btn-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;