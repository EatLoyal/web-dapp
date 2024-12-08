import { ethers } from "ethers";

export default function convertINRToEOL(amt: number): bigint {
    const amountInInr = amt;

    // Conversion rate: 1 INR = 0.05 EOL
    const eolAmount = amountInInr * 0.05;

    // Convert to 18-decimal precision for ERC20
    const eolWithDecimals = ethers.parseUnits(eolAmount.toString(), 18);

    return eolWithDecimals;
}
