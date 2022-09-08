import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, useAnchorWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
  Program, Provider, web3, BN, AnchorProvider,
} from '@project-serum/anchor';
import { clusterApiUrl, Connection, PublicKey, Keypair } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo } from 'react';
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Metaplex } from "@metaplex-foundation/js";
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

let tokensInWallet: any = [];
const App: FC = () => {
  return (
    <Context>
      <Content />
    </Context>
  );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
let myPromise = new Promise(function (myResolve, myReject) {
  // "Producing Code" (May take some time)

  myResolve("Ok"); // when successful
  myReject("Error");  // when error
});
const Content: FC = () => {
  // Constants
  const key = 'vault';
  const keyu = 'vaultu';
  const keyx = 'vaultx';
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
  async function getsecret() {
    let bs58 = require('bs58');
    let secretKey = bs58.decode("");
    let x = Keypair.fromSecretKey(secretKey);
    // console.log(x.publicKey.toBase58());

    console.log(x.secretKey.toString());
  }
  return (
    <div className="App">
      <button onClick={getNFTsFromWallet}>Get NFTs</button>
      <button onClick={getsecret}>getsecret</button>
      <WalletMultiButton />
    </div>
  )

}