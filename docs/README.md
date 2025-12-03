# Fast Learn Portfolio Website

A modern, responsive portfolio website to showcase technical tutorials and case studies.

## Features

- **Modern Design**: Clean, professional interface with gradient accents and smooth animations
- **Responsive Layout**: Fully responsive design that works on all devices
- **Category Filtering**: Filter tutorials by category (Authentication, DevOps, JavaScript/TypeScript, Backend, Other)
- **Smooth Navigation**: Smooth scrolling and intuitive navigation
- **Mobile-Friendly**: Optimized hamburger menu for mobile devices
- **Fast Loading**: Lightweight static site with optimized assets

## Structure

```
website/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling
├── js/
│   └── main.js         # JavaScript for interactivity
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
- **Vanilla JavaScript**: No frameworks, pure JS for interactivity
- **Google Fonts**: Inter font family for clean typography

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This portfolio website is part of the Fast Learn repository. Feel free to use and modify as needed.
