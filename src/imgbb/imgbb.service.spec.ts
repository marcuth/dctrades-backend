import { Test, TestingModule } from "@nestjs/testing"

import { ImgBBService } from "./imgbb.service"

describe("ImgBBService", () => {
    let service: ImgBBService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ImgBBService],
        }).compile()

        service = module.get<ImgBBService>(ImgBBService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })
})
