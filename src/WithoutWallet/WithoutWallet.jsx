import { useEffect, useState } from "react";
import {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import idl from "../Init/idl.json";
import kp from "../Init/keypair.json";
import bs58 from "bs58";
import { Buffer } from "buffer";
import * as anchor from "@project-serum/anchor";

//
// Destructuring web3 objects
const { SystemProgram } = web3;
//

// Set Buffer globally
window.Buffer = Buffer;

// Create a keypair for the account that will hold the GIF data.
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = Keypair.fromSecretKey(secret);

// Initialize program ID
const programID = new PublicKey(idl.metadata.address);

// Initialize endpoint
const endpoint =
  "https://solana-devnet.g.alchemy.com/v2/5_Mpt8xd4uhahETZ0i38gMBjrmS9WAwX";

// Initialize connection to Solana blockchain
const connection = new Connection(endpoint, {
  commitment: "confirmed",
});

// Options for establishing connection
const opts = {
  preflightCommitment: "confirmed",
};

function WithoutWallet() {
  // Function to create a keypair from a private key
  const createKeypairFromPrivateKey = () => {
    // Your private key
    const privateKeyBytes = bs58.decode(
      "3MFs4bdBtPdQNyn1RqcbUchLEGB8hp8vm9TjYFshxSsokoZ1YWP4QAGTMPiYoGP1qpcmvMX12NoBJaVeLDZJ56Yi"
    );

    // Create a Keypair from the private key
    const keypair = Keypair.fromSecretKey(new Uint8Array(privateKeyBytes));
    console.log(keypair);
    return keypair;
  };

  // Function to get Anchor provider
  const getProvider = () => {
    const keypair = createKeypairFromPrivateKey();
    const provider = new AnchorProvider(
      connection,
      keypair,
      opts.preflightCommitment
    );
    console.log(provider);
    return provider;
  };

  const add = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      console.log("baseAccount.publicKey: ", baseAccount.publicKey);
      console.log("provider.wallet.publicKey: ", provider.wallet.publicKey);

      // Get recent blockhash
      const recentBlockhash = await connection.getRecentBlockhash();
      console.log("Recent blockhash:", recentBlockhash);

      // Construct transaction
      const transaction = new Transaction({ recentBlockhash }).add(
        await program.instruction.registerUser("Ayush Dhamankar","3j27s4786","ayush@gmail.com","9325935583", {
          accounts: {
            baseAccount: baseAccount.publicKey,
            signer: provider.wallet.publicKey,
          },
        })
      );
      console.log(transaction);

      const keypair = createKeypairFromPrivateKey();
      // Sign and send transaction
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [keypair], // Signer accounts
        {
          commitment: 'confirmed',
          preflightCommitment: 'confirmed',
          feePayer: keypair.publicKey, // Specify the fee payer account
        }
      );
      console.log("Transaction signature:", signature);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      console.log("baseAccount.publicKey: ", baseAccount.publicKey);
      console.log("provider.wallet.publicKey: ", provider.wallet.publicKey);

      const data = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1>Try 2(Without Wallet)</h1>
        <button onClick={add}>Increament</button>
      </div>
    </>
  );
}

export default WithoutWallet;