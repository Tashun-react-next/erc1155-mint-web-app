import abi from "../data/ERC1155Contract.json";
import { ethers } from "ethers";
import { ajax } from 'rxjs/ajax'

const getExistingTokens =  async (contractAddress, contractABI, accountAddress, tokenId) => {
    try {
        const {ethereum} = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            /*
             * Call the getAllWaves method from your Smart Contract
             */
           return  await contract.balanceOf(accountAddress, tokenId);


            // /*
            //  * We only need address, timestamp, and message in our UI so let's
            //  * pick those out
            //  */
            // let wavesCleaned = [];
            // waves.forEach(wave => {
            //     wavesCleaned.push({
            //         address: wave.waver,
            //         timestamp: new Date(wave.timestamp * 1000),
            //         message: wave.message
            //     });
            // });
            //
            // /*
            //  * Store our data in React State
            //  */
            // setAllWaves(wavesCleaned);
        } else {
            console.log("Ethereum object doesn't exist!")
        }
    } catch (error) {
        console.log(error);
    }
}


