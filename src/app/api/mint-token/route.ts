import { ethers } from "ethers";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { userId } = req.body; // Nullifier ID or Wallet Address
            const provider = new ethers.JsonRpcProvider("YOUR_RPC_URL");
            const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

            const contractAddress = "YOUR_SMART_CONTRACT_ADDRESS";
            const abi = [
                // Replace with your contract ABI
                "function mint(address to, uint256 amount) external",
            ];
            const contract = new ethers.Contract(contractAddress, abi, wallet);

            // Mint tokens
            const txn = await contract.mint(
                userId,
                ethers.utils.parseEther("10")
            );
            await txn.wait();

            res.status(200).json({ success: true, transactionHash: txn.hash });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
