# My Portfolio Admin Panel

A highly sophisticated, premium Admin Dashboard built to manage my personal portfolio projects. This dashboard serves as a secure central hub to add, update, and manage the projects showcased on my main portfolio website.

## ✨ Features

- **Master Authentication**: Secure Firebase Authentication ensures only authorized users can access the dashboard.
- **Glassmorphic UI**: Built with a visually stunning, industry-ready glassmorphic design featuring micro-interactions and smooth Framer Motion animations.
- **ImgBB Integration**: Seamlessly drag and drop project images, which are automatically uploaded to the ImgBB cloud and returned as ready-to-use URLs.
- **Live Project Sync**: Connected directly to the custom Express backend (`My-Portfolio-Server`), meaning any changes here are instantly reflected on the live portfolio site.
- **Skeleton Loaders**: Modern loading states and skeletons to ensure a premium user experience while data is being fetched.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS, Vanilla CSS (`globals.css` with extensive custom properties)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Authentication**: Firebase Auth
- **HTTP Client**: Native Fetch API
- **Image Hosting**: ImgBB API

## 🛠️ Setup & Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd My-Portfolio-Admin-panel
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory and add your credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_id
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   The admin panel will start on [http://localhost:3001](http://localhost:3001).

## 🔒 Master Admin Setup

If you don't have an admin account yet:
1. Start the server and navigate to `http://localhost:3001/setup-admin`
2. Create your master email and secure password.
3. Once logged in, **remove or disable** the `/setup-admin` route for security.

---
*Designed & Developed by MD. Moniruzzaman*
