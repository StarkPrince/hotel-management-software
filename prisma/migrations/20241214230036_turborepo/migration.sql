-- AlterTable
ALTER TABLE "_AmenityToRoom" ADD CONSTRAINT "_AmenityToRoom_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_AmenityToRoom_AB_unique";
