import { useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { Buffer } from "buffer";
import idl from "./idl.json";
import kp from "./keypair.json";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, AnchorProvider, web3, utils } from "@project-serum/anchor";

// Destructuring web3 objects
const { SystemProgram, Keypair } = web3;

// Set Buffer globally
window.Buffer = Buffer;

// Initialize program ID
const programID = new PublicKey(idl.metadata.address);

// Define network configuration
const network = clusterApiUrl("devnet");

// Options for establishing connection
const opts = {
  preflightCommitment: "processed",
};

// Generate a base account keypair
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = Keypair.fromSecretKey(secret);

// Initialize connection to Solana blockchain
const connection = new Connection(network, opts.preflightCommitment);

function Try1() {
  // Function to get Anchor provider
  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(
      connection,
      window.solana,
      opts.preflightCommitment
    );
    return provider;
  };

  // Function to check if a wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          const response = await solana.connect({
            onlyIfTrusted: true,
          });
          getData();
          console.log(response.publicKey);
        }
      } else {
        alert("Solana object not found!, Get a Phantom Wallet");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const init = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      console.log("baseAccount.publicKey: ", baseAccount.publicKey);
      console.log("provider.wallet.publicKey: ", provider.wallet.publicKey);

      const num = new anchor.BN(786);
      const tx = await program.rpc.initialize(num, {
        accounts: {
          newAccount: baseAccount.publicKey,
          signer: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const inc = async () => {
    try {
        const provider = getProvider();
        const program = new Program(idl, programID, provider);
        console.log("baseAccount.publicKey: ", baseAccount.publicKey);
        console.log("provider.wallet.publicKey: ", provider.wallet.publicKey);
        
        const tx = await program.rpc.increment({
          accounts: {
            newAccount: baseAccount.publicKey,
          },
        });
        console.log(tx);
        getData();
      } catch (error) {
        console.log(error);
      }
  };

  const dec = async () => {
    try {
        const provider = getProvider();
        const program = new Program(idl, programID, provider);
        console.log("baseAccount.publicKey: ", baseAccount.publicKey);
        console.log("provider.wallet.publicKey: ", provider.wallet.publicKey);
        
        const tx = await program.rpc.decrement({
          accounts: {
            newAccount: baseAccount.publicKey,
          },
        });
        console.log(tx);
        getData();
      } catch (error) {
        console.log(error);
      }
  };

  const [data, setData] = useState('');
  const getData = async () => {
    try {
        const provider = getProvider();
        const program = new Program(idl, programID, provider);
        console.log("baseAccount.publicKey: ", baseAccount.publicKey);
        console.log("provider.wallet.publicKey: ", provider.wallet.publicKey);
        
        const data = await program.account.newAccount.fetch(
            baseAccount.publicKey
        );
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <>
      <div>
        <h1>Try 1(With Wallet)</h1>
        <button onClick={checkIfWalletIsConnected}>Connect</button>
        <button onClick={init}>Initialize Account</button>
        <button onClick={inc}>Increament</button>
        <button onClick={dec}>Decreament</button>
        <h1>{data != '' ? data.data.toString() : '0'}</h1>
      </div>
    </>
  );
}

export default Try1;
