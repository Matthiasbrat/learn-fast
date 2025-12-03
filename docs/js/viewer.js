// PDF.js worker configuration
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// State management
const state = {
    currentMode: 'original',
    filePath: '',
    fileType: '',
    fileName: '',
    category: '',
    pdfDoc: null,
    pageNum: 1,
    pageCount: 0,
    zoom: 1.5,
    pdfText: '',
    isConverting: false
};

// DOM Elements
const elements = {
    loadingState: document.getElementById('loadingState'),
    errorState: document.getElementById('errorState'),
    errorMessage: document.getElementById('errorMessage'),
    pdfViewer: document.getElementById('pdfViewer'),
    markdownViewer: document.getElementById('markdownViewer'),
    markdownContent: document.getElementById('markdownContent'),
    pdfCanvas: document.getElementById('pdfCanvas'),
    tutorialTitle: document.getElementById('tutorialTitle'),
    tutorialCategory: document.getElementById('tutorialCategory'),
    tutorialPath: document.getElementById('tutorialPath'),
    viewControls: document.getElementById('viewControls'),
    pdfControls: document.getElementById('pdfControls'),
    modeToggle: document.getElementById('modeToggle'),
    prevPage: document.getElementById('prevPage'),
    nextPage: document.getElementById('nextPage'),
    pageNum: document.getElementById('pageNum'),
    pageCount: document.getElementById('pageCount'),
    zoomIn: document.getElementById('zoomIn'),
    zoomOut: document.getElementById('zoomOut'),
    zoomLevel: document.getElementById('zoomLevel'),
    downloadLink: document.getElementById('downloadLink'),
    githubLink: document.getElementById('githubLink'),
    conversionProgress: document.getElementById('conversionProgress'),
    conversionStatus: document.getElementById('conversionStatus'),
    progressFill: document.getElementById('progressFill'),
    sidebar: document.getElementById('sidebar'),
    sidebarToggle: document.getElementById('sidebarToggle')
};

// Tutorial data mapping
const tutorialData = {
    'auth0': {
        path: '../English/Authentication/Auth0/Basics.pdf',
        title: 'Auth0 Authentication',
        category: 'Authentication',
        github: 'https://github.com/Matthiasbrat/learn-fast/tree/main/English/Authentication/Auth0'
    },
    'iam': {
        path: '../English/Authentication/IAM-Identity-and-access-management/Basics.pdf',
        title: 'IAM (Identity & Access Management)',
        category: 'Authentication',
        github: 'https://github.com/Matthiasbrat/learn-fast/tree/main/English/Authentication/IAM-Identity-and-access-management'
    },
    'jwt': {
        path: '../English/Authentication/JWT/Basics.pdf',
        title: 'JWT (JSON Web Tokens)',
        category: 'Authentication',
        github: 'https://github.com/Matthiasbrat/learn-fast/tree/main/English/Authentication/JWT'
    },
    'linux': {
        path: '../English/DevOps/Hands-on-linux/hands-on-linux.pdf',
        title: 'Hands-on Linux',
        category: 'DevOps',
        github: 'https://github.com/Matthiasbrat/learn-fast/tree/main/English/DevOps/Hands-on-linux'
    },
    'angularjs': {
        path: '../English/Javascript/AngularJS/Basics.pdf',
        title: 'AngularJS Basics',
        category: 'JavaScript',
        github: 'https://github.com/Matthiasbrat/learn-fast/tree/main/English/Javascript/AngularJS'
    },
    'javascript': {
        path: '../English/Javascript/Basics.pdf',
        title: 'JavaScript Basics',
        category: 'JavaScript',
        github: 'https://github.com/Matthiasbrat/learn-fast/tree/main/English/Javascript'
    },
    'opentext': {
        path: '../English/OpenText/Basics.pdf',
        title: 'OpenText',
        category: 'Enterprise',
        github: 'https://github.com/Matthiasbrat/learn-fast/tree/main/English/OpenText'
    },
    'springboot': {
        path: '../English/Springboot/Springboot-for-quarkus-devs.pdf',
        title: 'Spring Boot for Quarkus Developers',
        category: 'Backend',
        github: 'https://github.com/Matthiasbrat/learn-fast/tree/main/English/Springboot',
        mdPath: '../English/Springboot/Springboot-for-quarkus-devs.md'
    },
    'typescript': {
        path: '../English/Typescript/Basics.pdf',
        title: 'TypeScript Basics',
        category: 'TypeScript',
        github: 'https://github.com/Matthiasbrat/learn-fast/tree/main/English/Typescript'
    },
    'nextjs': {
        path: '../English/Typescript/NextJS/NextJS.pdf',
        title: 'Next.js',
        category: 'TypeScript',
        github: 'https://github.com/Matthiasbrat/learn-fast/tree/main/English/Typescript/NextJS'
    },
    'react': {
        path: '../English/Typescript/React/React.pdf',
        title: 'React',
        category: 'TypeScript',
        github: 'https://github.com/Matthiasbrat/learn-fast/tree/main/English/Typescript/React'
    },
    'states': {
        path: '../English/Typescript/States/States.pdf',
        title: 'State Management',
        category: 'TypeScript',
        github: 'https://github.com/Matthiasbrat/learn-fast/tree/main/English/Typescript/States'
    },
    'svelte': {
        path: '../English/Typescript/Svelte/Basics.pdf',
        title: 'Svelte',
        category: 'TypeScript',
        github: 'https://github.com/Matthiasbrat/learn-fast/tree/main/English/Typescript/Svelte'
    },
    'v8': {
        path: '../English/Compilers/V8.pdf',
        title: 'V8 JavaScript Engine',
        category: 'Compilers',
        github: 'https://github.com/Matthiasbrat/learn-fast/tree/main/English/Compilers'
    },
    'quarkus': {
        path: '../Français/Quarkus/Bases.pdf',
        title: 'Quarkus (Français)',
        category: 'Backend',
        github: 'https://github.com/Matthiasbrat/learn-fast/tree/main/Français/Quarkus'
    },
    'ssl': {
        path: '../Français/SSL/SSL-LAB.md',
        title: 'SSL/TLS Lab (Français)',
        category: 'Security',
        github: 'https://github.com/Matthiasbrat/learn-fast/tree/main/Français/SSL'
    }
};

