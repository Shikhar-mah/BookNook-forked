import React from "react";
export function Modal({ title, onClose, onSubmit, children }) {
  return (
    <div className="modal-backdrop open">
      <form className="modal" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div className="modal-head"><h3>{title}</h3><button className="btn icon-only" type="button" onClick={onClose}>X</button></div>
        <div className="form-grid">{children}</div>
        <div className="modal-foot"><button className="btn" type="button" onClick={onClose}>Cancel</button><button className="btn primary" type="submit">Save</button></div>
      </form>
    </div>
  );
}