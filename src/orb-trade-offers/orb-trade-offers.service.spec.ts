import { Test, TestingModule } from "@nestjs/testing"

import { OrbTradeOffersService } from "./orb-trade-offers.service"

describe("OrbTradeOffersService", () => {
    let service: OrbTradeOffersService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OrbTradeOffersService],
        }).compile()

        service = module.get<OrbTradeOffersService>(OrbTradeOffersService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })
})
