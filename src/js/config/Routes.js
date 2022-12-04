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