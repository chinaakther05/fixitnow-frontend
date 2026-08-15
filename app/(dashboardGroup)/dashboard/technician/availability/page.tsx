"use client";

import React, { useState } from "react";
import { Clock, Calendar, Check, Save, Loader2, Power } from "lucide-react";

interface DaySchedule {
  day: string;
  isWorking: boolean;
  startTime: string;
  endTime: string;
}

const initialDays: DaySchedule[] = [
  { day: "Saturday", isWorking: true, startTime: "09:00", endTime: "18:00" },
  { day: "Sunday", isWorking: true, startTime: "09:00", endTime: "18:00" },
  { day: "Monday", isWorking: true, startTime: "09:00", endTime: "18:00" },
  { day: "Tuesday", isWorking: true, startTime: "09:00", endTime: "18:00" },
  { day: "Wednesday", isWorking: true, startTime: "09:00", endTime: "18:00" },
  { day: "Thursday", isWorking: true, startTime: "09:00", endTime: "18:00" },
  { day: "Friday", isWorking: false, startTime: "09:00", endTime: "18:00" },
];

export default function AvailabilityPage() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(initialDays);
  const [isInstantAvailable, setIsInstantAvailable] = useState<boolean>(true);
  const [slotDuration, setSlotDuration] = useState<number>(60); // minutes
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Toggle Day Working Status
  const handleDayToggle = (index: number) => {
    const updated = [...schedule];
    updated[index].isWorking = !updated[index].isWorking;
    setSchedule(updated);
  };

  // Update Time Slots
  const handleTimeChange = (
    index: number,
    field: "startTime" | "endTime",
    value: string
  ) => {
    const updated = [...schedule];
    updated[index][field] = value;
    setSchedule(updated);
  };

  // Save Settings Handler
  const handleSave = async () => {
    setIsSaving(true);
    setIsSuccess(false);

    try {
    
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save availability:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      {/* 🟢 Top Header Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-600" />
              Manage Availability
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Set your weekly working hours and instant availability status.
            </p>
          </div>

          {/* Instant Availability Toggle */}
          <button
            type="button"
            onClick={() => setIsInstantAvailable(!isInstantAvailable)}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border font-semibold text-sm transition ${
              isInstantAvailable
                ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
            }`}
          >
            <Power className="w-4 h-4" />
            {isInstantAvailable ? "Available for Bookings" : "Currently Offline"}
          </button>
        </div>

        {/* Slot Duration Option */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Default Service Slot Duration
            </span>
          </div>

          <select
            value={slotDuration}
            onChange={(e) => setSlotDuration(Number(e.target.value))}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={30}>30 Minutes</option>
            <option value={45}>45 Minutes</option>
            <option value={60}>1 Hour</option>
            <option value={90}>1.5 Hours</option>
            <option value={120}>2 Hours</option>
          </select>
        </div>
      </div>

      {/* 📅 Weekly Schedule Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Weekly Working Hours
        </h2>

        <div className="space-y-3">
          {schedule.map((item, index) => (
            <div
              key={item.day}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition ${
                item.isWorking
                  ? "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
                  : "bg-slate-50/50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800/50 opacity-60"
              }`}
            >
              {/* Day Toggle Switch */}
              <div className="flex items-center gap-3 mb-3 sm:mb-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.isWorking}
                    onChange={() => handleDayToggle(index)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                </label>
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                  {item.day}
                </span>
              </div>

              {/* Time Inputs */}
              {item.isWorking ? (
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={item.startTime}
                    onChange={(e) =>
                      handleTimeChange(index, "startTime", e.target.value)
                    }
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="text-slate-400 text-xs">to</span>
                  <input
                    type="time"
                    value={item.endTime}
                    onChange={(e) =>
                      handleTimeChange(index, "endTime", e.target.value)
                    }
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              ) : (
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Day Off
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 💾 Bottom Action Bar */}
      <div className="flex items-center justify-between">
        <div>
          {isSuccess && (
            <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Schedule saved successfully!
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving Schedule...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Availability
            </>
          )}
        </button>
      </div>
    </section>
  );
}