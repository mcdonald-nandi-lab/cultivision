# <img src="https://i.postimg.cc/pLnwqR0H/cv-logo.png" alt="Cultivision Logo" width="40" height="40" align="left">  Cultivision - Cultivated Meat Insights and Analytics

## Overview

Cultivision is an interactive dashboard for analyzing cultivated meat production costs, bioreactor performance, and sustainability metrics. Developed by the McDonald-Nandi Lab at UC Davis, this tool provides real-time insights and analytics to help researchers, investors, and industry professionals understand the economics of cellular agriculture.

🔗 **App Link**: [https://mcdonald-nandi-lab.github.io/cultivision/](https://mcdonald-nandi-lab.github.io/cultivision/)

## Features

### Analytics & Visualization

- **Cost Distribution Charts**: Visual breakdown of production costs with and without depreciation
- **Labor Cost Analysis**: Hourly and annual labor cost projections with interactive graphs
- **Bioreactor Flow Diagrams**: Visual representation of different bioreactor configurations
- **Real-time Calculations**: Dynamic updates based on user inputs

### Key Metrics

- **COGS Analysis**: Cost of Goods Sold with/without depreciation ($/kg)
- **Facility Requirements**: Number of facilities needed for 100M kg/year production
- **Operating Expenses**: Annual operating costs in millions of dollars
- **Comprehensive Tables**: Detailed breakdowns of expenses, labor costs, and production metrics

### Interactive Features

- **Parameter Form**: Customizable inputs for various production parameters
- **Shareable URLs**: Save and share your analysis via URL parameters
- **Export Data**: Export the generated data through our _Download CSV_ functionality.
- **Export Individual Graphs/Tables**: Download graph images or table CSVs by clicking on the download button next to each component.
- **Modal Views**: Expandable bioreactor diagrams for detailed examination
- **Responsive Design**: Optimized for desktop and mobile devices

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with TypeScript
- **UI Library**: React 19
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/) with react-chartjs-2
- **Analytics**: Google Analytics integration
- **Build Tool**: Next.js with Turbopack

## Getting Started

### Prerequisites

- Node.js version 18.18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mcdonald-nandi-lab/cultivision.git
cd cultivision
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm run start
```

## Project Structure

```
cultivision/
├── app/                  # Next.js app directory
│   ├── layout.tsx        # Root layout with providers
│   ├── page.tsx          # Main dashboard page
│   └── other             # Other components and styling
├── components/           # App components
│   ├── bioreactor/       # Bioreactor-specific components
│   │   ├── charts/       # Chart components
│   │   ├── tables/       # Table components
│   ├── analytics/        # Analytics components
│   └── others            # Other components
├── context/              # App context and state management
├── hooks/                # Custom hooks
├── lib/                  # Utility functions and constants
└── public/               # Static assets
```

## Usage

### Basic Usage

1. Navigate to the dashboard
2. Use the parameter form on the left to input your production variables
3. View real-time updates in the charts and tables
4. Click on the bioreactor diagram to see an enlarged view
5. Share your analysis by copying the URL with parameters

### Advanced Features

- **URL Parameters**: The app supports URL parameters for sharing specific configurations
- **Export Data**: Tables can be selected and copied for use in other applications
- **Comparative Analysis**: Adjust parameters to compare different production scenarios

## Contributing

We welcome contributions to Cultivision! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and TypeScript conventions
- Write meaningful commit messages
- Add appropriate comments for complex logic
- Test on multiple screen sizes for responsive design
- Ensure all charts and calculations update correctly

## Research & Citations

This application is based on research from the McDonald-Nandi Lab at UC Davis. If you use Cultivision in your research or publications, please see the [_Intellectual Property Rights/Attribution Required_](https://mcdonald-nandi-lab.github.io/cultivision/terms) section in the terms of service section for more details. 

## Authors

- **[aunshx](https://aunsh.dev)**

## Support

For questions, issues, or feature requests:

- Open an issue on [GitHub](https://github.com/mcdonald-nandi-lab/cultivision/issues)
- Contact the [McDonald-Nandi Lab](https://mcdonald-nandi.ech.ucdavis.edu/) at UC Davis

---

<p align="center">
  Made with ❤️ for the future of sustainable food production
</p>
