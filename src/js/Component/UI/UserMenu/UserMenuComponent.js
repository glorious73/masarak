
import AuthService from "../../../Service/Auth/AuthService";

function markupTemplate() {
    const template = document.createElement('template');


template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div class="dropdown user-dropdown">
        <div class="d-flex flex-column justify-content-center align-items-center dropdown-menu">
            <h3 id="fullName"></h3>
            <h5 id="role"></h5>
        </div>
        <a class="" id="userMenuButton">
            <app-svg-icon id="userMenuIcon" data-class="icon-small" data-icon="caret-down">
            </app-svg-icon>
        </a>
        <div class="dropdown-content">
            <a id="profile">
                Profile
            </a>
            <a id="logout">
                Logout
            </a>
        </div>
    </div>
`;
return template;
}

export default class UserMenuComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // Load user data
        this.loadUserData();
        document.addEventListener("toggleNavbarEvent", evt => this.loadUserData());
        // Dropdown
        this.shadowRoot.querySelector(".dropdown").addEventListener('click', (e) => this.toggleDropdown(e));
        // Icon
        this.isToggled = false;
        // Profile
        const btnprofile = this.shadowRoot.querySelector("#profile");
        btnprofile.addEventListener('click', (evt) => window.location = "#/user/profile");
        // Logout
        const btnlogout = this.shadowRoot.querySelector("#logout");
        btnlogout.addEventListener('click', (evt) => this.logout(evt));
    }

    disconnectedCallback() {

    }

    loadUserData() {
        const isUserInLocalStorage = localStorage.getItem("user");
        if(isUserInLocalStorage) {
            const user = JSON.parse(isUserInLocalStorage);
            const sroot = this.shadowRoot;
            sroot.querySelector("#fullName").innerHTML = `${user.firstName} ${user.lastName}`;
            sroot.querySelector("#role").innerHTML = `${user.role}`;
        }
    }

    toggleDropdown(evt) {
        evt.preventDefault();
        this.toggleIcon();
        this.shadowRoot.querySelector(".dropdown-content").classList.toggle('show');
    }

    toggleIcon() {
        this.isToggled = !this.isToggled;
        const icon = (this.isToggled) ? 'caret-up' : 'caret-down';
        const selectIcon = this.shadowRoot.querySelector('#userMenuIcon');
        selectIcon.setAttribute('data-icon', icon);
    }

    logout(evt) {
        evt.preventDefault();
        const authService = new AuthService();
        authService.logout();
    }
}