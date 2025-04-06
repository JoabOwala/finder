// app/frontend/pages/LocationsNew.tsx
import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const LocationsNew = () => {
  const [form, setForm] = useState({ name: "", latitude: "", longitude: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Inertia.post("/locations", form);
  };

  return (
    <div>
      <h1>Add a Location</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label>Latitude</label>
          <input
            name="latitude"
            value={form.latitude}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Longitude</label>
          <input
            name="longitude"
            value={form.longitude}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Location</button>
      </form>
    </div>
  );
};

export default LocationsNew;
