# cumulocity-runtime-widget-loader
Loads packaged Cumulocity custom widgets at runtime

## Installation Instructions
1. (Optional) Create a new Cumulocity web app and initialise it:
   ```
   c8ycli new cockpit cockpit -a @c8y/apps@1006.2.0
   cd cockpit
   npm install
   ```
2. Install dependencies:
   ```
   npm install jszip webpack-external-import
   ```
   For the 1006.2.0 version of cumulocity you also need to install a specific version of ngx-bootstrap:
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
   Edit package.json (reapply a patch after every install):
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

