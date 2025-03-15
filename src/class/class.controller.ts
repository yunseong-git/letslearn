import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Roles } from '../common/validators/roles.decorator';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  /** 강의 생성 */
  @Post()
  @Roles('TUTOR') // ✅ TUTOR만 가능!
  createClass(@Request() req, @Body() createClassDto: CreateClassDto) {
    return this.classService.createClass(createClassDto, req.user.id);
  }

  /** 강의 목록 조회 */
  @Get()
  getClasses() {
    return this.classService.getClasses();
  }

  /** 특정 강의 조회 */
  @Get(':id')
  getClassById(@Param('id') id: number) {
    return this.classService.getClassById(Number(id));
  }

  /** 강의 수정 */
  @Patch(':id')
  @Roles('TUTOR') // ✅ TUTOR만 가능!
  updateClass(@Param('id') id: number, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.updateClass(Number(id), updateClassDto);
  }

  /** 강의 삭제 */
  @Delete(':id')
  @Roles('TUTOR') // ✅ TUTOR만 가능!
  deleteClass(@Param('id') id: number) {
    return this.classService.deleteClass(Number(id));
  }
}