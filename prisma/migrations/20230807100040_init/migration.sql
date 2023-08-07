-- CreateTable
CREATE TABLE "Registrations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "affiliation" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "otherRole" TEXT,
    "participationType" TEXT NOT NULL,
    "motivationLetter" TEXT,
    "researchInterests" TEXT,
    "tentativeTitle" TEXT,
    "resume" TEXT,
    "scienceProfile" TEXT,
    "video" TEXT,
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Newsletters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Newsletters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Registrations_email_key" ON "Registrations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Newsletters_email_key" ON "Newsletters"("email");
