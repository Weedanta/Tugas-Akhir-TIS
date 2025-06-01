# NASA APOD Gallery 🚀

A modern web application showcasing NASA's Astronomy Picture of the Day (APOD) with user authentication, gallery browsing, and social features.

## ✨ Features

### 🔐 Authentication & User Management
- **User Registration & Login** - Complete authentication system with email/password
- **OAuth Integration** - Sign in with GitHub and Google providers
- **Password Recovery** - Forgot password functionality with email reset
- **User Profiles** - Customizable profiles with avatar, username, and birthdate
- **Protected Routes** - Secure areas requiring authentication

### 🌌 NASA APOD Gallery
- **Daily Space Facts** - View today's Astronomy Picture of the Day
- **Complete Gallery** - Browse through NASA's extensive APOD archive
- **High-Quality Images** - Access to both standard and HD versions of images
- **Detailed Information** - Complete descriptions, dates, and copyright information
- **Video Support** - Handle both images and embedded videos from NASA

### 💫 Interactive Features
- **Wishlist System** - Save favorite APOD entries to personal wishlist
- **Discussion Forum** - Comment and discuss APOD entries with other users
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Image Hover Effects** - Smooth animations and transitions
- **Search & Browse** - Easy navigation through the gallery

### 📱 User Experience
- **Modern UI** - Clean, space-themed interface with dark/light mode support
- **Fast Loading** - Optimized images with lazy loading
- **SEO Optimized** - Proper metadata and Open Graph tags
- **Accessibility** - WCAG compliant design elements

## 🛠️ Tech Stack

### Frontend
- **[Next.js 14+](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Modern React component library
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons

### Backend & Database
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service
  - PostgreSQL database
  - Real-time subscriptions
  - Authentication & authorization
  - Row Level Security (RLS)

### Authentication
- **Supabase Auth** - Complete authentication solution
- **OAuth Providers** - GitHub and Google integration
- **Email Authentication** - Traditional email/password login
- **Password Recovery** - Secure password reset flow

### APIs & Data
- **NASA APOD API** - Astronomy Picture of the Day data
- **Server Actions** - Next.js server-side form handling
- **Real-time Updates** - Live data synchronization

## 📁 Project Structure

```
app/
├── (auth-pages)/           # Authentication routes
│   ├── sign-in/           # Login page
│   ├── sign-up/           # Registration page
│   ├── forgot-password/   # Password recovery
│   └── layout.tsx         # Auth layout
├── auth/
│   └── callback/          # OAuth callback handling
├── gallery/               # APOD gallery
│   ├── [id]/             # Individual APOD details
│   └── page.tsx          # Gallery overview
├── daily-facts/          # Today's APOD
├── profile/              # User profile management
├── wishlist/             # User's saved APODs
├── protected/            # Protected routes
└── about/                # About NASA page

components/
├── ui/                   # shadcn/ui components
├── gallery/              # Gallery-specific components
├── wishlist/             # Wishlist components
├── forum/                # Discussion components
└── auth/                 # Authentication components

utils/
└── supabase/             # Supabase client configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd nasa-apod-gallery
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Setup**
Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. **Database Setup**
Set up your Supabase database with the following tables:
- `profile` - User profiles
- `apod_entry` - NASA APOD entries
- `apod_to_profile` - Wishlist relationships
- `messages` - Forum discussions

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📊 Database Schema

### Tables
- **profile** - User profile information
- **apod_entry** - NASA APOD data (title, date, explanation, URLs)
- **apod_to_profile** - Many-to-many relationship for wishlist
- **messages** - Forum messages for APOD discussions

### Key Features
- Row Level Security (RLS) enabled
- Real-time subscriptions for live updates
- Optimized queries with proper indexing

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Configure authentication providers (GitHub, Google)
3. Set up database tables and RLS policies
4. Configure email templates for password recovery

### NASA API Integration
The application fetches APOD data and stores it in the database for optimal performance and offline browsing.

## 🌟 Key Features Implementation

### Authentication Flow
- Server-side authentication with Supabase
- Automatic profile creation on OAuth signup
- Protected routes with middleware
- Session management and refresh tokens

### Real-time Features
- Live discussion updates using Supabase real-time
- Instant wishlist synchronization
- Real-time user presence indicators

### Performance Optimizations
- Image lazy loading and optimization
- Server-side rendering for SEO
- Efficient database queries
- Caching strategies for static content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **NASA** for providing the amazing APOD API
- **Supabase** for the excellent backend infrastructure
- **Next.js team** for the fantastic React framework
- **Tailwind CSS** for the utility-first CSS framework

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.



**Built with ❤️ by Olfat & Wedanta**
