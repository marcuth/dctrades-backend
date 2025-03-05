import { OrbTradeOffer } from "@prisma/client"

import { PaginatedOutputDto } from "../../common/dtos/paginated-output.dto"

export class OrbTradeOfferDto extends PaginatedOutputDto<OrbTradeOffer> {}