// Initialize
function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const tutorialId = urlParams.get('id');

    if (!tutorialId || !tutorialData[tutorialId]) {
        showError('Tutorial not found. Please select a tutorial from the home page.');
        return;
    }

    const tutorial = tutorialData[tutorialId];
    state.filePath = tutorial.path;
    state.fileName = tutorial.title;
    state.category = tutorial.category;
    state.fileType = tutorial.path.endsWith('.md') ? 'markdown' : 'pdf';

    // Update UI
    elements.tutorialTitle.textContent = tutorial.title;
    elements.tutorialCategory.textContent = tutorial.category;
    elements.tutorialPath.textContent = tutorial.path.replace('../', '');
    elements.downloadLink.href = tutorial.path;
    elements.githubLink.href = tutorial.github;

    // Setup event listeners
    setupEventListeners();

    // Load tutorial
    if (state.fileType === 'markdown') {
        elements.viewControls.style.display = 'none';
        loadMarkdown(tutorial.path);
    } else {
        // Check if markdown version exists
        if (tutorial.mdPath) {
            // Has both PDF and MD, show toggle
            loadPDF(tutorial.path);
        } else {
            // Only PDF, show conversion option
            loadPDF(tutorial.path);
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Mode toggle
    elements.modeToggle.addEventListener('click', (e) => {
        if (e.target.classList.contains('mode-option')) {
            const mode = e.target.dataset.mode;
            switchMode(mode);
        }
    });

    // PDF controls
    elements.prevPage.addEventListener('click', () => {
        if (state.pageNum > 1) {
            state.pageNum--;
            renderPDFPage();
        }
    });

    elements.nextPage.addEventListener('click', () => {
        if (state.pageNum < state.pageCount) {
            state.pageNum++;
            renderPDFPage();
        }
    });

    elements.pageNum.addEventListener('change', (e) => {
        const page = parseInt(e.target.value);
        if (page >= 1 && page <= state.pageCount) {
            state.pageNum = page;
            renderPDFPage();
        } else {
            e.target.value = state.pageNum;
        }
    });

    elements.zoomIn.addEventListener('click', () => {
        state.zoom = Math.min(state.zoom + 0.25, 3);
        updateZoomDisplay();
        renderPDFPage();
    });

    elements.zoomOut.addEventListener('click', () => {
        state.zoom = Math.max(state.zoom - 0.25, 0.5);
        updateZoomDisplay();
        renderPDFPage();
    });

    // Sidebar toggle for mobile
    elements.sidebarToggle.addEventListener('click', () => {
        elements.sidebar.classList.toggle('active');
    });
}

// Load PDF
async function loadPDF(path) {
    try {
        const loadingTask = pdfjsLib.getDocument(path);
        state.pdfDoc = await loadingTask.promise;
        state.pageCount = state.pdfDoc.numPages;

        elements.pageCount.textContent = state.pageCount;
        elements.pageNum.setAttribute('max', state.pageCount);

        hideLoading();
        showPDFViewer();
        await renderPDFPage();

        // Extract all text for conversion
        await extractPDFText();
    } catch (error) {
        console.error('Error loading PDF:', error);
        showError('Failed to load PDF file. The file may be corrupted or not accessible.');
    }
}

// Render PDF page
async function renderPDFPage() {
    if (!state.pdfDoc) return;

    try {
        const page = await state.pdfDoc.getPage(state.pageNum);
        const viewport = page.getViewport({ scale: state.zoom });

        const canvas = elements.pdfCanvas;
        const context = canvas.getContext('2d');

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };

        await page.render(renderContext).promise;

        // Update controls
        elements.pageNum.value = state.pageNum;
        elements.prevPage.disabled = state.pageNum === 1;
        elements.nextPage.disabled = state.pageNum === state.pageCount;

    } catch (error) {
        console.error('Error rendering page:', error);
    }
}

