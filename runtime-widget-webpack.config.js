const URLImportPlugin  = require("webpack-external-import/webpack");

module.exports = function config() {
    return {
        plugins: [
            new URLImportPlugin ({
                manifestName: "app",
                provideExternals: {
                    "@angular/animations": "AngularAnimations",
                    "@angular/common": "AngularCommon",
                    "@angular/common/http": "AngularCommonHttp",
                    "@angular/cdk": "AngularCdk",
                    "@angular/core": "AngularCore",
                    "@angular/forms": "AngularForms",
                    "@angular/http": "AngularHttp",
                    "@angular/platform-browser": "AngularPlatformBrowser",
                    "@angular/platform-browser/animations": "AngularPlatformBrowserAnimations",
                    "@angular/router": "AngularRouter",
                    "@c8y/client": "C8yClient",
                    "@c8y/ngx-components": "C8yNgxComponents"
                }
            })
        ]
    }
};
