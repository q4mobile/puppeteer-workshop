import { faker } from '@faker-js/faker';

import fs from 'fs';

const generateCatsData = (number) => {
  const cats = [];
  while (number >= 0) {
    cats.push({
      id: number,
      name: faker.animal.cat(),
      job: faker.name.jobTitle(),
      picture: faker.image.cats(400, 400, true)
    });
    number--;
  }
  return cats;
};

const generatePeopleData = (number) => {
  const people = [];
  while (number >= 0) {
    const dateObject = new Date(faker.date.future());
    const date = dateObject.toLocaleDateString();
    people.push({
      id: number,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      date: date
    });
    number--;
  }
  return people;
};

fs.writeFileSync(
  './db.json',
  JSON.stringify({
    cats: generateCatsData(20),
    people: generatePeopleData(20)
  })
);
