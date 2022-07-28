import {
    faker
} from '@faker-js/faker';

import fs from "fs";

const generateCatsData = (number) => {
    const cats = [];
    while (number >= 0) {
        cats.push({
            id: number,
            name: faker.animal.cat(),
            description: faker.lorem.paragraphs(2),
            picture: faker.image.cats(250,250, true),
            country: faker.address.country(),
            joining_date: faker.date.future(),
        });
        number--;
    }
    return cats;
};
fs.writeFileSync(
    "./db.json",
    JSON.stringify({
        cats: generateCatsData(20)
    })
);