import { createBrowserRouter } from "react-router";

import HomeIndex from "./HomeIndex";
import HotelManagementApp from "./screens/batch1";
import FrontDeskApp from "./screens/batch2";
import BackOfHouseApp from "./screens/batch3";
import GuestMobileApp from "./screens/batch4";
import { DashboardLayout } from "./screens/batch5/dashboard-layout";
import { DailyRevenueDashboard } from "./screens/batch5/b4-01-daily-revenue-dashboard";
import { EventBookingScreen } from "./screens/batch5/b4-02-event-booking-screen";
import { CrmGuestSegments } from "./screens/batch5/b4-03-crm-guest-segments";
import { ReportsCenter } from "./screens/batch5/b4-04-reports-center";
import { SystemSettings } from "./screens/batch5/b4-05-system-settings";
import PublicWebsiteApp from "./screens/batch6";
import Homepage from "./screens/batch7/pages/Homepage";
import HomepageMobile from "./screens/batch7/pages/HomepageMobile";
import RoomListing from "./screens/batch7/pages/RoomListing";
import BookingStep1 from "./screens/batch7/pages/BookingStep1";
import BookingStep2 from "./screens/batch7/pages/BookingStep2";
import BookingConfirmation from "./screens/batch7/pages/BookingConfirmation";

export const router = createBrowserRouter([
  { path: "/", Component: HomeIndex },

  // ── Module 1: Hotel Management (Login, GM Dashboard, Reservations, etc.) ───
  { path: "/management", Component: HotelManagementApp },

  // ── Module 2: Front Desk (Check-In, Check-Out, Room Status, etc.) ─────────
  { path: "/frontdesk", Component: FrontDeskApp },

  // ── Module 3: Back of House (Housekeeping, Maintenance, Restaurant, etc.) ──
  { path: "/backofhouse", Component: BackOfHouseApp },

  // ── Module 4: Guest Mobile Portal (Room Service, Chat, Bill, etc.) ─────────
  { path: "/guestmobile", Component: GuestMobileApp },

  // ── Module 5: Business Intelligence & Admin ────────────────────────────────
  {
    path: "/bi-admin",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DailyRevenueDashboard },
      { path: "revenue", Component: DailyRevenueDashboard },
      { path: "events", Component: EventBookingScreen },
      { path: "crm", Component: CrmGuestSegments },
      { path: "reports", Component: ReportsCenter },
      { path: "settings", Component: SystemSettings },
    ],
  },

  // ── Module 6: Public Website (Offers, Events, Restaurant, Reviews, etc.) ───
  { path: "/website", Component: PublicWebsiteApp },

  // ── Module 7: Public Booking Funnel ────────────────────────────────────────
  { path: "/booking", Component: Homepage },
  { path: "/booking/mobile", Component: HomepageMobile },
  { path: "/booking/rooms", Component: RoomListing },
  { path: "/booking/step1", Component: BookingStep1 },
  { path: "/booking/step2", Component: BookingStep2 },
  { path: "/booking/confirmation", Component: BookingConfirmation },
]);
