import { faker } from "@faker-js/faker";
import fs from "fs";

const users = [];
const usersLimit = 50;
for (let i = 0; i < usersLimit; i++) {
  const user = {
    phone: faker.phone.number('05#-#######'),
    email: faker.internet.email(),
    fullName: `${faker.person.firstName()} ${faker.person.lastName()}`,
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    password: faker.helpers.fromRegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+<>?])[A-Za-z\d!@#$%^&*()_+<>?]{8,}$/
    ),
  };
  users.push(user);
}

const jsonContent = JSON.stringify(users, null, 2);
const outputPath = "../api/src/scripts/generated_users.json";

fs.writeFileSync(outputPath, jsonContent);

console.log(
  `Generated ${usersLimit} user entries and saved to "api/src/scripts/generated_users.json".`
);
