import MainView from "./Views/MainView";
import RouterView from "./Views/RouterView";
import LandingComponent from "./Component/Landing/LandingComponent";
import AlertsComponent from "./Component/Alert/AlertsComponent";
import AlertComponent from "./Component/Alert/AlertComponent";
import SignupComponent from "./Component/Auth/SignupComponent";
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
import FeaturesComponent from "./Component/Features/FeaturesComponent";
import OfferingsComponent from "./Component/Offerings/OfferingsComponent";
import FaqsComponent from "./Component/Faqs/FaqsComponent";
import ContactComponent from "./Component/Contact/ContactComponent";

export default class Components {
    constructor() { }

    defineComponents() {
        window.customElements.define('main-view', MainView);
        window.customElements.define('router-view', RouterView);
        window.customElements.define('app-landing', LandingComponent);
        window.customElements.define('app-alerts', AlertsComponent);
        window.customElements.define('app-alert', AlertComponent);
        window.customElements.define('app-sign-up', SignupComponent);
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
        window.customElements.define('app-features', FeaturesComponent);
        window.customElements.define('app-offerings', OfferingsComponent);
        window.customElements.define('app-faqs', FaqsComponent);
        window.customElements.define('app-contact', ContactComponent);
    }

    addComponents(app) {
        app.addComponent({
            name: 'app-landing',
            view: LandingComponent
        });
        app.addComponent({
            name: 'app-faqs',
            view: FaqsComponent
        });
        app.addComponent({
            name: 'app-contact',
            view: ContactComponent
        });
        app.addComponent({
            name: 'app-alerts',
            view: AlertsComponent
        });
        app.addComponent({
            name: 'app-alert',
            view: AlertComponent
        });
        app.addComponent({
            name: 'app-sign-up',
            view: SignupComponent
        });
        app.addComponent({
            name: 'app-login',
            view: LoginComponent
        });
        app.addComponent({
            name: 'app-reset-password',
            view: ResetPasswordComponent
        });
        app.addComponent({
            name: 'app-forgot-password',
            view: ForgotPasswordComponent
        });
        app.addComponent({
            name: 'app-dashboard',
            view: DashboardComponent
        });
        app.addComponent({
            name: 'app-delete-form',
            view: DeleteFormComponent
        });
        app.addComponent({
            name: 'app-footer',
            view: FooterComponent
        });
        app.addComponent({
            name: 'app-dashboard-card',
            view: DashboardCardComponent
        });
        app.addComponent({
            name: 'app-accordion',
            view: AccordionComponent
        });
        app.addComponent({
            name: 'app-file',
            view: FileComponent
        });
        app.addComponent({
            name: 'app-modal',
            view: ModalComponent
        });
        app.addComponent({
            name: 'app-navbar',
            view: NavbarComponent
        });
        app.addComponent({
            name: 'app-pagination',
            view: PaginationComponent
        });
        app.addComponent({
            name: 'app-search',
            view: SearchComponent
        });
        app.addComponent({
            name: 'app-select',
            view: SelectComponent
        });
        app.addComponent({
            name: 'app-svg-icon',
            view: SvgIconComponent
        });
        app.addComponent({
            name: 'app-table',
            view: TableComponent
        });
        app.addComponent({
            name: 'app-user-menu',
            view: UserMenuComponent
        });
        app.addComponent({
            name: 'app-user-profile',
            view: ProfileComponent
        });
        app.addComponent({
            name: 'app-user-edit',
            view: UserEditComponent
        });
        app.addComponent({
            name: 'app-user-form',
            view: UserFormComponent
        });
        app.addComponent({
            name: 'app-users',
            view: UsersComponent
        });
    }
}