export const Routes =
{
    Home: {
        name: 'app-landing',
        path: '',
        pathRegex: '^$'
    },
    Landing: {
        name: 'app-landing',
        path: '#/',
        pathRegex: '^#/$'
    },
    Login: {
        name: 'app-login',
        path: '#/login',
        pathRegex: '^#/login$'
    },
    Signup: {
        name: 'app-sign-up',
        path: '#/signup',
        pathRegex: '^#/signup$'
    },
    ForgotPassword: {
        name: 'app-forgot-password',
        path: '#/password/forgot',
        pathRegex: '^#/password/forgot$'
    },
    ResetPassword: {
        name: 'app-reset-password',
        path: '#/password/reset',
        pathRegex: '^#/password/reset(.*)$'
    },
    Faqs: {
        name: 'app-faqs',
        path: '#/faqs',
        pathRegex: '^#/faqs$'
    },
    Contact: {
        name: 'app-contact',
        path: '#/contactus',
        pathRegex: '^#/contactus$'
    },
    Dashboard: {
        name: 'app-dashboard',
        path: '#/dashboard',
        pathRegex: '^#/dashboard$'
    },
    Users: {
        name: 'app-users',
        path: '#/users',
        pathRegex: '^#/users$'
    },
    UserForm: {
        name: 'app-user-form',
        path: '#/user/form',
        pathRegex: '^#/user/form$'
    },
    UserEdit: {
        name: 'app-user-edit',
        path: '#/user/edit',
        pathRegex: '^#/user/edit(.*)$'
    },
    UserProfile: {
        name: 'app-user-profile',
        path: '#/user/profile',
        pathRegex: '^#/user/profile$'
    },
    Roles: {
        name: 'app-roles',
        path: '#/roles',
        pathRegex: '^#/roles$'
    }
};