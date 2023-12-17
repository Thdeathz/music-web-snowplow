/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Music` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_key" ON "Artist"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Music_title_key" ON "Music"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");
