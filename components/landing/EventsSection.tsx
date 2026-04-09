/**
 * ============================================================================
 * EVENTS SECTION
 * ============================================================================
 * "Our Events" — FUNCTIONAL tab filter (All/Upcoming/Past) + 3-column event
 * cards with date badge, time, location, and staggered animations.
 *
 * @maintainer  Unifinders Dev Team
 * @created     2026-03-31
 * @updated     2026-04-01  — Functional filters, stagger animation, empty state
 * ============================================================================
 */
"use client";

import { useState, useMemo } from "react";
import { ArrowRight, Clock, MapPin, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import type { EventRecord } from "@/lib/dal";
import { EVENTS } from "@/lib/constants/landing";
import Link from "next/link";
import Image from "next/image";

const EVENT_FILTERS = ["All", "Upcoming", "Past"] as const;

export default function EventsSection({ events = [] }: { events?: EventRecord[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Normalize DB events or fallback to landing constants
  const normalizedEvents = useMemo(() => {
    if (events && events.length > 0) {
      return events.map((e: any) => {
        // If it's a fallback constant event missing a start_date, return as is
        if (!e.start_date && e.date) {
          return e;
        }
        
        const startDate = new Date(e.start_date);
        return {
          id: e.id,
          title: e.title,
          image: e.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          date: {
            day: startDate.getDate().toString().padStart(2, '0'),
            month: startDate.toLocaleString('default', { month: 'short' })
          },
          time: startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          location: e.location,
          description: e.description,
          status: startDate > new Date() ? 'upcoming' : 'past'
        }
      });
    }
    return EVENTS;
  }, [events]);

  // Actually filter events
  const filteredEvents = useMemo(() => {
    if (activeFilter === "All") return [...normalizedEvents];
    return normalizedEvents.filter(
      (event) => event.status === activeFilter.toLowerCase()
    );
  }, [activeFilter, normalizedEvents]);

  return (
    <section id="events" aria-label="Events" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Our <span className="text-[#0070F0]">Events</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
            Join our education fairs, workshops, and orientation programs
            <br className="hidden md:block" />
            to accelerate your study abroad journey.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-50 border border-slate-100 p-1.5 rounded-full inline-flex shadow-sm">
            {EVENT_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-[#0070F0] text-white shadow-md"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Event Cards (filtered) */}
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {filteredEvents.map((event, i) => (
              <article
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-up group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Image with Date Badge */}
                <div className="h-48 relative overflow-hidden bg-slate-100">
                  <Image
                    src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"}
                    alt={event.title || "Event Image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4 bg-[#0070F0] text-white px-3 py-2 rounded-lg shadow-lg text-center">
                    <p className="text-2xl font-bold leading-none">{event.date.day}</p>
                    <p className="text-xs font-medium">{event.date.month}</p>
                  </div>
                  {/* Status badge */}
                  <div className={`absolute top-3 right-3 text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                    event.status === "upcoming"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {event.status}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="w-4 h-4 text-[#0070F0] shrink-0" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="w-4 h-4 text-[#0070F0] shrink-0" />
                      {event.location}
                    </div>
                  </div>
                  <Link
                    href={`/events/${event.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#0070F0] transition-colors group/link"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty state when filter has no results */
          <div className="text-center py-16 mb-12 animate-fade-in">
            <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-400 text-lg font-medium">
              No {activeFilter.toLowerCase()} events at the moment.
            </p>
            <p className="text-slate-400 text-sm mt-1">Check back soon!</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4">
          <button className="w-12 h-12 rounded-xl border border-blue-200 bg-white flex items-center justify-center hover:bg-blue-50 transition-colors text-[#0070F0]" aria-label="Previous events">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <Link
            href="/events"
            className="h-12 px-8 flex items-center text-sm font-semibold text-[#0070F0] border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors"
          >
            View all Events
          </Link>
          <button className="w-12 h-12 rounded-xl border border-blue-200 bg-white flex items-center justify-center hover:bg-blue-50 transition-colors text-[#0070F0]" aria-label="Next events">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
