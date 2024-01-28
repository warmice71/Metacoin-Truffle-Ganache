// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

// A library is like a contract with reusable code, which can be called by other contracts.
// Deploying common code can reduce gas costs.
library ConvertLib{
	function convert(uint amount, uint conversionRate) public pure returns (uint convertedAmount)
	{
		return amount * conversionRate;
	}
}
