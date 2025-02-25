import { ActivityIcon, AlbumIcon, SettingsIcon, ViewIcon } from "lucide-react";

export const steps = [
  { step: 1, title: 'General', icon: SettingsIcon },
  { step: 2, title: 'Categories', icon: AlbumIcon },
  { step: 3, title: 'Entities', icon: ActivityIcon },
  { step: 4, title: 'Finalize', icon: ViewIcon }
];


export const unit_options = [
  { id: "1", value: "kWh", name: "kWh" },
  { id: "2", value: "MWh", name: "MWh" },
  { id: "3", value: "J", name: "J" },
  { id: "4", value: "MJ", name: "MJ" },
  { id: "5", value: "GJ", name: "GJ" },
];

export const interval_options = [
  { id: "1", value: "Years", name: "Years" },
  { id: "2", value: "Semesters", name: "Semesters" },
  { id: "3", value: "Quarters", name: "Quarters" },
  { id: "4", value: "Months", name: "Months" },
  { id: "5", value: "Moment records", name: "Moment records" },
];
