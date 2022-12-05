import MainView from "./Views/MainView";
import RouterView from "./Views/RouterView";
import LandingComponent from "./Component/Landing/LandingComponent";
import AlertsComponent from "./Component/Alert/AlertsComponent";
import AlertComponent from "./Component/Alert/AlertComponent";
import LoginComponent from "./Component/Auth/LoginComponent";
import ForgotPasswordComponent from "./Component/Auth/ForgotPasswordComponent";
import ResetPasswordComponent from "./Component/Auth/ResetPasswordComponent";
import DashboardComponent from "./Component/DashboardFolder/Dashboard/DashboardComponent";
import DashboardCardComponent from "./Component/DashboardFolder/DashboardCard/DashboardCardComponent";
import DeleteFormComponent from "./Component/DeleteForm/DeleteFormComponent";
import FooterComponent from './Component/Footer/FooterComponent';
import AccordionComponent from "./Component/UI/Accordion/AccordionComponent";
import FileComponent from "./Component/UI/File/FileComponent";
import ModalComponent from "./Component/UI/Modal/ModalComponent";
import NavbarComponent from "./Component/UI/Navbar/NavbarComponent";
import PaginationComponent from "./Component/UI/Pagination/PaginationComponent";
import SearchComponent from "./Component/UI/Search/SearchComponent";
import SelectComponent from "./Component/UI/Select/SelectComponent";
import SvgIconComponent from "./Component/UI/SvgIcon/SvgIconComponent";
import TableComponent from "./Component/UI/Table/TableComponent";
import UserMenuComponent from "./Component/UI/UserMenu/UserMenuComponent";
import UsersComponent from "./Component/User/Users/UsersComponent";
import UserFormComponent from "./Component/User/UserForm/UserFormComponent";
import UserEditComponent from "./Component/User/UserEdit/UserEditComponent";
import ProfileComponent from "./Component/User/Profile/ProfileComponent";

export default class Components {
    constructor() { }

    defineComponents() {
        window.customElements.define('main-view', MainView);
        window.customElements.define('router-view', RouterView);
        window.customElements.define('app-landing', LandingComponent);
        window.customElements.define('app-alerts', AlertsComponent);
        window.customElements.define('app-alert', AlertComponent);
        window.customElements.define('app-login', LoginComponent);
        window.customElements.define('app-reset-password', ResetPasswordComponent);
        window.customElements.define('app-forgot-password', ForgotPasswordComponent);
        window.customElements.define('app-dashboard', DashboardComponent);
        window.customElements.define('app-delete-form', DeleteFormComponent);
        window.customElements.define('app-footer', FooterComponent);
        window.customElements.define('app-dashboard-card', DashboardCardComponent);
        window.customElements.define('app-accordion', AccordionComponent);
        window.customElements.define('app-file', FileComponent);
        window.customElements.define('app-modal', ModalComponent);
        window.customElements.define('app-navbar', NavbarComponent);
        window.customElements.define('app-pagination', PaginationComponent);
        window.customElements.define('app-search', SearchComponent);
        window.customElements.define('app-select', SelectComponent);
        window.customElements.define('app-svg-icon', SvgIconComponent);
        window.customElements.define('app-table', TableComponent);
        window.customElements.define('app-user-menu', UserMenuComponent);
        window.customElements.define('app-user-profile', ProfileComponent);
        window.customElements.define('app-user-edit', UserEditComponent);
        window.customElements.define('app-user-form', UserFormComponent);
        window.customElements.define('app-users', UsersComponent);
    }
}