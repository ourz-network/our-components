/*! For license information please see vendors~main.6d9b76aa.iframe.bundle.js.LICENSE.txt */
fragment CurrencyShort on Currency {
  id
  name
  symbol
  decimals
}

fragment PreviousReserveBid on InactiveReserveAuctionBid {
  id
  bidder {
    id
  }
  createdAtTimestamp
  amount
  bidType
  bidInactivatedAtTimestamp
  bidInactivatedAtBlockNumber
}

fragment CurrentReserveBid on ReserveAuctionBid {
  bidType
  amount
  createdAtTimestamp
  bidder {
    id
  }
}

fragment ReserveAuctionPartial on ReserveAuction {
  id
  tokenId
  status
  approved
  reservePrice
  firstBidTime
  createdAtTimestamp
  curator {
    id
  }
  curatorFeePercentage
  tokenOwner {
    id
  }
  auctionCurrency {
    ...CurrencyShort
  }
  currentBid {
    ...CurrentReserveBid
  }
  previousBids {
    ...PreviousReserveBid
  }
  duration
  expectedEndTimestamp
  finalizedAtTimestamp
}

`;exports.GET_AUCTION_BY_CURATOR=graphql_request_1.gql`
  ${AUCTION_PARTIALS}

  query getAuctionsByCurator($curators: [String!], $approved: [Boolean!], $first: Int, $skip: Int) {
    reserveAuctions(where:
      {
        curator_in: $curators,
        approved_in: $approved
      }
      first: $first
      skip: $skip
      orderBy: createdAtTimestamp
      orderDirection: desc
    ) {
      ...ReserveAuctionPartial
    }
  }
`,exports.GET_ALL_AUCTIONS=graphql_request_1.gql`
  ${AUCTION_PARTIALS}

  query getAllAuctions($approved: [Boolean!], $first: Int, $skip: Int) {
    reserveAuctions(
      where: {
        approved_in: $approved
      }
      first: $first
      skip: $skip
    ) {
      ...ReserveAuctionPartial
    }
  }
`,exports.GET_AUCTION_BY_MEDIA=graphql_request_1.gql`
  ${AUCTION_PARTIALS}

  query getAuctionByMedia($tokenContract: String, $tokenId: BigInt) {
    reserveAuctions(
      first: 1,
      where: {
        tokenContract: $tokenContract
        tokenId: $tokenId
      }
      orderBy: createdAtTimestamp
      orderDirection: desc
    ) {
      ...ReserveAuctionPartial
    }
  }
`,exports.GET_MEDIA_QUERY=graphql_request_1.gql`
  ${AUCTION_PARTIALS}

  fragment AskPrice on Ask {
    id
    currency {
      ...CurrencyShort
    }
    amount
    createdAtTimestamp
  }

  fragment NFTMedia on Media {
    id
    creatorBidShare
    owner {
      id
    }
    creator {
      id
    }
    currentAsk {
      ...AskPrice
    }
    createdAtTimestamp
    metadataURI
    metadataHash
    contentURI
    contentHash
  }

  fragment BidDataPartial on Bid {
    id
    bidder {
      id
    }
    createdAtTimestamp
    amount
    currency {
      ...CurrencyShort
    }
  }

  query getMediaAndAuctions($ids_id: [ID!]) {
    medias(
      where: { id_in: $ids_id }
      first: 500
    ) {
      ...NFTMedia
      currentBids {
        ...BidDataPartial
      }
      reserveAuctions(
        orderBy: createdAtTimestamp
        orderDirection: desc
        first: 1
      ) {
        ...ReserveAuctionPartial
      }
    }
  }
`},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.GET_TOKEN_VALUES_QUERY=void 0;const graphql_request_1=__webpack_require__(374);exports.GET_TOKEN_VALUES_QUERY=graphql_request_1.gql`
  fragment TokenShort on Token {
    id
    symbol
    name
    decimals
    derivedETH
  }
  query getTokenPrices($currencyContracts: [ID!]) {
    bundle(id: "1") {
      ethPrice
    }
    tokens(where: { id_in: $currencyContracts }) {
      ...TokenShort
    }
  }
//# sourceMappingURL=vendors~main.6d9b76aa.iframe.bundle.js.map