import React from "react";
import { Stat } from "./common/Stat";

export function Stats({ stats, setView, setFilters }) {
  return (
    <section className="grid stats">
      <Stat 
        label="Books listed" 
        value={stats.totalBooks} 
        onClick={() => { setView("catalog"); setFilters(f => ({ ...f, availability: "all" })); }}
      />
      <Stat 
        label="Available now" 
        value={stats.availableBooks} 
        onClick={() => { setView("catalog"); setFilters(f => ({ ...f, availability: "available" })); }}
      />
      <Stat 
        label="Pending approvals" 
        value={stats.pendingRequests} 
        onClick={() => setView("requests")}
      />
      <Stat 
        label="Currently reading" 
        value={stats.pendingRequests} 
        onClick={() => setView("borrowed")}
      />
    </section>
  );
}
