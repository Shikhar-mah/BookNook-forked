import React, { useState } from "react";
import { Modal } from "./common/Modal";
import { FormInput } from "./common/FormInput";
import { validateRequestForm } from "../utils/helpers";

export function RequestModal({ book, onClose, onSave }) {
  const [form, setForm] = useState({ bookId: book.id, requestedLoanDays: book.defaultLoanDays, requestedPickupLocation: book.exchangeLocation, borrowerNote: "" });
  const [errors, setErrors] = useState({});
  function submit() {
    const nextErrors = validateRequestForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onSave({
      ...form,
      requestedLoanDays: Number(form.requestedLoanDays),
      borrowerNote: form.borrowerNote?.trim() || ""
    });
  }
  return (
    <Modal title={`Request: ${book.title}`} onClose={onClose} onSubmit={submit}>
      <FormInput label="Borrow for days" required error={errors.requestedLoanDays} type="number" value={form.requestedLoanDays} onChange={(v) => setForm({ ...form, requestedLoanDays: v.replace(/^0+(?!$)/, "") })} />
      <label className="field full"><span>Note to owner</span><textarea className="textarea" value={form.borrowerNote} onChange={(e) => setForm({ ...form, borrowerNote: e.target.value })} /></label>
    </Modal>
  );
}
