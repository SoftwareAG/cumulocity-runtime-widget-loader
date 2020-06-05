# Cumulocity IoT Runtime Widget Loader
Load [packaged](https://github.com/SoftwareAG/cumulocity-runtime-widget) Cumulocity IoT custom widgets at runtime, rather than by recompiling your whole application.

## Widget Installation
**Requires:** Application upload permission (usually admin rights)

![widget installation](https://user-images.githubusercontent.com/38696279/83655992-e9997280-a5b6-11ea-82e4-8411fdd0ebc7.png)

1. While on a dashboard screen, select the `More...` -> `Install Widget` option in the action bar
2. Upload a widget zip file (Created using the [Runtime Widget Template](https://github.com/SoftwareAG/cumulocity-runtime-widget))
3. Start using your widget

## Builds

### Using the Application Builder?
This is already included in the latest version of the [Application Builder](https://github.com/SoftwareAG/cumulocity-app-builder)

### Want to add Runtime Widgets to the Cumulocity IoT Cockpit?
Pick one of the pre-built images available in the [Releases Area](https://github.com/SoftwareAG/cumulocity-runtime-widget-loader/releases).


## Build Instructions
1. (Optional) Create a new Cumulocity IoT web app and initialise it:
   ```
   c8ycli new cockpit cockpit -a @c8y/apps@1006.3.0
   cd cockpit
   npm install
   ```
2. Install dependencies:
   ```
   npm install jszip webpack-external-import
   ```
   For the 1006.3.0 version of Cumulocity IoT you also need to install a specific version of ngx-bootstrap:
   ```
   npm install ngx-bootstrap@5.5.0
   ```   
3. Install the runtime widget loader:
   ```
   npm install cumulocity-runtime-widget-loader
   ```
4. Edit package.json start and build configurations to include an extraWebpackConfig option:
   ```
   {
     ...
     "scripts": {
       "start": "c8ycli server --env.extraWebpackConfig=node_modules/cumulocity-runtime-widget-loader/runtime-widget-webpack.config.js",
       "build": "c8ycli build --env.extraWebpackConfig=node_modules/cumulocity-runtime-widget-loader/runtime-widget-webpack.config.js"
     }
     ...
   }
   ```
5. Update the package.json `"main"` entry to point to `"index.ts"` rather than `"index.js"`:
   ```
   {
     ...
     "main": "index.ts"
     ...
   }
   ```
6. Add cumulocity-runtime-widget-loader to the app.module.ts:
   ```javascript
   import {RuntimeWidgetLoaderService, RuntimeWidgetInstallerModule} from "cumulocity-runtime-widget-loader";
   
   @NgModule({
     imports: [
       ...
       // Adds an "Install widget" button to the action bar when you have a dashboard open.
       // Alternatively, remove the ".forRoot()" and manually invoke the RuntimeWidgetInstallerModalService#show() method
       RuntimeWidgetInstallerModule.forRoot(),
       ...
     ]
   })
   export class AppModule extends HybridAppModule {
     constructor(protected upgrade: NgUpgradeModule, private runtimeWidgetLoaderService: RuntimeWidgetLoaderService) {
       super();
     }
   
     ngDoBootstrap(): void {
       super.ngDoBootstrap();
       // Load the runtime widgets
       // Note: This must be after angularJs is loaded so it is done after bootstrapping
       this.runtimeWidgetLoaderService.loadRuntimeWidgets();
     }
   }

   ```
7. Include patches to webpack-external-import and to @c8y/ngx-components.
   
   Install patch-package:
   ```
   npm install --save-dev patch-package
   ```
   Edit package.json (to reapply a patch after every install):
   ```
   {
     ...
     "scripts": {
       ...
       "postinstall": "patch-package --patch-dir node_modules/cumulocity-runtime-widget-loader/patches"
     }
     ...
   }
   ```
   Install the patch, by running:
   ```
   npm install
   ```
8. Run the application:
   ```
   npm start
   ```
   
------------------------------

These tools are provided as-is and without warranty or support. They do not constitute part of the Software AG product suite. Users are free to use, fork and modify them, subject to the license agreement. While Software AG welcomes contributions, we cannot guarantee to include every contribution in the master project.
_____________________
For more information you can Ask a Question in the [TECHcommunity Forums](http://tech.forums.softwareag.com/techjforum/forums/list.page?product=cumulocity).

You can find additional information in the [Software AG TECHcommunity](http://techcommunity.softwareag.com/home/-/product/name/cumulocity).
