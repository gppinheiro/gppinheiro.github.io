function t(t){t.removeAttribute("status"),t.removeAttribute("statusmessage")}document.getElementById("burger-menu").addEventListener("click",(function(){const t=document.getElementById("burger-menu-content");t.style.display="none"===t.style.display?"flex":"none"}));class e extends HTMLElement{static get observedAttributes(){return["href","type"]}constructor(){super(),this.href=this.getAttribute("href")||"#",this.type=this.getAttribute("type")||"text",this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`\n            <style>\n    \ncustom-typography {\n    font-family: var(--font-family);\n    color: var(--text);\n    font-weight: var(--font-weight-regular);\n}\n\ncustom-typography[type='title'] {\n    font-size: var(--font-size-title);\n    line-height: var(--line-height-title);\n}\n\ncustom-typography[type='h1'] {\n    font-size: var(--font-size-h1);\n    line-height: var(--line-height-h1);\n}\n\ncustom-typography[type='h2'] {\n    font-size: var(--font-size-h2);\n    line-height: var(--line-height-h2);\n}\n\ncustom-typography[type='h3'] {\n    font-size: var(--font-size-h3);\n    line-height: var(--line-height-h3);\n}\n\ncustom-typography[type='p'] {\n    font-size: var(--font-size-p);\n    line-height: var(--line-height-p);\n}\n\ncustom-typography[type='label'] {\n    font-size: var(--font-size-label);\n    line-height: var(--line-height-label);\n}\n\ncustom-typography[weight='extra-bold'] {\n    font-weight: var(--font-weight-extra-bold);\n}\n\ncustom-typography[weight='bold'] {\n    font-weight: var(--font-weight-bold);\n}\n\ncustom-typography[weight='semi-bold'] {\n    font-weight: var(--font-weight-semi-bold);\n}\n\n\n    a {\n        text-decoration: none;\n    }\n\n    a custom-typography {\n        color: var(--black);\n    }\n\n    a:hover custom-typography {\n        color: var(--neutral);\n    }\n\n    a custom-icon {\n        color: var(--white);\n    }\n</style>\n            <a href=${this.href}>\n                ${this.renderContent()}\n            </a>\n        `}renderContent(){return"icon"===this.type?this.renderIcon():this.renderText()}renderIcon(){return'\n            <custom-icon size="xl">\n                <slot></slot>\n            </custom-icon>\n        '}renderText(){return'\n            <custom-typography type="p" weight="semi-bold">\n                <slot></slot>\n            </custom-typography>\n        '}}customElements.define("custom-a",e);class s extends HTMLElement{static get observedAttributes(){return["size","icon","text","mode"]}constructor(){super(),this.size=this.getAttribute("size")||"m",this.icon=this.getAttribute("icon"),this.text=this.getAttribute("text"),this.mode=this.getAttribute("mode")||"dark",this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(t,e,s){"size"===t&&e!==s&&this.render()}render(){this.shadowRoot.innerHTML=`\n            <link rel="stylesheet" href="./custom-elements/button/button.css">\n            <button class="${this.size} ${this.mode}">\n                ${this.renderButton()}\n            </button>\n        `}renderButton(){return this.icon&&this.text?`\n                ${this.renderIcon()}\n                ${this.renderText()}\n            `:this.icon?this.renderIcon():this.renderText()}renderIcon(){return this.icon.includes(".svg")?`<custom-icon size="${this.size}" img="${this.icon}"></custom-icon>`:`\n            <custom-icon size="${this.size}">${this.icon}</custom-icon>\n        `}renderText(){return`\n            <custom-typography type="label" weight="semi-bold">${this.text}</custom-typography>\n        `}}customElements.define("custom-button",s);class n extends HTMLElement{static get observedAttributes(){return["mode","logoUrl","title","date"]}constructor(){super(),this.mode=this.getAttribute("mode")||"dark",this.logoUrl=this.getAttribute("logoUrl")||"",this.title=this.getAttribute("title")||"",this.date=this.getAttribute("date")||"",this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`\n            <link rel="stylesheet" href="./custom-elements/experience/experience.css">\n            <div class="container ${this.mode}">\n                <div class="header">\n                    <div class="role">\n                        <img src="${this.logoUrl}" alt="Company's Logo"/>\n                        <custom-typography type="h3" weight="semi-bold">${this.title}</custom-typography>\n                    </div>\n                    <div class="date">\n                        <custom-typography type="label" weight="semi-bold">${this.date}</custom-typography>\n                    </div>\n                </div>\n                <custom-typography type="label">\n                    <slot></slot>\n                </custom-typography>\n            </div>\n        `}}customElements.define("custom-experience",n);class i extends HTMLElement{static get observedAttributes(){return["size","img"]}constructor(){super(),this.size=this.getAttribute("size")||"m",this.img=this.getAttribute("img")||void 0,this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(t,e,s){"size"===t&&e!==s&&this.render()}render(){this.shadowRoot.innerHTML=`\n            <link rel="stylesheet" href="./custom-elements/icon/icon.css">\n            ${this.renderIcon()}\n        `}renderIcon(){return this.img?this.renderImage():this.renderMaterialIcons()}renderImage(){return`\n            <img src="${this.img}" class="${this.size}">\n        `}renderMaterialIcons(){return`\n            <i class="material-icons ${this.size}">\n                <slot></slot>\n            </i>\n        `}}customElements.define("custom-icon",i);class o{constructor(t){this.input=t}renderCustomInput(){return"error"===this.input.status?`\n                <div class='input-error'>\n                    ${this.renderInput()}\n                    ${this.renderErrorMessage()}\n                </div>\n            `:this.renderInput()}renderInput(){return"textarea"===this.input.type?this.renderTextArea():`\n            <input \n                type=${this.input.type}\n                placeholder="${this.input.placeholder}"\n                ${this.input.status}\n                class="${this.input.status}"\n            ></input>\n        `}renderErrorMessage(){return`<custom-typography type="p">${this.input.statusMessage}</custom-typography>`}renderTextArea(){return`\n            <textarea \n                placeholder="${this.input.placeholder}" \n                ${this.input.status}\n                class="${this.input.status}"}\n            ></textarea>\n        `}getInputValue(){return("textarea"===this.input.type?this.input.shadowRoot.querySelector(`${this.input.type}`):this.input.shadowRoot.querySelector(`input[type="${this.input.type}"]`)).value}}class r extends HTMLElement{static get observedAttributes(){return["type","status","statusmessage","placeholder"]}constructor(){super(),this.helper=new o(this),this.type=this.getAttribute("type")||"text",this.status=this.getAttribute("status")||"",this.statusMessage=this.getAttribute("statusmessage")||"",this.placeholder=this.getAttribute("placeholder")||"",this.attachShadow({mode:"open"})}get value(){return this.helper.getInputValue()}connectedCallback(){this.render()}attributeChangedCallback(t,e,s){"status"!==t&&"statusmessage"!==t||e===s||(this.status=this.getAttribute("status")||"",this.statusMessage=this.getAttribute("statusmessage")||"",this.render())}render(){let t="";this.shadowRoot.innerHTML&&(t=this.value),this.shadowRoot.innerHTML=`\n            <link rel="stylesheet" href="./custom-elements/input/input.css">\n            ${this.helper.renderCustomInput()}\n        `,""!==t&&("textarea"===this.type?this.shadowRoot.querySelector("textarea").value=t:this.shadowRoot.querySelector("input").value=t)}}customElements.define("custom-input",r);class a extends HTMLElement{static get observedAttributes(){return["mode"]}constructor(){super(),this.mode=this.getAttribute("mode")||"dark",this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`\n            <link rel="stylesheet" href="./custom-elements/logo/logo.css">\n            <div class="${this.mode}">\n                <img src="../../assets/guilherme.jpeg" alt="Guilherme's Face"/>\n                <custom-typography type="p" weight="bold">Guilherme</custom-typography>\n            </div>\n        `}}customElements.define("custom-logo",a);class h extends HTMLElement{static get observedAttributes(){return["id","setImage","number","imageUrl","title","onclickFunction"]}constructor(){super(),this.id=this.getAttribute("id")||"",this.setImage=this.getAttribute("setImage")||"right",this.number=this.getAttribute("number")||"0",this.imageUrl=this.getAttribute("imageUrl")||"",this.title=this.getAttribute("title")||"",this.onclickFunction=this.getAttribute("onclickFunction")||"",this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`\n            <link rel="stylesheet" href="./custom-elements/project/project.css">\n            <div class="container">\n                ${this.renderContainer()}\n            </div>\n        `,this.shadowRoot.querySelector("custom-icon").addEventListener("click",this.openPopup.bind(this))}renderContainer(){return"left"===this.setImage?`\n                ${this.renderImage()}\n                ${this.renderContent()}\n            `:`\n                ${this.renderContent()}\n                ${this.renderImage()}\n            `}renderImage(){return`\n            <div class="project-image">\n                <img class="${this.setImage}" src="${this.imageUrl}">\n            </div>\n        `}renderContent(){return`\n            <div class="content ${this.setImage}">\n                <custom-typography type="title" weight="extra-bold">0${this.number}</custom-typography>\n                <custom-typography type="h2" weight="bold">${this.title}</custom-typography>\n                <custom-typography type="p">\n                    <slot></slot>\n                </custom-typography>\n                <custom-icon size="xl">read_more</custom-icon>\n            </div>\n        `}openPopup(){if(""!==this.id){document.getElementById(`popup-${this.id}`).show()}}}customElements.define("custom-project",h);class c extends HTMLElement{static get observedAttributes(){return["projectName"]}constructor(){super(),this.projectName=this.getAttribute("projectName")||"Project Name",this.hide=this.hide.bind(this),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`\n            <link rel="stylesheet" href="./custom-elements/project-popup/project-popup.css">\n            <div class="popup">\n                <div class="popup-header">\n                    <custom-typography type="h2" weight="extra-bold">${this.projectName}</custom-typography>\n                    <custom-icon size="xl">close</custom-icon>\n                </div>\n\n                <div class="project-quick-links">\n                    <slot name="project-links"></slot>\n                </div>\n\n                <div class="project-tools">\n                    <custom-typography type="label">The tools and technologies I used in the project:</custom-typography>\n                    <slot name="project-tools"></slot>\n                </div>\n\n                <div class="project-description">\n                    <custom-typography type="label">Project Description:</custom-typography>\n                    <slot name="project-description"></slot>\n                </div>\n\n                <div class="popup-content">\n                    <slot></slot>\n                </div>\n            </div>\n        `,this.shadowRoot.querySelector("custom-icon").addEventListener("click",this.hide)}show(){this.style.display="flex"}hide(){this.style.display="none"}}window.customElements.define("custom-project-popup",c);class u extends HTMLElement{static get observedAttributes(){return["type","weight"]}constructor(){super()}}customElements.define("custom-typography",u),window.sendMessage=function(){const e=document.getElementById("contact-name"),s=document.getElementById("contact-email"),n=document.getElementById("contact-company"),i=document.getElementById("contact-message");if(function(e,s,n){let i=!0;const o=e.value,r=s.value,a=n.value;""===o?(e.setAttribute("status","error"),e.setAttribute("statusmessage","Please enter your name"),i=!1):t(e);!function(t){return/\S+@\S+\.\S+/.test(t)}(r)||""===r?(s.setAttribute("status","error"),s.setAttribute("statusmessage","Please enter a valid email address"),i=!1):t(s);""===a?(n.setAttribute("status","error"),n.setAttribute("statusmessage","Please enter a message"),i=!1):t(n);return i}(e,s,i)){!function(t){fetch("https://nodejs-server-4olhbqwz7a-ew.a.run.app/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({subject:`[Guilherme's Website] - New message from ${t.email}`,text:`Person Name: ${t.name}\nPerson Company: ${t.company}\nMessage: ${t.message}`})})}({name:e.value,email:s.value,company:n.value,message:i.value})}},window.goTo=function(t,e=!0){e?window.open(t,"_blank"):window.location.href=t};