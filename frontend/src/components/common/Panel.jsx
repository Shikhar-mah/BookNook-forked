import React from "react";
export function Panel({ title, badge, children }) {
  return <div className="panel"><div className="panel-head"><h3>{title}</h3>{badge && <span className="chip">{badge}</span>}</div>{children}</div>;
}