import React, { FC } from 'react';
import {
    Program, Provider, web3, BN, AnchorProvider,
  } from '@project-serum/anchor';
import { clusterApiUrl, Connection, PublicKey, Keypair } from '@solana/web3.js';
import { ConnectionProvider, useAnchorWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
const Content: FC = () => {
    // 
    const wallet = useAnchorWallet();
    function getProvider() {
      if (!wallet) {
        return null;
      }
      /* Create the provider and return it to the caller
         network set to devnet for now*/
      const network = "https://solana-api.projectserum.com";//"https://api.devnet.solana.com";//"http://localhost:8899";
      const connection = new Connection(network, "processed");
      const provider = new AnchorProvider(
        connection, wallet, { "preflightCommitment": "processed" },
      );
      return provider;
    }
    async function getNFTsFromWallet() {
      const provider = getProvider();
      if (!provider) {
        throw ('Provider is null');
      } else {
        const accounts: any = await provider.connection.getParsedProgramAccounts(
          TOKEN_PROGRAM_ID, // new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
          {
            filters: [
              {
                dataSize: 165, // number of bytes
              },
              {
                memcmp: {
                  offset: 32, // number of bytes
                  bytes: provider.wallet.publicKey.toString(), // base58 encoded string
                },
              },
            ],
          }
        );
        let NFts = [{}];  //Accumulate NFTs for Final Output
        NFts.pop();
        for (let i = 0; i < accounts.length; i++) {
          let amountI = accounts[i].account.data["parsed"]["info"]["tokenAmount"]["uiAmount"];
          let mint_s = accounts[i].account.data["parsed"]["info"]["mint"]
          if (amountI == 1) {
            let tokenmetaPubkey = await Metadata.getPDA(mint_s);
            const tokenmeta: any = await Metadata.load(provider.connection, tokenmetaPubkey);
            fetch(tokenmeta.data.data.uri)  //Fetch Metadata of NFT
              .then((response) => response.json())
              .then((responseJson) => {
                NFts.push({ "nftid": mint_s, "url": responseJson.image });
              })
              .catch((error) => {
                console.error(error);
              });
          }
        }
        //
        console.log(
          `Found ${NFts.length} NFTs for wallet ${provider.wallet.publicKey.toString()}: `
        );
        console.log(NFts);
      };
  
    }
    return (
      <div className="App">
        <button onClick={getNFTsFromWallet}>Get NFTs</button>

        <WalletMultiButton />
      </div>
    )
  
  }
  export default Content;