const timelineData = [
    {
        date: "Oct 2025",
        title: "AI Masterclass Instructor",
        description: "Shared knowledge and expertise as a Visma instructor for the AI Masterclass, helping others leverage AI technologies, and create 14 new projects with real case scenarios."
    },
    {
        date: "Jul 2025",
        title: "Admin Feature for Package Management",
        description: "Launched an Admin Feature to empower the community to change or create new packages independently."
    },
    {
        date: "Jun 2025",
        title: "AI-Driven Fabric Package Updates",
        description: "Created an AI prompt to automate the update process for Fabric packages, ensuring consistency and reducing manual effort. The process involves validating test projects, creating tests, running them, and updating documentation."
    },
    {
        date: "Jun 2025",
        title: "Webforms to Microfrontends Migration",
        description: "Developed an AI prompt to assist in migrating legacy webforms control pages to modern microfrontends (widgets) using standalone JS, HTML, and CSS."
    },
    {
        date: "May 2025",
        title: "Template Switcher Tool",
        description: "Created a Template Switcher tool to facilitate seamless customer migration between templates without issues."
    },
    {
        date: "Mar 2025",
        title: "New Frontend Architecture Planning",
        description: "Collaborated with the Frontend Chapter to design a new architecture for a future-proof frontend application."
    },
    {
        date: "Feb 2025",
        title: "Pricing Strategy Model Change",
        description: "Initiated the transition of the pricing strategy from a single full product to a multi-package model, offering users more flexibility."
    },
    {
        date: "Nov 2024",
        title: "New Navigation System",
        description: "We introduced a new navigation system featuring a left menu to better showcase our features and improve user experience. By grouping similar functionalities and highlighting our Plus Features, the menu now offers intuitive, streamlined navigation across all product areas—including debtors, companies, and employees. This overhaul replaced a 12-year-old legacy codebase and introduced an advanced framework for managing visibility versus permissions, making the product more flexible and easier to use."
    },
    {
        date: "Aug 2024",
        title: "Backstage V2",
        description: "Developed and launched the second version of Backstage, an internal developer portal (originally by Spotify) tailored to help Nmbrs developers in their daily work.",
        image: "./assets/images/nmbrs-timeline/image5.png"
    },
    {
        date: "Jun 2024",
        title: "AI Chatbot for Leave Requests",
        description: "Created a second AI chatbot for leave requests. Although it didn't go live, it provided valuable insights into AI application in HR processes."
    },
    {
        date: "Apr 2024",
        title: "App Switcher V2",
        description: "Developed and launched the second version of the App Switcher to integrate Visma Accounting applications. Enabled seamless transitions between apps and add-ons. Built an Event Bus and Application Management feature to handle cross-app events and configuration.",
        images: [
            "./assets/images/nmbrs-timeline/image3.png",
            "./assets/images/nmbrs-timeline/image4.png"
        ]
    },
    {
        date: "Apr 2024",
        title: "Scrum Master Role",
        description: "Requested by the team to become their Scrum Master. Successfully built trust with a senior team and drove performance improvements by embracing Agile changes."
    },
    {
        date: "Mar 2024",
        title: "Tech Mission 2 - Frontend Standardization & Security",
        description: "Led initiatives to standardize frontend practices, leading to the creation of the 'Design System' squad:<br><ul><li><strong>XSS Standard Layer:</strong> Implemented centralized input sanitization.</li><li><strong>Deploy Pipelines:</strong> Standardized UIComponents pipelines and migrated to YAML.</li><li><strong>Unit Tests:</strong> Reviewed and re-enabled unit tests with >80% coverage.</li><li><strong>Design System Squad:</strong> Established a dedicated squad for frontend excellence.</li></ul>"
    },
    {
        date: "Feb 2024",
        title: "Become Infra Scrum Master",
        description: "For two months, I served as Scrum Master for Squad Infra, supporting the team primarily as an observer. During this period, I provided constructive feedback and recommended small adjustments to their workflows, helping them refine their ways of working."
    },
    {
        date: "Jan 2024",
        title: "Transition to Core Team",
        description: "Transitioned from a product-focused team to the Core team. Shifted focus to enhancing core technical capabilities and ensuring robust, scalable software solutions."
    },
    {
        date: "Oct 2023",
        title: "Strategy Change",
        description: "When I joined the Chapter of Scrum Masters in September 2022, we recognized that our collaboration needed significant improvement. As a group, we decided to start fresh with a new structure, collectively agreeing on the best approach to help the company move faster with our support. This shared decision set the stage for a more united, effective Scrum Master team."
    },
    {
        date: "Oct 2023",
        title: "Tech Mission 1 - Package Management",
        description: "Our mission is to ensure that all Fabric Azure Packages and internal SDK packages are consistently up to date across every project. This aligns with our technical objective: maintaining “Package Management Under Control.” The motivation is clear—we face significant risks in both security and functionality if we allow outdated or deprecated dependencies to persist, potentially causing immediate failures when dependencies stop working."
    },
    {
        date: "Jun 2023",
        title: "Dutch Payroll AI Assistant",
        description: "Developed and launched the Knowledge Assistant, a premium feature in Nmbrs designed to add specialized capabilities beyond standard HR and Payroll functionalities. The Nmbrs Knowledge Assistant is an AI-driven solution that empowers HR professionals and payroll experts to remain informed about the latest HR and payroll regulations. Featuring a chat-based interface, it provides instant access to curated source documents—including the Payroll Tax Handbook and Collective Labour Agreements—ensuring accurate answers within seconds. This tool is built to streamline processes, boost efficiency, and enhance customer satisfaction by delivering trustworthy information to salary administrators throughout the payroll cycle. It intelligently analyzes user queries and identifies the most relevant resources to deliver precise responses. Knowledge Assistant leverages Azure AI Search to retrieve pertinent documents from indexed sources, then utilizes Azure OpenAI's ChatGPT to generate contextual, real-time answers. The system supports ongoing conversations with follow-up questions and can trigger additional tools using the Model Context Protocol (MCP) when necessary. The backend is built in Python, while the frontend uses React.",
        images: [
            "./assets/images/nmbrs-timeline/image1.png",
            "./assets/images/nmbrs-timeline/image2.png"
        ]
    },
    {
        date: "Jul 2023",
        title: "Professional Scrum Master (PSM II)",
        description: "Got the official Professional Scrum Master certificate (PSM II)."
    },
    {
        date: "Apr 2023",
        title: "Onboarding App v2",
        description: "Launched a new version of our Onboarding Frontend Application using our webcomponents library and with a new fresh design."
    },
    {
        date: "Oct 2022",
        title: "Professional Scrum Master (PSM I)",
        description: "Got the official Professional Scrum Master certificate (PSM I)."
    },
    {
        date: "Sep 2022",
        title: "Scrum Master",
        description: "The team invited me to become their Scrum Master during a challenging storming phase, when urgent support was needed. By introducing new team members, facilitating some departures, and refining our team agreements and procedures, we were able to transform our collaboration. As a result, the team began to perform at a much higher level."
    },
    {
        date: "Aug 2022",
        title: "Joined Nmbrs",
        description: "Started journey at Nmbrs as a Full Stack Software Engineer. Initially joined a client-side team, developing and maintaining features for microservices and monolithic architectures."
    }
];

