import React, { useEffect, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import request from "../../services/Requests";
import AppContext from "../../context/AppContext";

import "react-phone-input-2/lib/style.css";
import "./index.scss";
import { Toast } from "react-bootstrap";
import metamaskimg from "../../assets/metamask.png";

export default function ConnectWalletModal({ isShow, ...props }) {
  const { setmetaMask, metaMask } = useContext(AppContext);
  const [show, setShow] = useState(true);
  const [toastShow, setToastShow] = useState({ active: false });
  const [toast, setToast] = useState({ type: null });

  useEffect(() => {
    if(!window.ethereum) {
      return;
    }
    window.ethereum.on("accountsChanged", handleAccountsChanged);

    window.ethereum.on("chainChanged", (_chainId) => {
      console.log("chainChanged");
      console.log(_chainId);
      //setCurrentChainID(() => parseInt(_chainId, 16));
      //window.location.reload()
    });
    //setContractTokens();
  }, []);

  const setContractTokens = async () => {
    console.log("setContractTokens");
    const brookeMetamask = localStorage.getItem("brooke-metamask");
    if (brookeMetamask) {
      await submitToken(brookeMetamask);
      const tokens = await getContractTokensBalance();
      setmetaMask({
        account: brookeMetamask,
        tokens: tokens,
        messages: [
          ...(metaMask.messages || []),
          {
            head: "Account Changed",
            body: `addres: ${brookeMetamask}`,
            variant: "warning",
          },
        ],
      });
    }
  };

  const getContractTokensBalance = async () => {
    const provider = await detectEthereumProvider();
    if (!provider) {
      console.log("provider failed");
      return;
    }
    const web3 = new Web3(provider);
    const tokenAddresses = [
      {
        name: "VEY",
        tokenAddress: "0x70A63225BcaDacc4430919F0C1A4f0f5fcffBaac",
      },
      {
        name: "SHIB",
        tokenAddress: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
      },
    ];

    // The minimum ABI to get ERC20 Token balance
    let minABI = [
      // balanceOf
      {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
      },
      // decimals
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint8" }],
        type: "function",
      },
    ];
    const accounts = await web3.eth.getAccounts();
    let walletAddress = accounts[0];
    const resultTokens = [];
    if (!walletAddress) {
      return;
    }

    const resultr = await web3.eth.getBalance(walletAddress);
    resultTokens.push({
      name: "ETH",
      decimals: undefined,
      value: web3.utils.fromWei(resultr, "ether"),
    });

    return (async function () {
      for await (let item of tokenAddresses) {
        let contract = new web3.eth.Contract(minABI, item.tokenAddress);
        const result = await contract.methods.balanceOf(walletAddress).call();
        const decimals = await contract.methods.decimals().call();
        resultTokens.push({
          name: item.name,
          decimals,
          value: result / 10 ** decimals,
        });
      }
      return resultTokens;
    })();
  };

  useEffect(() => {
    if (isShow) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [isShow]);

  useEffect(() => {
    if (toast.type !== null) {
      setTimeout(() => {
        setToast({ type: null });
      }, 1000);
    }
  }, [toast.type]);

  const handleAccountsChanged = async (accounts) => {
    //if(!isLogged) return
    console.log("handleAccountsChanged", accounts);
    if (accounts.length === 0) {
      localStorage.removeItem("brooke-metamask");
      setmetaMask({}, true);
      // MetaMask is locked or the user has not connected any accounts
      setToastShow({
        ...toastShow,
        active: true,
        head: "User Rejected Request",
        body: `Please connect to MetaMask.`,
      });
    } else if (accounts[0] !== metaMask?.account) {
      console.log("account changed", accounts[0], metaMask?.account);
      localStorage.setItem("brooke-metamask", accounts[0]);
      await submitToken(accounts[0]);
      const tokens = await getContractTokensBalance();
      setmetaMask({
        account: accounts[0],
        tokens,
        messages: [
          ...(metaMask.messages || []),
          {
            head: "Account Changed",
            body: `addres: ${accounts[0]}`,
            variant: "warning",
          },
        ],
      });
    }
  };

  const submitToken = async (eth_wallet) => {
    if (localStorage.getItem("brookes-token")) {
      const result = await request.post(
        "api/v1/eth_wallet/",
        {
          address: eth_wallet,
        },
        false
      );
      console.log(result);
    }
  };

  const detection = async () => {
    console.log("detection");
    const provider = await detectEthereumProvider();
    if (!provider) {
      setToastShow({
        ...toastShow,
        active: true,
        head: "Wallet not found",
        body: `Please install MetaMask!`,
      });
    } else {
      const resp = await ConnectWallet();
      if (resp.address) {
        const tokens = await getContractTokensBalance();
        await submitToken(resp.address);
        localStorage.setItem("brooke-metamask", resp.address);
        setmetaMask({
          account: resp.address,
          tokens,
          messages: [
            ...(metaMask.messages || []),
            {
              body: `addres: ${resp.address}`,
              currentChainID: resp.currentChainID,
            },
          ],
        });
        setShow(false);
        setToastShow({
          ...toastShow,
          active: true,
          head: "Metamask account is connected",
          body: `addres: ${resp.address}`,
        });
      }
    }
  };

  const ConnectWallet = async () => {
    console.log("Try Connect");
    try {
      await window.ethereum.enable();

      const id = await window.ethereum.request({ method: "eth_chainId" });
      const currentChainID = parseInt(id, 16);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      return { address: accounts[0], currentChainID };
    } catch (err) {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log("Please connect to MetaMask.");
        console.log({
          head: "User Rejected Request",
          body: "Please connect to MetaMask.",
          variant: "info",
        });
        setToastShow({
          ...toastShow,
          active: true,
          head: "User Request Pending",
          body: `Please connect to MetaMask.`,
        });
      } else if (err.code === -32002) {
        console.log("Please unlock MetaMask.");
        console.log({
          head: "User Request Pending",
          body: "Please unlock MetaMask and try agin.",
          variant: "info",
        });
        setToastShow({
          ...toastShow,
          active: true,
          head: "User Request Pending",
          body: `Please unlock MetaMask and try agin.`,
        });
      } else {
        console.error(err);
        console.log({ head: "Error", body: err.message, variant: "info" });
      }
    }
  };

  const onHide = (body = null) => {
    setShow(false);
    props.onHide(body);
  };

  const metaMaskClick = () => {
    detection();
  };

  return (
    <>
      <Toast
        onClose={() => setToastShow({ active: false })}
        show={toastShow?.active}
        delay={3000}
        autohide
        style={{
          position: "absolute",
          top: 10,
          right: 20,
          zIndex: 99,
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">{toastShow.head}</strong>
        </Toast.Header>
        <Toast.Body>{toastShow?.body}</Toast.Body>
      </Toast>
      <Modal
        show={show}
        onHide={onHide}
        size="sm"
        dialogClassName="connect-wallet-modal"
        className="connect-wallet-modal-continer"
      >
        <Modal.Header closeButton>
          <Modal.Title>Connect to a wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 connect-wallet cw-mb">
          <div className="container text-center">
            <form>
              <div
                className="row text-center"
                style={{ justifyContent: "center" }}
              >
                <div className="col-12 mt-4 mb-4">
                  <button
                    type="button col-11"
                    className="submit"
                    type="button"
                    onClick={metaMaskClick}
                  >
                    Metamask
                    <div
                      style={{
                        padding: "6px",
                        borderRadius: "25px",
                        background: "#fff",
                      }}
                    >
                      <img src={metamaskimg} width="22" />
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
