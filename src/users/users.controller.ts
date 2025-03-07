import { Controller, Get, Body, Patch, Param, UseGuards, Req, UseInterceptors, UploadedFile } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"

import { OptionalAuthenticatedRequest } from "../auth/types/optional-authenticated-request.type"
import { AuthenticatedRequest } from "../auth/types/authenticated-request.type"
import { OptionalAuthGuard } from "../auth/guards/optional-auth.guard"
import { AuthGuard } from "../auth/guards/auth.guard"
import { UpdateUserDto } from "./dto/update-user.dto"
import { UsersService } from "./users.service"

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("by-firebase-uid/:firebaseUid")
    @UseGuards(OptionalAuthGuard)
    async findByFirebaseUid(@Param("firebaseUid") firebaseUid: string, @Req() req: OptionalAuthenticatedRequest) {
        if (req.user && req.user.firebaseUid === firebaseUid) {
            return req.user
        }

        const { email: _, ...rest } = await this.usersService.findOneByFirebaseUid(firebaseUid)

        return rest
    }

    @Get("by-username/:username")
    @UseGuards(OptionalAuthGuard)
    async findByUsername(@Param("username") username: string, @Req() req: OptionalAuthenticatedRequest) {
        if (req.user && req.user.username === username) {
            return req.user
        }

        const { email: _, ...rest } = await this.usersService.findOneByUsername(username)

        return rest
    }

    @Get(":id")
    @UseGuards(OptionalAuthGuard)
    async findOne(@Param("id") id: string, @Req() req: OptionalAuthenticatedRequest) {
        if (req.user && req.user.id === id) {
            return req.user
        }

        const { email: _, ...rest } = await this.usersService.findOne(id)

        return rest
    }

    @Patch()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor("avatar"))
    async update(@Body() updateUserDto: UpdateUserDto, @Req() req: AuthenticatedRequest, @UploadedFile() avatar?: Express.Multer.File) {
        return await this.usersService.update(req.user.id, {
            ...updateUserDto,
            avatar: avatar
        })
    }
}
