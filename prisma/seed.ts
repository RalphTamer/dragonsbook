import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

import QRCode from "qrcode";
import { hash } from "bcrypt";
import { UTApi } from "uploadthing/server";
const prisma = new PrismaClient();
// const utapi = new UTApi({
//   // apiKey:process.env
// });
function generateUniqueNumbers(allEventsLength: number) {
  const maxNumber = allEventsLength - 1;
  const result: number[] = [];

  while (result.length < 5) {
    const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
    if (!result.includes(randomNumber)) {
      result.push(randomNumber);
    }
  }

  return result;
}

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
  await prisma.user.create({
    data: {
      dateOfBirth: faker.date.birthdate(),
      fullname: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      email: "ralf.tamer@gmail.com",
      password,
      role: "USER",
      title: "New Recruit",
      username: "rmt",
    },
  });
  let i = 0;
  while (i < 20) {
    const windPoints = Math.ceil(Math.random() * 100);
    const waterPoints = Math.ceil(Math.random() * 100);
    const firePoints = Math.ceil(Math.random() * 100);
    const earthPoints = Math.ceil(Math.random() * 100);
    const totalPoints = waterPoints + firePoints + windPoints + earthPoints;
    await prisma.user.create({
      data: {
        dateOfBirth: faker.date.birthdate(),
        fullname: faker.person.fullName(),
        phoneNumber: faker.phone.number(),
        email: faker.internet.email(),
        waterPoints,
        firePoints,
        earthPoints,
        windPoints,
        totalPoints,
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
    const num = Math.ceil(Math.random() * 100);
    let type;
    if (num < 25) {
      return (type = "EARTH");
    } else if (num > 25 && num < 50) {
      return (type = "WATER");
    } else if (num > 50 && num < 75) {
      return (type = "WIND");
    } else {
      return (type = "FIRE");
    }
  };
  let i = 0;
  while (i < 20) {
    await delay(500);
    const event = await prisma.event.create({
      data: {
        name: faker.word.words(3),
        type: randomType(),
        pointsAdded: Math.ceil(Math.random() * 4),
      },
    });
    await delay(500);
    // const qrCodeImageBuffer = await QRCode.toBuffer(
    //   `${process.env.BASE_URL}/redeem/${event.id}`,
    //   {
    //     type: "png",
    //     errorCorrectionLevel: "H",
    //   },
    // );
    // const blob = new Blob([qrCodeImageBuffer]);

    // const file = new File(
    //   [blob],
    //   `file-qr-${Math.ceil(Math.random() * 1234235) * Math.ceil(Math.random() * 1234235)}.png`,
    //   {
    //     type: "image/png",
    //   },
    // );
    // const response = await utapi.uploadFiles(file);
    // if (response.data != null) {
    //   await prisma.event.update({
    //     data: {
    //       qr: response.data.url,
    //     },
    //     where: {
    //       id: event.id,
    //     },
    //   });
    // }
    i++;
  }
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const userAttendance = async () => {
  const allUsers = await prisma.user.findMany();
  await delay(1000);
  const allEvents = await prisma.event.findMany();
  await delay(500);

  allUsers.forEach(async (user) => {
    await delay(500);
    const nums = generateUniqueNumbers(allEvents.length);

    nums.forEach(async (num) => {
      const event = allEvents[num];

      if (event == null) return;
      await delay(1000);
      await prisma.userAttendance.create({
        data: {
          eventId: event.id,
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
    const randomwindNumber = Math.floor(Math.random() * 20);
    const randomFireNumber = Math.floor(Math.random() * 20);
    const randomEarthNumber = Math.floor(Math.random() * 20);
    const randomWaterNumber = Math.floor(Math.random() * 20);
    await delay(1000);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        firePoints: randomFireNumber,
        waterPoints: randomWaterNumber,
        windPoints: randomwindNumber,
        earthPoints: randomEarthNumber,
      },
    });
  });
};

const addTotalPoints = async () => {
  const allUsers = await prisma.user.findMany();
  allUsers.forEach(async (user) => {
    await delay(1000);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        totalPoints:
          user.windPoints +
          user.firePoints +
          user.earthPoints +
          user.waterPoints,
      },
    });
  });
};

const specialBadgesSeed = async () => {
  const specialBadges = await prisma.specialBadge.findMany();

  let i = 0;
  while (i < 5) {
    await prisma.specialBadge.create({
      data: {
        content: faker.word.words({
          count: {
            min: 6,
            max: 9,
          },
        }),
        year: faker.number.int({
          max: 2024,
          min: 2020,
        }),
        image: faker.image.url(),
        title: faker.word.words({
          count: 2,
        }),
      },
    });
    i++;
  }
};

const addSpecialBadgeToMyAccount = async () => {
  const myAcc = await prisma.user.findFirstOrThrow({
    where: {
      email: "ralf.tamer@gmail.com",
    },
  });

  const specialBadges = await prisma.specialBadge.findMany();

  specialBadges.forEach(async (badge) => {
    await prisma.userAcquiredSpecialBadge.create({
      data: {
        userId: myAcc.id,
        badgeId: badge.id,
      },
    });
  });
};

const popupSeed = async () => {
  const previousPopup = await prisma.popup.findFirst();
  if (previousPopup != null) {
    await prisma.popup.delete({
      where: {
        id: previousPopup.id,
      },
    });
  }
  await prisma.popup.create({
    data: {
      content: faker.word.words(5),
      day: Math.floor(Math.random() * 28),
      month: "Nov",
      title: "The " + faker.word.words(2),
      link: faker.internet.url(),
    },
  });
};

const adminSeed = async () => {
  const password = await hash("R123r123", 10);
  await prisma.user.create({
    data: {
      dateOfBirth: faker.date.birthdate(),
      email: "ralf.tamer1@gmail.com",
      fullname: "ralf tamer 2",
      password,
      phoneNumber: faker.phone.number(),
      role: "ADMIN",
      title: "New Recruit",
      username: "rmt2",
    },
  });
};
const pointsToAddUpdate = async () => {
  const allEvents = await prisma.event.findMany();
  await delay(500);
  allEvents.forEach(async (event) => {
    await delay(500);
    await prisma.event.update({
      data: {
        pointsAdded: Math.ceil(Math.random() * 4),
      },
      where: {
        id: event.id,
      },
    });
  });
};
async function main() {
  // await deleteAllUsers();
  // await changePoints();
  // await addTotalPoints();
  await userSeed();
  await delay(1000);
  await adminSeed();
  await delay(1000);
  await eventsSeed();
  await delay(1000);
  await userAttendance();
  await delay(1000);
  await specialBadgesSeed();
  await delay(1000);
  await addSpecialBadgeToMyAccount();
  await delay(1000);
  await popupSeed();
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
