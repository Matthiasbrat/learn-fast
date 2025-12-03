# Fast Learn Portfolio Website

A modern, responsive portfolio website to showcase technical tutorials and case studies with integrated PDF and Markdown viewers.

## Features

- **Modern Design**: Clean, professional interface with gradient accents and smooth animations
- **Responsive Layout**: Fully responsive design that works on all devices
- **Category Filtering**: Filter tutorials by category (Authentication, DevOps, JavaScript/TypeScript, Backend, Other)
- **Integrated Viewer**: View tutorials directly on the website
  - **PDF Viewer**: Built-in PDF rendering with zoom and page navigation
  - **Markdown Viewer**: Beautiful markdown rendering with syntax highlighting
  - **PDF-to-Markdown Conversion**: Toggle to convert PDF content to readable markdown format
  - **Dual View Mode**: Switch between original PDF and converted markdown views
- **Smooth Navigation**: Smooth scrolling and intuitive navigation
- **Mobile-Friendly**: Optimized hamburger menu for mobile devices and responsive viewer
- **Fast Loading**: Lightweight static site with optimized assets

## Structure

```
website/
├── index.html          # Main landing page
├── viewer.html         # Tutorial viewer page
├── css/
│   ├── styles.css      # Main styling
│   └── viewer.css      # Viewer-specific styling
├── js/
│   ├── main.js         # Landing page interactivity
│   └── viewer.js       # Viewer functionality (PDF, markdown, conversion)
└── assets/             # Images and other assets (if needed)
```

## How to Use

### Local Development

1. Simply open `index.html` in your web browser:
   ```bash
   open website/index.html
   ```

2. Or use a simple HTTP server:
   ```bash
   cd website
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000` in your browser

### Deployment Options

#### GitHub Pages
1. Push the website to your repository
2. Go to repository Settings → Pages
3. Set source to your branch and `/website` folder
4. Your site will be published at `https://yourusername.github.io/learn-fast/`

#### Netlify
1. Create a new site from Git
2. Set build directory to `website`
3. Deploy

#### Vercel
1. Import your repository
2. Set root directory to `website`
3. Deploy

## Customization

### Adding New Tutorials

To add a new tutorial to the showcase, add a new card in `index.html`:

```html
<div class="tutorial-card" data-category="your-category">
    <div class="card-tag">Category Name</div>
    <h3 class="card-title">Tutorial Title</h3>
    <p class="card-description">Brief description of the tutorial</p>
    <a href="your-link" target="_blank" class="card-link">
        View Tutorial →
    </a>
</div>
```

### Changing Colors

Modify CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #6366f1;    /* Main brand color */
    --secondary-color: #8b5cf6;  /* Secondary accent */
    --accent-color: #ec4899;     /* Additional accent */
    /* ... other variables */
}
```

### Adding New Categories

1. Add a new filter button in the filter section
2. Assign the same `data-category` to relevant tutorial cards
3. The JavaScript will automatically handle the filtering

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: Core interactivity and viewer logic
- **PDF.js**: Mozilla's PDF rendering library for displaying PDFs
- **Marked.js**: Fast markdown parser and compiler
- **Highlight.js**: Syntax highlighting for code blocks in markdown
- **Google Fonts**: Inter font family for clean typography

## Tutorial Viewer

The integrated viewer provides a seamless reading experience:

### For PDF Tutorials
- View PDFs directly in the browser
- Navigate through pages with next/previous buttons
- Zoom in/out for better readability
- Toggle to convert PDF text to markdown format for easier reading
- Download original PDF

### For Markdown Tutorials
- Beautiful rendering with proper typography
- Syntax-highlighted code blocks
- Responsive tables and images
- GitHub-flavored markdown support

### View Switching
- Click "Markdown" toggle to convert PDF to readable markdown
- Toggle back to "Original" to view the source PDF
- Conversion extracts text and formats it with proper headings and structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This portfolio website is part of the Fast Learn repository. Feel free to use and modify as needed.
