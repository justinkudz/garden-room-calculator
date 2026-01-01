# Glasgow Garden Room Cost Calculator

A luxurious, modern React SPA for estimating garden room costs with interactive sliders, lead capture via MailerLite, and an elegant image gallery.

## Features

- **Interactive Calculator**: Real-time price calculation as users adjust dimensions and specifications
- **Lead Capture**: MailerLite integration for qualified lead generation
- **PDF Generation**: Download detailed quotes as PDF
- **Image Gallery**: Auto-rotating slideshow of garden room examples
- **Responsive Design**: Mobile-first design with elegant desktop layout
- **Accessible**: ARIA labels, keyboard navigation, screen reader support

## Tech Stack

- **React 18** with Hooks
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **jsPDF** for PDF generation
- **MailerLite API** for lead capture

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
VITE_MAILERLITE_API_KEY=your_api_key_here
VITE_MAILERLITE_GROUP_ID=your_group_id_here
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## MailerLite Setup

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete setup instructions including:
- How to get your MailerLite API key
- How to set up custom fields
- Deployment to Vercel
- Troubleshooting guide

## Deployment

The app is ready to deploy to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Project Structure

```
garden-room/
├── public/
│   └── images/          # Garden room photos
├── src/
│   ├── components/      # React components
│   ├── utils/          # Utilities (pricing, validation, MailerLite)
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Pricing Logic

The calculator uses the following pricing structure:

- **Base Rate**: £1,750 per m²
- **Access Types**: Standard (free), Restricted (+£500), No Side Access (+£1,200)
- **Cladding**: Thermowood (standard), Cedar (+£85/m² of wall area)
- **Doors**: uPVC French (standard), Alu Slider (+£2,200), Alu Bi-Fold (+£2,500)
- **Acoustic**: None (standard), Studio Pack (+£80/m² of total surface area)
- **Electrical**: £90 per meter from main supply

All prices include VAT.

## License

Private project - All rights reserved

