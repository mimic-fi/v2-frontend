export const SMART_VAULT_FUNCTIONS_HASHED = {
  '87788782': 'performanceFee()',
  '3f81a192': 'ANY_ADDRESS()',
  '44ba1fca': 'NAMESPACE()',
  '933f0f3c': 'authorize(address,bytes4)',
  'e2a81602': 'bridge(uint8,uint256,address,uint256,uint8,uint256,address,bytes)',
  'c56924ba': 'bridgeConnector()',
  '82b12dd7': 'bridgeFee()',
  'cc58002c': 'call(address,bytes,uint256,bytes)',
  'bb1757cf': 'claim(address,bytes)',
  '5af547e6': 'collect(address,address,uint256,bytes)',
  'ea8148a6': 'exit(address,address[],uint256[],uint256,bytes)',
  'c415b95c': 'feeCollector()',
  'ac41865a': 'getPrice(address,address)',
  '9f0514ad': 'getPriceFeed(address,address)',
  'c4d66de8': 'initialize(address)',
  '543b9235': 'investedValue(address)',
  'd9972b96': 'isAuthorized(address,bytes4)',
  '67c1def9': 'isStrategyAllowed(address)',
  '1facc5d6': 'join(address,address[],uint256[],uint256,bytes)',
  'ba03e93f': 'lastValue(address)',
  '2630c12f': 'priceOracle()',
  '7b103999': 'registry()',
  'c9fd86ac': 'setBridgeConnector(address)',
  '07223781': 'setBridgeFee(uint256,uint256,address,uint256)',
  'a42dce80': 'setFeeCollector(address)',
  '9907dcf6': 'setPerformanceFee(uint256,uint256,address,uint256)',
  '67a1d5ab': 'setPriceFeed(address,address,address)',
  '4ed31090': 'setPriceFeeds(address[],address[],address[])',
  '530e784f': 'setPriceOracle(address)',
  'baa82a34': 'setStrategy(address,bool)',
  'fee415f8': 'setSwapConnector(address)',
  '6d9a76a9': 'setSwapFee(uint256,uint256,address,uint256)',
  'eea5c1ea': 'setWithdrawFee(uint256,uint256,address,uint256)',
  '37e0ac02': 'swap(uint8,address,address,uint256,uint8,uint256,bytes)',
  '18f51fea': 'swapConnector()',
  '54cf2aeb': 'swapFee()',
  '6646a436': 'unauthorize(address,bytes4)',
  'b413148e': 'unwrap(uint256,bytes)',
  '9003afee': 'withdraw(address,uint256,address,bytes)',
  'e941fa78': 'withdrawFee()',
  '109b3c83': 'wrap(uint256,bytes)',
  '17fcb39b': 'wrappedNativeToken()'
}

export function normalizePermissions(data) {
  let granteesList = []

  // normalize list
  data?.permissions.forEach(p => {
    p.grantees.forEach(grantee => {
      granteesList.push(grantee)
    })
  })

  // unique grantees
  const uniqueGrantees = [
    ...new Map(granteesList.map(item => [item.id, item])).values(),
  ]

  return uniqueGrantees
}