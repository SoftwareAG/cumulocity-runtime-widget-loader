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

import {ActionBarFactory, ActionBarItem} from "@c8y/ngx-components/core/action-bar/action-bar.model";
import {RuntimeWidgetInstallerActionBarComponent} from "./runtime-widget-installer-action-bar.component";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {ɵb as ContextDashboardComponent, ɵh as CockpitDashboardComponent} from "@c8y/ngx-components/fesm5/c8y-ngx-components-context-dashboard";

@Injectable()
export class RuntimeWidgetInstallerActionBarFactory implements ActionBarFactory {
    items: ActionBarItem[] = [
        {
            template: RuntimeWidgetInstallerActionBarComponent,
            placement: 'more',
            priority: 0
        }
    ];

    constructor(private router: Router) {}

    get(): Observable<ActionBarItem[]> {
        return this.router.routerState.root.url.pipe(map(() => {
            // Check to see if a dashboard is loaded, if it is then show the install widget actionbar item
            // How this works: It checks the state of the router to see which component it has loaded.
            //  If it's a ContextDashboard or CockpitDashboard then we can show the actionbar item.
            // This code would be a lot more readable if we could use the optional chaining operator from TS 3.7
            if (
                this.router.routerState.root.firstChild &&
                (
                    (
                        this.router.routerState.root.firstChild.routeConfig &&
                        [ContextDashboardComponent, CockpitDashboardComponent].includes(this.router.routerState.root.firstChild.routeConfig.component)
                    ) || (
                        this.router.routerState.root.firstChild.firstChild &&
                        this.router.routerState.root.firstChild.firstChild.routeConfig &&
                        [ContextDashboardComponent, CockpitDashboardComponent].includes(this.router.routerState.root.firstChild.firstChild.routeConfig.component)
                    )
                )
            ){
                return this.items;
            } else {
                return [];
            }
        }))
    }
}
