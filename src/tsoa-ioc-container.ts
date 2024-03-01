/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import {IocContainer} from "tsoa";
import {container} from "tsyringe";

/**
 * A function that TSOA uses while generating the OpenAPI spec.
 * It allows us to inject dependencies into the controllers.
 */
export const iocContainer: IocContainer = {
    get: <T>(controller: { prototype: T }): T => {
      return container.resolve<T>(controller as never);
    },
};