-- CreateTable
CREATE TABLE "Speakers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "description" TEXT,
    "thunder" TEXT,

    CONSTRAINT "Speakers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Organizers_pkey" PRIMARY KEY ("id")
);
