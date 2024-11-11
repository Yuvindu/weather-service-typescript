import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import {create} from "./service";
import { middyfy } from "@libs/lambda";

import schema from "./schema";
import { successResponse } from "@libs/responseUtils";
import { City } from "src/entities/city.entity";

const createCity: ValidatedEventAPIGatewayProxyEvent<
typeof schema
> = async (event) => {

    const city: City = event.body as any as City;
    const city1 = await create(city);

    return successResponse({city});
};

export const main = middyfy(createCity);