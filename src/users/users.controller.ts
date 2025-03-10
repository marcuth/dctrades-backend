import { Controller, Get, Body, Patch, Param, UseGuards, Req, UseInterceptors, UploadedFile } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"

import { FirebaseAuthenticatedRequest } from "../auth/interface/firebase-authenticated-request.interface"
import { FirebaseAuthGuard } from "../auth/guards/firebase-auth.guard"
import { UpdateUserDto } from "./dto/update-user.dto"
import { UsersService } from "./users.service"

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("by-firebase-uid/:firebaseUid")
    async findByFirebaseUid(@Param("firebaseUid") firebaseUid: string) {
        return await this.usersService.findOneByFirebaseUid(firebaseUid)
    }

    @Get("by-username/:username")
    async findByUsername(@Param("username") username: string) {
        return await this.usersService.findOneByUsername(username)
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return await this.usersService.findOne(id)
    }

    @Patch()
    @UseGuards(FirebaseAuthGuard)
    @UseInterceptors(FileInterceptor("avatar"))
    async update(
        @Body() updateUserDto: UpdateUserDto,
        @Req() req: FirebaseAuthenticatedRequest,
        @UploadedFile() avatar?: Express.Multer.File,
    ) {
        return await this.usersService.update(req.user.id, {
            ...updateUserDto,
            avatar: avatar,
        })
    }
}
