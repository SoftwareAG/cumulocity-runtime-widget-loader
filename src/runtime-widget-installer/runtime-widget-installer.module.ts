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

import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule, HOOK_ACTION_BAR} from "@c8y/ngx-components";
import {RuntimeWidgetInstallerModalComponent} from "./runtime-widget-installer-modal.component";
import {RuntimeWidgetInstallerActionBarComponent} from "./runtime-widget-installer-action-bar.component";
import {RuntimeWidgetInstallerActionBarFactory} from "./runtime-widget-installer-action-bar.factory";

@NgModule({
    declarations: [RuntimeWidgetInstallerModalComponent, RuntimeWidgetInstallerActionBarComponent],
    imports: [CommonModule],
    entryComponents: [RuntimeWidgetInstallerModalComponent, RuntimeWidgetInstallerActionBarComponent]
})
export class RuntimeWidgetInstallerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RuntimeWidgetInstallerModule,
            providers: [
                { provide: HOOK_ACTION_BAR, useClass: RuntimeWidgetInstallerActionBarFactory, multi: true}
            ]
        };
    }
}
