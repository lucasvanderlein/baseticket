import { baseSepolia } from 'viem/chains';

// Base Sepolia Configuration
export const BASE_SEPOLIA_CHAIN_ID = 84532;

export const baseSepoliaConfig = {
  ...baseSepolia,
  rpcUrls: {
    default: { http: ['https://sepolia.base.org'] },
    public: { http: ['https://sepolia.base.org'] },
  },
  blockExplorers: {
    default: { name: 'BaseScan', url: 'https://sepolia.basescan.org' },
  },
};

// Contract ABI (add your deployed contract address here)
export const BASE_EVENT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "description", "type": "string" },
      { "internalType": "string", "name": "location", "type": "string" },
      { "internalType": "uint256", "name": "date", "type": "uint256" },
      { "internalType": "uint256", "name": "maxTickets", "type": "uint256" }
    ],
    "name": "createEvent",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "eventId", "type": "uint256" }],
    "name": "rsvp",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllEvents",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "id", "type": "uint256" },
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "string", "name": "description", "type": "string" },
          { "internalType": "string", "name": "location", "type": "string" },
          { "internalType": "uint256", "name": "date", "type": "uint256" },
          { "internalType": "address", "name": "organizer", "type": "address" },
          { "internalType": "uint256", "name": "totalRSVPs", "type": "uint256" },
          { "internalType": "uint256", "name": "maxTickets", "type": "uint256" },
          { "internalType": "bool", "name": "isSoldOut", "type": "bool" }
        ],
        "internalType": "struct BaseEvent.Event[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
    "name": "getUserTickets",
    "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
    "name": "getTicketEvent",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "id", "type": "uint256" },
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "string", "name": "description", "type": "string" },
          { "internalType": "string", "name": "location", "type": "string" },
          { "internalType": "uint256", "name": "date", "type": "uint256" },
          { "internalType": "address", "name": "organizer", "type": "address" },
          { "internalType": "uint256", "name": "totalRSVPs", "type": "uint256" },
          { "internalType": "uint256", "name": "maxTickets", "type": "uint256" },
          { "internalType": "bool", "name": "isSoldOut", "type": "bool" }
        ],
        "internalType": "struct BaseEvent.Event",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "name", "type": "string" },
      { "indexed": true, "internalType": "address", "name": "organizer", "type": "address" }
    ],
    "name": "EventCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "eventId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "attendee", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "RSVPed",
    "type": "event"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "eventId", "type": "uint256" }],
    "name": "cancelEvent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "eventId", "type": "uint256" }],
    "name": "isEventCancelled",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getActiveEvents",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "id", "type": "uint256" },
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "string", "name": "description", "type": "string" },
          { "internalType": "string", "name": "location", "type": "string" },
          { "internalType": "uint256", "name": "date", "type": "uint256" },
          { "internalType": "address", "name": "organizer", "type": "address" },
          { "internalType": "uint256", "name": "totalRSVPs", "type": "uint256" },
          { "internalType": "uint256", "name": "maxTickets", "type": "uint256" },
          { "internalType": "bool", "name": "isSoldOut", "type": "bool" }
        ],
        "internalType": "struct BaseEvent.Event[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "eventId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "organizer", "type": "address" }
    ],
    "name": "EventCancelled",
    "type": "event"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "eventId", "type": "uint256" }],
    "name": "getAvailableTickets",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "eventId", "type": "uint256" }],
    "name": "isEventSoldOut",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "eventId", "type": "uint256" },
      { "internalType": "address", "name": "user", "type": "address" }
    ],
    "name": "hasRSVPed",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Replace with your deployed contract address
export const BASE_EVENT_CONTRACT_ADDRESS = '0x82E87E8D356A4d222A2E603BA6bcfD83f0bd6Afb' as const;

export type EventStruct = {
  id: bigint;
  name: string;
  description: string;
  location: string;
  date: bigint;
  organizer: string;
  totalRSVPs: bigint;
  maxTickets: bigint;
  isSoldOut: boolean;
};