// Extract text from all PDF pages
async function extractPDFText() {
    if (!state.pdfDoc) return;

    try {
        let fullText = '';

        for (let i = 1; i <= state.pageCount; i++) {
            const page = await state.pdfDoc.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n\n';
        }

        state.pdfText = fullText;
    } catch (error) {
        console.error('Error extracting PDF text:', error);
    }
}

// Convert PDF text to markdown
function convertPDFToMarkdown() {
    if (!state.pdfText) {
        return '# Content Extraction Failed\n\nUnable to extract text from PDF.';
    }

    // Basic text to markdown conversion
    let markdown = state.pdfText;

    // Split into lines
    const lines = markdown.split('\n').map(line => line.trim()).filter(line => line);

    let formattedMarkdown = `# ${state.fileName}\n\n`;
    let currentSection = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const nextLine = lines[i + 1] || '';

        // Detect headings (lines in all caps or followed by emphasis)
        if (line === line.toUpperCase() && line.length > 3 && line.length < 100) {
            if (line.length < 30) {
                formattedMarkdown += `\n## ${line}\n\n`;
            } else {
                formattedMarkdown += `\n### ${line}\n\n`;
            }
        }
        // Detect bullet points
        else if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
            formattedMarkdown += `${line}\n`;
        }
        // Detect numbered lists
        else if (/^\d+\./.test(line)) {
            formattedMarkdown += `${line}\n`;
        }
        // Regular paragraphs
        else {
            formattedMarkdown += `${line}\n\n`;
        }
    }

    // Clean up multiple newlines
    formattedMarkdown = formattedMarkdown.replace(/\n{3,}/g, '\n\n');

    return formattedMarkdown;
}

// Switch between modes
async function switchMode(mode) {
    if (state.currentMode === mode || state.isConverting) return;

    // Update UI
    document.querySelectorAll('.mode-option').forEach(option => {
        option.classList.toggle('active', option.dataset.mode === mode);
    });

    state.currentMode = mode;

    if (mode === 'original') {
        showPDFViewer();
        await renderPDFPage();
    } else {
        // Convert to markdown
        await showMarkdownConversion();
    }
}

// Show markdown conversion
async function showMarkdownConversion() {
    // Check if we have an existing markdown file
    const urlParams = new URLSearchParams(window.location.search);
    const tutorialId = urlParams.get('id');
    const tutorial = tutorialData[tutorialId];

    if (tutorial.mdPath) {
        // Load existing markdown
        await loadMarkdown(tutorial.mdPath);
    } else {
        // Convert PDF to markdown
        showConversionProgress();

        // Simulate progress
        for (let i = 0; i <= 100; i += 10) {
            elements.progressFill.style.width = `${i}%`;
            elements.conversionStatus.textContent = `Processing pages... ${i}%`;
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        const markdown = convertPDFToMarkdown();
        hideConversionProgress();
        renderMarkdown(markdown);
        showMarkdownViewer();
    }
}

// Load markdown file
async function loadMarkdown(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error('Failed to load markdown');

        const text = await response.text();
        hideLoading();
        renderMarkdown(text);
        showMarkdownViewer();
    } catch (error) {
        console.error('Error loading markdown:', error);
        showError('Failed to load markdown file.');
    }
}

// Render markdown
function renderMarkdown(text) {
    // Configure marked
    marked.setOptions({
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                return hljs.highlight(code, { language: lang }).value;
            }
            return hljs.highlightAuto(code).value;
        },
        breaks: true,
        gfm: true
    });

    const html = marked.parse(text);
    elements.markdownContent.innerHTML = html;
}

// UI Helper functions
function showPDFViewer() {
    elements.pdfViewer.style.display = 'flex';
    elements.markdownViewer.style.display = 'none';
    elements.pdfControls.style.display = 'block';
}

function showMarkdownViewer() {
    elements.pdfViewer.style.display = 'none';
    elements.markdownViewer.style.display = 'block';
    elements.pdfControls.style.display = 'none';
}

function hideLoading() {
    elements.loadingState.style.display = 'none';
}

function showError(message) {
    elements.loadingState.style.display = 'none';
    elements.errorState.style.display = 'flex';
    elements.errorMessage.textContent = message;
}

function showConversionProgress() {
    state.isConverting = true;
    elements.conversionProgress.style.display = 'flex';
    elements.progressFill.style.width = '0%';
}

function hideConversionProgress() {
    state.isConverting = false;
    elements.conversionProgress.style.display = 'none';
}

function updateZoomDisplay() {
    elements.zoomLevel.textContent = `${Math.round(state.zoom * 100)}%`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
