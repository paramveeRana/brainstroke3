# Brain Stroke Prevention Platform

An AI-powered platform for stroke risk assessment and prevention, providing personalized recommendations and health tracking.

## Features

- **Multi-Step Risk Assessment**: User-friendly assessment process with intuitive progress tracking
- **Personalized Risk Analysis**: Advanced algorithms to calculate stroke risk based on multiple health factors
- **Health History Tracking**: Monitor your risk assessments and health progress over time
- **Secure Authentication**: Protected user data with Supabase authentication
- **Responsive Design**: Seamless experience across all devices

## Tech Stack

- React + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Shadcn UI components
- Supabase for backend and authentication
- Docker for containerization

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/paramveeRana/BrainStroke2.4.git
cd BrainStroke2.4
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. For Docker deployment:
```bash
docker-compose up --build
```

## Environment Variables

Create a `.env` file with the following variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Authors

- **Paramveer Singh** - Full Stack Developer & ML Engineer
- **Nehal Dixit** - Project Support & Inspiration

## License

This project is licensed under the MIT License - see the LICENSE file for details.
