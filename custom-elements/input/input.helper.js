export default class InputHelper {
    constructor(input) {
        this.input = input;
    }

    renderCustomInput() {
        if(this.input.status === 'error') {
            return `
                <div class='input-error'>
                    ${this.renderInput()}
                    ${this.renderErrorMessage()}
                </div>
            `;
        }

        return this.renderInput();
    }

    renderInput() {
        if(this.input.type === 'textarea') {
            return this.renderTextArea();
        }

        return `
            <input 
                type=${this.input.type}
                placeholder="${this.input.placeholder}"
                ${this.input.status}
                class="${this.input.status}"
            ></input>
        `;
    }

    renderErrorMessage() {
        return `<custom-typography type="label">${this.input.statusMessage}</custom-typography>`;
    }

    renderTextArea() {
        return `
            <textarea 
                placeholder="${this.input.placeholder}" 
                ${this.input.status}
                class="${this.input.status}"}
            ></textarea>
        `;
    }

    getInputValue() {
        const inputElement = this.input.type === 'textarea' 
            ? this.input.shadowRoot.querySelector(`${this.input.type}`) 
            : this.input.shadowRoot.querySelector(`input[type="${this.input.type}"]`);

        return inputElement.value;
    }
}