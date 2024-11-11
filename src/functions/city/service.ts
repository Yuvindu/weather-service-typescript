import { City } from "src/entities/city.entity";
import { getDatabaseConnection } from "@libs/database-manager";

const create = async (city: City): Promise<City | null> => {
    try {
        const cityRepository = (await getDatabaseConnection()).getRepository(City);
        const newCity: City = await cityRepository.save(city);
        return newCity;
    } catch (e) {
        console.error('Failed to create city record', e);
        return null;
    }
};

export {create};