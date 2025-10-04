# URL Shortener with shadcn/ui

A demonstration project using the new shadcn/ui components to create a modern and elegant URL shortener.

## 🎯 Project Objective

This project was created to test and demonstrate the usage of new shadcn/ui components, including:
- **Empty** - For displaying empty states with informative messages
- **ButtonGroup** - For grouping related action buttons
- **Field** - For structuring forms with labels and descriptions
- **Item** - For creating item lists with media and actions
- **DropdownMenu** - For context menus
- **Card** - For organizing content into sections

## ✨ Features

- 🔗 **URL Shortening** - Transforms long URLs into short links
- 📋 **One-click Copy** - Copy original and shortened URLs
- 🗑️ **URL Management** - Individual URL deletion
- 📱 **Responsive Interface** - Adaptive design for all screens
- 🎨 **Modern Design** - Elegant interface with shadcn/ui
- 💾 **Local Storage** - Save URLs in localStorage

## 🚀 Installation and Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the project
git clone <your-repo>
cd url-shortener-shadcn

# Install dependencies
npm install
```

### Development Server
```bash
# Start development server with Turbopack
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Other Commands
```bash
# Production build
npm run build

# Start in production
npm start

# Linting
npm run lint
```

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Static typing
- **Tailwind CSS 4** - CSS framework
- **shadcn/ui** - Modern UI components
- **Radix UI** - Accessible primitives
- **Lucide React** - Icons
- **Tabler Icons** - Additional icons

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Main layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   │   ├── button-group.tsx
│   │   ├── empty.tsx
│   │   ├── field.tsx
│   │   ├── item.tsx
│   │   └── ...
│   ├── url-list.tsx      # Shortened URLs list
│   └── url-shortener.tsx # URL shortening form
├── hooks/                 # Custom hooks
│   └── use-url-storage.ts # Local storage management
├── lib/                   # Utilities
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## 🎨 shadcn/ui Components Used

### Empty
Used to display an empty state when no URLs are shortened:
```tsx
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <IconLink className="h-12 w-12 text-muted-foreground" />
    </EmptyMedia>
    <EmptyTitle>No Shortened URLs</EmptyTitle>
    <EmptyDescription>
      You haven't shortened any URLs yet...
    </EmptyDescription>
  </EmptyHeader>
</Empty>
```

### Field
Structures forms with labels and descriptions:
```tsx
<FieldGroup>
  <Field>
    <FieldLabel htmlFor="url-input">URL to Shorten</FieldLabel>
    <Input id="url-input" placeholder="Enter your long URL..." />
    <FieldDescription>
      Enter a valid URL to create a shortened version
    </FieldDescription>
  </Field>
</FieldGroup>
```

### Item
Creates list items with media and actions:
```tsx
<Item variant="outline">
  <ItemHeader>
    <ItemMedia>
      <Link className="h-5 w-5 text-muted-foreground" />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>ID: {url.id}</ItemTitle>
      <ItemDescription>
        Original: {url.originalUrl}
        Short: {url.shortUrl}
      </ItemDescription>
    </ItemContent>
    <ItemActions>
      <ButtonGroup>
        <Button>Copy</Button>
        <Button>Open</Button>
      </ButtonGroup>
    </ItemActions>
  </ItemHeader>
</Item>
```

### ButtonGroup
Groups related action buttons:
```tsx
<ButtonGroup>
  <Button variant="outline" size="sm">
    <Copy className="h-3 w-3" />
  </Button>
  <Button variant="outline" size="sm">
    <ExternalLink className="h-3 w-3" />
  </Button>
</ButtonGroup>
```

## 🔧 Customization

### Adding New shadcn/ui Components
```bash
npx shadcn@latest add [component-name]
```

### Modifying Styles
Styles are defined in `app/globals.css` and use Tailwind CSS.

### Adding Features
- Modify `hooks/use-url-storage.ts` to change storage logic
- Extend `components/url-shortener.tsx` to add validations
- Customize `components/url-list.tsx` for new actions

## 📝 Development Notes

- URLs are stored in browser localStorage
- Shortened IDs are randomly generated (6 characters)