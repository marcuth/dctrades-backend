import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import axios from "axios"

@Injectable()
export class ImgBBService {
    private readonly apiUrl = "https://api.imgbb.com/1/upload"

    constructor(private readonly configService: ConfigService) {}

    async uploadImage(imageBuffer: Buffer): Promise<string> {
        const apiKey = this.configService.get<string>("IMGBB_API_KEY")

        if (!apiKey) {
            throw new HttpException("ImgBB API key is not configured", HttpStatus.INTERNAL_SERVER_ERROR)
        }

        const base64Image = imageBuffer.toString("base64")

        try {
            const response = await axios.post(this.apiUrl, null, {
                params: {
                    key: apiKey,
                    image: base64Image
                },
            })

            return response.data.data.url
        } catch (error) {
            throw new HttpException("Error uploading image to ImgBB", HttpStatus.BAD_GATEWAY)
        }
    }
}
