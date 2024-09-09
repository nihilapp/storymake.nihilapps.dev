import { PrismaClient } from '@prisma/client';

export class DB {
  static client() {
    let globalWithPrisma = global as typeof globalThis & {
      prisma: PrismaClient;
    };

    let prisma: PrismaClient;

    if (process.env.NODE_ENV === 'production') {
      prisma = new PrismaClient();
    } else {
      if (!globalWithPrisma.prisma) {
        globalWithPrisma.prisma = new PrismaClient();
      }
      prisma = globalWithPrisma.prisma;
    }

    return prisma;
  }

  static users() {
    return this.client().user;
  }

  static characters() {
    return this.client().character;
  }

  static projects() {
    return this.client().project;
  }

  static origins() {
    return this.client().origin;
  }

  static charOrigins() {
    return this.client().characterOrigin;
  }

  static feats() {
    return this.client().feat;
  }

  static charFeats() {
    return this.client().characterFeat;
  }

  static races() {
    return this.client().race;
  }

  static charRaces() {
    return this.client().characterRace;
  }

  static classes() {
    return this.client().class;
  }

  static charClasses() {
    return this.client().characterClass;
  }
}
