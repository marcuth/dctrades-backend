import { Test, TestingModule } from "@nestjs/testing"

import { OrbTradeOffersController } from "./orb-trade-offers.controller"
import { OrbTradeOffersService } from "./orb-trade-offers.service"

describe("OrbTradeOffersController", () => {
    let controller: OrbTradeOffersController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrbTradeOffersController],
            providers: [OrbTradeOffersService],
        }).compile()

        controller = module.get<OrbTradeOffersController>(OrbTradeOffersController)
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })
})
