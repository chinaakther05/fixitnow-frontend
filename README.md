# 🔧 FixItNow — Frontend

**"Your Trusted Home Service Platform"**

FixItNow is a modern, responsive **Next.js** frontend for a home services marketplace. Customers can browse available services, view technician profiles, and book qualified professionals for specific time slots. Technicians can build their service profiles, manage their availability, and handle job bookings. Admins oversee the entire platform through a comprehensive management dashboard.

> This is a **frontend-only** application that consumes a separate backend REST API (Express.js + PostgreSQL + Prisma).

---

## 🔗 Live Links

| Resource | Link |
|---|---|
| **Live Frontend** | `[Vercel deployment link]` |
| **Backend API** | `[https://fixitnow-backend-1.onrender.com/]` |
| **Frontend GitHub Repo** | `[https://github.com/chinaakther05/fixitnow-frontend]` |
| **Backend GitHub Repo** | `[https://github.com/chinaakther05/fixitnow-backend]` |
| **Demo Video** | `[Loom / Google Drive link]` |

---

## 🔑 Admin Credentials

```
Email:    admin@fixitnow.com
Password: Admin123456
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js (App Router)** | React framework, routing, server/client components |
| **TypeScript** | Type safety across the application |
| **Tailwind CSS** | Utility-first styling |
| **React Hook Form / Native State** | Form handling |
| **TanStack Query (React Query)** | Server state management & data fetching |
| **Next.js Middleware** | Role-based route protection |
| **Server Actions** | Secure, cookie-based API communication with the backend |
| **Stripe** | Payment gateway integration |
| **react-hot-toast** | Toast notifications |
| **lucide-react** | Icon library |

---

## 👥 Roles & Permissions

| Role | Description | Key Capabilities |
|---|---|---|
| **Customer** | Users who book home services | Browse services, book technicians, make payments, track bookings, cancel eligible bookings, leave reviews |
| **Technician** | Service professionals | Manage profile & services, set availability, view/manage incoming bookings, update job status |
| **Admin** | Platform moderators | Manage all users (ban/unban), oversee all bookings, manage service categories, view all services |

> Users select their role during registration. The UI dynamically adapts based on the authenticated user's role, and all dashboard routes are protected using **Next.js Middleware**.

---

## ✨ Features Overview

### 🌐 Public Features
- Responsive home page with hero section
- Browse all services & technicians with **search and category filters**
- Technician profile page — bio, skills, hourly rate, reviews, and a **Book Now** flow
- Dark / Light mode support

### 👤 Customer Features
- Register / Login with role selection
- Book a technician for a specific date, address, and service description
- **Stripe Checkout** payment flow for accepted bookings
- Dedicated `/payment/successPayment` and `/payment/cancelPayment` result pages
- Customer Dashboard — view all bookings with **status badges**
  - `Pay Now` button for `ACCEPTED` bookings
  - `Cancel` button for eligible bookings (`REQUESTED` / `ACCEPTED`)
  - `Leave Review` button for `COMPLETED` bookings
- Toast notifications for all booking/payment actions

### 🧰 Technician Features
- Technician Dashboard — overview of **pending requests, upcoming jobs, and total earnings**
- Recent bookings summary
- Booking Management table — **Accept / Decline / Start Job / Complete** actions per booking
- Profile page — contact info, bio, skills, hourly rate, and stats (jobs completed, rating)
- Availability & services management

### 🛡️ Admin Features
- Admin Dashboard — platform-wide stats (total users, total bookings, active bookings, total revenue)
- **User Management** — searchable, filterable table with Ban / Unban actions
- **Booking Management** — view and filter all platform bookings by status
- **Service Management** — view all services offered by technicians across the platform
- **Category Management** — view and manage service categories

---

## 🔐 Authentication & Route Protection

- JWT-based authentication issued by the backend on login
- Token stored in a secure **httpOnly cookie** (not accessible via client-side JavaScript)
- All backend calls that require authentication are made through **Next.js Server Actions**, which read the token directly from cookies — avoiding the common pitfall of client-side token storage
- **`middleware.ts`** protects all `/dashboard/*` routes:
  - Verifies the JWT using `jose`
  - Confirms the user's role matches the required role for that route
  - Redirects unauthenticated users to `/auth/login`
  - Redirects users with an incorrect role to the home page

---

## 💳 Payment Flow

```
Customer clicks "Pay Now"
        ↓
Frontend calls POST /api/payments/create (via Server Action)
        ↓
Backend returns a Stripe Checkout Session URL
        ↓
User is redirected to Stripe Checkout
        ↓
User completes payment with test card
        ↓
Stripe redirects back to /payment/successPayment (or /payment/cancelPayment)
        ↓
Success page calls POST /api/payments/confirm (via Server Action)
        ↓
Booking status updates to PAID
```

**Test Card:**
```
Card Number: 4242 4242 4242 4242
Expiry:      Any future date (e.g. 12/28)
CVC:         Any 3 digits
```

---

## 📁 Project Structure (App Router)

```
app/
├── (auth)/
│   ├── -actions/auth.action.ts
│   ├── -components/ (LoginForm, RegisterForm)
│   ├── login/
│   └── register/
│
├── (dashboardGroup)/
│   ├── -actions/ (booking.ts, admin.ts, payment.ts)
│   └── dashboard/
│       ├── admin/       → overview, users, bookings, categories, services
│       ├── customer/    → overview, bookings, payments, reviews
│       └── technician/  → overview, bookings, profile, availability, services
│
├── (publicGroup)/
│   ├── -components/ (Hero, BookingSection)
│   ├── about/
│   ├── booking/[id]/    → booking creation flow
│   ├── contact/
│   ├── services/        → browse & filter
│   └── technicians/[id]/→ technician profile
│
└── payment/
    ├── successPayment/
    └── cancelPayment/
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```env
BACKEND_API_URL=http://localhost:5000
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000/api
JWT_ACCESS_SECRET=<same secret as backend>
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000
```

> Make sure the backend server is running (default: `http://localhost:5000`) before starting the frontend.

---

## 📄 API Integration

See [`API_INTEGRATION.md`](./API_INTEGRATION.md) for a full mapping of frontend pages/components to backend API endpoints.

---

## 🎥 Demo Video

The demo video walkthrough covers:
- Project architecture (App Router, folder structure)
- All three roles (Customer, Technician, Admin) demonstrated via the live UI
- CRUD operations across the platform
- Form validation and error handling
- The complete payment flow (Stripe)
- A technical challenge faced and solved during development

🔗 **Video Link:** `[Insert Loom / Drive link here]`

---

## 🙏 Acknowledgements

Built as part of a full-stack home services marketplace assignment, consuming a custom-built Express.js + PostgreSQL + Prisma backend API with JWT authentication and Stripe payment integration.