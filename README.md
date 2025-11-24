# Marcus Vinicius - Portfolio

A modern, interactive portfolio showcasing full-stack development expertise with cutting-edge web technologies and stunning 3D visualizations.

## 🚀 Features

- **Interactive 3D Planet**: Custom Three.js planet with dynamic lighting and animations
- **Smooth Scrolling**: Lenis-powered smooth scrolling experience
- **GSAP Animations**: Advanced scroll-triggered animations and micro-interactions
- **Responsive Design**: Fully responsive across all devices
- **Performance Optimized**: Built with Next.js 15 and optimized for Core Web Vitals
- **Modern Tech Stack**: React 19, TypeScript, Tailwind CSS 4

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.4.1** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **Tailwind CSS 4** - Utility-first CSS framework
- **GSAP 3.13.0** - Professional animation library
- **Three.js 0.178.0** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber

### Development Tools
- **TypeScript** - Type safety and better developer experience
- **ESLint** - Code linting
- **Turbopack** - Fast bundler for development

## 📁 Project Structure

```
my-portfolio/
├── public/
│   ├── assets/
│   │   ├── backgrounds/     # Project background images
│   │   └── projects/        # Project thumbnails
│   ├── brands/             # Client logos
│   └── models/             # 3D models (Planet.glb)
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── fonts/         # Custom font files
│   │   ├── globals.css    # Global styles
│   │   ├── layout.js      # Root layout
│   │   └── page.js        # Home page
│   ├── components/        # Reusable components
│   │   ├── AnimatedHeaderSection.jsx
│   │   ├── AnimatedTextLines.jsx
│   │   ├── Marquee.jsx
│   │   └── Planet.jsx     # 3D planet component
│   ├── constants/         # Data and configuration
│   │   └── index.js       # Services, projects, socials
│   ├── images/           # Static images
│   └── sections/         # Page sections
│       ├── About.jsx
│       ├── Contact.jsx
│       ├── Hero.jsx
│       ├── Navbar.jsx
│       ├── Services.jsx
│       └── Works.jsx
```

## 🎯 Key Sections

### Hero Section
- Interactive 3D planet with floating animation
- Dynamic lighting effects
- Responsive design with mobile optimization
- Loading screen with progress indicator

### Services
- **FullStack Development**: React, Next.js, TypeScript, REST APIs
- **Web & Mobile Apps**: Cross-platform development, AI automation
- **Advanced UI & Motion Design**: GSAP animations, Three.js experiences
- **Performance & SEO**: Core Web Vitals optimization, SEO engineering

### Projects Showcase
- **Sattis Studio** - Next.js, TypeScript, Node.js, MongoDB
- **C Model 2.0** - Next.js, Tailwind CSS, TypeScript, MongoDB
- **DeJongh Drones** - React, React Router, Styled-components
- **Oceano Azul Expedition** - WordPress, PHP, Custom Post Types
- **Oceanario de Lisboa** - WordPress, PHP, JavaScript

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/my-portfolio.git
cd my-portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Design Features

- **Custom Typography**: Amiamie font family with multiple weights
- **Dark/Light Theme**: Seamless theme transitions
- **Micro-interactions**: Hover effects, scroll animations, and transitions
- **3D Elements**: Interactive planet with realistic lighting
- **Performance**: Optimized images, lazy loading, and efficient animations

## 📱 Responsive Design

- Mobile-first approach
- Adaptive 3D elements for different screen sizes
- Optimized touch interactions
- Flexible layouts using Tailwind CSS

## 🔧 Customization

### Adding New Projects
Edit `src/constants/index.js` to add new projects to the portfolio:

```javascript
export const projects = [
  {
    id: 6,
    name: "Your Project",
    link: "https://yourproject.com",
    image: "/assets/projects/your-project.jpg",
    bgImage: "/assets/backgrounds/your-project-bg.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Node.js" },
    ],
  },
];
```

### Modifying Services
Update the services data in the same file to reflect your offerings.

## 📊 Performance

- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js Image component with blur placeholders
- **Code Splitting**: Automatic code splitting with Next.js
- **Bundle Optimization**: Efficient bundling with Turbopack

## 🌟 Highlights

- **10+ Years Experience**: Full-stack development expertise
- **Creative Technology**: Passion for merging design and technology
- **Performance Focus**: Built for speed and user experience
- **Modern Stack**: Latest technologies and best practices

## 📞 Contact

- **Instagram**: [@_mvmarcuss_](https://www.instagram.com/_mvmarcuss_/)
- **LinkedIn**: [mvinicius-dev](https://www.linkedin.com/in/mvinicius-dev/)
- **GitHub**: [marcuswmc](https://github.com/marcuswmc)

## 📄 License

This project is private and proprietary. All rights reserved.

---

Built with ❤️ by Marcus Vinicius 