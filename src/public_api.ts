/*
* Copyright (c) 2020 Software AG, Darmstadt, Germany and/or its licensors
*
* SPDX-License-Identifier: Apache-2.0
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
 */

// Patch @c8y/ngx-components to include a HOOK_COMPONENT for backwards compatibility
const ngxComps = require("@c8y/ngx-components");
if (ngxComps.HOOK_COMPONENT === undefined) {
    ngxComps.HOOK_COMPONENT = ngxComps.HOOK_COMPONENTS;
}

import { RuntimeWidgetLoaderService } from "./runtime-widget-loader/runtime-widget-loader.service";
import { RuntimeWidgetInstallerService } from "./runtime-widget-installer/runtime-widget-installer.service";
import { RuntimeWidgetInstallerModalService } from "./runtime-widget-installer/runtime-widget-installer-modal.service";
import { RuntimeWidgetInstallerModule } from "./runtime-widget-installer/runtime-widget-installer.module";

export { RuntimeWidgetLoaderService }
export { RuntimeWidgetInstallerService, RuntimeWidgetInstallerModalService, RuntimeWidgetInstallerModule }
