import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";
const prisma = new PrismaClient();

const deleteAllUsers = async () => {
  const allUsers = await prisma.user.findMany();

  allUsers.map(async (user) => {
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  });
};
const userSeed = async () => {
  // const allUsers = await prisma.user.findMany();
  const password = await hash("R123r123", 10);
  let i = 0;
  while (i < 20) {
    await prisma.user.create({
      data: {
        airPoints: 0,
        earthPoints: 0,
        firePoints: 0,
        waterPoints: 0,
        email: faker.internet.email(),
        password,
        role: "USER",
        title: "New Recruit",
        username: faker.internet.userName(),
      },
    });
    i++;
  }
};
const eventsSeed = async () => {
  // const allUsers = await prisma.user.findMany();
  const randomType = () => {
    const num = Math.floor(Math.random() * 100);
    let type;
    if (num < 25) {
      return (type = "EARTH");
    } else if (num > 25 && num < 50) {
      return (type = "WATER");
    } else if (num > 50 && num < 75) {
      return (type = "AIR");
    } else {
      return (type = "FIRE");
    }
  };
  let i = 0;
  while (i < 20) {
    await prisma.event.create({
      data: {
        name: faker.word.words(3),
        qr: faker.image.url(),
        type: randomType(),
      },
    });
    i++;
  }
};

const userAttendance = async () => {
  const allUsers = await prisma.user.findMany();
  const allEvents = await prisma.event.findMany();
  function generateUniqueNumbers() {
    const maxNumber = allEvents.length - 1;
    const result: number[] = [];

    while (result.length < 5) {
      const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
      if (!result.includes(randomNumber)) {
        result.push(randomNumber);
      }
    }

    return result;
  }
  allUsers.forEach((user) => {
    const nums = generateUniqueNumbers();
    nums.forEach(async (num) => {
      await prisma.userAttendance.create({
        data: {
          eventId: allEvents[num]!.id,
          userId: user.id,
        },
      });
    });
  });
  let i = 0;
  while (i < 20) {
    i++;
  }
};

const changePoints = async () => {
  const allUsers = await prisma.user.findMany();

  allUsers.forEach(async (user) => {
    const randomAirNumber = Math.floor(Math.random() * 20);
    const randomFireNumber = Math.floor(Math.random() * 20);
    const randomEarthNumber = Math.floor(Math.random() * 20);
    const randomWaterNumber = Math.floor(Math.random() * 20);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        firePoints: randomFireNumber,
        waterPoints: randomWaterNumber,
        airPoints: randomAirNumber,
        earthPoints: randomEarthNumber,
      },
    });
  });
};
async function main() {
  // await deleteAllUsers();
  // await userSeed();
  // await eventsSeed();
  // await userAttendance();
  await changePoints();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
