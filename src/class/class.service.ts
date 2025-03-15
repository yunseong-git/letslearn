import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassService {
  constructor(private readonly prisma: PrismaService) {}

  async createClass(createClassDto: CreateClassDto, tutorId: number) {
    return this.prisma.class.create({
      data: {
        ...createClassDto,
        tutor: { connect: { id: tutorId } },
      },
      select: { id: true, title: true, tutorId: true }, // ✅ tutorId를 포함해서 반환
    });
  }

  async getClasses() {
    return this.prisma.class.findMany({
      include: { tutor: { select: { id: true, name: true, email: true } } }, // ✅ 튜터 정보 포함
    });
  }

  async getClassById(id: number) {
    return this.prisma.class.findUnique({ where: { id } });
  }

  async updateClass(id: number, updateClassDto: UpdateClassDto) {
    return this.prisma.class.update({
      where: { id },
      data: updateClassDto,
    });
  }

  async deleteClass(id: number) {
    return this.prisma.class.delete({ where: { id } });
  }
}