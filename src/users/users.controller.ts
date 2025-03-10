import { Controller, Get, Body, Patch, Param, UseGuards, Req, UseInterceptors, UploadedFile } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"

import { FirebaseAuthenticatedRequest } from "../auth/interface/firebase-authenticated-request.interface"
import { MultiAuthGuard } from "../auth/guards/multi-auth.guard"
import { UpdateUserDto } from "./dto/update-user.dto"
import { UsersService } from "./users.service"

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(":firebaseUid/firebase")
    async findOneByFirebaseUid(@Param("firebaseUid") firebaseUid: string) {
        return await this.usersService.findOneByFirebaseUid(firebaseUid)
    }

    @Get("username/:username")
    async findOneByUsername(@Param("username") username: string) {
        return await this.usersService.findOneByUsername(username)
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return await this.usersService.findOne(id)
    }

    @Patch()
    @UseGuards(MultiAuthGuard)
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
