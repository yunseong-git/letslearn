import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { User, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getUsers(): Promise<User[]> {
        try {
            return await this.prisma.user.findMany();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Failed to fetch users');
        }
    }

    async getUserById(id: number): Promise<User | null> {
        if (!id) {
            throw new Error('User ID is required');
        }

        try {
            return await this.prisma.user.findUnique({
                where: { id },
            });
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw new Error('Failed to retrieve user');
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const lowerCaseEmail = email.toLowerCase(); // 이메일 소문자 변환

        try {
            return await this.prisma.user.findUnique({
                where: { email: lowerCaseEmail },
            });
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw new Error('Failed to retrieve user');
        }
    }

    async updatePwd(id: number, newPassword: string): Promise<User | null> {

        if (!id || !newPassword) {
            throw new Error('User ID and new password are required.');
        }

        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new Error('User not found.');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        try {
            return await this.prisma.user.update({
                where: { id },
                data: { password: hashedPassword }
            });
        } catch (error) {
            console.error('updatePwd service error:', error);
            throw new Error('Failed to update password');
        }
    }

    async updateUserRole(userId: number, role: Role) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { role },
        });
    }
}