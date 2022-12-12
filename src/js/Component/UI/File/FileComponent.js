import 'element-internals-polyfill';
import FileService from "../../../Service/File/FileService";

function markupTemplate() {
    const template = document.createElement('template');


template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <label class="file-upload fileLabel">
        Choose File...
        <input type="file" class="input-text fileInput">
    </label>
    <div>
        <label class="file-upload-name text-wrap fileNameLabel"></label>
    </div>
`;
return template;
}

export default class FileComponent extends HTMLElement {

    static formAssociated = true;

    constructor() {
        super();
        // Form Control
        this.internals_ = this.attachInternals();
        this.value_ = '';
        // File Component
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.maxFileSize = 0; // MB
        this.isMaxFileSize = false;
        this.errorMessage = '';
    }

    get value() { return this.value_; }
    set value(v) { this.value_ = v; }

    connectedCallback() {
        this.fileService = new FileService();
        // Max File Size
        this.maxFileSize = parseFloat(this.getAttribute("data-max-file-size"));
        // Label
        const fileLabel = this.shadowRoot.querySelector(".fileLabel");
        fileLabel.htmlFor = this.getAttribute("data-file-name");
        // File
        const fileInput = this.shadowRoot.querySelector(".fileInput");
        fileInput.id = this.getAttribute("data-file-name");
        fileInput.setAttribute('name', this.getAttribute("data-file-name"));
        // Choose File
        this.shadowRoot.querySelector(".fileInput").addEventListener("change", (evt) => {
             this.changeFileName(evt);
             this.updateFileBase64(evt);
        });
    }

    disconnectedCallback() {
        this.fileService = null;
    }

    async updateFileBase64(evt) {
        // File
        const fileInput = this.shadowRoot.querySelector(".fileInput");
        // File Base 64
        const base64 = await this.fileService.getBase64(fileInput.files[0]);
        this.value_ = base64;
        this.internals_.setFormValue(this.value_);
    }

    changeFileName(evt) {
        // Selectors
        const fileNameLabel = this.shadowRoot.querySelector(".fileNameLabel");
        const fileInput     = this.shadowRoot.querySelector(".fileInput");
        // Validation
        const isValidFile = this.validateFile(fileInput);
        // Credit: https://stackoverflow.com/a/857662/6336270
        // Get the full path
        const fullPath = fileInput.value;
        if (isValidFile) {
            // Get the file name
            const startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            let fileName = fullPath.substring(startIndex);
            if (fileName.indexOf('\\') === 0 || fileName.indexOf('/') === 0)
                fileName = fileName.substring(1);
            // Show file name on label
            fileNameLabel.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
            fileNameLabel.innerHTML = fileName;
        } 
        else {
            // show error
            fileNameLabel.style.color = getComputedStyle(document.documentElement).getPropertyValue('--error-color');
            fileNameLabel.innerHTML = this.errorMessage;
        }
    }

    validateFile(uploadedFile) {
        let isValidFile = true;
        if (window.FileReader) {
            if (!uploadedFile) {
                isValidFile = false;
                this.errorMessage  = 'Could not find the file input.';
            }
            else if (!uploadedFile.files) {
                isValidFile = false;
                this.errorMessage  = 'Could not find files in input.';
            }
            else if (!uploadedFile.files[0]) {
                isValidFile = false;
                this.errorMessage  = 'Please choose a file.';
            }
            else {
                if (uploadedFile.files[0].size > (this.maxFileSize * 1024 * 1024)) {
                    isValidFile = false;
                    this.isMaxFileSize = true;
                    this.errorMessage  = `File is too large. Max File Size = ${this.maxFileSize}MB.`;
                }
            }
        }
        if(isValidFile)
            this.isMaxFileSize = false; // reset isMaxFileSize
        return isValidFile;
    }
}