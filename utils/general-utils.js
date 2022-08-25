import {ethers} from "ethers";
import {contractAddress} from "../models/component-models";
import contractABI from "../data/ERC1155Contract.json";
import {from, map, merge, Subject} from "rxjs";
import {REDUCER_KEYS} from "./reducer";


export const getShortenedAccountNumber = (accountAddress) => {
    return (accountAddress.length > 12) ?
        accountAddress.substring(0, 5) + '.............' + accountAddress.substring(accountAddress.length - 7) :
        accountAddress;


}

export const getMintingNos = () => {
    return [0, 1, 2];
}


export const getForgingNos = () => {
    return [3, 4, 5, 6];
}

export const getBurningNos = () => {
    return [3, 4, 5, 6];
}

export const getTradingFromNos = () => {
    return [0, 1, 2, 3, 4, 5, 6];
}

export const getTradingToNos = () => {
    return [0, 1, 2];
}

export const allTokenIds = () => {
    return [0, 1, 2, 3, 4, 5, 6];
}


//////////////////////////////////////////////

export const getChainIds = (setChainId) => {
    from(window.ethereum?.request({method: 'eth_chainId'})).subscribe(
        data => {
            return setChainId(data)
        }
    );
}


//////////////////////////////////////////////


export const getContractBalance = (selectedAccount, tokenId) => {
    try {
        const {ethereum} = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);
            return from(contract.balanceOf(selectedAccount, tokenId)).pipe(map(data => data.toString()));

        } else {
            console.log("Ethereum object doesn't exist!")
        }
    } catch (error) {
        console.log(error);
    }
}

export const mintToken = (id, amount) => {
    let returningSubject = new Subject();
    if (id === 0 || id === 1 || id === 2) {
        const contract = getDeployedContractReference();
        if (contract) {
            return from(contract.estimateGas.startMintingToken(id, amount))
                .subscribe(startEstimate => {
                    if (startEstimate) {
                        merge(from(contract.startMintingToken(id, amount, {gasLimit: startEstimate})))
                    } else {
                        merge(from(contract.startMintingToken(id, amount)))
                    }
                });
        } else {
            returningSubject.next({error: -1, message: "Error fetching contract"});
        }
    } else {
        returningSubject.next({error: -1, message: "Selected Token Id can not be minted Directly"})
    }
    return returningSubject;
}

export const forgeToken = (id, amount) => {
    let returningSubject = new Subject();
    if (id === 3 || id === 4 || id === 5 || id === 6) {
        const contract = getDeployedContractReference();
        if (contract) {
            const price = amount * 0.01
            return from(contract.startMintingToken(id, amount, {
                value: ethers.utils.parseEther(price.toString())
            }));
        } else {
            returningSubject.next({error: -1, message: "Error fetching contract"});
        }
    } else {
        returningSubject.next({error: -1, message: "Selected Token Id can not be Forged"});
    }
    return returningSubject;
}

export const burnToken = (id, amount) => {
    let returningSubject = new Subject();
    if (id === 3 || id === 4 || id === 5 || id === 6) {
        const contract = getDeployedContractReference();
        if (contract) {
            return from(contract.estimateGas.startBurningToken(id, amount))
                .subscribe(startEstimate => {
                    if (startEstimate) {
                        merge(from(contract.startBurningToken(id, amount, {gasLimit: startEstimate})))
                    } else {
                        merge(from(contract.startBurningToken(id, amount)))
                    }
                });
        } else {
            returningSubject.next({error: -1, message: "Error fetching contract"});
        }
    } else {
        returningSubject.next({error: -1, message: "Selected Token Id can not be Forged"});
    }
    return returningSubject;

}

export const transferToken = (fromId, toId, amount) => {
    let returningSubject = new Subject();

    const contract = getDeployedContractReference();
    if (contract) {
        return from(contract.estimateGas.startTransferringToken(fromId, toId, amount))
            .subscribe(startEstimate => {
                if (startEstimate) {
                    merge(from(contract.startTransferringToken(fromId, toId, amount, {gasLimit: startEstimate})))
                } else {
                    merge(from(contract.startTransferringToken(fromId, toId, amount)))
                }
            });
    } else {
        returningSubject.next({error: -1, message: "Error fetching contract"});
    }
    return returningSubject;

}

export const getAllTokenDetails = (selectedAccount, setTokenMap) => {
    allTokenIds().forEach(id => {
        getContractBalance(selectedAccount, id).subscribe(value => setTokenMap(prev => new Map(prev.set(id, value))));
        console.log(id);

    });
    // getContractBalance(selectedAccount, 0).subscribe(value => setTokenMap(prev => new Map(prev.set(0, value))));
    // getContractBalance(selectedAccount, 1).subscribe(value => setTokenMap(prev => new Map(prev.set(1, value))));
    // getContractBalance(selectedAccount, 2).subscribe(value => setTokenMap(prev => new Map(prev.set(2, value))));
    // getContractBalance(selectedAccount, 3).subscribe(value => setTokenMap(prev => new Map(prev.set(3, value))));
    // getContractBalance(selectedAccount, 4).subscribe(value => setTokenMap(prev => new Map(prev.set(4, value))));
    // getContractBalance(selectedAccount, 5).subscribe(value => setTokenMap(prev => new Map(prev.set(5, value))));
    // getContractBalance(selectedAccount, 6).subscribe(value => setTokenMap(prev => new Map(prev.set(6, value))));

}

export const getDeployedContractReference = () => {
    try {
        const {ethereum} = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            return new ethers.Contract(contractAddress, contractABI.abi, signer);


        } else {
            console.error("Ethereum is not injected to window");
        }
    } catch (error) {
        console.error("Error taking fetching Contract");
    }
}


export const setRoute = (router, id) => {
    router.push(id);
}
