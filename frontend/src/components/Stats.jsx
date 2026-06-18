import React from "react";
import { Stat } from "./common/Stat";

export function Stats({ stats, setView, setFilters }) {
  return (
    <section className="grid stats">
      <Stat 
        label="Books listed" 
        value={stats.booksListed} 
        onClick={() => { setView("catalog"); setFilters(f => ({ ...f, availability: "all" })); }}
      />
      <Stat 
        label="Available now" 
        value={stats.availableNow} 
        onClick={() => { setView("catalog"); setFilters(f => ({ ...f, availability: "available" })); }}
      />
      <Stat 
        label="Pending approvals" 
        value={stats.pendingApprovals} 
        onClick={() => setView("requests")}
      />
      <Stat 
        label="Currently reading" 
        value={stats.activeBorrowed} 
        onClick={() => setView("borrowed")}
      />
    </section>
  );
}
