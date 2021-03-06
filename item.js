/**
 * Copyright 2018-2021 Flavio Garcia
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

import { default as ID } from "./id";
import {
    DeepObservable, ObservableArray, ObservableObject, StacheElement, type
} from "can";


class FazItem extends ObservableObject {
    static get props() {
        return {
            id: {
                type: type.convert(String),
                get default() {
                    return ID.random;
                }
            },
            active: {type: type.convert(Boolean), default: false},
            // Content should be written like that so we stop main-navbar stop
            // to alter the first navbar from the example. It seems like somehow
            // they were sharing or invading contents.
            content: {
                type: type.convert(String),
                get default() {
                    return "";
                }
            },
            element: type.convert(ObservableObject),
            href: String,
            parent: "*",
            type: String,
            get isLink() {
                return this.href !== undefined;
            }
        };
    }

    static get propertyDefaults() {
        return DeepObservable;
    }

    static get seal() {
        return true;
    }

}

export class FazItemList extends ObservableArray {
    static get props() {
        return {
            get enabled() {
                return this.filter({disabled: false});
            },

            get active() {
                return this.filter({active: true});
            }
        };
    }

    static get items() {
        return type.convert(FazItem);
    }
}

export class FazStacheItem extends StacheElement {
    static get props() {
        return {
            id: {
                type: type.convert(String),
                get default() {
                    return ID.random;
                }
            },
            active: {type: type.convert(Boolean), default: false},
            // Content should be written like that so we stop main-navbar stop
            // to alter the first navbar from the example. It seems like somehow
            // they were sharing or invading contents.
            content: {
                type: type.convert(String),
                get default() {
                    return "";
                }
            },
            element: type.convert(ObservableObject),
            href: String,
            parent: "*",
            type: String,
            isLoading: {type: Boolean, default: true},
            get isLink() {
                return this.href !== undefined;
            }
        };
    }

    connectedCallback() {
        let content = this.innerHTML;
        this.content = content;
        steal.done().then(()=>{
            this.contentLoaded();
        });
        this.beforeConnectedCallback();
        super.connectedCallback();
        this.afterConnectedCallback();
        this.isLoading = false;
        this.show();
    }

    afterConnectedCallback() {}

    beforeConnectedCallback() {}

    show() {}

    contentLoaded() {}

    elementClasses(element) {
        return element.className.split(" ");
    }

    elementAddClass(element, className) {
        this.elementRemoveClass(element, className);
        let classes = this.elementClasses(element);
        classes.push(className);
        element.className = classes.join(" ");
    }

    elementRemoveClass(element, className) {
        element.className = this.elementClasses(element).filter(
            item => {return item != className}
        ).join(" ");
    }

    static get propertyDefaults() {
        return DeepObservable;
    }

    static get seal() {
        return true;
    }

}

export class FazStacheItemList extends ObservableArray {
    static get props() {
        return {
            get enabled() {
                return this.filter({disabled: false});
            },

            get active() {
                return this.filter({active: true});
            }
        };
    }

    static get items() {
        return type.convert(FazStacheItem);
    }
}

export default FazItem;
