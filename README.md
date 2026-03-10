# Huygensoft Website

A professional portfolio website for Huygensoft, a software engineering firm specializing in VoIP integrations, smart locker software, and enterprise .NET solutions.

## Features

- **Modern Design**: Clean, professional interface with a focus on user experience.
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices.
- **Component-Based Architecture**: Reusable UI components for easy maintenance.
- **SEO Optimized**: Semantic HTML and proper heading structure.
- **Performance Ready**: Optimized images and efficient code.

## Tech Stack

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**

## Project Structure

```
public/
├── index.html              # Homepage
├── pages/
│   ├── about.html          # About Us page
│   └── contact-page.html   # Contact page
├── src/
│   ├── css/
│   │   ├── styles.css      # Global styles
│   │   ├── about.css       # About page styles
│   │   └── footer.css      # Footer styles
│   ├── js/
│   │   ├── app.js          # Main application logic
│   │   └── component.js    # Web component definitions
│   └── images/
│       ├── banner.jpg      # Hero background image
│       ├── logo.svg        # Company logo
│       └── ...             # Other service images
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd website
   ```


http-server ./public -p 8081                                               
2. Open the `public/index.html` file in your web browser:
   ```bash
   # On macOS
   open public/index.html
   
   # On Windows
   start public/index.html
   
   # On Linux
   xdg-open public/index.html
   ```

## Development

### Running Locally

To run the website locally with live reload, you can use a simple HTTP server:

**Using Node.js:**
```bash
npx serve public
```

**Using Python:**
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

## Deployment

To deploy the website, simply upload the contents of the `public/` directory to your web hosting provider.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.