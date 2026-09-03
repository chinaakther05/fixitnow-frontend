# 🔗 API Integration Map

This document maps every frontend page/component to the backend API endpoint(s) it consumes. All authenticated requests are made through Next.js **Server Actions**, which read the JWT from an `httpOnly` cookie and attach it as a `Bearer` token when calling the backend.

Backend Base URL: `${BACKEND_API_URL}/api`

---

## 🔐 Authentication

| Frontend Location | Component / Action | Backend Endpoint | Method |
|---|---|---|---|
| `/auth/register` | `RegisterForm.tsx` → `registerAction()` | `/users/register` | POST |
| `/auth/login` | `LoginForm.tsx` → `loginAction()` | `/users/login` | POST |
| Navbar (Logout button) | `logoutAction()` | — (clears local cookie, no backend call) | — |
| `middleware.ts` | Route protection | JWT verified locally via `jose` (decoded from cookie) | — |

---

## 🌐 Public Pages

| Frontend Location | Component | Backend Endpoint | Method |
|---|---|---|---|
| `/` (Home) | `HeroSection.tsx`, `BookingSection.tsx` | `/services`, `/categories` | GET |
| `/services` | `ServicesPage.tsx` | `/technicians`, `/categories` | GET |
| `/technicians/[id]` | `TechnicianProfilePage.tsx` → `getTechnicianById()` | `/technicians/:id` | GET |
| `/booking/[id]` | `BookingPage.tsx` → `createBooking()` | `/bookings` | POST |

---

## 👤 Customer Dashboard

| Frontend Location | Component / Action | Backend Endpoint | Method |
|---|---|---|---|
| `/dashboard/customer` | `CustomerDashboardPage.tsx` → `getMyBookings()` | `/bookings` | GET |
| `/dashboard/customer/bookings` | `getMyBookings()` | `/bookings` | GET |
| `/dashboard/customer/bookings/[id]` (Cancel) | `cancelBooking()` | `/bookings/:id/cancel` | PATCH |
| `/dashboard/customer/bookings/[id]/pay` | `createPayment()` | `/payments/create` | POST |
| `/payment/successPayment` | `confirmPayment()` | `/payments/confirm` | POST |
| `/payment/cancelPayment` | Static result page | — | — |
| `/dashboard/customer/payments` | Payment history query | `/payments` | GET |
| `/dashboard/customer/reviews` | Review submission form | `/reviews` | POST |

---

## 🧰 Technician Dashboard

| Frontend Location | Component / Action | Backend Endpoint | Method |
|---|---|---|---|
| `/dashboard/technician` | `TechnicianDashboardPage.tsx` → `getTechnicianBookings()` | `/technician/bookings` | GET |
| `/dashboard/technician/bookings` | `TechnicianBookingPage.tsx` → `getTechnicianBookings()` | `/technician/bookings` | GET |
| `/dashboard/technician/bookings` (Accept/Decline/Start/Complete) | `updateBookingStatus()` | `/technician/bookings/:id` | PATCH |
| `/dashboard/technician/profile` | `getTechnicianProfile()` | `/technician/profile` | GET |
| `/dashboard/technician/profile` (Update) | Profile update action | `/technician/profile` | PUT |
| `/dashboard/technician/availability` | Availability update action | `/technician/availability` | PUT |
| `/dashboard/technician/technicianservices` | Service creation form | `/technician/services` | POST |

---

## 🛡️ Admin Dashboard

| Frontend Location | Component / Action | Backend Endpoint | Method |
|---|---|---|---|
| `/dashboard/admin` | `AdminDashboardPage.tsx` → `getAllUsers()`, `getAllBookingsAdmin()` | `/admin/users`, `/admin/bookings` | GET |
| `/dashboard/admin/users` | `AdminUserPage.tsx` → `getAllUsers()` | `/admin/users` | GET |
| `/dashboard/admin/users` (Ban/Unban) | `updateUserStatus()` | `/admin/users/:id` | PATCH |
| `/dashboard/admin/bookings` | `AdminBookingPage.tsx` → `getAllBookingsAdmin()` | `/admin/bookings` | GET |
| `/dashboard/admin/categories` | Category management page | `/admin/categories` | GET / POST |
| `/dashboard/admin/services` | `AdminServicePage.tsx` → `getAllServicesAdmin()` | `/services` | GET |

---

## 🔄 Authentication Flow Summary

1. User submits the login form → `loginAction()` (Server Action) calls `POST /api/users/login`.
2. On success, the returned JWT `accessToken` is stored in an `httpOnly`, `sameSite=lax` cookie via `cookies().set()`.
3. Every subsequent authenticated request is made through a **Server Action** that:
   - Reads the token from `cookies().get("accessToken")`
   - Attaches it as `Authorization: Bearer <token>` in the `fetch()` call to the backend
4. `middleware.ts` protects all `/dashboard/*` routes by decoding the JWT (via `jose`) directly from the request cookie and verifying the user's role before allowing access.

This pattern ensures the JWT is **never exposed to client-side JavaScript**, while still allowing all client components to trigger authenticated data fetches through TanStack Query wrapping the Server Actions.