class CustomNmbrsPopup extends HTMLElement {
    constructor() {
        super();
        this.hide = this.hide.bind(this);
        this.updateTheme = this.updateTheme.bind(this);
        this.attachShadow({ mode: 'open' });
        this.themeObserver = null;
    }

    connectedCallback() {
        this.render();
        this.setupThemeObserver();
        this.updateTheme();
    }

    disconnectedCallback() {
        if (this.themeObserver) {
            this.themeObserver.disconnect();
        }
    }

    setupThemeObserver() {
        this.themeObserver = new MutationObserver(() => {
            this.updateTheme();
        });

        this.themeObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    updateTheme() {
        const isLightMode = document.body.classList.contains('light-mode');
        const popup = this.shadowRoot.querySelector('.popup');

        if (popup) {
            if (isLightMode) {
                popup.classList.add('light-mode');
            } else {
                popup.classList.remove('light-mode');
            }
        }
    }

    render() {
        const timelineItems = timelineData.map((item, index) => {
            let mediaContent = '';

            if (item.images && item.images.length > 0) {
                const imagesHtml = item.images.map(img =>
                    `<img src="${img}" alt="${item.title}" class="timeline-image" loading="lazy">`
                ).join('');
                mediaContent = `<div class="timeline-images-grid">${imagesHtml}</div>`;
            } else if (item.image) {
                mediaContent = `<img src="${item.image}" alt="${item.title}" class="timeline-image" loading="lazy">`;
            }

            return `
            <div class="timeline-item" style="animation-delay: ${index * 0.1}s">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <span class="timeline-date">${item.date}</span>
                    <h3 class="timeline-title">${item.title}</h3>
                    <div class="timeline-description">${item.description}</div>
                    ${mediaContent}
                </div>
            </div>
        `}).join('');

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./custom-elements/nmbrs-popup/nmbrs-popup.css">
            <div class="popup">
                <div class="popup-header">
                    <custom-typography type="h2" weight="extra-bold">Nmbrs Journey</custom-typography>
                    <custom-icon size="l" icon="close" id="close-icon">close</custom-icon>
                </div>
                
                <div class="timeline-container">
                    ${timelineItems}
                </div>
            </div>
        `;

        this.shadowRoot.getElementById('close-icon').addEventListener('click', this.hide);

        // Close on backdrop click (host element)
        this.addEventListener('click', (e) => {
            if (e.target === this) this.hide();
        });

        this.shadowRoot.querySelector('.popup').addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Scroll detection for sticky header
        const popup = this.shadowRoot.querySelector('.popup');
        if (popup) {
            popup.addEventListener('scroll', (e) => {
                if (e.target.scrollTop > 10) {
                    e.target.classList.add('scrolled');
                } else {
                    e.target.classList.remove('scrolled');
                }
            });
        }
    }

    show() {
        this.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        this.updateTheme();

        // Re-trigger animations
        const items = this.shadowRoot.querySelectorAll('.timeline-item');
        items.forEach(item => {
            item.style.animation = 'none';
            item.offsetHeight; /* trigger reflow */
            item.style.animation = null;
        });
    }

    hide() {
        this.style.display = 'none';
        document.body.style.overflow = '';
    }
}

window.customElements.define('custom-nmbrs-popup', CustomNmbrsPopup);
